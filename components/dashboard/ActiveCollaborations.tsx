'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaUsers, FaCrown, FaArrowRight, FaClock, FaCheckCircle } from 'react-icons/fa';

interface TeamMember {
  id: string;
  name: string | null;
  image: string | null;
}

interface Collaboration {
  id: string;
  slug: string;
  title: string;
  role: 'owner' | 'member';
  currentCollaborators: number;
  maxCollaborators: number | null;
  owner: TeamMember;
  teamMembers: TeamMember[];
  joinedAt: Date;
}

interface PendingRequest {
  sent: Array<{
    id: string;
    postId: string;
    postSlug: string;
    postTitle: string;
    owner: TeamMember;
    createdAt: Date;
  }>;
  received: Array<{
    id: string;
    postId: string;
    postSlug: string;
    postTitle: string;
    requester: TeamMember;
    createdAt: Date;
  }>;
}

interface ActiveCollaborationsProps {
  collaborations: Collaboration[];
  pendingRequests: PendingRequest;
}

export default function ActiveCollaborations({ collaborations, pendingRequests }: ActiveCollaborationsProps) {
  const totalPending = pendingRequests.sent.length + pendingRequests.received.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-90 flex items-center gap-2">
            <FaUsers className="text-cyan-400" />
            Active Collaborations
          </h2>
          <p className="text-sm text-text-60 mt-1">
            Your ongoing team projects and collaboration requests
          </p>
        </div>
        <Link
          href="/community/collaborations"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex items-center gap-2"
        >
          View All
          <FaArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Pending Requests Summary */}
      {totalPending > 0 && (
        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <FaClock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-90">
                  {totalPending} Pending Request{totalPending > 1 ? 's' : ''}
                </div>
                <div className="text-xs text-text-60">
                  {pendingRequests.received.length} to review • {pendingRequests.sent.length} waiting
                </div>
              </div>
            </div>
            <Link
              href="/community/notifications"
              className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-xs font-medium transition-colors"
            >
              Review
            </Link>
          </div>
        </div>
      )}

      {/* Active Collaborations Grid */}
      {collaborations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collaborations.map((collab, index) => {
            const progress = collab.maxCollaborators
              ? (collab.currentCollaborators / collab.maxCollaborators) * 100
              : 100;

            return (
              <Link
                key={collab.id}
                href={`/community/${collab.slug}`}
                className="group bg-[#0d0d0d] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-text-90 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {collab.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {collab.role === 'owner' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-md text-xs font-medium text-purple-400">
                          <FaCrown className="w-3 h-3" />
                          Owner
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-md text-xs font-medium text-cyan-400">
                          <FaCheckCircle className="w-3 h-3" />
                          Member
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-text-60">Team</span>
                    <span className="text-xs text-text-60">
                      {collab.currentCollaborators}
                      {collab.maxCollaborators && ` / ${collab.maxCollaborators}`}
                    </span>
                  </div>
                  <div className="flex items-center -space-x-2">
                    {collab.teamMembers.slice(0, 5).map((member, idx) => (
                      <div
                        key={member.id}
                        className="relative w-8 h-8 rounded-full border-2 border-[#0d0d0d] overflow-hidden bg-gradient-to-br from-purple-500 to-cyan-500"
                        style={{ zIndex: 5 - idx }}
                      >
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name || 'Team member'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-white">
                            {member.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                        )}
                      </div>
                    ))}
                    {collab.teamMembers.length > 5 && (
                      <div className="relative w-8 h-8 rounded-full border-2 border-[#0d0d0d] bg-white/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-text-60">
                          +{collab.teamMembers.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {collab.maxCollaborators && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-60">Progress</span>
                      <span className="text-text-90 font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mb-4">
            <FaUsers className="w-8 h-8 text-text-60" />
          </div>
          <h3 className="text-lg font-semibold text-text-90 mb-2">No Active Collaborations</h3>
          <p className="text-sm text-text-60 mb-4">
            Start collaborating with other developers on exciting projects
          </p>
          <Link
            href="/community/collaborations"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            Browse Opportunities
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
