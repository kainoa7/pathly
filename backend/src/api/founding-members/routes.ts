import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Helper function to get client IP
const getClientIP = (req: any): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.connection.remoteAddress;
  return ip || 'unknown';
};

// Submit founding member signup
router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;
    const ipAddress = getClientIP(req);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Check if email already exists
    const existingMember = await prisma.foundingMember.findUnique({
      where: { email }
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'You\'re already a founding member! Check your email for updates.'
      });
    }

    // Create new founding member
    const foundingMember = await prisma.foundingMember.create({
      data: {
        email: email.toLowerCase(),
        ipAddress,
        joinedAt: new Date()
      }
    });

    console.log('New founding member joined:', email);

    res.json({
      success: true,
      message: 'Welcome to the founding member community! You\'ll receive exclusive updates and early access.',
      memberId: foundingMember.id
    });

  } catch (error) {
    console.error('Founding member signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.'
    });
  }
});

// Get founding member count (public)
router.get('/count', async (req, res) => {
  try {
    const count = await prisma.foundingMember.count();
    
    // Add baseline number to make it more impressive
    const totalCount = count + 500;

    res.json({
      success: true,
      count: totalCount
    });

  } catch (error) {
    console.error('Error fetching founding member count:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching member count'
    });
  }
});

// Admin: Get all founding members
router.get('/admin/list', async (req, res) => {
  try {
    // Simple admin check - in production, use proper auth
    const authHeader = req.headers.authorization;
    const isAdmin = 
      req.headers['x-admin-auth'] === 'true' ||
      authHeader === 'Bearer admin-token' ||
      req.headers['x-admin'] === 'true';

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const members = await prisma.foundingMember.findMany({
      orderBy: { joinedAt: 'desc' },
      select: {
        id: true,
        email: true,
        joinedAt: true,
        ipAddress: true
      }
    });

    res.json({
      success: true,
      members,
      total: members.length
    });

  } catch (error) {
    console.error('Error fetching founding members for admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching member list'
    });
  }
});

export default router; 