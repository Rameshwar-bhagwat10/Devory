'use client';

import { useState, useEffect } from 'react';
import { FileText, Users } from 'lucide-react';
import PostCard from '@/components/community/PostCard';
import CollaborationCard from '@/components/community/collaborations/CollaborationCard';
import type { PostWithAuthor } from '@/features/community/community.types';

interface PublicProfileTabsProps {
  userId: string;
}

interface CollaborationData {
  id: string;
  community_posts: PostWithAuthor;
}

export default function PublicProfileTabs({ userId }: PublicProfileTabsProps) {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [collaborations, setCollaborations] = useState<CollaborationData[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'posts', label: 'Posts', icon: FileText },
    { id: 'collaborations', label: 'Collaborations', icon: Users },
  ];

  useEffect(() => {
    fetchTabData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, userId]);

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
        {tabs.map((tab) => {
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
                        key={post.id}
                        post={post}
                        isAuthenticated={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-bold text-white/90 mb-2">No posts yet</h3>
                    <p className="text-white/60">This user hasn&apos;t posted anything yet</p>
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
                    <p className="text-white/60">This user hasn&apos;t joined any collaborations yet</p>
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
