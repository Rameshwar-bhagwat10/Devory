import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, Github, Linkedin, Globe, Calendar, 
  Award, TrendingUp, Users, Heart, Settings, Sparkles,
  Briefcase, GraduationCap, Target, Trophy
} from 'lucide-react';
import { formatCount } from '@/lib/community-utils';
import ProfileTabs from './ProfileTabs';
import EditProfileButton from './EditProfileButton';

interface ProfileContentProps {
  userId: string;
  isOwnProfile: boolean;
}

export default async function ProfileContent({ userId, isOwnProfile }: ProfileContentProps) {
  // Fetch user data with profile
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      user_profiles: true,
    },
  });

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white/90 mb-2">User not found</h1>
          <p className="text-white/60">This profile doesn&lsquo;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const profile = user.user_profiles;
  const bio = profile?.bio ? JSON.parse(profile.bio) : {};

  // Calculate real stats from database
  const [postsCount, likesCount, collaborationsCount, followersCount] = await Promise.all([
    // Total posts by user
    prisma.community_posts.count({
      where: { userId, isApproved: true },
    }),
    // Total likes received on user's posts
    prisma.community_reactions.count({
      where: {
        type: 'LIKE',
        community_posts: { userId },
      },
    }),
    // Total collaboration requests accepted
    prisma.community_collaboration_requests.count({
      where: {
        OR: [
          { requesterId: userId, status: 'ACCEPTED' },
          { community_posts: { userId }, status: 'ACCEPTED' },
        ],
      },
    }),
    // Total followers
    prisma.user_followers.count({
      where: { followingId: userId },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || 'User'}
                width={160}
                height={160}
                className="rounded-full ring-4 ring-white/10 border-4 border-[#0d0d0d]"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center ring-4 ring-white/10 border-4 border-[#0d0d0d]">
                <span className="text-white font-bold text-6xl">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
            )}
            
            {/* Verified Badge */}
            <div className="absolute -bottom-2 -right-2 p-2 bg-cyan-500 rounded-full border-4 border-[#0d0d0d]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white/90 mb-2 flex items-center gap-3">
                {user.name || 'Anonymous User'}
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </h1>
              <p className="text-white/60 mb-3">{user.email}</p>
              
              {/* Bio */}
              {profile?.bio && (
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-4">
                  {bio.goal || 'Passionate developer building amazing projects'}
                </p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                {profile?.institution && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{profile.institution}</span>
                  </div>
                )}
                
                {profile?.academicYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{profile.academicYear}</span>
                  </div>
                )}
                
                {profile?.skillLevel && (
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="capitalize">{profile.skillLevel}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {isOwnProfile && (
                <div className="flex items-center gap-2">
                  <EditProfileButton
                    currentProfile={{
                      bio: profile?.bio || '',
                      github: profile?.github || '',
                      linkedin: profile?.linkedin || '',
                      portfolio: profile?.portfolio || '',
                      skillLevel: profile?.skillLevel || '',
                      academicYear: profile?.academicYear || '',
                      institution: profile?.institution || '',
                      preferredDomains: profile?.preferredDomains as string[] || [],
                    }}
                  />
                  <Link
                    href="/settings"
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  >
                    <Settings className="w-5 h-5 text-white/70" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Reputation</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(profile?.reputationScore || 0)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Posts</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(postsCount)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-pink-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Likes</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(likesCount)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Followers</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(followersCount)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Collabs</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(collaborationsCount)}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-400" />
              About
            </h2>
            
            <div className="space-y-4">
              {bio.degree && (
                <div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Education</h3>
                  <p className="text-white/80">{bio.degree}</p>
                  {bio.branch && <p className="text-white/60 text-sm">{bio.branch}</p>}
                </div>
              )}

              {bio.experience && (
                <div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Experience</h3>
                  <p className="text-white/80">{bio.experience}</p>
                </div>
              )}

              {profile?.preferredDomains && profile.preferredDomains.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredDomains.map((domain, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-white/80 text-sm rounded-lg"
                      >
                        {domain.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact & Links */}
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              Links
            </h2>
            
            <div className="space-y-3">
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <Mail className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors truncate">
                    {user.email}
                  </span>
                </a>
              )}
              
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <Github className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    GitHub Profile
                  </span>
                </a>
              )}
              
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    LinkedIn Profile
                  </span>
                </a>
              )}
              
              {profile?.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <Globe className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                    Portfolio Website
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white/90 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Top Contributor</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl text-center">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Verified</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl text-center">
                <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Team Player</p>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-white/60">Rising Star</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Tabs */}
        <div className="lg:col-span-2">
          <ProfileTabs isOwnProfile={isOwnProfile} userId={userId} />
        </div>
      </div>
    </div>
  );
}
