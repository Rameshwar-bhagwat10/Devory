'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import type { CommentWithAuthor } from '@/features/community/community.types';

interface CommentSectionProps {
  postId: string;
  postSlug: string;
  postAuthorId: string;
  currentUserId?: string;
  isAuthenticated: boolean;
}

export default function CommentSection({ 
  postId, 
  postSlug, 
  postAuthorId,
  currentUserId,
  isAuthenticated 
}: CommentSectionProps) {
  const router = useRouter();
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchComments();
  }, [postSlug]);
  
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/community/${postSlug}/comments`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      
      const data = await response.json();
      setComments(data.comments);
    } catch (err) {
      setError('Failed to load comments');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCommentAdded = (newComment: CommentWithAuthor) => {
    setComments(prev => [newComment, ...prev]);
  };
  
  const handleReplyAdded = (parentId: string, reply: CommentWithAuthor) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    }));
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };
  
  if (isLoading) {
    return (
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
        <div className="text-center py-12">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchComments}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div id="comments" className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white/90 flex items-center gap-3">
          <MessageCircle className="w-7 h-7 text-purple-400" />
          Comments ({comments.length})
        </h2>
      </div>
      
      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="mb-8">
          <CommentForm
            postId={postId}
            postSlug={postSlug}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      ) : (
        <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl text-center">
          <p className="text-white/60 mb-4">Sign in to join the discussion</p>
          <button
            onClick={() => router.push('/auth')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20"
          >
            Sign In
          </button>
        </div>
      )}
      
      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-white/40 text-lg">No comments yet</p>
          <p className="text-white/30 text-sm mt-2">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              postId={postId}
              postSlug={postSlug}
              postAuthorId={postAuthorId}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              onReplyAdded={handleReplyAdded}
              onCommentDeleted={handleCommentDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
