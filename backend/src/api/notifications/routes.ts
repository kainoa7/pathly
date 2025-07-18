import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to check if user is Pro/Premium
const requireProUser = (req: any, res: any, next: any) => {
  const accountType = req.headers['x-account-type'];
  if (accountType !== 'PRO' && accountType !== 'PREMIUM') {
    return res.status(403).json({ error: 'Pro or Premium account required' });
  }
  next();
};

// Middleware to check admin authentication
const requireAdminUser = (req: any, res: any, next: any) => {
  const isAdmin = req.headers['x-admin-auth'];
  if (isAdmin !== 'true') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// GET /api/notifications - Get notifications for Pro user
router.get('/', requireProUser, async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Get all active notifications for Pro users with read status
    const notifications = await prisma.notification.findMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ],
        targetAudience: {
          in: ['PRO', 'ALL_PRO']
        }
      },
      include: {
        userNotifications: {
          where: { userId },
          select: {
            isRead: true,
            readAt: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    // Format response with read status
    const formattedNotifications = notifications.map(notification => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      priority: notification.priority,
      createdAt: notification.createdAt,
      expiresAt: notification.expiresAt,
      isRead: notification.userNotifications[0]?.isRead || false,
      readAt: notification.userNotifications[0]?.readAt || null
    }));

    res.json({
      success: true,
      notifications: formattedNotifications,
      unreadCount: formattedNotifications.filter(n => !n.isRead).length
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// GET /api/notifications/unread-count - Get unread notification count
router.get('/unread-count', requireProUser, async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Get count of unread notifications
    const unreadCount = await prisma.notification.count({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ],
        targetAudience: {
          in: ['PRO', 'ALL_PRO']
        },
        userNotifications: {
          none: {
            userId,
            isRead: true
          }
        }
      }
    });

    res.json({
      success: true,
      unreadCount
    });

  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});

// POST /api/notifications/:id/read - Mark notification as read
router.post('/:id/read', requireProUser, async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const notificationId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Create or update user notification record
    const userNotification = await prisma.userNotification.upsert({
      where: {
        userId_notificationId: {
          userId,
          notificationId
        }
      },
      create: {
        userId,
        notificationId,
        isRead: true,
        readAt: new Date()
      },
      update: {
        isRead: true,
        readAt: new Date()
      }
    });

    res.json({
      success: true,
      message: 'Notification marked as read'
    });

  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
});

// POST /api/notifications/mark-all-read - Mark all notifications as read
router.post('/mark-all-read', requireProUser, async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID required' });
    }

    // Get all active notifications
    const activeNotifications = await prisma.notification.findMany({
      where: {
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ],
        targetAudience: {
          in: ['PRO', 'ALL_PRO']
        }
      },
      select: { id: true }
    });

    // Create user notification records for all notifications
    const createPromises = activeNotifications.map(notification =>
      prisma.userNotification.upsert({
        where: {
          userId_notificationId: {
            userId,
            notificationId: notification.id
          }
        },
        create: {
          userId,
          notificationId: notification.id,
          isRead: true,
          readAt: new Date()
        },
        update: {
          isRead: true,
          readAt: new Date()
        }
      })
    );

    await Promise.all(createPromises);

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });

  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
});

// Admin Routes

// GET /api/notifications/admin - Get all notifications for admin
router.get('/admin', requireAdminUser, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        userNotifications: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                accountType: true
              }
            }
          }
        },
        _count: {
          select: {
            userNotifications: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Add analytics for each notification
    const notificationsWithAnalytics = notifications.map(notification => {
      const totalReads = notification.userNotifications.filter(un => un.isRead).length;
      const totalUsers = notification.userNotifications.length;
      
      return {
        ...notification,
        analytics: {
          totalSent: totalUsers,
          totalRead: totalReads,
          readRate: totalUsers > 0 ? ((totalReads / totalUsers) * 100).toFixed(1) : '0',
          unreadCount: totalUsers - totalReads
        }
      };
    });

    res.json({
      success: true,
      notifications: notificationsWithAnalytics
    });

  } catch (error) {
    console.error('Error fetching admin notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// POST /api/notifications/admin - Create new notification
router.post('/admin', requireAdminUser, async (req, res) => {
  try {
    const { title, message, type, priority, targetAudience, expiresAt } = req.body;

    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type: type || 'GENERAL',
        priority: priority || 'NORMAL',
        targetAudience: targetAudience || 'PRO',
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    });

    // Get all Pro/Premium users to send notification to
    const targetUsers = await prisma.user.findMany({
      where: {
        accountType: {
          in: targetAudience === 'ALL_PRO' ? ['PRO', 'PREMIUM'] : [targetAudience]
        }
      },
      select: { id: true }
    });

    // Create user notification records for all target users
    const userNotificationPromises = targetUsers.map(user =>
      prisma.userNotification.create({
        data: {
          userId: user.id,
          notificationId: notification.id
        }
      })
    );

    await Promise.all(userNotificationPromises);

    res.json({
      success: true,
      notification,
      sentToUsers: targetUsers.length,
      message: `Notification sent to ${targetUsers.length} users`
    });

  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// PUT /api/notifications/admin/:id - Update notification
router.put('/admin/:id', requireAdminUser, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { title, message, type, priority, isActive, expiresAt } = req.body;

    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        title,
        message,
        type,
        priority,
        isActive,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        updatedAt: new Date()
      }
    });

    res.json({
      success: true,
      notification,
      message: 'Notification updated successfully'
    });

  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// DELETE /api/notifications/admin/:id - Delete notification
router.delete('/admin/:id', requireAdminUser, async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Delete all user notification records first
    await prisma.userNotification.deleteMany({
      where: { notificationId }
    });

    // Delete the notification
    await prisma.notification.delete({
      where: { id: notificationId }
    });

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

// GET /api/notifications/admin/analytics - Get notification analytics
router.get('/admin/analytics', requireAdminUser, async (req, res) => {
  try {
    // Get overall stats
    const totalNotifications = await prisma.notification.count();
    const activeNotifications = await prisma.notification.count({
      where: { isActive: true }
    });
    
    const totalSent = await prisma.userNotification.count();
    const totalRead = await prisma.userNotification.count({
      where: { isRead: true }
    });

    // Get Pro user count
    const proUserCount = await prisma.user.count({
      where: {
        accountType: {
          in: ['PRO', 'PREMIUM']
        }
      }
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentNotifications = await prisma.notification.count({
      where: {
        createdAt: { gte: sevenDaysAgo }
      }
    });

    const recentReads = await prisma.userNotification.count({
      where: {
        readAt: { gte: sevenDaysAgo }
      }
    });

    res.json({
      success: true,
      analytics: {
        totalNotifications,
        activeNotifications,
        totalSent,
        totalRead,
        overallReadRate: totalSent > 0 ? ((totalRead / totalSent) * 100).toFixed(1) : '0',
        proUserCount,
        recentActivity: {
          newNotifications: recentNotifications,
          recentReads
        }
      }
    });

  } catch (error) {
    console.error('Error fetching notification analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router; 