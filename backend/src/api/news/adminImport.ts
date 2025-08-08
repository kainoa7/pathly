import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import rateLimit from 'express-rate-limit';
import { requireAdminAuth } from '../../utils/adminAuth';
import { validateAndProcessNewsImport, ProcessedNewsImportData } from '../../utils/newsValidation';

const router = Router();
const prisma = new PrismaClient();

/**
 * Rate limiting for admin endpoints
 * More generous than regular auth since these are automated systems
 */
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window (for bulk imports)
  message: {
    error: 'Too many admin requests',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /api/news/admin/import
 * Import curated news articles with admin authentication
 * 
 * Authentication:
 * - Requires x-api-key header matching ADMIN_API_KEY
 * - If ADMIN_HMAC_SECRET is set, requires x-signature header with HMAC-SHA256
 * 
 * Body format:
 * {
 *   "title": string,
 *   "url": string,
 *   "summary": string,
 *   "category": string,
 *   "source": string,
 *   "publishedAt": string (ISO date)
 * }
 * 
 * TEST PLAN:
 * - Call without x-api-key -> 401
 * - Call with wrong x-api-key -> 401  
 * - Call with correct key and valid payload -> 201, article returned
 * - Second call with same url -> upsert (no duplicate)
 * - If ADMIN_HMAC_SECRET is set:
 *   - Wrong signature -> 401
 *   - Correct signature -> 201
 */
router.post('/import', adminLimiter, requireAdminAuth, async (req: Request, res: Response) => {
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
    const validation = validateAndProcessNewsImport(requestData);
    
    if (!validation.success) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Invalid request data',
        details: validation.errors
      });
    }

    const articleData = validation.data as ProcessedNewsImportData;

    try {
      // Upsert article by URL
      const article = await prisma.newsArticle.upsert({
        where: { url: articleData.url },
        update: {
          title: articleData.title,
          summary: articleData.summary,
          content: articleData.content,
          category: articleData.category,
          source: articleData.source,
          publishedAt: articleData.publishedAt,
          updatedAt: new Date(),
        },
        create: {
          title: articleData.title,
          url: articleData.url,
          summary: articleData.summary,
          content: articleData.content,
          category: articleData.category,
          source: articleData.source,
          publishedAt: articleData.publishedAt,
        },
      });

      console.log(`News article imported/updated: ${article.id} - ${article.title}`);

      res.status(201).json({
        message: 'Article imported successfully',
        article: {
          id: article.id,
          title: article.title,
          url: article.url,
          summary: article.summary,
          category: article.category,
          source: article.source,
          publishedAt: article.publishedAt,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        }
      });

    } catch (dbError) {
      console.error('Database error during article import:', dbError);
      
      // Handle specific database errors
      if (dbError && typeof dbError === 'object' && 'code' in dbError) {
        if (dbError.code === 'P2002') {
          return res.status(409).json({
            error: 'Duplicate article',
            message: 'An article with this URL already exists'
          });
        }
      }

      return res.status(500).json({
        error: 'Database error',
        message: 'Failed to save article to database'
      });
    }

  } catch (error) {
    console.error('Admin import error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong during import'
    });
  }
});

/**
 * GET /api/news/admin/health
 * Health check for admin endpoints
 */
router.get('/health', adminLimiter, requireAdminAuth, async (req: Request, res: Response) => {
  try {
    // Test database connection
    const articleCount = await prisma.newsArticle.count();
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      articleCount,
      message: 'Admin endpoints operational'
    });
  } catch (error) {
    console.error('Admin health check error:', error);
    res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      message: 'Database connection failed'
    });
  }
});

export default router;