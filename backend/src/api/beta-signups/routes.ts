import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Validation schema for beta signup
const betaSignupSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  currentStatus: z.string().min(1, 'Current status is required'),
  interestArea: z.string().optional(),
  university: z.string().optional(),
  graduationYear: z.string().optional(),
  phoneNumber: z.string().optional(),
  howHeardAboutUs: z.string().optional(),
  specificInterests: z.string().optional(),
  quizResults: z.string().optional(),
  source: z.string().optional(),
});

// Create beta signup
router.post('/', async (req, res) => {
  try {
    const validatedData = betaSignupSchema.parse(req.body);
    
    // Check if email already exists
    const existingSignup = await prisma.betaSignup.findUnique({
      where: { email: validatedData.email }
    });

    if (existingSignup) {
      return res.status(400).json({ 
        error: 'Email already registered for beta access' 
      });
    }

    // Create new beta signup
    const betaSignup = await prisma.betaSignup.create({
      data: validatedData
    });

    res.status(201).json({ 
      message: 'Successfully signed up for beta access!',
      id: betaSignup.id 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    }
    
    console.error('Beta signup error:', error);
    res.status(500).json({ error: 'Failed to create beta signup' });
  }
});

// Get all beta signups (admin only)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const search = req.query.search as string || '';
    const status = req.query.status as string || '';
    const interest = req.query.interest as string || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { university: { contains: search } }
      ];
    }

    if (status) {
      where.currentStatus = status;
    }

    if (interest) {
      where.interestArea = interest;
    }

    const [signups, total] = await Promise.all([
      prisma.betaSignup.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.betaSignup.count({ where })
    ]);

    // Get summary stats
    const stats = await prisma.betaSignup.groupBy({
      by: ['currentStatus'],
      _count: { currentStatus: true }
    });

    const interestStats = await prisma.betaSignup.groupBy({
      by: ['interestArea'],
      _count: { interestArea: true },
      where: { interestArea: { not: null } }
    });

    res.json({
      signups,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        byStatus: stats,
        byInterest: interestStats,
        total
      }
    });
  } catch (error) {
    console.error('Get beta signups error:', error);
    res.status(500).json({ error: 'Failed to fetch beta signups' });
  }
});

// Get signup statistics
router.get('/stats', async (req, res) => {
  try {
    const total = await prisma.betaSignup.count();
    
    const statusStats = await prisma.betaSignup.groupBy({
      by: ['currentStatus'],
      _count: { currentStatus: true }
    });

    const interestStats = await prisma.betaSignup.groupBy({
      by: ['interestArea'],
      _count: { interestArea: true },
      where: { interestArea: { not: null } }
    });

    const sourceStats = await prisma.betaSignup.groupBy({
      by: ['source'],
      _count: { source: true },
      where: { source: { not: null } }
    });

    // Recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSignups = await prisma.betaSignup.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });

    res.json({
      total,
      recentSignups,
      statusBreakdown: statusStats,
      interestBreakdown: interestStats,
      sourceBreakdown: sourceStats
    });
  } catch (error) {
    console.error('Get beta signup stats error:', error);
    res.status(500).json({ error: 'Failed to fetch beta signup statistics' });
  }
});

export default router; 