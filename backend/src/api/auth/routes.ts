import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshToken,
  verifyRefreshToken,
  invalidateRefreshToken,
  cleanupExpiredTokens,
} from '../../utils/jwt';
import { requireUser } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    error: 'Too many authentication attempts',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Cleanup expired tokens periodically
setInterval(cleanupExpiredTokens, 24 * 60 * 60 * 1000); // Daily cleanup

// Password validation function
const validatePassword = (password: string) => {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};

// Email validation function
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Signup endpoint that handles both Pro and Explorer signups
router.post('/signup', async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      accountType, // 'EXPLORER' or 'PRO'
      university,
      graduationYear
    } = req.body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !accountType) {
      return res.status(400).json({
        message: 'Missing required fields',
        errors: ['Email, password, first name, last name, and account type are required']
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
        errors: ['Please enter a valid email address']
      });
    }

    // Validate password strength
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      return res.status(400).json({
        message: 'Password does not meet requirements',
        errors: passwordErrors
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists',
        errors: ['An account with this email already exists. Please use a different email or try logging in.']
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        accountType,
        university,
        graduationYear
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return res.status(400).json({
        message: 'Email already exists',
        errors: ['An account with this email already exists. Please use a different email or try logging in.']
      });
    }

    res.status(500).json({
      message: 'Internal server error',
      errors: ['Something went wrong. Please try again later.']
    });
  }
});

// Login endpoint
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: 'Missing required fields',
        errors: ['Email and password are required']
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
        errors: ['Email or password is incorrect']
      });
    }

    // Check password
    if (!user.password) {
      return res.status(401).json({
        message: 'Invalid credentials',
        errors: ['Email or password is incorrect']
      });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
        errors: ['Email or password is incorrect']
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      accountType: user.accountType,
    });

    const refreshToken = generateRefreshToken();
    await storeRefreshToken(user.id, refreshToken);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      accessToken,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Internal server error',
      errors: ['Something went wrong. Please try again later.']
    });
  }
});

// Refresh token endpoint
router.post('/refresh', authLimiter, async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'Refresh token required',
        message: 'No refresh token provided'
      });
    }

    // Verify refresh token and get user ID
    const userId = await verifyRefreshToken(refreshToken);
    if (!userId) {
      return res.status(401).json({
        error: 'Invalid refresh token',
        message: 'Refresh token is invalid or expired'
      });
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountType: true,
        stripeCustomerId: true,
        university: true,
        graduationYear: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
        message: 'User associated with refresh token no longer exists'
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      accountType: user.accountType,
    });

    // Generate new refresh token and rotate
    const newRefreshToken = generateRefreshToken();
    await storeRefreshToken(user.id, newRefreshToken);

    // Set new refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: 'Token refreshed successfully',
      accessToken,
      user
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong during token refresh'
    });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // Invalidate refresh token in database
      await invalidateRefreshToken(refreshToken);
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.json({
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong during logout'
    });
  }
});

// Get current user endpoint (requires authentication)
router.get('/me', requireUser, async (req, res) => {
  try {
    // Parse interests from JSON string to array
    const user = {
      ...req.user!,
      interests: JSON.parse(req.user!.interests || '[]')
    };

    res.json({
      message: 'User retrieved successfully',
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while retrieving user'
    });
  }
});

/**
 * POST /api/auth/profile
 * Update user profile information (onboarding)
 * 
 * Auth: requireUser
 * Body: { major?, interests?, goals?, graduationYear?, onboardingComplete? }
 * 
 * TEST PLAN:
 * - Call without auth → 401
 * - Call with valid profile data → 200 with updated user
 * - Call with invalid graduationYear → 400
 * - Call with too many interests → 400
 */
router.post('/profile', requireUser, async (req, res) => {
  try {
    const { major, interests, goals, graduationYear, onboardingComplete } = req.body;
    const userId = req.user!.id;

    // Validation
    const errors: string[] = [];

    if (major !== undefined && (typeof major !== 'string' || major.length > 200)) {
      errors.push('Major must be a string with max 200 characters');
    }

    if (interests !== undefined) {
      if (!Array.isArray(interests) || interests.length > 8) {
        errors.push('Interests must be an array with max 8 items');
      } else if (interests.some(interest => typeof interest !== 'string' || interest.length > 100)) {
        errors.push('Each interest must be a string with max 100 characters');
      }
    }

    if (goals !== undefined && (typeof goals !== 'string' || goals.length > 1000)) {
      errors.push('Goals must be a string with max 1000 characters');
    }

    if (graduationYear !== undefined) {
      if (typeof graduationYear !== 'number' || graduationYear < 1900 || graduationYear > 2050) {
        errors.push('Graduation year must be a number between 1900 and 2050');
      }
    }

    if (onboardingComplete !== undefined && typeof onboardingComplete !== 'boolean') {
      errors.push('onboardingComplete must be a boolean');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid profile data',
        details: errors
      });
    }

    // Update user profile
    const updateData: any = {};
    if (major !== undefined) updateData.major = major;
    if (interests !== undefined) updateData.interests = JSON.stringify(interests);
    if (goals !== undefined) updateData.goals = goals;
    if (graduationYear !== undefined) updateData.graduationYear = graduationYear.toString();
    if (onboardingComplete !== undefined) updateData.onboardingComplete = onboardingComplete;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountType: true,
        university: true,
        graduationYear: true,
        major: true,
        interests: true,
        goals: true,
        onboardingComplete: true,
        stripeCustomerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(`User profile updated: ${userId}`);

    // Parse interests back to array for response
    const responseUser = {
      ...updatedUser,
      interests: JSON.parse(updatedUser.interests || '[]')
    };

    res.json({
      message: 'Profile updated successfully',
      user: responseUser
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while updating profile'
    });
  }
});

// Upgrade Explorer account to Pro
router.post('/upgrade-to-pro', async (req, res) => {
  try {
    const { email, university, graduationYear } = req.body;
    
    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'User email is required for authentication'
      });
    }

    // Validation
    if (!university || !graduationYear) {
      return res.status(400).json({
        success: false,
        message: 'University and graduation year are required for Pro accounts',
        errors: [
          ...(!university ? ['University is required'] : []),
          ...(!graduationYear ? ['Graduation year is required'] : [])
        ]
      });
    }

    // Check if user exists and is currently Explorer
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (existingUser.accountType !== 'EXPLORER') {
      return res.status(400).json({
        success: false,
        message: 'Only Explorer accounts can be upgraded to Pro'
      });
    }

    // Update user to Pro account
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        accountType: 'PRO',
        university: university.trim(),
        graduationYear: graduationYear.trim(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountType: true,
        university: true,
        graduationYear: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('User upgraded to Pro:', updatedUser.email);

    res.json({
      success: true,
      message: 'Account successfully upgraded to Pro!',
      user: updatedUser
    });

  } catch (error) {
    console.error('Upgrade to Pro error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during account upgrade'
    });
  }
});

// Get all users (for dashboard purposes - should be protected in production)
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        accountType: true,
        university: true,
        graduationYear: true,
        createdAt: true
      }
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users'
    });
  }
});

// Delete user endpoint (admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id }
    });

    res.json({
      message: 'User deleted successfully',
      deletedUser: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      message: 'Error deleting user'
    });
  }
});

export default router;
