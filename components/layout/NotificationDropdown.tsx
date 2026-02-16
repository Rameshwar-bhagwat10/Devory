'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'LIKE' | 'COMMENT' | 'COLLAB_REQUEST' | 'COLLAB_ACCEPT' | 'FOLLOW';
  isRead: boolean;
  createdAt: string;
  actor: {
    id: string;
    name: string | null;
    image: string | null;
  };
  post: {
    id: string;
    title: string;
    slug: string;
  } | null;
}

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/community/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/community/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId }),
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    setLoading(true);
    try {
      await fetch('/api/community/notifications/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      });
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNotificationText = (notification: Notification) => {
    const name = notification.actor.name || 'Someone';
    switch (notification.type) {
      case 'LIKE':
        return `${name} liked your post`;
      case 'COMMENT':
        return `${name} commented on your post`;
      case 'COLLAB_REQUEST':
        return `${name} requested to collaborate`;
      case 'COLLAB_ACCEPT':
        return `${name} accepted your collaboration request`;
      case 'FOLLOW':
        return `${name} started following you`;
      default:
        return 'New notification';
    }
  };

  const getNotificationLink = (notification: Notification) => {
    // For collaboration requests, redirect to community notifications page
    if (notification.type === 'COLLAB_REQUEST') {
      return '/community/notifications';
    }
    // For follow notifications, redirect to user profile
    if (notification.type === 'FOLLOW') {
      return `/profile/${notification.actor.id}`;
    }
    // For all other community notifications (LIKE, COMMENT, COLLAB_ACCEPT), redirect to the post
    return notification.post ? `/community/${notification.post.slug}` : '#';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
        aria-label="Notifications"
      >
        <svg
          className="w-6 h-6 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-dark-base/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                disabled={loading}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-white/40">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={getNotificationLink(notification)}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification.id);
                    }
                    setOpen(false);
                  }}
                  className={`block p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                    !notification.isRead ? 'bg-purple-500/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {notification.actor.image ? (
                      <img
                        src={notification.actor.image}
                        alt={notification.actor.name || 'User'}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-semibold">
                        {notification.actor.name?.[0] || 'U'}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/90">
                        {getNotificationText(notification)}
                      </p>
                      {notification.post && (
                        <p className="text-xs text-white/50 mt-1 truncate">
                          {notification.post.title}
                        </p>
                      )}
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
