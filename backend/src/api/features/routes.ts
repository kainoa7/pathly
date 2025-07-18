import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Middleware to require Pro/Premium users
const requireProUser = (req: any, res: any, next: any) => {
  const accountType = req.headers['x-account-type'];
  
  if (!accountType || (accountType !== 'PRO' && accountType !== 'PREMIUM')) {
    return res.status(403).json({ 
      message: 'Pro or Premium account required to access this feature' 
    });
  }
  
  next();
};

// POST /api/features/vote - Submit or update a feature vote (Pro users only)
router.post('/vote', requireProUser, async (req, res) => {
  try {
    const { featureName, voteType } = req.body;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    if (!featureName || !voteType) {
      return res.status(400).json({ 
        message: 'Feature name and vote type are required' 
      });
    }

    if (voteType !== 'UPVOTE' && voteType !== 'DOWNVOTE') {
      return res.status(400).json({ 
        message: 'Vote type must be UPVOTE or DOWNVOTE' 
      });
    }

    // Use upsert to allow users to change their vote
    const vote = await prisma.featureVote.upsert({
      where: {
        userId_featureName: {
          userId,
          featureName
        }
      },
      update: {
        voteType
      },
      create: {
        userId,
        featureName,
        voteType
      }
    });

    res.json({
      success: true,
      vote: {
        id: vote.id,
        featureName: vote.featureName,
        voteType: vote.voteType,
        createdAt: vote.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting feature vote:', error);
    res.status(500).json({
      message: 'Error submitting vote'
    });
  }
});

// GET /api/features/:featureName/votes - Get vote counts for a feature (Pro users only)
router.get('/:featureName/votes', requireProUser, async (req, res) => {
  try {
    const { featureName } = req.params;

    if (!featureName) {
      return res.status(400).json({ message: 'Feature name is required' });
    }

    // Get vote counts
    const [upvotes, downvotes] = await Promise.all([
      prisma.featureVote.count({
        where: {
          featureName,
          voteType: 'UPVOTE'
        }
      }),
      prisma.featureVote.count({
        where: {
          featureName,
          voteType: 'DOWNVOTE'
        }
      })
    ]);

    res.json({
      featureName,
      upvotes,
      downvotes,
      totalVotes: upvotes + downvotes,
      positivePercentage: upvotes + downvotes > 0 ? Math.round((upvotes / (upvotes + downvotes)) * 100) : 0
    });

  } catch (error) {
    console.error('Error fetching feature votes:', error);
    res.status(500).json({
      message: 'Error fetching votes'
    });
  }
});

// GET /api/features/:featureName/my-vote - Get current user's vote for a feature (Pro users only)
router.get('/:featureName/my-vote', requireProUser, async (req, res) => {
  try {
    const { featureName } = req.params;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    if (!featureName) {
      return res.status(400).json({ message: 'Feature name is required' });
    }

    const userVote = await prisma.featureVote.findUnique({
      where: {
        userId_featureName: {
          userId,
          featureName
        }
      },
      select: {
        voteType: true,
        createdAt: true
      }
    });

    res.json({
      featureName,
      userVote: userVote ? {
        voteType: userVote.voteType,
        createdAt: userVote.createdAt
      } : null,
      hasVoted: !!userVote
    });

  } catch (error) {
    console.error('Error fetching user vote:', error);
    res.status(500).json({
      message: 'Error fetching user vote'
    });
  }
});

// GET /api/features/analytics - Get feature voting analytics (Pro users only) 
router.get('/analytics', requireProUser, async (req, res) => {
  try {
    // Get top voted features
    const featureStats = await prisma.featureVote.groupBy({
      by: ['featureName', 'voteType'],
      _count: {
        id: true
      }
    });

    // Process the data to get clean analytics
    const analytics: { [key: string]: { upvotes: number, downvotes: number, total: number, positivePercentage: number } } = {};

    featureStats.forEach(stat => {
      if (!analytics[stat.featureName]) {
        analytics[stat.featureName] = {
          upvotes: 0,
          downvotes: 0,
          total: 0,
          positivePercentage: 0
        };
      }

      if (stat.voteType === 'UPVOTE') {
        analytics[stat.featureName].upvotes = stat._count.id;
      } else if (stat.voteType === 'DOWNVOTE') {
        analytics[stat.featureName].downvotes = stat._count.id;
      }

      analytics[stat.featureName].total = analytics[stat.featureName].upvotes + analytics[stat.featureName].downvotes;
      analytics[stat.featureName].positivePercentage = 
        analytics[stat.featureName].total > 0 
          ? Math.round((analytics[stat.featureName].upvotes / analytics[stat.featureName].total) * 100) 
          : 0;
    });

    res.json({
      analytics,
      totalFeatures: Object.keys(analytics).length,
      totalVotes: Object.values(analytics).reduce((sum, feature) => sum + feature.total, 0)
    });

  } catch (error) {
    console.error('Error fetching feature analytics:', error);
    res.status(500).json({
      message: 'Error fetching analytics'
    });
  }
});

export default router; 