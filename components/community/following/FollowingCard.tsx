'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ThumbsUp, MessageCircle, Eye, UserCheck, Sparkles, Users, Lightbulb, Bookmark } from 'lucide-react';
import { formatTimeAgo, getDifficultyColor, formatCount } from '@/lib/community-utils';
import type { PostWithAuthor } from '@/features/community/community.types';

interface FollowingCardProps {
  post: PostWithAuthor;
  isAuthenticated: boolean;
  currentUserId?: string;
}

export default function FollowingCard({ post, isAuthenticated }: FollowingCardProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(post.userReaction === 'LIKE');
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  
  const difficultyColors = getDifficultyColor(post.difficulty);
  const isCollaboration = post.type === 'COLLABORATION';

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    
    const wasLiked = isLiked;
    setIsLiked(!isLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);
    
    try {
      const response = await fetch(`/api/community/${post.slug}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'LIKE' }),
      });
      
      if (!response.ok) {
        setIsLiked(wasLiked);
        setLikesCount(post.likesCount);
      } else {
        const data = await response.json();
        setLikesCount(data.likesCount);
      }
    } catch {
      setIsLiked(wasLiked);
      setLikesCount(post.likesCount);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    const wasSaved = isSaved;
    setIsSaved(!isSaved);

    try {
      const response = await fetch('/api/community/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      });

      if (!response.ok) {
        setIsSaved(wasSaved);
      }
    } catch {
      setIsSaved(wasSaved);
    }
  };

  return (
    <Link
      href={`/community/${post.slug}`}
      className="group block aspect-square bg-[#0d0d0d] border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-white/10 hover:scale-[1.02]"
    >
      <div className="flex flex-col h-full">
        {/* Top Row - Following Badge & Type */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-pink-500/20 border border-pink-500/30 rounded-md">
            <UserCheck className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-bold text-pink-400 uppercase">Following</span>
          </div>

          {isCollaboration ? (
            <div className="flex items-center gap-1 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-md">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
            </div>
          )}
        </div>

        {/* Author - Prominent */}
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/profile/${post.userId}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {!post.isAnonymous && post.user?.image ? (
              <Image
                src={post.user.image}
                alt={post.user.name || 'User'}
                width={44}
                height={44}
                className="rounded-full ring-2 ring-pink-500/30"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center ring-2 ring-pink-500/30">
                <span className="text-white font-bold text-base">
                  {post.isAnonymous ? '?' : (post.user?.name?.[0] || 'U')}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-base font-bold text-white/90 truncate">
                  {post.isAnonymous ? 'Anonymous' : (post.user?.name || 'User')}
                </p>
                {!post.isAnonymous && (
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-white/40">{formatTimeAgo(post.createdAt)}</p>
            </div>
          </Link>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 mb-4 line-clamp-3 leading-relaxed min-h-[4rem]">
          {post.shortDescription}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs px-2.5 py-1 rounded-full border font-bold uppercase ${difficultyColors.bg} ${difficultyColors.border} ${difficultyColors.text}`}>
            {post.difficulty}
          </span>

          <span className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/70 bg-white/5">
            {post.domain.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 min-h-[1.75rem]">
            {(post.tags as string[]).slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs text-white/50 bg-white/5 border border-white/10 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                isLiked 
                  ? 'bg-purple-500/20 text-purple-400' 
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{formatCount(likesCount)}</span>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/community/${post.slug}#comments`);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{formatCount(post.commentsCount)}</span>
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all hover:scale-110 ${
                isSaved
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-transparent'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-white/40">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">{formatCount(post.viewsCount)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
