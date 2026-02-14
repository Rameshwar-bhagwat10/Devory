'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FollowingCard from './FollowingCard';
import type { PostWithAuthor } from '@/features/community/community.types';
import { UserPlus, Users } from 'lucide-react';

interface FollowingFeedProps {
  initialPosts: PostWithAuthor[];
  userId: string;
}

export default function FollowingFeed({ initialPosts, userId }: FollowingFeedProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostWithAuthor[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialPosts.length === 0) {
      fetchFollowingFeed();
    }
  }, []);

  const fetchFollowingFeed = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/community/following-feed');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch following feed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-md">
          <UserPlus className="w-24 h-24 mx-auto mb-4 text-white/20" />
          <h3 className="text-2xl font-bold text-white/90 mb-2">No posts yet</h3>
          <p className="text-white/60 mb-6">
            Follow other developers to see their posts here!
          </p>
          <button
            onClick={() => router.push('/community')}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg shadow-pink-600/20"
          >
            Discover Developers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Count */}
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Users className="w-4 h-4 text-pink-400" />
        <span>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} from people you follow
        </span>
      </div>

      {/* Posts Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'forwards',
            }}
          >
            <FollowingCard post={post} isAuthenticated={true} currentUserId={userId} />
          </div>
        ))}
      </div>
    </div>
  );
}
