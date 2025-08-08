import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import prisma from './config/database';
import authRoutes from './api/auth/routes';
import newsRoutes from './api/news/routes';
import featureRoutes from './api/features/routes';
import feedbackRoutes from './api/feedback/routes';
import mobileAppVotesRoutes from './api/mobile-app-votes/routes';
import majorsRoutes from './api/majors/routes';
import salaryProjectionsRoutes from './api/salary-projections/routes';
import foundingMembersRoutes from './api/founding-members/routes';
import notificationsRoutes from './api/notifications/routes';
import aiRoutes from './api/ai/routes';
import gmailRoutes from './api/gmail/routes';
import betaSignupsRoutes from './api/beta-signups/routes';
import billingRoutes from './api/billing/routes';
import newsAdminRoutes from './api/news/adminImport';
import weeklyUpdatesRoutes from './api/weeklyUpdates/routes';

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

// Raw body parser for Stripe webhooks (must be before express.json())
app.use('/api/billing/webhook', express.raw({ type: 'application/json' }));

// Raw body parser for admin endpoints (for HMAC verification)
app.use('/api/news/admin', express.raw({ type: 'application/json' }));

// Raw body parser for weekly updates admin endpoints
app.use('/api/weekly-updates', (req, res, next) => {
  // Only apply raw parser for admin POST endpoint (creation)
  if (req.method === 'POST' && req.path === '/') {
    express.raw({ type: 'application/json' })(req, res, next);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/features', featureRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/mobile-app-votes', mobileAppVotesRoutes);
app.use('/api/majors', majorsRoutes);
app.use('/api/salary-projections', salaryProjectionsRoutes);
app.use('/api/founding-members', foundingMembersRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/gmail', gmailRoutes);
app.use('/api/beta-signups', betaSignupsRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/news/admin', newsAdminRoutes);
app.use('/api/weekly-updates', weeklyUpdatesRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Database connection test route
app.get('/api/test-db', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ 
      status: 'Database connected successfully', 
      userCount,
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Test route to create a user
app.post('/api/test-user', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        accountType: 'EXPLORER'  // Changed from 'explorer' to 'EXPLORER'
      }
    });
    res.json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create user', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

export default app; 