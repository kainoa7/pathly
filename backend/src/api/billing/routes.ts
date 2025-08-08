import { Router, Request, Response } from 'express';
import { PrismaClient, AccountType } from '@prisma/client';
import Stripe from 'stripe';
import { requireUser } from '../../middleware/auth';
import {
  stripe,
  BILLING_CONFIG,
  priceIdToPlan,
  planToAccountType,
  planToPriceId,
  verifyWebhookSignature,
  createStripeCustomer,
  createCheckoutSession,
  createPortalSession,
} from '../../utils/billing';

const router = Router();
const prisma = new PrismaClient();

/**
 * POST /api/billing/create-checkout-session
 * Create Stripe checkout session for subscription
 * 
 * TEST PLAN:
 * - Login as EXPLORER -> call create-checkout-session(pro) returns URL
 * - Returned URL should redirect to Stripe checkout
 * - After payment, webhook should upgrade user to PRO
 */
router.post('/create-checkout-session', requireUser, async (req: Request, res: Response) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({
        error: 'Billing not configured',
        message: 'Stripe billing is not configured on this server'
      });
    }

    const { plan } = req.body;
    const user = req.user!;

    // Validate plan
    if (!plan || !['pro', 'premium'].includes(plan)) {
      return res.status(400).json({
        error: 'Invalid plan',
        message: 'Plan must be "pro" or "premium"'
      });
    }

    // Get price ID for plan
    let priceId: string;
    try {
      priceId = planToPriceId(plan);
    } catch (error) {
      console.error('Price ID mapping error:', error);
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Billing configuration is incomplete'
      });
    }

    if (!priceId) {
      return res.status(500).json({
        error: 'Configuration error',
        message: `Price ID not configured for plan: ${plan}`
      });
    }

    let customerId = user.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      try {
        const customer = await createStripeCustomer(
          user.email,
          user.id,
          user.firstName,
          user.lastName
        );
        customerId = customer.id;

        // Update user with Stripe customer ID
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customerId },
        });
      } catch (error) {
        console.error('Failed to create Stripe customer:', error);
        return res.status(500).json({
          error: 'Customer creation failed',
          message: 'Unable to create billing account'
        });
      }
    }

    // Create checkout session
    try {
      const session = await createCheckoutSession(customerId, priceId, user.id);

      res.json({
        url: session.url,
        sessionId: session.id
      });
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      return res.status(500).json({
        error: 'Checkout session creation failed',
        message: 'Unable to create checkout session'
      });
    }

  } catch (error) {
    console.error('Create checkout session error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong'
    });
  }
});

/**
 * POST /api/billing/create-portal-session
 * Create Stripe billing portal session
 * 
 * TEST PLAN:
 * - User with stripeCustomerId can access portal
 * - Portal session returns URL if stripeCustomerId set
 */
router.post('/create-portal-session', requireUser, async (req: Request, res: Response) => {
  try {
    // Check if Stripe is configured
    if (!stripe) {
      return res.status(503).json({
        error: 'Billing not configured',
        message: 'Stripe billing is not configured on this server'
      });
    }

    const user = req.user!;

    if (!user.stripeCustomerId) {
      return res.status(400).json({
        error: 'No billing account',
        message: 'User has no billing account. Please create a subscription first.'
      });
    }

    try {
      const session = await createPortalSession(user.stripeCustomerId);

      res.json({
        url: session.url
      });
    } catch (error) {
      console.error('Failed to create portal session:', error);
      return res.status(500).json({
        error: 'Portal session creation failed',
        message: 'Unable to create billing portal session'
      });
    }

  } catch (error) {
    console.error('Create portal session error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong'
    });
  }
});

/**
 * POST /api/billing/webhook
 * Handle Stripe webhook events
 * 
 * SECURITY: This endpoint is NOT auth-protected - Stripe signature verification provides security
 * 
 * TEST PLAN:
 * - Simulate webhook for checkout.session.completed -> user becomes PRO; Subscription row exists
 * - Simulate subscription.updated to canceled -> user downgraded to EXPLORER
 */
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    
    if (!signature) {
      console.error('Missing Stripe signature header');
      return res.status(400).json({ error: 'Missing signature' });
    }

    if (!BILLING_CONFIG.STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook not configured' });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(req.body, signature);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    console.log(`Processing webhook event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Handle checkout.session.completed webhook
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing checkout.session.completed:', session.id);

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error('No userId in session metadata:', session.id);
      return;
    }

    if (!subscriptionId) {
      console.error('No subscription ID in completed session:', session.id);
      return;
    }

    // Get subscription details from Stripe
    if (!stripe) {
      console.error('Stripe not configured for webhook processing');
      return;
    }
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0]?.price.id;

    if (!priceId) {
      console.error('No price ID found in subscription:', subscriptionId);
      return;
    }

    // Map price ID to plan
    let plan: 'pro' | 'premium';
    try {
      plan = priceIdToPlan(priceId);
    } catch (error) {
      console.error('Unknown price ID:', priceId);
      return;
    }

    const accountType = planToAccountType(plan);

    // Upsert subscription record
    await prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscriptionId },
      update: {
        plan,
        status: subscription.status,
        updatedAt: new Date(),
      },
      create: {
        userId,
        stripeSubscriptionId: subscriptionId,
        plan,
        status: subscription.status,
      },
    });

    // Update user account type
    await prisma.user.update({
      where: { id: userId },
      data: { 
        accountType,
        stripeCustomerId: customerId, // Ensure customer ID is set
      },
    });

    console.log(`User ${userId} upgraded to ${accountType} via subscription ${subscriptionId}`);

  } catch (error) {
    console.error('Error handling checkout.session.completed:', error);
  }
}

/**
 * Handle customer.subscription.updated webhook
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    console.log('Processing customer.subscription.updated:', subscription.id);

    const userId = subscription.metadata?.userId;
    
    if (!userId) {
      console.error('No userId in subscription metadata:', subscription.id);
      return;
    }

    // Update subscription status
    await prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscription.id },
      update: {
        status: subscription.status,
        updatedAt: new Date(),
      },
      create: {
        userId,
        stripeSubscriptionId: subscription.id,
        plan: 'pro', // Default, will be updated based on price
        status: subscription.status,
      },
    });

    // Downgrade user if subscription is canceled or unpaid
    if (['canceled', 'unpaid', 'past_due'].includes(subscription.status)) {
      await prisma.user.update({
        where: { id: userId },
        data: { accountType: AccountType.EXPLORER },
      });

      console.log(`User ${userId} downgraded to EXPLORER due to subscription status: ${subscription.status}`);
    }

  } catch (error) {
    console.error('Error handling customer.subscription.updated:', error);
  }
}

/**
 * Handle customer.subscription.deleted webhook
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    console.log('Processing customer.subscription.deleted:', subscription.id);

    const userId = subscription.metadata?.userId;
    
    if (!userId) {
      console.error('No userId in subscription metadata:', subscription.id);
      return;
    }

    // Update subscription status
    await prisma.subscription.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: 'canceled',
        updatedAt: new Date(),
      },
    });

    // Downgrade user to EXPLORER
    await prisma.user.update({
      where: { id: userId },
      data: { accountType: AccountType.EXPLORER },
    });

    console.log(`User ${userId} downgraded to EXPLORER due to subscription deletion`);

  } catch (error) {
    console.error('Error handling customer.subscription.deleted:', error);
  }
}

/**
 * Handle invoice.payment_failed webhook
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    console.log('Processing invoice.payment_failed:', invoice.id);

    const subscriptionId = invoice.subscription as string;
    
    if (!subscriptionId) {
      console.log('No subscription associated with failed payment');
      return;
    }

    // Find subscription in our database
    const subscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      include: { user: true },
    });

    if (!subscription) {
      console.error('Subscription not found in database:', subscriptionId);
      return;
    }

    // Log payment failure (could send notification email here)
    console.log(`Payment failed for user ${subscription.userId}, subscription ${subscriptionId}`);

    // Note: We don't immediately downgrade on payment failure
    // Stripe will handle retries and eventually cancel the subscription if needed

  } catch (error) {
    console.error('Error handling invoice.payment_failed:', error);
  }
}

export default router;