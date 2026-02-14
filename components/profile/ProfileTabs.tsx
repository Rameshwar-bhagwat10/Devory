'use client';

import { useState, useEffect } from 'react';
import { FileText, Users, Bookmark, Heart } from 'lucide-react';
import PostCard from '@/components/community/PostCard';
import CollaborationCard from '@/components/community/collaborations/CollaborationCard';
import type { PostWithAuthor } from '@/features/community/community.types';

interface ProfileTabsProps {
  isOwnProfile: boolean;
  userId: string;
}

export default function ProfileTabs({ isOwnProfile, userId }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [collaborations, setCollaborations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'collaborations', label: 'Collaborations', icon: Users },
    { id: 'saved', label: 'Saved', icon: Bookmark, ownOnly: true },
    { id: 'liked', label: 'Liked', icon: Heart, ownOnly: true },
  ];

  const visibleTabs = tabs.filter(tab => !tab.ownOnly || isOwnProfile);

  useEffect(() => {
    fetchTabData();
  }, [activeTab]);

  const fetchTabData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'posts') {
        const response = await fetch(`/api/profile/${userId}?tab=posts`);
        const data = await response.json();
        setPosts(data.tabData?.posts || []);
      } else if (activeTab === 'collaborations') {
        const response = await fetch(`/api/profile/${userId}?tab=collaborations`);
        const data = await response.json();
        setCollaborations(data.tabData?.collaborations || []);
      } else if (activeTab === 'saved') {
        const response = await fetch('/api/profile/saved');
        const data = await response.json();
        setPosts(data.posts || []);
      } else if (activeTab === 'liked') {
        const response = await fetch('/api/profile/liked');
        const data = await response.json();
        setPosts(data.posts || []);
      }
    } catch (error) {
      console.error('Error fetching tab data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-white/10">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-white bg-white/5 border-b-2 border-purple-500'
                  : 'text-white/60 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {activeTab === 'posts' && (
              <>
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <PostCard
                        key={`${post.id}-${post.userReaction}-${post.isSaved}`}
                        post={post}
                        isAuthenticated={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-bold text-white/90 mb-2">No posts yet</h3>
                    <p className="text-white/60">Posts will appear here</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'collaborations' && (
              <>
                {collaborations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {collaborations.map((collab) => (
                      <CollaborationCard
                        key={collab.id}
                        post={collab.community_posts}
                        isAuthenticated={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-bold text-white/90 mb-2">No collaborations yet</h3>
                    <p className="text-white/60">Collaboration projects will appear here</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'saved' && (
              <>
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <PostCard
                        key={`${post.id}-${post.userReaction}-${post.isSaved}`}
                        post={post}
                        isAuthenticated={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bookmark className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-bold text-white/90 mb-2">No saved posts</h3>
                    <p className="text-white/60">Saved posts will appear here</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'liked' && (
              <>
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                      <PostCard
                        key={`${post.id}-${post.userReaction}-${post.isSaved}`}
                        post={post}
                        isAuthenticated={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-bold text-white/90 mb-2">No liked posts</h3>
                    <p className="text-white/60">Liked posts will appear here</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
