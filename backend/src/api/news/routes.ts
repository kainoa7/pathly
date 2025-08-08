import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireUser, requireProUser } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Middleware to check if user is Admin - using header for now until admin system is built
const requireAdminUser = (req: any, res: any, next: any) => {
  const userRole = req.headers['x-user-role'];
  
  if (userRole !== 'ADMIN') {
    return res.status(403).json({
      message: 'Access denied. Admin privileges required.',
      error: 'INSUFFICIENT_ADMIN_PERMISSIONS'
    });
  }
  
  next();
};

// GET /api/news/saved - Get user's saved articles (Pro users only)
router.get('/saved', requireProUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { page = '1', limit = '10', category } = req.query;



    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      userId
    };

    if (category && category !== 'ALL') {
      where.article = { category };
    }

    const savedArticles = await prisma.savedArticle.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          include: {
            _count: {
              select: {
                comments: true,
                votes: true
              }
            },
            votes: {
              select: {
                voteType: true,
                userId: true
              }
            }
          }
        }
      }
    });

    const total = await prisma.savedArticle.count({ where });

    // Format response with article stats
    const articlesWithStats = savedArticles.map(savedArticle => {
      const article = savedArticle.article;
      const upvotes = article.votes.filter(v => v.voteType === 'UPVOTE').length;
      const downvotes = article.votes.filter(v => v.voteType === 'DOWNVOTE').length;
      const likes = article.votes.filter(v => v.voteType === 'LIKE').length;
      const userVote = article.votes.find(v => v.userId === userId);

      const { votes, ...articleData } = article;
      
      return {
        savedAt: savedArticle.createdAt,
        article: {
          ...articleData,
          stats: {
            upvotes,
            downvotes,
            likes,
            comments: article._count.comments,
            score: upvotes - downvotes
          },
          userVote: userVote?.voteType || null,
          saved: true // Always true for saved articles
        }
      };
    });

    res.json({
      savedArticles: articlesWithStats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching saved articles:', error);
    res.status(500).json({
      message: 'Error fetching saved articles'
    });
  }
});

// GET /api/news/user/activity - Get user's news activity (Pro users only)  
router.get('/user/activity', requireProUser, async (req, res) => {
  try {
    const userId = req.user!.id;



    // Get user's comments
    const comments = await prisma.newsComment.findMany({
      where: { userId },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    });

    // Get user's votes
    const votes = await prisma.newsVote.findMany({
      where: { 
        userId,
        articleId: { not: null }
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    });

    // Get saved articles count
    const savedCount = await prisma.savedArticle.count({
      where: { userId }
    });

    // Get activity stats
    const stats = {
      totalComments: await prisma.newsComment.count({ where: { userId } }),
      totalVotes: await prisma.newsVote.count({ where: { userId, articleId: { not: null } } }),
      totalSaved: savedCount,
      commentsThisWeek: await prisma.newsComment.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    };

    res.json({
      stats,
      recentComments: comments,
      recentVotes: votes
    });

  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({
      message: 'Error fetching user activity'
    });
  }
});

// GET /api/news/meta/categories - Get available news categories
router.get('/meta/categories', requireProUser, async (req, res) => {
  res.json({
    categories: [
      { value: 'TECH', label: 'Technology', icon: '💻' },
      { value: 'BUSINESS', label: 'Business', icon: '💼' },
      { value: 'FINANCE', label: 'Finance', icon: '💰' },
      { value: 'SPORTS', label: 'Sports', icon: '⚽' },
      { value: 'AI', label: 'Artificial Intelligence', icon: '🤖' }
    ]
  });
});

// GET /api/news - Get all news articles with pagination and filtering
router.get('/', requireProUser, async (req, res) => {
  try {
    const { 
      category, 
      page = '1', 
      limit = '10',
      sortBy = 'publishedAt',
      order = 'desc' 
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }

    const userId = req.user!.id;

    const articles = await prisma.newsArticle.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: {
        [sortBy as string]: order
      },
      include: {
        _count: {
          select: {
            comments: true,
            votes: true
          }
        },
        votes: {
          select: {
            voteType: true,
            userId: true
          }
        },
        savedBy: userId ? {
          where: { userId },
          select: { id: true }
        } : false
      }
    });

    const total = await prisma.newsArticle.count({ where });

    // Calculate vote counts for each article
    const articlesWithStats = articles.map(article => {
      const upvotes = article.votes.filter(v => v.voteType === 'UPVOTE').length;
      const downvotes = article.votes.filter(v => v.voteType === 'DOWNVOTE').length;
      const likes = article.votes.filter(v => v.voteType === 'LIKE').length;
      const userVote = userId ? article.votes.find(v => v.userId === userId) : null;
      const isSaved = article.savedBy.length > 0;

      const { votes, savedBy, ...articleData } = article;
      
      return {
        ...articleData,
        stats: {
          upvotes,
          downvotes,
          likes,
          comments: article._count.comments,
          score: upvotes - downvotes
        },
        userVote: userVote?.voteType || null,
        saved: isSaved
      };
    });

    res.json({
      articles: articlesWithStats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      message: 'Error fetching news articles'
    });
  }
});

// GET /api/news/:id - Get specific article with comments
router.get('/:id', requireProUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const article = await prisma.newsArticle.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                accountType: true
              }
            },
            replies: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    accountType: true
                  }
                },
                _count: {
                  select: { votes: true }
                }
              }
            },
            _count: {
              select: { votes: true }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          where: {
            parentId: null // Only top-level comments
          }
        },
        votes: {
          select: {
            voteType: true,
            userId: true
          }
        },
        savedBy: userId ? {
          where: { userId },
          select: { id: true }
        } : false
      }
    });

    if (!article) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    // Calculate stats and user's vote
    const upvotes = article.votes.filter(v => v.voteType === 'UPVOTE').length;
    const downvotes = article.votes.filter(v => v.voteType === 'DOWNVOTE').length;
    const likes = article.votes.filter(v => v.voteType === 'LIKE').length;
    const userVote = article.votes.find(v => v.userId === userId);
    const isSaved = article.savedBy.length > 0;

    const { votes, savedBy, ...articleData } = article;

    res.json({
      ...articleData,
      stats: {
        upvotes,
        downvotes,
        likes,
        comments: article.comments.length,
        score: upvotes - downvotes
      },
      userVote: userVote?.voteType || null,
      saved: isSaved
    });

  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      message: 'Error fetching article'
    });
  }
});

// POST /api/news/:id/vote - Vote on an article
router.post('/:id/vote', requireProUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body;
    const userId = req.user!.id;



    if (!['UPVOTE', 'DOWNVOTE', 'LIKE'].includes(voteType)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    // Check if user already voted
    const existingVote = await prisma.newsVote.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId: id
        }
      }
    });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote if same type
        await prisma.newsVote.delete({
          where: { id: existingVote.id }
        });
        
        return res.json({ message: 'Vote removed', voteType: null });
      } else {
        // Update vote type
        await prisma.newsVote.update({
          where: { id: existingVote.id },
          data: { voteType }
        });
        
        return res.json({ message: 'Vote updated', voteType });
      }
    } else {
      // Create new vote
      await prisma.newsVote.create({
        data: {
          userId,
          articleId: id,
          voteType
        }
      });
      
      return res.json({ message: 'Vote added', voteType });
    }

  } catch (error) {
    console.error('Error voting on article:', error);
    res.status(500).json({
      message: 'Error processing vote'
    });
  }
});

// POST /api/news/:id/comments - Add comment to article
router.post('/:id/comments', requireProUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, parentId } = req.body;
    const userId = req.user!.id;



    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content required' });
    }

    const comment = await prisma.newsComment.create({
      data: {
        articleId: id,
        userId,
        content: content.trim(),
        parentId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            accountType: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });

  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      message: 'Error adding comment'
    });
  }
});

// POST /api/news/:id/save - Save/unsave article (Pro users only)
router.post('/:id/save', requireProUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;



    // Check if article exists
    const article = await prisma.newsArticle.findUnique({
      where: { id }
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if already saved
    const existingSave = await prisma.savedArticle.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId: id
        }
      }
    });

    if (existingSave) {
      // Remove save
      await prisma.savedArticle.delete({
        where: { id: existingSave.id }
      });
      
      return res.json({ 
        message: 'Article unsaved', 
        saved: false 
      });
    } else {
      // Create save
      await prisma.savedArticle.create({
        data: {
          userId,
          articleId: id
        }
      });
      
      // Get total saves count for analytics
      const totalSaves = await prisma.savedArticle.count({
        where: { userId }
      });
      
      return res.json({ 
        message: 'Article saved', 
        saved: true,
        totalSaves
      });
    }

  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({
      message: 'Error saving article'
    });
  }
});

// GET /api/news/saved - Get user's saved articles (Pro users only)
router.get('/saved', requireProUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const { page = '1', limit = '10', category } = req.query;



    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      userId
    };

    if (category && category !== 'ALL') {
      where.article = { category };
    }

    const savedArticles = await prisma.savedArticle.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          include: {
            _count: {
              select: {
                comments: true,
                votes: true
              }
            },
            votes: {
              select: {
                voteType: true,
                userId: true
              }
            }
          }
        }
      }
    });

    const total = await prisma.savedArticle.count({ where });

    // Format response with article stats
    const articlesWithStats = savedArticles.map(savedArticle => {
      const article = savedArticle.article;
      const upvotes = article.votes.filter(v => v.voteType === 'UPVOTE').length;
      const downvotes = article.votes.filter(v => v.voteType === 'DOWNVOTE').length;
      const likes = article.votes.filter(v => v.voteType === 'LIKE').length;
      const userVote = article.votes.find(v => v.userId === userId);

      const { votes, ...articleData } = article;
      
      return {
        savedAt: savedArticle.createdAt,
        article: {
          ...articleData,
          stats: {
            upvotes,
            downvotes,
            likes,
            comments: article._count.comments,
            score: upvotes - downvotes
          },
          userVote: userVote?.voteType || null,
          saved: true // Always true for saved articles
        }
      };
    });

    res.json({
      savedArticles: articlesWithStats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching saved articles:', error);
    res.status(500).json({
      message: 'Error fetching saved articles'
    });
  }
});

// GET /api/news/user/activity - Get user's news activity (Pro users only)
router.get('/user/activity', requireProUser, async (req, res) => {
  try {
    const userId = req.user!.id;



    // Get user's comments
    const comments = await prisma.newsComment.findMany({
      where: { userId },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    });

    // Get user's votes
    const votes = await prisma.newsVote.findMany({
      where: { 
        userId,
        articleId: { not: null }
      },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    });

    // Get saved articles count
    const savedCount = await prisma.savedArticle.count({
      where: { userId }
    });

    // Get activity stats
    const stats = {
      totalComments: await prisma.newsComment.count({ where: { userId } }),
      totalVotes: await prisma.newsVote.count({ where: { userId, articleId: { not: null } } }),
      totalSaved: savedCount,
      commentsThisWeek: await prisma.newsComment.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    };

    res.json({
      stats,
      recentComments: comments,
      recentVotes: votes
    });

  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({
      message: 'Error fetching user activity'
    });
  }
});

// GET /api/news/categories - Get available news categories
router.get('/meta/categories', requireProUser, async (req, res) => {
  res.json({
    categories: [
      { value: 'TECH', label: 'Technology', icon: '💻' },
      { value: 'BUSINESS', label: 'Business', icon: '💼' },
      { value: 'FINANCE', label: 'Finance', icon: '💰' },
      { value: 'SPORTS', label: 'Sports', icon: '⚽' },
      { value: 'AI', label: 'Artificial Intelligence', icon: '🤖' }
    ]
  });
});

// POST /api/news/seed - Add sample news articles (development only)
router.post('/seed', async (req, res) => {
  try {
    const sampleArticles = [
      {
        title: "OpenAI Releases GPT-5: Revolutionary Breakthrough in AI Capabilities",
        content: "OpenAI has announced the release of GPT-5, marking a significant leap forward in artificial intelligence capabilities. The new model demonstrates unprecedented reasoning abilities, multimodal understanding, and can process complex tasks across various domains. Early testing shows dramatic improvements in coding, mathematical problem-solving, and creative writing tasks.",
        summary: "OpenAI unveils GPT-5 with groundbreaking AI capabilities and enhanced reasoning abilities.",
        category: "AI",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        sourceUrl: "https://openai.com/gpt-5",
        authorName: "OpenAI Research Team"
      },
      {
        title: "Apple Announces Major Stock Buyback Program Worth $50 Billion",
        content: "Apple Inc. has announced its largest stock buyback program to date, authorizing the repurchase of $50 billion worth of shares. This move comes as the tech giant continues to generate massive cash flows from its ecosystem of products and services. The announcement sent Apple's stock price surging in after-hours trading.",
        summary: "Apple authorizes massive $50B stock buyback program, boosting investor confidence.",
        category: "BUSINESS",
        imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
        sourceUrl: "https://investor.apple.com",
        authorName: "Apple Inc."
      },
      {
        title: "Federal Reserve Signals Potential Interest Rate Cuts in 2024",
        content: "Federal Reserve Chairman Jerome Powell indicated that the central bank may consider lowering interest rates later this year if inflation continues to moderate. The statement came during the latest FOMC meeting, where officials expressed cautious optimism about the economic outlook while remaining vigilant about inflation risks.",
        summary: "Fed hints at possible rate cuts as inflation shows signs of moderating.",
        category: "FINANCE",
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
        sourceUrl: "https://federalreserve.gov",
        authorName: "Federal Reserve"
      },
      {
        title: "Revolutionary Quantum Computing Chip Achieves 1000-Qubit Milestone",
        content: "Scientists at IBM have successfully developed a quantum computing chip that achieves the 1000-qubit milestone, a significant breakthrough in quantum computing technology. This advancement brings us closer to practical quantum computing applications in cryptography, drug discovery, and complex optimization problems.",
        summary: "IBM reaches 1000-qubit quantum computing milestone, advancing practical applications.",
        category: "TECH",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        sourceUrl: "https://research.ibm.com/quantum",
        authorName: "IBM Research Team"
      },
      {
        title: "NBA Finals 2024: Unprecedented Viewership Numbers Break Records",
        content: "The 2024 NBA Finals have shattered viewership records, with Game 7 attracting over 50 million viewers worldwide. The series has been praised for its competitive balance and star power, driving significant engagement across social media platforms and streaming services.",
        summary: "NBA Finals 2024 breaks viewership records with 50M+ viewers for Game 7.",
        category: "SPORTS",
        imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
        sourceUrl: "https://nba.com/finals",
        authorName: "NBA Communications"
      }
    ];

    const createdArticles = await Promise.all(
      sampleArticles.map(article => 
        prisma.newsArticle.create({ 
          data: {
            ...article,
            category: article.category as any // Cast to avoid TypeScript error
          }
        })
      )
    );

    res.json({
      message: `Successfully created ${createdArticles.length} sample articles`,
      articles: createdArticles
    });

  } catch (error) {
    console.error('Error seeding news:', error);
    res.status(500).json({
      message: 'Error seeding news articles'
    });
  }
});

// ADMIN ENDPOINTS - News Management
// POST /api/news/admin/create - Create new news article (Admin only)
router.post('/admin/create', requireAdminUser, async (req, res) => {
  try {
    const {
      title,
      content,
      summary,
      category,
      imageUrl,
      sourceUrl,
      authorName,
      publishedAt
    } = req.body;

    // Validate required fields
    if (!title || !content || !summary || !category) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['title', 'content', 'summary', 'category']
      });
    }

    // Validate category
    const validCategories = ['TECH', 'BUSINESS', 'FINANCE', 'SPORTS', 'AI'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: 'Invalid category',
        validCategories
      });
    }

    const article = await prisma.newsArticle.create({
      data: {
        title,
        content,
        summary,
        category,
        imageUrl,
        sourceUrl,
        authorName: authorName || 'Admin',
        publishedAt: publishedAt ? new Date(publishedAt) : new Date()
      }
    });

    res.status(201).json({
      message: 'News article created successfully',
      article
    });

  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({
      message: 'Error creating news article'
    });
  }
});

// GET /api/news/admin/all - Get all articles for admin management
router.get('/admin/all', requireAdminUser, async (req, res) => {
  try {
    const { page = '1', limit = '20', category, search } = req.query;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { summary: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const articles = await prisma.newsArticle.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      }
    });

    const total = await prisma.newsArticle.count({ where });

    res.json({
      articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching articles for admin:', error);
    res.status(500).json({
      message: 'Error fetching articles'
    });
  }
});

// PUT /api/news/admin/:id - Update news article (Admin only)
router.put('/admin/:id', requireAdminUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const article = await prisma.newsArticle.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date()
      }
    });

    res.json({
      message: 'Article updated successfully',
      article
    });

  } catch (error) {
    console.error('Error updating article:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({
        message: 'Article not found'
      });
    }
    res.status(500).json({
      message: 'Error updating article'
    });
  }
});

// DELETE /api/news/admin/:id - Delete news article (Admin only)
router.delete('/admin/:id', requireAdminUser, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the article (comments and votes will cascade delete)
    await prisma.newsArticle.delete({
      where: { id }
    });

    res.json({
      message: 'Article deleted successfully',
      deletedId: id
    });

  } catch (error) {
    console.error('Error deleting article:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return res.status(404).json({
        message: 'Article not found'
      });
    }
    res.status(500).json({
      message: 'Error deleting article'
    });
  }
});

// GET /api/news/admin/analytics - Get news analytics (Admin only)
router.get('/admin/analytics', requireAdminUser, async (req, res) => {
  try {
    // Get basic stats
    const totalArticles = await prisma.newsArticle.count();
    const totalComments = await prisma.newsComment.count();
    const totalVotes = await prisma.newsVote.count();

    // Get articles by category
    const articlesByCategory = await prisma.newsArticle.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    });

    // Get top articles by engagement
    const topArticles = await prisma.newsArticle.findMany({
      take: 5,
      include: {
        _count: {
          select: {
            comments: true,
            votes: true
          }
        }
      },
      orderBy: [
        { comments: { _count: 'desc' } },
        { votes: { _count: 'desc' } }
      ]
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = {
      newArticles: await prisma.newsArticle.count({
        where: { createdAt: { gte: sevenDaysAgo } }
      }),
      newComments: await prisma.newsComment.count({
        where: { createdAt: { gte: sevenDaysAgo } }
      }),
      newVotes: await prisma.newsVote.count({
        where: { createdAt: { gte: sevenDaysAgo } }
      })
    };

    res.json({
      overview: {
        totalArticles,
        totalComments,
        totalVotes,
        avgCommentsPerArticle: totalArticles > 0 ? (totalComments / totalArticles).toFixed(1) : 0
      },
      articlesByCategory,
      topArticles,
      recentActivity
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      message: 'Error fetching analytics'
    });
  }
});

// GET /api/news/for-you - Get personalized news articles (authenticated users)
router.get('/for-you', requireUser, async (req, res) => {
  try {
    const userId = req.user!.id;
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 20); // Max 20 articles

    // Get user profile for personalization
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        major: true,
        interests: true,
        goals: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Parse interests from JSON string
    const userInterests = JSON.parse(user.interests || '[]') as string[];

    // Get recent articles
    const articles = await prisma.newsArticle.findMany({
      take: 50, // Get more than we need for scoring
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        summary: true,
        category: true,
        source: true,
        publishedAt: true,
      }
    });

    // Score articles for relevance
    const scoredArticles = articles.map(article => {
      let relevance = 0;

      // +2 if category matches any user interest (case-insensitive)
      if (userInterests.some(interest => 
        interest.toLowerCase().includes(article.category.toLowerCase()) ||
        article.category.toLowerCase().includes(interest.toLowerCase())
      )) {
        relevance += 2;
      }

      // +1 if title or summary matches major or goals (case-insensitive contains)
      const searchText = `${article.title} ${article.summary}`.toLowerCase();
      
      if (user.major && searchText.includes(user.major.toLowerCase())) {
        relevance += 1;
      }
      
      if (user.goals && searchText.includes(user.goals.toLowerCase())) {
        relevance += 1;
      }

      // Additional interest matching in title/summary
      userInterests.forEach(interest => {
        if (searchText.includes(interest.toLowerCase())) {
          relevance += 1;
        }
      });

      return {
        ...article,
        relevance
      };
    });

    // Sort by relevance desc, then by publishedAt desc
    const sortedArticles = scoredArticles
      .sort((a, b) => {
        if (a.relevance !== b.relevance) {
          return b.relevance - a.relevance;
        }
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      })
      .slice(0, limit);

    res.json(sortedArticles);

  } catch (error) {
    console.error('Error fetching personalized news:', error);
    res.status(500).json({
      message: 'Error fetching personalized news'
    });
  }
});

export default router; 