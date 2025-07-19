import { Request } from 'express';

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        accountType: string;
      };
    }
  }
}

// Export a custom request type for convenience
export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    accountType: string;
  };
}

export {}; // Make this a module 