'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import CollaborationCard from './CollaborationCard';
import type { PostWithAuthor } from '@/features/community/community.types';
import { useSession } from 'next-auth/react';
import { Users } from 'lucide-react';

interface CollaborationsFeedProps {
  initialData: {
    posts: PostWithAuthor[];
    total: number;
    page: number;
    totalPages: number;
  };
  isAuthenticated: boolean;
  status: string;
}

export default function CollaborationsFeed({ initialData, isAuthenticated, status }: CollaborationsFeedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/community/collaborations?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter by status
  const filteredPosts = status === 'ALL' 
    ? initialData.posts 
    : initialData.posts.filter(post => post.status === status);

  return (
    <div className="space-y-6">
      {/* Count */}
      <div className="flex items-center gap-2 text-sm text-white/60">
        <Users className="w-4 h-4 text-cyan-400" />
        <span>
          {filteredPosts.length} {filteredPosts.length === 1 ? 'collaboration' : 'collaborations'}
        </span>
      </div>

      {/* Posts Grid - 2 columns */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'forwards',
              }}
            >
              <CollaborationCard post={post} isAuthenticated={isAuthenticated} currentUserId={session?.user?.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 max-w-md">
            <Users className="w-24 h-24 mx-auto mb-4 text-white/20" />
            <h3 className="text-2xl font-bold text-white/90 mb-2">No {status.toLowerCase()} collaborations</h3>
            <p className="text-white/60 mb-6">Try changing the filter or create a new collaboration</p>
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
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
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
