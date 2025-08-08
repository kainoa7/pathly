import Stripe from 'stripe';
import { AccountType } from '@prisma/client';

// Initialize Stripe client (optional in development)
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    })
  : null;

// Environment variables with validation
export const BILLING_CONFIG = {
  STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO || '',
  STRIPE_PRICE_PREMIUM: process.env.STRIPE_PRICE_PREMIUM || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || 'http://localhost:5173',
  BILLING_SUCCESS_PATH: process.env.BILLING_SUCCESS_PATH || '/billing/success',
  BILLING_CANCEL_PATH: process.env.BILLING_CANCEL_PATH || '/billing/cancel',
};

/**
 * Map Stripe price ID to plan name
 */
export const priceIdToPlan = (priceId: string): 'pro' | 'premium' => {
  switch (priceId) {
    case BILLING_CONFIG.STRIPE_PRICE_PRO:
      return 'pro';
    case BILLING_CONFIG.STRIPE_PRICE_PREMIUM:
      return 'premium';
    default:
      throw new Error(`Unknown price ID: ${priceId}`);
  }
};

/**
 * Map plan name to AccountType enum
 */
export const planToAccountType = (plan: 'pro' | 'premium'): AccountType => {
  switch (plan) {
    case 'pro':
      return AccountType.PRO;
    case 'premium':
      return AccountType.PREMIUM;
    default:
      throw new Error(`Unknown plan: ${plan}`);
  }
};

/**
 * Map plan name to Stripe price ID
 */
export const planToPriceId = (plan: 'pro' | 'premium'): string => {
  switch (plan) {
    case 'pro':
      return BILLING_CONFIG.STRIPE_PRICE_PRO;
    case 'premium':
      return BILLING_CONFIG.STRIPE_PRICE_PREMIUM;
    default:
      throw new Error(`Unknown plan: ${plan}`);
  }
};

/**
 * Validate Stripe webhook signature
 */
export const verifyWebhookSignature = (
  payload: string | Buffer,
  signature: string,
  secret: string = BILLING_CONFIG.STRIPE_WEBHOOK_SECRET
): Stripe.Event => {
  try {
    return stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
};

/**
 * Create Stripe customer with user metadata
 */
export const createStripeCustomer = async (
  email: string,
  userId: string,
  firstName?: string,
  lastName?: string
): Promise<Stripe.Customer> => {
  if (!stripe) {
    throw new Error('Stripe not configured');
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name: firstName && lastName ? `${firstName} ${lastName}` : undefined,
      metadata: {
        userId,
      },
    });

    return customer;
  } catch (error) {
    console.error('Failed to create Stripe customer:', error);
    throw new Error('Failed to create customer');
  }
};

/**
 * Create checkout session for subscription
 */
export const createCheckoutSession = async (
  customerId: string,
  priceId: string,
  userId: string
): Promise<Stripe.Checkout.Session> => {
  if (!stripe) {
    throw new Error('Stripe not configured');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${BILLING_CONFIG.FRONTEND_BASE_URL}${BILLING_CONFIG.BILLING_SUCCESS_PATH}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BILLING_CONFIG.FRONTEND_BASE_URL}${BILLING_CONFIG.BILLING_CANCEL_PATH}`,
      metadata: {
        userId,
      },
      subscription_data: {
        metadata: {
          userId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};

/**
 * Create billing portal session
 */
export const createPortalSession = async (
  customerId: string
): Promise<Stripe.BillingPortal.Session> => {
  if (!stripe) {
    throw new Error('Stripe not configured');
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: BILLING_CONFIG.FRONTEND_BASE_URL,
    });

    return session;
  } catch (error) {
    console.error('Failed to create portal session:', error);
    throw new Error('Failed to create portal session');
  }
};

/**
 * Get customer by ID
 */
export const getStripeCustomer = async (
  customerId: string
): Promise<Stripe.Customer | null> => {
  if (!stripe) {
    return null;
  }

  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer.deleted ? null : (customer as Stripe.Customer);
  } catch (error) {
    console.error('Failed to retrieve customer:', error);
    return null;
  }
};

/**
 * Get subscription by ID
 */
export const getStripeSubscription = async (
  subscriptionId: string
): Promise<Stripe.Subscription | null> => {
  if (!stripe) {
    return null;
  }

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Failed to retrieve subscription:', error);
    return null;
  }
};