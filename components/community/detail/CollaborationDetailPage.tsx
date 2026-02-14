'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, Eye, Clock, Users, Sparkles, UserPlus, 
  Calendar, Award, Briefcase, CheckCircle2
} from 'lucide-react';
import { formatTimeAgo, getDifficultyColor, formatCount } from '@/lib/community-utils';
import PostActions from '@/components/community/PostActions';
import type { PostWithAuthor } from '@/features/community/community.types';

interface CollaborationDetailPageProps {
  post: PostWithAuthor;
  isAuthenticated: boolean;
  currentUserId?: string;
}

export default function CollaborationDetailPage({ 
  post, 
  isAuthenticated,
  currentUserId 
}: CollaborationDetailPageProps) {
  const router = useRouter();
  const difficultyColors = getDifficultyColor(post.difficulty);
  const isOpen = post.status === 'OPEN';
  const progress = post.requiredCollaborators 
    ? (post.currentCollaborators / post.requiredCollaborators) * 100 
    : 0;
  const spotsLeft = post.requiredCollaborators ? post.requiredCollaborators - post.currentCollaborators : 0;
  const isAuthor = currentUserId === post.userId;
  
  const [isRequesting, setIsRequesting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);

  const handleJoinRequest = async () => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    setIsRequesting(true);
    try {
      const response = await fetch('/api/community/collaboration/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id }),
      });

      if (response.ok) {
        setHasRequested(true);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to send request');
      }
    } catch {
      alert('Failed to send request');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        href="/community/collaborations"
        className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Collaborations
      </Link>

      {/* Single Column Layout */}
      <div className="space-y-6">
        {/* Main Post Card */}
        <article className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1 min-w-0">
                {/* Type Badge & Status */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                    Collaboration
                  </span>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${
                    isOpen 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-gray-500/20 border border-gray-500/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                    <span className={`text-xs font-bold uppercase ${
                      isOpen ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {post.status}
                    </span>
                  </div>
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

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
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

              {/* Domain Badge */}
              <div className="ml-auto">
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 font-medium">
                  {post.domain.replace(/_/g, ' ')}
                </div>
              </div>
            </div>

            {/* Team Progress */}
            {post.requiredCollaborators && (
              <div className="mb-6 p-5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm font-bold text-white/80">Team Progress</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-cyan-400">
                      {post.currentCollaborators}/{post.requiredCollaborators}
                    </span>
                    {spotsLeft <= 3 && spotsLeft > 0 && isOpen && (
                      <span className="px-2.5 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full">
                        {spotsLeft} spots left
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

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

            {/* Project Lead & Stats - Inline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
              {/* Project Lead */}
              {!post.isAnonymous && (
                <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    Project Lead
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    {post.user?.image ? (
                      <Image
                        src={post.user.image}
                        alt={post.user.name || 'User'}
                        width={56}
                        height={56}
                        className="rounded-full ring-2 ring-white/10"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center ring-2 ring-white/10">
                        <span className="text-white font-bold text-xl">
                          {post.user?.name?.[0] || 'U'}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white/90">{post.user?.name || 'User'}</h4>
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                      </div>
                      <p className="text-sm text-white/50">Project Creator</p>
                    </div>
                  </div>

                  <Link
                    href={`/profile/${post.user?.name || post.userId}`}
                    className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white/90 text-sm font-medium rounded-lg transition-all text-center block"
                  >
                    View Profile
                  </Link>
                </div>
              )}

              {/* Project Stats */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">
                  Project Stats
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-white/60">Views</span>
                    <span className="text-lg font-bold text-white/90">{formatCount(post.viewsCount)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-white/5">
                    <span className="text-sm text-white/60">Likes</span>
                    <span className="text-lg font-bold text-white/90">{formatCount(post.likesCount)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-white/5">
                    <span className="text-sm text-white/60">Comments</span>
                    <span className="text-lg font-bold text-white/90">{formatCount(post.commentsCount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Join/Request Button - Inline */}
            {!isAuthor && isOpen && (
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white/90 mb-2">Interested in Joining?</h3>
                  <p className="text-sm text-white/60 mb-4">
                    Send a collaboration request to join this project and work with the team
                  </p>
                  <button
                    onClick={handleJoinRequest}
                    disabled={isRequesting || hasRequested}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 disabled:from-white/10 disabled:via-white/10 disabled:to-white/10 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {hasRequested ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Request Sent
                      </>
                    ) : isRequesting ? (
                      'Sending...'
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Request to Join
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Collaboration Details */}
            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-400" />
                Project Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {post.estimatedDuration && (
                  <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Duration</div>
                      <div className="text-lg font-bold text-white/90">{post.estimatedDuration}</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Award className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Difficulty</div>
                    <div className="text-lg font-bold text-white/90">{post.difficulty}</div>
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              {post.requiredSkills && (post.requiredSkills as string[]).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(post.requiredSkills as string[]).map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-white/90 text-sm font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {post.techStack && (post.techStack as string[]).length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(post.techStack as string[]).map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-white/90 text-sm font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
    </div>
  );
}
