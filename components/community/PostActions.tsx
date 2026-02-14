'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThumbsUp, MessageCircle, Bookmark, Share2, Flag } from 'lucide-react';
import { formatCount } from '@/lib/community-utils';
import ReportModal from './ReportModal';

interface PostActionsProps {
  postSlug: string;
  postId: string;
  postTitle: string;
  initialLikesCount: number;
  initialCommentsCount: number;
  initialSavesCount: number;
  userReaction?: 'LIKE' | 'DISLIKE' | null;
  isSaved?: boolean;
  isAuthenticated: boolean;
}

export default function PostActions({
  postSlug,
  postId,
  postTitle,
  initialLikesCount,
  initialCommentsCount,
  initialSavesCount,
  userReaction,
  isSaved: initialIsSaved = false,
  isAuthenticated,
}: PostActionsProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(userReaction === 'LIKE');
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [savesCount, setSavesCount] = useState(initialSavesCount);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    const wasLiked = isLiked;
    setIsLiked(!isLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      const response = await fetch(`/api/community/${postSlug}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'LIKE' }),
      });

      if (!response.ok) {
        setIsLiked(wasLiked);
        setLikesCount(initialLikesCount);
      } else {
        const data = await response.json();
        setLikesCount(data.likesCount);
      }
    } catch {
      setIsLiked(wasLiked);
      setLikesCount(initialLikesCount);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    const wasSaved = isSaved;
    setIsSaved(!isSaved);
    setSavesCount(prev => wasSaved ? prev - 1 : prev + 1);

    try {
      const response = await fetch('/api/community/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        setIsSaved(wasSaved);
        setSavesCount(initialSavesCount);
      }
    } catch {
      setIsSaved(wasSaved);
      setSavesCount(initialSavesCount);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post',
        url: window.location.href,
      }).catch(() => {
        // User cancelled or error
      });
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    // Could add a toast notification here
  };

  return (
    <div className="flex items-center justify-between py-6 border-y border-white/10">
      {/* Left: Engagement Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            isLiked
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{formatCount(likesCount)}</span>
        </button>

        <button
          onClick={() => {
            const commentsSection = document.getElementById('comments');
            commentsSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{formatCount(initialCommentsCount)}</span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            isSaved
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          <span>{formatCount(savesCount)}</span>
        </button>
      </div>

      {/* Right: Share & Report */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 border border-white/10 transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {showShareMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-xl z-10">
              <button
                onClick={copyLink}
                className="w-full px-4 py-3 text-left text-white/80 hover:bg-white/5 transition-colors rounded-t-xl"
              >
                Copy Link
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/auth');
              return;
            }
            setShowReportModal(true);
          }}
          className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-red-400 border border-white/10 transition-all"
          title="Report"
        >
          <Flag className="w-5 h-5" />
        </button>
      </div>

      {/* Report Modal */}
      <ReportModal
        postId={postId}
        postTitle={postTitle}
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}
