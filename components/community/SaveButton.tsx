'use client';

import { useState } from 'react';

interface SaveButtonProps {
  postId: string;
  initialSaved: boolean;
}

export function SaveButton({ postId, initialSaved }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    setAnimating(true);
    
    try {
      const res = await fetch('/api/community/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      if (!res.ok) throw new Error('Failed to save');

      const data = await res.json();
      setSaved(data.saved);
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimating(false), 600);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all disabled:opacity-50 ${
        animating ? 'animate-flip' : ''
      }`}
      aria-label={saved ? 'Unsave post' : 'Save post'}
    >
      <svg
        className={`w-5 h-5 transition-all ${
          saved ? 'fill-purple-400 text-purple-400' : 'text-white/60'
        }`}
        fill={saved ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      <span className="text-sm text-white/80">
        {saved ? 'Saved' : 'Save'}
      </span>
    </button>
  );
}
