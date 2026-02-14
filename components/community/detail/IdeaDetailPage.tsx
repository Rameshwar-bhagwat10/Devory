import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Eye, Clock, Sparkles, Lightbulb } from 'lucide-react';
import { formatTimeAgo, getDifficultyColor, formatCount } from '@/lib/community-utils';
import PostActions from '@/components/community/PostActions';
import type { PostWithAuthor } from '@/features/community/community.types';

interface IdeaDetailPageProps {
  post: PostWithAuthor;
  isAuthenticated: boolean;
}

export default function IdeaDetailPage({ post, isAuthenticated }: IdeaDetailPageProps) {
  const difficultyColors = getDifficultyColor(post.difficulty);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        href="/community"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Community
      </Link>

      {/* Main Post Card */}
      <article className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              {/* Type Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                </div>
                <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Idea
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 leading-tight">
                {post.title}
              </h1>
            </div>

            {/* Difficulty Badge */}
            <div className={`px-4 py-2 ${difficultyColors.bg} border ${difficultyColors.border} ${difficultyColors.text} text-sm font-bold uppercase tracking-wide rounded-xl whitespace-nowrap flex-shrink-0`}>
              {post.difficulty}
            </div>
          </div>

          {/* Author & Meta Info */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
            {/* Author Avatar */}
            <div className="flex items-center gap-3">
              {!post.isAnonymous && post.user?.image ? (
                <Image
                  src={post.user.image}
                  alt={post.user.name || 'User'}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-white/10"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center ring-2 ring-white/10">
                  <span className="text-white font-bold text-lg">
                    {post.isAnonymous ? '?' : (post.user?.name?.[0] || 'U')}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white/90">
                    {post.isAnonymous ? 'Anonymous' : (post.user?.name || 'User')}
                  </span>
                  {!post.isAnonymous && (
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTimeAgo(post.createdAt)}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{formatCount(post.viewsCount)} views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain Badge */}
            <div className="ml-auto">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 font-medium">
                {post.domain.replace(/_/g, ' ')}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xl text-white/80 mb-6 leading-relaxed">
            {post.shortDescription}
          </p>

          {/* Full Description */}
          <div className="prose prose-invert max-w-none mb-8">
            <div className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">
              {post.fullDescription}
            </div>
          </div>

          {/* Tech Stack */}
          {post.techStack && (post.techStack as string[]).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(post.techStack as string[]).map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-white/90 text-sm font-medium rounded-lg hover:border-purple-500/40 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && (post.tags as string[]).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {(post.tags as string[]).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/60 text-sm rounded-md hover:border-purple-500/30 hover:text-white/80 transition-all cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="px-8">
          <PostActions
            postSlug={post.slug}
            postId={post.id}
            postTitle={post.title}
            initialLikesCount={post.likesCount}
            initialCommentsCount={post.commentsCount}
            initialSavesCount={0}
            userReaction={post.userReaction}
            isSaved={post.isSaved || false}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </article>
    </div>
  );
}
