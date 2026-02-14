'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from './PostCard';
import type { PostWithAuthor } from '@/features/community/community.types';
import { useSession } from 'next-auth/react';

interface CommunityFeedProps {
  initialData: {
    posts: PostWithAuthor[];
    total: number;
    page: number;
    totalPages: number;
  };
  isAuthenticated: boolean;
}

export default function CommunityFeed({ initialData, isAuthenticated }: CommunityFeedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/community?${params.toString()}`);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Posts Grid - 2 columns */}
      {initialData.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialData.posts.map((post, index) => (
            <div
              key={post.id}
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <PostCard post={post} isAuthenticated={isAuthenticated} currentUserId={session?.user?.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-md">
            <svg className="w-24 h-24 mx-auto mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-2xl font-bold text-white/90 mb-2">No posts yet</h3>
            <p className="text-white/60 mb-6">Be the first to share your idea or collaboration!</p>
            {isAuthenticated && (
              <button
                onClick={() => router.push('/community/new')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg shadow-purple-600/20"
              >
                Create First Post
              </button>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {initialData.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(initialData.page - 1)}
            disabled={initialData.page === 1}
            className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white/90 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, initialData.totalPages) }, (_, i) => {
              let pageNum;
              if (initialData.totalPages <= 5) {
                pageNum = i + 1;
              } else if (initialData.page <= 3) {
                pageNum = i + 1;
              } else if (initialData.page >= initialData.totalPages - 2) {
                pageNum = initialData.totalPages - 4 + i;
              } else {
                pageNum = initialData.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    pageNum === initialData.page
                      ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-lg'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/90'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(initialData.page + 1)}
            disabled={initialData.page === initialData.totalPages}
            className="px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-white/90 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
