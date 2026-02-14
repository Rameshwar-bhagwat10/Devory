import { CommunityService } from '@/features/community/community.service';
import Link from 'next/link';
import { TrendingUp, Users, Flame, Clock } from 'lucide-react';

interface CommunityRightPanelProps {
  userId?: string;
}

export default async function CommunityRightPanel({ userId }: CommunityRightPanelProps) {
  const [trending, collaborations, topContributors] = await Promise.all([
    CommunityService.getTrending(5).catch(() => []),
    CommunityService.getLatestCollaborations(5).catch(() => []),
    CommunityService.getTopContributors(5).catch(() => []),
  ]);

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto border-l border-white/10 bg-gradient-to-b from-[#050810] to-[#080b14] p-6">
      <div className="space-y-6">
        {/* Trending Ideas */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Trending Ideas</h3>
          </div>
          <div className="space-y-3">
            {trending.length > 0 ? (
              trending.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/community/${post.slug}`}
                  className="block group"
                >
                  <div className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold text-white/40 bg-white/5 rounded">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 group-hover:text-white line-clamp-2 transition-colors">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {post.viewsCount}
                        </span>
                        <span>•</span>
                        <span>{post.likesCount} likes</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-white/40">No trending posts yet</p>
            )}
          </div>
        </section>

        {/* Open Collaborations */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-white">Open Collaborations</h3>
          </div>
          <div className="space-y-3">
            {collaborations.length > 0 ? (
              collaborations.map((collab) => (
                <Link
                  key={collab.id}
                  href={`/community/${collab.slug}`}
                  className="block group"
                >
                  <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <p className="text-sm text-white/80 group-hover:text-white line-clamp-2 mb-2 transition-colors">
                      {collab.title}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cyan-400">
                        {collab.currentCollaborators}/{collab.requiredCollaborators} joined
                      </span>
                      <span className="text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(collab.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-white/40">No open collaborations</p>
            )}
          </div>
        </section>

        {/* Top Contributors */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Top Contributors</h3>
          </div>
          <div className="space-y-3">
            {topContributors.length > 0 ? (
              topContributors.map((contributor, index) => (
                <div key={contributor.id} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold text-white/40 bg-white/5 rounded">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 truncate">
                      {contributor.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-white/40">
                      {contributor.reputationScore} points
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-white/40">No contributors yet</p>
            )}
          </div>
        </section>

        {/* Your Activity (if logged in) */}
        {userId && (
          <section className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4">
            <h3 className="font-semibold text-white mb-3">Your Activity</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Posts</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Comments</span>
                <span className="text-white font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Reputation</span>
                <span className="text-purple-400 font-semibold">0</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
