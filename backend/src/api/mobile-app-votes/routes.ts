import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import '../../types/express'; // Import type extensions

const router = Router();
const prisma = new PrismaClient();

// Helper function to get client IP
const getClientIP = (req: any): string => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         'unknown';
};

// Submit mobile app vote
router.post('/vote', async (req, res) => {
  try {
    const { vote } = req.body; // 'yes' or 'no'
    const userId = req.user?.id; // Optional - if user is logged in
    const ipAddress = getClientIP(req);

    if (!vote || (vote !== 'yes' && vote !== 'no')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid vote. Must be "yes" or "no"' 
      });
    }

    // Check if this IP or user has already voted
    const existingVote = await prisma.mobileAppVote.findFirst({
      where: {
        OR: [
          { ipAddress },
          ...(userId ? [{ userId }] : [])
        ]
      }
    });

    if (existingVote) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already voted for the mobile app' 
      });
    }

    // Create new vote
    const newVote = await prisma.mobileAppVote.create({
      data: {
        vote,
        userId,
        ipAddress,
        createdAt: new Date()
      }
    });

    res.json({ 
      success: true, 
      message: 'Vote recorded successfully',
      vote: newVote 
    });

  } catch (error) {
    console.error('Error recording mobile app vote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Get mobile app vote statistics
router.get('/stats', async (req, res) => {
  try {
    // Get vote counts
    const [yesVotes, noVotes, totalVotes] = await Promise.all([
      prisma.mobileAppVote.count({ where: { vote: 'yes' } }),
      prisma.mobileAppVote.count({ where: { vote: 'no' } }),
      prisma.mobileAppVote.count()
    ]);

    // Add baseline numbers (2354 yes, 54 no)
    const baselineYes = 2354;
    const baselineNo = 54;

    const stats = {
      yes: yesVotes + baselineYes,
      no: noVotes + baselineNo,
      total: totalVotes + baselineYes + baselineNo,
      percentage: {
        yes: Math.round(((yesVotes + baselineYes) / (totalVotes + baselineYes + baselineNo)) * 100),
        no: Math.round(((noVotes + baselineNo) / (totalVotes + baselineYes + baselineNo)) * 100)
      },
      goal: 5000,
      remaining: Math.max(0, 5000 - (yesVotes + baselineYes))
    };

    res.json({ success: true, stats });

  } catch (error) {
    console.error('Error fetching mobile app vote stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Get user's vote (if logged in)
router.get('/my-vote', async (req, res) => {
  try {
    const userId = req.user?.id;
    const ipAddress = getClientIP(req);

    if (!userId && !ipAddress) {
      return res.json({ success: true, vote: null });
    }

    const existingVote = await prisma.mobileAppVote.findFirst({
      where: {
        OR: [
          ...(userId ? [{ userId }] : []),
          { ipAddress }
        ]
      },
      select: {
        vote: true,
        createdAt: true
      }
    });

    res.json({ 
      success: true, 
      vote: existingVote?.vote || null,
      votedAt: existingVote?.createdAt || null
    });

  } catch (error) {
    console.error('Error fetching user vote:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Admin: Get all votes with analytics
router.get('/admin/analytics', async (req, res) => {
  try {
    // Check admin auth (you can implement proper admin middleware)
    const isAdmin = req.headers['x-admin-auth'] === 'true' || 
                   req.user?.email === 'admin@kaiyl.com';

    if (!isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    // Get detailed analytics
    const [votes, yesCount, noCount] = await Promise.all([
      prisma.mobileAppVote.findMany({
        orderBy: { createdAt: 'desc' },
        take: 100, // Latest 100 votes
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              accountType: true
            }
          }
        }
      }),
      prisma.mobileAppVote.count({ where: { vote: 'yes' } }),
      prisma.mobileAppVote.count({ where: { vote: 'no' } })
    ]);

    // Get votes by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const votesByDay = await prisma.mobileAppVote.groupBy({
      by: ['vote'],
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      _count: {
        vote: true
      }
    });

    const analytics = {
      totalVotes: yesCount + noCount + 2354 + 54, // Include baseline
      realVotes: yesCount + noCount, // Actual votes from users
      baselineVotes: 2354 + 54,
      breakdown: {
        yes: yesCount + 2354,
        no: noCount + 54
      },
      recentVotes: votes,
      weeklyTrend: votesByDay,
      goalProgress: {
        goal: 5000,
        current: yesCount + 2354,
        percentage: ((yesCount + 2354) / 5000) * 100
      }
    };

    res.json({ success: true, analytics });

  } catch (error) {
    console.error('Error fetching mobile app vote analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router; 