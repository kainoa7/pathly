import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();

// Helper function to get user from token (optional)
const getOptionalUser = async (req: express.Request) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return null;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
    return await prisma.user.findUnique({ where: { id: decoded.userId } });
  } catch {
    return null;
  }
};

// Helper function to get client IP
const getClientIP = (req: express.Request): string => {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.ip || 
         'unknown';
};

// POST /api/feedback/vote - Submit platform feedback vote
router.post('/vote', async (req, res) => {
  try {
    const { voteType, feedback } = req.body;
    const user = await getOptionalUser(req);
    const ipAddress = getClientIP(req);

    if (!['LOVE_IT', 'WOULD_USE', 'NOT_INTERESTED'].includes(voteType)) {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    // Check if user/IP has already voted with this vote type
    const existingVote = await prisma.platformFeedback.findFirst({
      where: {
        OR: [
          user ? { userId: user.id, voteType } : { ipAddress, voteType }
        ]
      }
    });

    if (existingVote) {
      return res.status(400).json({ error: 'You have already submitted this type of feedback' });
    }

    // Create the feedback vote
    const vote = await prisma.platformFeedback.create({
      data: {
        userId: user?.id || null,
        ipAddress,
        voteType,
        feedback: feedback || null
      }
    });

    res.json({ 
      success: true, 
      message: 'Thank you for your feedback!',
      voteId: vote.id 
    });

  } catch (error) {
    console.error('Platform feedback vote error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// GET /api/feedback/stats - Get platform feedback statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.platformFeedback.groupBy({
      by: ['voteType'],
      _count: {
        id: true
      }
    });

    const totalVotes = await prisma.platformFeedback.count();
    
    const formattedStats = {
      totalVotes,
      breakdown: {
        LOVE_IT: 0,
        WOULD_USE: 0,
        NOT_INTERESTED: 0
      },
      percentages: {
        LOVE_IT: 0,
        WOULD_USE: 0,
        NOT_INTERESTED: 0
      }
    };

    stats.forEach(stat => {
      formattedStats.breakdown[stat.voteType] = stat._count.id;
      formattedStats.percentages[stat.voteType] = totalVotes > 0 
        ? Math.round((stat._count.id / totalVotes) * 100) 
        : 0;
    });

    // Calculate engagement score (Love It + Would Use vs Not Interested)
    const positiveVotes = formattedStats.breakdown.LOVE_IT + formattedStats.breakdown.WOULD_USE;
    const engagementScore = totalVotes > 0 
      ? Math.round((positiveVotes / totalVotes) * 100) 
      : 0;

    res.json({
      ...formattedStats,
      engagementScore,
      positiveVotes,
      recommendation: engagementScore >= 70 ? 'Continue Development' : 
                     engagementScore >= 50 ? 'Improve & Iterate' : 
                     'Major Changes Needed'
    });

  } catch (error) {
    console.error('Platform feedback stats error:', error);
    res.status(500).json({ error: 'Failed to get feedback stats' });
  }
});

// GET /api/feedback/my-vote - Get current user's vote
router.get('/my-vote', async (req, res) => {
  try {
    const user = await getOptionalUser(req);
    const ipAddress = getClientIP(req);

    const votes = await prisma.platformFeedback.findMany({
      where: {
        OR: [
          user ? { userId: user.id } : { ipAddress }
        ]
      },
      select: {
        voteType: true,
        feedback: true,
        createdAt: true
      }
    });

    res.json({ votes });

  } catch (error) {
    console.error('Get my vote error:', error);
    res.status(500).json({ error: 'Failed to get your votes' });
  }
});

// GET /api/feedback/recent - Get recent feedback with comments (admin only)
router.get('/recent', async (req, res) => {
  try {
    // Check for admin authentication header or simple admin check
    const adminAuth = req.headers['x-admin-auth'] || req.headers['admin-auth'];
    const authHeader = req.headers.authorization;
    
    // For development, allow access if admin token is present or if it's a simple admin request
    // In production, you'd want more secure admin authentication
    const isAdminRequest = adminAuth === 'true' || 
                          authHeader === 'Bearer admin-token' ||
                          req.headers['user-agent']?.includes('admin') ||
                          true; // Temporarily allow all for testing - REMOVE IN PRODUCTION

    if (!isAdminRequest) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const recentFeedback = await prisma.platformFeedback.findMany({
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
      take: 50
    });

    res.json({ feedback: recentFeedback });

  } catch (error) {
    console.error('Recent feedback error:', error);
    res.status(500).json({ error: 'Failed to get recent feedback' });
  }
});

// GET /api/feedback/test - Simple endpoint to see all feedback (development only)
router.get('/test', async (req, res) => {
  try {
    const allFeedback = await prisma.platformFeedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    
    res.json({ 
      total: allFeedback.length,
      feedback: allFeedback,
      message: 'This is a test endpoint for development'
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({ error: 'Failed to get test data' });
  }
});

export default router; 