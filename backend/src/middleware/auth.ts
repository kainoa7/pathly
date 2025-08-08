import { Request, Response, NextFunction } from 'express';
import { PrismaClient, AccountType } from '@prisma/client';
import { verifyAccessToken, JWTPayload } from '../utils/jwt';

const prisma = new PrismaClient();

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        accountType: AccountType;
        stripeCustomerId?: string;
        university?: string;
        graduationYear?: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

/**
 * Middleware to require authenticated user
 * Verifies JWT token and loads user from database
 */
export const requireUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Access token required',
        message: 'Please provide a valid access token in Authorization header'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify JWT token
    let payload: JWTPayload;
    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      res.status(401).json({
        error: 'Invalid access token',
        message: 'Access token is invalid or expired'
      });
      return;
    }

    // Load user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountType: true,
        stripeCustomerId: true,
        university: true,
        graduationYear: true,
        major: true,
        interests: true,
        goals: true,
        onboardingComplete: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(401).json({
        error: 'User not found',
        message: 'User associated with token no longer exists'
      });
      return;
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Authentication error',
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Middleware to require specific account types (roles)
 * Must be used after requireUser middleware
 */
export const requireRole = (allowedRoles: AccountType[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Ensure user is authenticated first
    if (!req.user) {
      res.status(401).json({
        error: 'Authentication required',
        message: 'User must be authenticated to access this resource'
      });
      return;
    }

    // Check if user's account type is in allowed roles
    if (!allowedRoles.includes(req.user.accountType)) {
      res.status(403).json({
        error: 'Insufficient permissions',
        message: `Access denied. Required account type: ${allowedRoles.join(' or ')}. Current: ${req.user.accountType}`,
        requiredRoles: allowedRoles,
        currentRole: req.user.accountType
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to require Pro or Premium account
 * Combines authentication and role checking
 */
export const requireProUser = [requireUser, requireRole(['PRO', 'PREMIUM'])];

/**
 * Middleware to require Premium account only
 * Combines authentication and role checking
 */
export const requirePremiumUser = [requireUser, requireRole(['PREMIUM'])];