'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, Github, Linkedin, Globe, Calendar, 
  Award, TrendingUp, Users, Heart, Share2, Sparkles,
  Briefcase, GraduationCap, Target, Trophy, UserPlus, UserMinus, MessageCircle
} from 'lucide-react';
import { formatCount } from '@/lib/community-utils';
import PublicProfileTabs from './PublicProfileTabs';

interface PublicProfileContentProps {
  userId: string;
}

interface ProfileData {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: string;
  user_profiles: {
    bio: string | null;
    github: string | null;
    linkedin: string | null;
    portfolio: string | null;
    skillLevel: string | null;
    academicYear: string | null;
    institution: string | null;
    preferredDomains: string[] | null;
    reputationScore: number;
    totalPosts: number;
    totalCollaborations: number;
    totalLikesReceived: number;
    followersCount: number;
    followingCount: number;
  } | null;
}

export default function PublicProfileContent({ userId }: PublicProfileContentProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
    checkFollowStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }
      
      setProfile(data.profile);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const response = await fetch(`/api/profile/follow/status?targetUserId=${userId}`);
      const data = await response.json();
      setIsFollowing(data.isFollowing || false);
    } catch (err) {
      console.error('Error checking follow status:', err);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      const response = await fetch('/api/profile/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: userId }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to follow/unfollow');
      }

      setIsFollowing(data.isFollowing);
      
      // Update follower count
      if (profile) {
        setProfile({
          ...profile,
          user_profiles: profile.user_profiles ? {
            ...profile.user_profiles,
            followersCount: data.isFollowing 
              ? profile.user_profiles.followersCount + 1 
              : profile.user_profiles.followersCount - 1,
          } : null,
        });
      }
    } catch (err) {
      const error = err as Error;
      console.error('Follow error:', error.message);
    } finally {
      setFollowLoading(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${profile?.name}'s Profile`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Profile link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white/90 mb-2">User not found</h1>
          <p className="text-white/60">This profile doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const userProfile = profile.user_profiles;
  const bio = userProfile?.bio ? JSON.parse(userProfile.bio) : {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name || 'User'}
                width={160}
                height={160}
                className="rounded-full ring-4 ring-white/10 border-4 border-[#0d0d0d]"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center ring-4 ring-white/10 border-4 border-[#0d0d0d]">
                <span className="text-white font-bold text-6xl">
                  {profile.name?.[0]?.toUpperCase() || 'U'}
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
                {profile.name || 'Anonymous User'}
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </h1>
              
              {/* Bio */}
              {userProfile?.bio && (
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-4">
                  {bio.goal || 'Passionate developer building amazing projects'}
                </p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-4">
                {userProfile?.institution && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{userProfile.institution}</span>
                  </div>
                )}
                
                {userProfile?.academicYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{userProfile.academicYear}</span>
                  </div>
                )}
                
                {userProfile?.skillLevel && (
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="capitalize">{userProfile.skillLevel}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFollow}
                  disabled={followLoading}
                  className={`px-6 py-3 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 ${
                    isFollowing
                      ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/90'
                      : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-purple-500/20'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="w-5 h-5" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Follow
                    </>
                  )}
                </button>
                
                <Link
                  href={`mailto:${profile.email}`}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Send message"
                >
                  <MessageCircle className="w-5 h-5 text-white/70" />
                </Link>
                
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                  title="Share profile"
                >
                  <Share2 className="w-5 h-5 text-white/70" />
                </button>
              </div>
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
          <p className="text-3xl font-bold text-white/90">{formatCount(userProfile?.reputationScore || 0)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Posts</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(userProfile?.totalPosts || 0)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-pink-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-pink-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Likes</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(userProfile?.totalLikesReceived || 0)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-orange-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-orange-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Followers</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(userProfile?.followersCount || 0)}</p>
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4 hover:border-green-500/30 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-green-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider font-bold">Collabs</span>
          </div>
          <p className="text-3xl font-bold text-white/90">{formatCount(userProfile?.totalCollaborations || 0)}</p>
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

              {userProfile?.preferredDomains && userProfile.preferredDomains.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.preferredDomains.map((domain, index) => (
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
              Contact & Links
            </h2>
            
            <div className="space-y-3">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <Mail className="w-5 h-5 text-white/40 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors truncate">
                    Send Email
                  </span>
                </a>
              )}
              
              {userProfile?.github && (
                <a
                  href={userProfile.github}
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
              
              {userProfile?.linkedin && (
                <a
                  href={userProfile.linkedin}
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
              
              {userProfile?.portfolio && (
                <a
                  href={userProfile.portfolio}
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
          <PublicProfileTabs userId={userId} />
        </div>
      </div>
    </div>
  );
}
