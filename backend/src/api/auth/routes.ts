import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

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
router.post('/login', async (req, res) => {
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

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
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
