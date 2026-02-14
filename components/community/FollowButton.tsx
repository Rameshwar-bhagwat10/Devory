'use client';

import { useState } from 'react';

interface FollowButtonProps {
  userId: string;
  initialFollowing: boolean;
}

export function FollowButton({ userId, initialFollowing }: FollowButtonProps) {
  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/community/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          followingId: userId,
          action: following ? 'unfollow' : 'follow',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to follow');
      }

      const data = await res.json();
      setFollowing(data.following);
    } catch (error: any) {
      console.error('Follow error:', error);
      alert(error.message || 'Failed to follow user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={loading}
      className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
        following
          ? hover
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
          : 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-lg hover:shadow-purple-500/30 animate-glow'
      }`}
    >
      {loading ? (
        'Loading...'
      ) : following ? (
        hover ? (
          'Unfollow'
        ) : (
          'Following'
        )
      ) : (
        'Follow'
      )}
    </button>
  );
}
