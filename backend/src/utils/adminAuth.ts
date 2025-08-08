import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

/**
 * Admin authentication configuration
 */
export const ADMIN_CONFIG = {
  API_KEY: process.env.ADMIN_API_KEY || '',
  HMAC_SECRET: process.env.ADMIN_HMAC_SECRET || '',
};

/**
 * Verify admin API key authentication
 */
export const verifyApiKey = (apiKey: string): boolean => {
  if (!ADMIN_CONFIG.API_KEY) {
    console.error('ADMIN_API_KEY not configured');
    return false;
  }

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(apiKey),
    Buffer.from(ADMIN_CONFIG.API_KEY)
  );
};

/**
 * Verify HMAC signature if HMAC_SECRET is configured
 */
export const verifyHmacSignature = (rawBody: string | Buffer, signature: string): boolean => {
  if (!ADMIN_CONFIG.HMAC_SECRET) {
    // HMAC not required if secret not configured
    return true;
  }

  if (!signature) {
    return false;
  }

  try {
    // Support both hex and base64 signatures
    let expectedSignature: string;
    
    // Try hex format first (sha256=...)
    if (signature.startsWith('sha256=')) {
      const hmac = crypto.createHmac('sha256', ADMIN_CONFIG.HMAC_SECRET);
      hmac.update(rawBody);
      expectedSignature = 'sha256=' + hmac.digest('hex');
    } else {
      // Try base64 format
      const hmac = crypto.createHmac('sha256', ADMIN_CONFIG.HMAC_SECRET);
      hmac.update(rawBody);
      expectedSignature = hmac.digest('base64');
    }

    // Constant-time comparison
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('HMAC verification error:', error);
    return false;
  }
};

/**
 * Complete admin authentication verification
 */
export const verifyAdminAuth = (req: Request, rawBody: string | Buffer): { success: boolean; error?: string } => {
  // Check API key
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    return { success: false, error: 'Missing x-api-key header' };
  }

  if (!verifyApiKey(apiKey)) {
    return { success: false, error: 'Invalid API key' };
  }

  // Check HMAC signature if configured
  if (ADMIN_CONFIG.HMAC_SECRET) {
    const signature = req.headers['x-signature'] as string;
    
    if (!signature) {
      return { success: false, error: 'Missing x-signature header (HMAC required)' };
    }

    if (!verifyHmacSignature(rawBody, signature)) {
      return { success: false, error: 'Invalid HMAC signature' };
    }
  }

  return { success: true };
};

/**
 * Middleware for admin authentication
 * Note: Requires rawBody to be available on req.rawBody or passed separately
 */
export const requireAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get raw body for HMAC verification
    const rawBody = req.body; // This will be raw buffer if raw parser is used
    
    const authResult = verifyAdminAuth(req, rawBody);
    
    if (!authResult.success) {
      res.status(401).json({
        error: 'Authentication failed',
        message: authResult.error || 'Invalid authentication'
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({
      error: 'Authentication error',
      message: 'Internal server error during authentication'
    });
  }
};