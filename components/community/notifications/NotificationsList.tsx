'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Users, UserPlus, Bell, CheckCheck } from 'lucide-react';
import { formatTimeAgo } from '@/lib/community-utils';

interface Notification {
  id: string;
  type: string;
  isRead: boolean;
  createdAt: string;
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAllRead, setMarkingAllRead] = useState(false);

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'LIKE':
        return <Heart className="w-5 h-5 text-pink-400" />;
      case 'COMMENT':
        return <MessageCircle className="w-5 h-5 text-cyan-400" />;
      case 'COLLABORATION_REQUEST':
        return <Users className="w-5 h-5 text-purple-400" />;
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
      case 'COLLABORATION_REQUEST':
        return `${actorName} requested to join your collaboration`;
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

          return (
            <Link
              key={notification.id}
              href={notificationLink}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
              className={`flex items-start gap-4 p-4 transition-all hover:bg-white/5 ${
                !notification.isRead ? 'bg-purple-500/5' : ''
              }`}
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
              {!notification.isRead && (
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
