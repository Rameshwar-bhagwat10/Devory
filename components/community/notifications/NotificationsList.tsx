'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Users, UserPlus, Bell, CheckCheck, Check, X } from 'lucide-react';
import { formatTimeAgo } from '@/lib/community-utils';
import { useRouter } from 'next/navigation';

interface Notification {
  id: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  metadata?: {
    requestId?: string;
  };
  actor: {
    id: string;
    name: string | null;
    image: string | null;
  };
  post?: {
    id: string;
    title: string;
    slug: string;
  };
}

export default function NotificationsList() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/community/notifications?limit=50');
      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/community/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId }),
      });

      setNotifications(notifications.map(n =>
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    setMarkingAllRead(true);
    try {
      await fetch('/api/community/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      });

      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all as read:', error);
    } finally {
      setMarkingAllRead(false);
    }
  };

  const handleAcceptRequest = async (requestId: string, notificationId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setProcessingRequest(requestId);
    try {
      const response = await fetch(`/api/community/collaboration/${requestId}/accept`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to accept request');
      }

      // Mark notification as read and remove from list
      await markAsRead(notificationId);
      setNotifications(notifications.filter(n => n.id !== notificationId));
      
      // Refresh the page to update counts
      router.refresh();
    } catch (error) {
      console.error('Error accepting request:', error);
      alert(error instanceof Error ? error.message : 'Failed to accept request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const handleRejectRequest = async (requestId: string, notificationId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setProcessingRequest(requestId);
    try {
      const response = await fetch(`/api/community/collaboration/${requestId}/reject`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to reject request');
      }

      // Mark notification as read and remove from list
      await markAsRead(notificationId);
      setNotifications(notifications.filter(n => n.id !== notificationId));
      
      // Refresh the page
      router.refresh();
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert(error instanceof Error ? error.message : 'Failed to reject request');
    } finally {
      setProcessingRequest(null);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'LIKE':
        return <Heart className="w-5 h-5 text-pink-400" />;
      case 'COMMENT':
        return <MessageCircle className="w-5 h-5 text-cyan-400" />;
      case 'COLLAB_REQUEST':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'COLLAB_ACCEPT':
        return <Check className="w-5 h-5 text-green-400" />;
      case 'FOLLOW':
        return <UserPlus className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-white/40" />;
    }
  };

  const getNotificationText = (notification: Notification) => {
    const actorName = notification.actor?.name || 'Someone';
    
    switch (notification.type) {
      case 'LIKE':
        return `${actorName} liked your post`;
      case 'COMMENT':
        return `${actorName} commented on your post`;
      case 'COLLAB_REQUEST':
        return `${actorName} requested to join your collaboration`;
      case 'COLLAB_ACCEPT':
        return `${actorName} accepted your collaboration request`;
      case 'FOLLOW':
        return `${actorName} started following you`;
      default:
        return 'New notification';
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-12 text-center">
        <Bell className="w-16 h-16 mx-auto mb-4 text-white/20" />
        <h3 className="text-xl font-semibold text-white/80 mb-2">No notifications yet</h3>
        <p className="text-white/50">
          When someone interacts with your posts or mentions you, you&apos;ll see it here
        </p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      {unreadCount > 0 && (
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <p className="text-sm text-white/70">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
          <button
            onClick={markAllAsRead}
            disabled={markingAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium rounded-lg transition-all disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="divide-y divide-white/5">
        {notifications.map((notification) => {
          const notificationLink = notification.post
            ? `/community/${notification.post.slug}`
            : notification.type === 'FOLLOW'
            ? `/profile/${notification.actor.id}`
            : '#';

          const isCollabRequest = notification.type === 'COLLAB_REQUEST';
          const requestId = notification.metadata?.requestId;

          return (
            <div
              key={notification.id}
              className={`flex items-start gap-4 p-4 transition-all ${
                !notification.isRead ? 'bg-purple-500/5' : ''
              } ${!isCollabRequest ? 'hover:bg-white/5' : ''}`}
            >
              <Link
                href={notificationLink}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
                className="flex items-start gap-4 flex-1 min-w-0"
              >
                {/* Actor Avatar */}
                <div className="relative flex-shrink-0">
                  {notification.actor?.image ? (
                    <Image
                      src={notification.actor.image}
                      alt={notification.actor.name || 'User'}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center ring-2 ring-white/10">
                      <span className="text-white font-bold text-lg">
                        {notification.actor?.name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  
                  {/* Notification Type Icon */}
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-[#0d0d0d] rounded-full border border-white/10">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 mb-1">
                    {getNotificationText(notification)}
                  </p>
                  
                  {notification.post && (
                    <p className="text-sm text-white/50 truncate mb-2">
                      &quot;{notification.post.title}&quot;
                    </p>
                  )}
                  
                  <p className="text-xs text-white/40">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>

                {/* Unread Indicator */}
                {!notification.isRead && !isCollabRequest && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                )}
              </Link>

              {/* Accept/Reject Buttons for Collaboration Requests */}
              {isCollabRequest && requestId && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => handleAcceptRequest(requestId, notification.id, e)}
                    disabled={processingRequest === requestId}
                    className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {processingRequest === requestId ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Accept
                  </button>
                  <button
                    onClick={(e) => handleRejectRequest(requestId, notification.id, e)}
                    disabled={processingRequest === requestId}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium rounded-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {processingRequest === requestId ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
