import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this-in-production';
const ACCESS_TOKEN_TTL_MIN = parseInt(process.env.ACCESS_TOKEN_TTL_MIN || '15');
const REFRESH_TOKEN_TTL_DAYS = parseInt(process.env.REFRESH_TOKEN_TTL_DAYS || '7');

export interface JWTPayload {
  userId: string;
  email: string;
  accountType: string;
}

/**
 * Generate access token (short-lived)
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: `${ACCESS_TOKEN_TTL_MIN}m`,
  });
};

/**
 * Generate refresh token (long-lived)
 */
export const generateRefreshToken = (): string => {
  // Generate a random token
  return require('crypto').randomBytes(64).toString('hex');
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * Store refresh token in database (hashed)
 */
export const storeRefreshToken = async (userId: string, token: string): Promise<void> => {
  const hashedToken = await bcrypt.hash(token, 10);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_TTL_DAYS);

  // Clean up old refresh tokens for this user
  await prisma.refreshToken.deleteMany({
    where: { userId }
  });

  // Store new refresh token
  await prisma.refreshToken.create({
    data: {
      userId,
      token: hashedToken,
      expiresAt,
    },
  });
};

/**
 * Verify refresh token and return user ID
 */
export const verifyRefreshToken = async (token: string): Promise<string | null> => {
  try {
    // Find all refresh tokens and check against the provided token
    const refreshTokens = await prisma.refreshToken.findMany({
      where: {
        expiresAt: {
          gt: new Date(), // Not expired
        },
      },
    });

    for (const rt of refreshTokens) {
      const isValid = await bcrypt.compare(token, rt.token);
      if (isValid) {
        return rt.userId;
      }
    }

    return null;
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    return null;
  }
};

/**
 * Invalidate refresh token
 */
export const invalidateRefreshToken = async (token: string): Promise<void> => {
  try {
    // Find and delete the matching refresh token
    const refreshTokens = await prisma.refreshToken.findMany();

    for (const rt of refreshTokens) {
      const isValid = await bcrypt.compare(token, rt.token);
      if (isValid) {
        await prisma.refreshToken.delete({
          where: { id: rt.id }
        });
        break;
      }
    }
  } catch (error) {
    console.error('Error invalidating refresh token:', error);
  }
};

/**
 * Clean up expired refresh tokens
 */
export const cleanupExpiredTokens = async (): Promise<void> => {
  try {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  } catch (error) {
    console.error('Error cleaning up expired tokens:', error);
  }
};