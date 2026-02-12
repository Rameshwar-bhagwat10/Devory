'use client';

import { useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: {
    domains: string[];
    difficulties: string[];
    techStack: string[];
    years: string[];
    durations: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'domain',
    title: 'Domain',
    options: [
      { value: 'WEB_DEVELOPMENT', label: 'Web Development' },
      { value: 'MOBILE_DEVELOPMENT', label: 'Mobile Development' },
      { value: 'MOBILE', label: 'Mobile' },
      { value: 'DATA_SCIENCE', label: 'Data Science' },
      { value: 'MACHINE_LEARNING', label: 'Machine Learning' },
      { value: 'AI_ML', label: 'AI & ML' },
      { value: 'BLOCKCHAIN', label: 'Blockchain' },
      { value: 'IOT', label: 'IoT' },
      { value: 'GAME_DEVELOPMENT', label: 'Game Development' },
      { value: 'CYBERSECURITY', label: 'Cybersecurity' },
      { value: 'CLOUD_COMPUTING', label: 'Cloud Computing' },
      { value: 'FINTECH', label: 'FinTech' },
      { value: 'DEVOPS', label: 'DevOps' },
      { value: 'HEALTH_TECH', label: 'Health Tech' },
      { value: 'ENTERPRISE_SYSTEM', label: 'Enterprise System' },
      { value: 'EDTECH', label: 'EdTech' },
    ],
  },
  {
    id: 'difficulty',
    title: 'Difficulty',
    options: [
      { value: 'BEGINNER', label: 'Beginner' },
      { value: 'INTERMEDIATE', label: 'Intermediate' },
      { value: 'ADVANCED', label: 'Advanced' },
    ],
  },
  {
    id: 'years',
    title: 'Academic Year',
    options: [
      { value: 'Second Year', label: 'Second Year' },
      { value: 'Third Year', label: 'Third Year' },
      { value: 'Final Year', label: 'Final Year' },
    ],
  },
  {
    id: 'durations',
    title: 'Duration',
    options: [
      { value: '2-3 weeks', label: '2-3 weeks' },
      { value: '3-4 weeks', label: '3-4 weeks' },
      { value: '4-5 weeks', label: '4-5 weeks' },
      { value: '4-6 weeks', label: '4-6 weeks' },
      { value: '5-6 weeks', label: '5-6 weeks' },
      { value: '5-7 weeks', label: '5-7 weeks' },
      { value: '6-8 weeks', label: '6-8 weeks' },
      { value: '8-10 weeks', label: '8-10 weeks' },
      { value: '10-12 weeks', label: '10-12 weeks' },
    ],
  },
  {
    id: 'techStack',
    title: 'Technology Stack',
    options: [
      // Frontend
      { value: 'React', label: 'React' },
      { value: 'Next.js', label: 'Next.js' },
      { value: 'Vue.js', label: 'Vue.js' },
      { value: 'Svelte', label: 'Svelte' },
      { value: 'Angular', label: 'Angular' },
      // Mobile
      { value: 'React Native', label: 'React Native' },
      { value: 'Flutter', label: 'Flutter' },
      { value: 'Swift', label: 'Swift' },
      { value: 'Kotlin', label: 'Kotlin' },
      // Backend
      { value: 'Node.js', label: 'Node.js' },
      { value: 'Python', label: 'Python' },
      { value: 'FastAPI', label: 'FastAPI' },
      { value: 'Flask', label: 'Flask' },
      { value: 'Django', label: 'Django' },
      { value: 'Go', label: 'Go' },
      { value: 'Rust', label: 'Rust' },
      { value: 'Java', label: 'Java' },
      { value: 'Spring Boot', label: 'Spring Boot' },
      // Databases
      { value: 'PostgreSQL', label: 'PostgreSQL' },
      { value: 'MongoDB', label: 'MongoDB' },
      { value: 'Redis', label: 'Redis' },
      { value: 'MySQL', label: 'MySQL' },
      { value: 'Firebase', label: 'Firebase' },
      { value: 'Supabase', label: 'Supabase' },
      // ML/AI
      { value: 'TensorFlow', label: 'TensorFlow' },
      { value: 'PyTorch', label: 'PyTorch' },
      { value: 'Keras', label: 'Keras' },
      { value: 'scikit-learn', label: 'scikit-learn' },
      // Cloud & Tools
      { value: 'Docker', label: 'Docker' },
      { value: 'Kubernetes', label: 'Kubernetes' },
      { value: 'AWS', label: 'AWS' },
      { value: 'Azure', label: 'Azure' },
      { value: 'TypeScript', label: 'TypeScript' },
      { value: 'GraphQL', label: 'GraphQL' },
      { value: 'Tailwind', label: 'Tailwind' },
      { value: 'Solidity', label: 'Solidity' },
    ].sort((a, b) => a.label.localeCompare(b.label)),
  },
];

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['domain', 'difficulty']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isFilterActive = (groupId: string, value: string) => {
    const filterKey = groupId === 'domain' ? 'domains' 
      : groupId === 'difficulty' ? 'difficulties' 
      : groupId === 'years' ? 'years'
      : groupId === 'durations' ? 'durations'
      : 'techStack';
    return filters[filterKey as keyof typeof filters].includes(value);
  };

  return (
    <div className="w-64 space-y-6">
      {FILTER_GROUPS.map((group) => (
        <div key={group.id} className="space-y-3">
          <button
            onClick={() => toggleGroup(group.id)}
            className="flex items-center justify-between w-full text-left focus:outline-none group"
          >
            <h3 className="text-xs font-bold text-text-60 uppercase tracking-wider">
              {group.title}
            </h3>
            <svg
              className={`w-4 h-4 text-text-60 transition-transform ${
                expandedGroups.includes(group.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className="h-px bg-gradient-to-r from-transparent via-border-10 to-transparent"></div>

          {expandedGroups.includes(group.id) && (
            <div className="space-y-2">
              {group.options.map((option) => {
                const isActive = isFilterActive(group.id, option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => onFilterChange(group.id, option.value)}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                      ${isActive
                        ? 'bg-accent-orange/10 border-2 border-accent-orange text-accent-orange font-medium'
                        : 'bg-glass-5 border border-border-10 text-text-90 hover:border-border-20 hover:bg-glass-10'
                      }
                      focus:outline-none focus:ring-2 focus:ring-accent-orange/30
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
