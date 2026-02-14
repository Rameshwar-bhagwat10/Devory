'use client';

import { useState, useRef, useEffect } from 'react';
import type { CommentWithAuthor } from '@/features/community/community.types';

interface CommentFormProps {
  postId: string;
  postSlug: string;
  parentId?: string;
  onCommentAdded: (comment: CommentWithAuthor) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const MAX_LENGTH = 2000;

export default function CommentForm({
  postId: _postId,
  postSlug,
  parentId,
  onCommentAdded,
  placeholder = 'Share your thoughts...',
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedContent = content.trim();
    
    if (!trimmedContent) {
      setError('Comment cannot be empty');
      return;
    }
    
    if (trimmedContent.length > MAX_LENGTH) {
      setError(`Comment must be less than ${MAX_LENGTH} characters`);
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/community/${postSlug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: trimmedContent,
          parentId,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to post comment');
      }
      
      const data = await response.json();
      onCommentAdded(data.comment);
      setContent('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setError(null);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  
  const remainingChars = MAX_LENGTH - content.length;
  const isNearLimit = remainingChars < 100;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextareaChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none min-h-[100px]"
          disabled={isSubmitting}
          maxLength={MAX_LENGTH}
        />
        
        {/* Character Counter */}
        {content.length > 0 && (
          <div className={`absolute bottom-3 right-3 text-xs ${
            isNearLimit ? 'text-yellow-400' : 'text-white/40'
          }`}>
            {remainingChars}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </div>
      )}
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 disabled:from-white/10 disabled:via-white/10 disabled:to-white/10 disabled:text-white/40 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/20 disabled:shadow-none active:scale-95"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Posting...
            </span>
          ) : (
            parentId ? 'Post Reply' : 'Post Comment'
          )}
        </button>
      </div>
    </form>
  );
}
