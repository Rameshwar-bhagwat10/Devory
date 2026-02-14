'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';

const DOMAINS = [
  { value: '', label: 'All Domains' },
  { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
  { value: 'MOBILE_DEVELOPMENT', label: 'Mobile Development' },
  { value: 'AI_ML', label: 'AI/ML' },
  { value: 'DATA_SCIENCE', label: 'Data Science' },
  { value: 'BLOCKCHAIN', label: 'Blockchain' },
  { value: 'GAME_DEVELOPMENT', label: 'Game Development' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'CYBERSECURITY', label: 'Cybersecurity' },
  { value: 'IOT', label: 'IoT' },
  { value: 'OTHER', label: 'Other' },
];

const DIFFICULTIES = [
  { value: '', label: 'All Levels' },
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
];

const POST_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'IDEA', label: 'Ideas' },
  { value: 'COLLABORATION', label: 'Collaborations' },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'trending', label: 'Trending' },
  { value: 'popular', label: 'Popular' },
];

export default function CommunityHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);
  
  const currentDomain = searchParams.get('domain') || '';
  const currentDifficulty = searchParams.get('difficulty') || '';
  const currentType = searchParams.get('type') || '';
  const currentSort = searchParams.get('sort') || 'latest';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: searchQuery });
  };

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    router.push(`/community?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    router.push('/community');
  };

  const hasActiveFilters = currentDomain || currentDifficulty || currentType || searchQuery;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ideas and collaborations..."
            className="w-full pl-12 pr-32 py-3.5 bg-[#0d0d0d] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-white/60 hover:text-white/80 transition-colors"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-all ${
                showFilters
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-[#0d0d0d] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white/90">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-1 text-white/40 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Domain Filter */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Domain
              </label>
              <select
                value={currentDomain}
                onChange={(e) => updateParams({ domain: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                {DOMAINS.map((domain) => (
                  <option key={domain.value} value={domain.value}>
                    {domain.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Difficulty
              </label>
              <select
                value={currentDifficulty}
                onChange={(e) => updateParams({ difficulty: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                {DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Type
              </label>
              <select
                value={currentType}
                onChange={(e) => updateParams({ type: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                {POST_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">
                Sort By
              </label>
              <select
                value={currentSort}
                onChange={(e) => updateParams({ sort: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
              >
                {SORT_OPTIONS.map((sort) => (
                  <option key={sort.value} value={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
