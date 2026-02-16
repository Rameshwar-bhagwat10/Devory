import { prisma } from '@/lib/prisma';
import { NotificationType } from '@prisma/client';

export class NotificationService {
  /**
   * Create a notification
   * Prevents self-notifications automatically
   */
  static async createNotification(
    userId: string,
    type: NotificationType,
    actorId: string,
    postId?: string
  ) {
    // Don't create notification for self-actions
    if (userId === actorId) {
      return null;
    }

    const notification = await prisma.notifications.create({
      data: {
        userId,
        type,
        actorId,
        postId,
      },
      include: {
        actor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return notification;
  }

  /**
   * Get user notifications
   */
  static async getUserNotifications(userId: string, limit: number = 10) {
    const notifications = await prisma.notifications.findMany({
      where: { userId },
      include: {
        actor: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // For COLLAB_REQUEST notifications, fetch the requestId
    const notificationsWithMetadata = await Promise.all(
      notifications.map(async (notification) => {
        if (notification.type === 'COLLAB_REQUEST' && notification.postId) {
          // Find the pending request for this post from this actor
          const request = await prisma.community_collaboration_requests.findFirst({
            where: {
              postId: notification.postId,
              requesterId: notification.actorId,
              status: 'PENDING',
            },
            select: {
              id: true,
            },
          });

          return {
            ...notification,
            metadata: request ? { requestId: request.id } : undefined,
          };
        }
        return notification;
      })
    );

    return notificationsWithMetadata;
  }

  /**
   * Get unread count
   */
  static async getUnreadCount(userId: string): Promise<number> {
    return await prisma.notifications.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notifications.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new Error('Notification not found');
    }

    await prisma.notifications.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    return { success: true };
  }

  /**
   * Mark all as read
   */
  static async markAllAsRead(userId: string) {
    await prisma.notifications.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    return { success: true };
  }

  /**
   * Delete old notifications (cleanup job)
   */
  static async deleteOldNotifications(daysOld: number = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await prisma.notifications.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
        isRead: true,
      },
    });

    return { deleted: result.count };
  }
}
