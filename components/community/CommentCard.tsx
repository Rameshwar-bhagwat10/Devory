'use client';

import { useState } from 'react';
import { formatTimeAgo } from '@/lib/community-utils';
import CommentForm from './CommentForm';
import type { CommentWithAuthor } from '@/features/community/community.types';

interface CommentCardProps {
  comment: CommentWithAuthor;
  postId: string;
  postSlug: string;
  postAuthorId: string;
  currentUserId?: string;
  isAuthenticated: boolean;
  onReplyAdded: (parentId: string, reply: CommentWithAuthor) => void;
  onCommentDeleted: (commentId: string) => void;
  isReply?: boolean;
}

export default function CommentCard({
  comment,
  postId,
  postSlug,
  postAuthorId,
  currentUserId,
  isAuthenticated,
  onReplyAdded,
  onCommentDeleted,
  isReply = false,
}: CommentCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [content, setContent] = useState(comment.content);
  const [isLiked, setIsLiked] = useState(false); // TODO: Get from API
  const [likesCount, setLikesCount] = useState(comment.likesCount || 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const isAuthor = currentUserId === comment.userId;
  const isOP = comment.userId === postAuthorId;
  
  // Handle both Date objects and serialized date strings
  const getTimestamp = (date: Date | string): number => {
    return date instanceof Date ? date.getTime() : new Date(date).getTime();
  };
  const wasEdited = getTimestamp(comment.updatedAt) !== getTimestamp(comment.createdAt);
  
  const handleReplyAdded = (reply: CommentWithAuthor) => {
    onReplyAdded(comment.id, reply);
    setShowReplyForm(false);
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;

    const wasLiked = isLiked;
    const prevCount = likesCount;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikesCount((prev: number) => isLiked ? prev - 1 : prev + 1);

    try {
      const response = await fetch(`/api/community/comments/${comment.id}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        // Revert on error
        setIsLiked(wasLiked);
        setLikesCount(prevCount);
      }
    } catch {
      // Revert on error
      setIsLiked(wasLiked);
      setLikesCount(prevCount);
    }
  };

  const handleEdit = async () => {
    if (!editContent.trim()) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/community/comments/${comment.id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      });

      if (response.ok) {
        setContent(editContent);
        setIsEditing(false);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to edit comment');
      }
    } catch {
      alert('Failed to edit comment');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/community/comments/${comment.id}/delete`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onCommentDeleted(comment.id);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete comment');
      }
    } catch {
      alert('Failed to delete comment');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className={`animate-slide-in ${isReply ? 'ml-8 md:ml-12 border-l-2 border-white/5 pl-4' : ''}`}>
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {comment.user.image ? (
            <img
              src={comment.user.image}
              alt={comment.user.name || 'User'}
              className="w-10 h-10 rounded-full border-2 border-white/10"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
              {comment.user.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="font-medium text-white/90">
                {comment.user.name || 'Anonymous'}
              </span>
              {isOP && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold rounded">
                  OP
                </span>
              )}
              <span className="text-white/40">•</span>
              <span className="text-sm text-white/40">
                {formatTimeAgo(comment.createdAt)}
              </span>
              {wasEdited && (
                <>
                  <span className="text-white/40">•</span>
                  <span className="text-xs text-white/30 italic">edited</span>
                </>
              )}
            </div>
            
            {/* Comment Text or Edit Form */}
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 placeholder-white/30 focus:outline-none focus:border-purple-500/50 resize-none"
                  rows={3}
                  disabled={isUpdating}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    disabled={isUpdating || !editContent.trim()}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(content);
                    }}
                    disabled={isUpdating}
                    className="px-3 py-1.5 bg-white/10 text-white/70 text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-white/70 leading-relaxed whitespace-pre-wrap break-words">
                {content}
              </p>
            )}
          </div>
          
          {/* Actions */}
          <div className="mt-2 flex items-center gap-4">
            {/* Like Button */}
            {isAuthenticated && (
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  isLiked ? 'text-purple-400' : 'text-white/40 hover:text-purple-400'
                }`}
              >
                <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {likesCount > 0 && <span>{likesCount}</span>}
              </button>
            )}

            {/* Reply Button */}
            {isAuthenticated && !isReply && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-sm text-white/40 hover:text-purple-400 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Reply
              </button>
            )}

            {/* Edit Button (Author Only) */}
            {isAuthor && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-white/40 hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            )}

            {/* Delete Button (Author Only) */}
            {isAuthor && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-sm text-white/40 hover:text-red-400 transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
          
          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
                postId={postId}
                postSlug={postSlug}
                parentId={comment.id}
                onCommentAdded={handleReplyAdded}
                placeholder="Write a reply..."
                autoFocus
              />
            </div>
          )}
          
          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentCard
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  postSlug={postSlug}
                  postAuthorId={postAuthorId}
                  currentUserId={currentUserId}
                  isAuthenticated={isAuthenticated}
                  onReplyAdded={onReplyAdded}
                  onCommentDeleted={onCommentDeleted}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

