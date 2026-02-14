'use client';

import Link from 'next/link';
import { formatTimeAgo, formatCount } from '@/lib/community-utils';
import type { TrendingPost, CollaborationPost } from '@/features/community/community.types';

interface TopContributor {
  id: string;
  name: string | null;
  image: string | null;
  reputationScore: number;
  totalPosts: number;
  totalCollaborations: number;
}

interface CommunitySidebarProps {
  trending: TrendingPost[];
  collaborations: CollaborationPost[];
  topContributors: TopContributor[];
}

export default function CommunitySidebar({ trending, collaborations, topContributors }: CommunitySidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      {/* Trending Ideas */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
          <h2 className="text-xl font-bold text-white/90">Trending Ideas</h2>
        </div>

        <div className="space-y-3">
          {trending.length > 0 ? (
            trending.map((post, index) => (
              <Link
                key={post.id}
                href={`/community/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all">
                  {/* Rank */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    index === 0
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900'
                      : index === 2
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    #{index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white/90 line-clamp-2 group-hover:text-purple-400 transition-colors mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {formatCount(post.likesCount)}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {formatCount(post.viewsCount)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-white/40 text-center py-4">No trending posts yet</p>
          )}
        </div>
      </div>

      {/* Latest Collaborations */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          <h2 className="text-xl font-bold text-white/90">Open Collaborations</h2>
        </div>

        <div className="space-y-3">
          {collaborations.length > 0 ? (
            collaborations.map((collab) => (
              <Link
                key={collab.id}
                href={`/community/${collab.slug}`}
                className="block group"
              >
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      OPEN
                    </span>
                    <span className="text-xs text-white/40">
                      {formatTimeAgo(collab.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white/90 line-clamp-2 group-hover:text-purple-400 transition-colors mb-2">
                    {collab.title}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 mb-3">
                    {collab.shortDescription}
                  </p>

                  {/* Collaborators */}
                  {collab.requiredCollaborators && (
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>
                        {collab.currentCollaborators}/{collab.requiredCollaborators} joined
                      </span>
                    </div>
                  )}

                  {/* Required Skills */}
                  {collab.requiredSkills && (collab.requiredSkills as string[]).length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {(collab.requiredSkills as string[]).slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {(collab.requiredSkills as string[]).length > 3 && (
                        <span className="px-2 py-0.5 bg-white/5 text-white/40 text-xs rounded">
                          +{(collab.requiredSkills as string[]).length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-white/40 text-center py-4">No open collaborations</p>
          )}
        </div>
      </div>

      {/* Top Contributors - Placeholder */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h2 className="text-xl font-bold text-white/90">Top Contributors</h2>
        </div>

        <div className="space-y-3">
          {topContributors.length > 0 ? (
            topContributors.map((contributor, index) => (
              <Link
                key={contributor.id}
                href={`/profile/${contributor.name || contributor.id}`}
                className="block group"
              >
                <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-500/30 transition-all">
                  {/* Rank Badge */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    index === 0
                      ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-900'
                      : index === 2
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    #{index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {contributor.image ? (
                      <img
                        src={contributor.image}
                        alt={contributor.name || 'User'}
                        className="w-10 h-10 rounded-full border-2 border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {(contributor.name || 'U')[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white/90 truncate group-hover:text-purple-400 transition-colors">
                      {contributor.name || 'Anonymous'}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {formatCount(contributor.reputationScore)}
                      </span>
                      <span>•</span>
                      <span>{contributor.totalPosts} posts</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-white/40 text-center py-4">No contributors yet</p>
          )}
        </div>
      </div>
    </aside>
  );
}
