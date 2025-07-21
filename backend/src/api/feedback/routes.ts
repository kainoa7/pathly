import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Validation schema for feedback submission
const feedbackSchema = z.object({
  voteType: z.enum(['LOVE_IT', 'WOULD_USE', 'NOT_INTERESTED']),
  feedback: z.string().optional().nullable(),
  userId: z.string().optional().nullable()
});

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const validatedData = feedbackSchema.parse(req.body);
    
    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    
    // Create feedback entry
    const feedback = await prisma.platformFeedback.create({
      data: {
        voteType: validatedData.voteType,
        feedback: validatedData.feedback,
        ipAddress,
        userId: validatedData.userId || null
      }
    });

    res.status(201).json({
      message: 'Feedback submitted successfully',
      id: feedback.id
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid feedback data',
        errors: error.errors
      });
    }
    
    res.status(500).json({
      message: 'Failed to submit feedback'
    });
  }
});

// Get feedback stats for admin dashboard
router.get('/stats', async (req, res) => {
  try {
    // Get total counts
    const totalVotes = await prisma.platformFeedback.count();
    
    // Get breakdown by vote type
    const voteBreakdown = await prisma.platformFeedback.groupBy({
      by: ['voteType'],
      _count: {
        voteType: true
      }
    });

    // Convert to the format expected by frontend
    const breakdown = {
      LOVE_IT: 0,
      WOULD_USE: 0,
      NOT_INTERESTED: 0
    };

    voteBreakdown.forEach(item => {
      breakdown[item.voteType as keyof typeof breakdown] = item._count.voteType;
    });

    // Calculate percentages
    const percentages = {
      LOVE_IT: totalVotes > 0 ? Math.round((breakdown.LOVE_IT / totalVotes) * 100) : 0,
      WOULD_USE: totalVotes > 0 ? Math.round((breakdown.WOULD_USE / totalVotes) * 100) : 0,
      NOT_INTERESTED: totalVotes > 0 ? Math.round((breakdown.NOT_INTERESTED / totalVotes) * 100) : 0
    };

    // Calculate engagement score (positive votes / total votes)
    const positiveVotes = breakdown.LOVE_IT + breakdown.WOULD_USE;
    const engagementScore = totalVotes > 0 ? Math.round((positiveVotes / totalVotes) * 100) : 0;

    // Generate recommendation
    let recommendation = 'Gathering Feedback';
    if (engagementScore >= 70) {
      recommendation = 'Continue Development';
    } else if (engagementScore >= 50) {
      recommendation = 'Improve & Iterate';
    }

    res.json({
      totalVotes,
      breakdown,
      percentages,
      engagementScore,
      positiveVotes,
      recommendation
    });
  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      message: 'Failed to fetch feedback stats'
    });
  }
});

// Get recent feedback comments for admin dashboard
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    
    const feedback = await prisma.platformFeedback.findMany({
      where: {
        feedback: {
          not: null
        }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            accountType: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    });

    res.json({
      feedback: feedback.map(item => ({
        id: item.id,
        voteType: item.voteType,
        feedback: item.feedback,
        createdAt: item.createdAt,
        ipAddress: item.ipAddress,
        user: item.user
      }))
    });
  } catch (error) {
    console.error('Error fetching recent feedback:', error);
    res.status(500).json({
      message: 'Failed to fetch recent feedback'
    });
  }
});

// Get all feedback (admin only)
router.get('/all', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [feedback, total] = await Promise.all([
      prisma.platformFeedback.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              accountType: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.platformFeedback.count()
    ]);

    res.json({
      feedback,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    res.status(500).json({
      message: 'Failed to fetch feedback'
    });
  }
});

export default router; 