'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFire, FaHeart, FaComment, FaUsers, FaLightbulb, FaArrowRight } from 'react-icons/fa';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface ActivityPost {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  type: string;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  user: User;
}

interface CommunityActivityFeedProps {
  activities: ActivityPost[];
}

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 604800)}w ago`;
}

export default function CommunityActivityFeed({ activities }: CommunityActivityFeedProps) {

  const getPostTypeBadge = (type: string) => {
    switch (type) {
      case 'COLLABORATION':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-md text-xs font-medium text-cyan-400">
            <FaUsers className="w-3 h-3" />
            Collaboration
          </span>
        );
      case 'IDEA':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded-md text-xs font-medium text-yellow-400">
            <FaLightbulb className="w-3 h-3" />
            Idea
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-md text-xs font-medium text-purple-400">
            <FaFire className="w-3 h-3" />
            Post
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-90 flex items-center gap-2">
            <FaFire className="text-orange-400" />
            Community Activity
          </h2>
          <p className="text-sm text-text-60 mt-1">
            Latest updates from your network and trending discussions
          </p>
        </div>
        <Link
          href="/community"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center gap-2"
        >
          Explore
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Activity Feed */}
      {activities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <Link
              key={activity.id}
              href={`/community/${activity.slug}`}
              className="group bg-[#0d0d0d] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500">
                  {activity.user.image ? (
                    <Image
                      src={activity.user.image}
                      alt={activity.user.name || 'User'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-white">
                      {activity.user.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text-90 truncate">
                    {activity.user.name || 'Anonymous'}
                  </div>
                  <div className="text-xs text-text-60">
                    {formatDistanceToNow(new Date(activity.createdAt))}
                  </div>
                </div>
              </div>

              {/* Post Type Badge */}
              <div className="mb-3">
                {getPostTypeBadge(activity.type)}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-text-90 group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                {activity.title}
              </h3>

              {/* Content Preview */}
              <p className="text-sm text-text-60 line-clamp-2 mb-4">
                {activity.shortDescription}
              </p>

              {/* Engagement Stats */}
              <div className="flex items-center gap-4 text-xs text-text-60">
                <div className="flex items-center gap-1.5">
                  <FaHeart className="w-3.5 h-3.5 text-red-400" />
                  <span>{activity.likesCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaComment className="w-3.5 h-3.5 text-blue-400" />
                  <span>{activity.commentsCount}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
            <FaFire className="w-8 h-8 text-text-60" />
          </div>
          <h3 className="text-lg font-semibold text-text-90 mb-2">No Activity Yet</h3>
          <p className="text-sm text-text-60 mb-4">
            Follow other developers to see their latest posts and updates
          </p>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Discover Community
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
