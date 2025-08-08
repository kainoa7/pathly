import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import rateLimit from 'express-rate-limit';
import { requireAdminAuth } from '../../utils/adminAuth';
import { requireUser } from '../../middleware/auth';
import { validateWeeklyUpdateCreate, WeeklyUpdateCreateData } from '../../utils/weeklyValidation';

const router = Router();
const prisma = new PrismaClient();

/**
 * Rate limiting for admin endpoints
 */
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // 200 requests per window (for batch digest creation)
  message: {
    error: 'Too many admin requests',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiting for user endpoints
 */
const userLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    error: 'Too many requests',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /api/weekly-updates
 * Create a weekly digest for a specific user (admin-only for n8n)
 * 
 * Authentication: requireAdminAuth (same as news admin import)
 * Body: { userId, summary, html }
 * Optional: Idempotency-Key header for safe retries
 * 
 * TEST PLAN:
 * - Call without x-api-key -> 401
 * - Call with wrong x-api-key -> 401
 * - Call with correct key and valid body -> 201, weekly update returned
 * - Call with same Idempotency-Key -> returns existing update
 * - Call with invalid userId -> 400
 * - Call with validation errors -> 400 with details
 */
router.post('/', adminLimiter, requireAdminAuth, async (req: Request, res: Response) => {
  try {
    // Parse the JSON body (it comes as raw buffer from middleware)
    let requestData: unknown;
    try {
      const bodyStr = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;
      requestData = typeof bodyStr === 'string' ? JSON.parse(bodyStr) : bodyStr;
    } catch (parseError) {
      return res.status(400).json({
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON'
      });
    }

    // Validate the request data
    const validation = validateWeeklyUpdateCreate(requestData);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid request data',
        details: validation.errors
      });
    }

    const { userId, summary, html } = validation.data as WeeklyUpdateCreateData;

    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!userExists) {
      return res.status(400).json({
        error: 'Invalid user',
        message: 'User ID not found'
      });
    }

    // Handle idempotency if Idempotency-Key header is present
    const idempotencyKey = req.headers['idempotency-key'] as string;
    
    if (idempotencyKey) {
      // Look for existing weekly update with this key (simplified: check latest for user)
      const existingUpdate = await prisma.weeklyUpdate.findFirst({
        where: { 
          userId,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Within last 24 hours
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      if (existingUpdate && existingUpdate.summary === summary) {
        console.log(`Idempotent request for user ${userId}, returning existing update ${existingUpdate.id}`);
        return res.status(200).json({
          message: 'Weekly update already exists (idempotent)',
          weeklyUpdate: {
            id: existingUpdate.id,
            userId: existingUpdate.userId,
            summary: existingUpdate.summary,
            html: existingUpdate.html,
            createdAt: existingUpdate.createdAt,
            openedAt: existingUpdate.openedAt,
          }
        });
      }
    }

    try {
      // Create the weekly update
      const weeklyUpdate = await prisma.weeklyUpdate.create({
        data: {
          userId,
          summary,
          html,
        },
      });

      console.log(`Weekly update created: ${weeklyUpdate.id} for user ${userId}`);

      res.status(201).json({
        message: 'Weekly update created successfully',
        weeklyUpdate: {
          id: weeklyUpdate.id,
          userId: weeklyUpdate.userId,
          summary: weeklyUpdate.summary,
          html: weeklyUpdate.html,
          createdAt: weeklyUpdate.createdAt,
          openedAt: weeklyUpdate.openedAt,
        }
      });

    } catch (dbError) {
      console.error('Database error during weekly update creation:', dbError);
      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to create weekly update'
      });
    }

  } catch (error) {
    console.error('Weekly update creation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong during creation'
    });
  }
});

/**
 * GET /api/weekly-updates/latest
 * Get the latest weekly update for the authenticated user
 * 
 * Authentication: requireUser (JWT)
 * Returns: 200 with latest update or 204 if none exists
 * 
 * TEST PLAN:
 * - Call without auth -> 401
 * - Call as user with updates -> 200 with latest update
 * - Call as user without updates -> 204 No Content
 */
router.get('/latest', userLimiter, requireUser, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const latestUpdate = await prisma.weeklyUpdate.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        summary: true,
        html: true,
        createdAt: true,
        openedAt: true,
      }
    });

    if (!latestUpdate) {
      return res.status(204).send(); // No Content
    }

    res.json({
      weeklyUpdate: latestUpdate
    });

  } catch (error) {
    console.error('Error fetching latest weekly update:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch latest weekly update'
    });
  }
});

/**
 * POST /api/weekly-updates/:id/open
 * Mark a weekly update as opened by the authenticated user
 * 
 * Authentication: requireUser (JWT)
 * Security: User can only mark their own updates as opened
 * 
 * TEST PLAN:
 * - Call without auth -> 401
 * - Call with valid update ID by owner -> 200, openedAt set
 * - Call with update ID by non-owner -> 403
 * - Call with invalid update ID -> 404
 */
router.post('/:id/open', userLimiter, requireUser, async (req: Request, res: Response) => {
  try {
    const updateId = req.params.id;
    const userId = req.user!.id;

    // Find the weekly update and verify ownership
    const weeklyUpdate = await prisma.weeklyUpdate.findUnique({
      where: { id: updateId },
      select: {
        id: true,
        userId: true,
        openedAt: true,
      }
    });

    if (!weeklyUpdate) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Weekly update not found'
      });
    }

    // Check ownership
    if (weeklyUpdate.userId !== userId) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You can only mark your own weekly updates as opened'
      });
    }

    // Update openedAt if not already set
    if (!weeklyUpdate.openedAt) {
      await prisma.weeklyUpdate.update({
        where: { id: updateId },
        data: { openedAt: new Date() }
      });

      console.log(`Weekly update ${updateId} marked as opened by user ${userId}`);
    }

    res.json({
      message: 'Weekly update marked as opened',
      openedAt: weeklyUpdate.openedAt || new Date()
    });

  } catch (error) {
    console.error('Error marking weekly update as opened:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to mark weekly update as opened'
    });
  }
});

/**
 * GET /api/users/:id/activity (admin-only)
 * Get user activity summary for digest generation
 * 
 * Authentication: requireAdminAuth (same as news admin import)
 * Returns: User activity metrics and profile for digest creation
 * 
 * TEST PLAN:
 * - Call without x-api-key -> 401
 * - Call with correct key and valid user ID -> 200 with activity data
 * - Call with invalid user ID -> 404
 */
router.get('/users/:id/activity', adminLimiter, requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        university: true,
        graduationYear: true,
      }
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'Invalid user ID'
      });
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Get activity counts
    const [
      totalSaves,
      totalVotes, 
      totalComments,
      recentSaves,
      recentVotes,
      recentComments
    ] = await Promise.all([
      // Total counts
      prisma.savedArticle.count({ where: { userId } }),
      prisma.newsVote.count({ where: { userId } }),
      prisma.newsComment.count({ where: { userId } }),
      
      // Last 7 days
      prisma.savedArticle.count({ 
        where: { 
          userId, 
          createdAt: { gte: sevenDaysAgo } 
        } 
      }),
      prisma.newsVote.count({ 
        where: { 
          userId, 
          createdAt: { gte: sevenDaysAgo } 
        } 
      }),
      prisma.newsComment.count({ 
        where: { 
          userId, 
          createdAt: { gte: sevenDaysAgo } 
        } 
      }),
    ]);

    // Build activity response (simplified profile data)
    const activityData = {
      savesCount: totalSaves,
      votesCount: totalVotes,
      commentsCount: totalComments,
      last7d: {
        saves: recentSaves,
        votes: recentVotes,
        comments: recentComments,
      },
      profile: {
        major: null, // Could be enhanced with major data from quiz results
        interests: [], // Could be enhanced with interest data
        goals: [], // Could be enhanced with goal data
        graduationYear: user.graduationYear,
      }
    };

    res.json(activityData);

  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user activity'
    });
  }
});

export default router;