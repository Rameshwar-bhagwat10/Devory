'use client';

interface ActiveFiltersProps {
  filters: {
    domains: string[];
    difficulties: string[];
    techStack: string[];
    years: string[];
    durations: string[];
  };
  onRemoveFilter: (filterType: string, value: string) => void;
  onClearAll: () => void;
}

const FILTER_LABELS: Record<string, string> = {
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  BACKEND_DEVELOPMENT: 'Backend Development',
  DESKTOP_DEVELOPMENT: 'Desktop Development',
  MOBILE: 'Mobile',
  DATA_SCIENCE: 'Data Science',
  MACHINE_LEARNING: 'Machine Learning',
  AI_ML: 'AI & ML',
  AI: 'AI',
  BLOCKCHAIN: 'Blockchain',
  IOT: 'IoT',
  GAME_DEVELOPMENT: 'Game Development',
  CYBERSECURITY: 'Cybersecurity',
  CLOUD_COMPUTING: 'Cloud Computing',
  FINTECH: 'FinTech',
  DEVOPS: 'DevOps',
  HEALTH_TECH: 'Health Tech',
  ENTERPRISE_SYSTEM: 'Enterprise System',
  EDTECH: 'EdTech',
  DEVELOPER_TOOLS: 'Developer Tools',
  AR_VR: 'AR/VR',
  ROBOTICS: 'Robotics',
  COMPUTER_VISION: 'Computer Vision',
  ENERGY: 'Energy',
  QUANTUM: 'Quantum',
  BIOINFORMATICS: 'Bioinformatics',
  ENVIRONMENTAL: 'Environmental',
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
};

export default function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  const allFilters = [
    ...filters.domains.map(d => ({ type: 'domains', value: d })),
    ...filters.difficulties.map(d => ({ type: 'difficulties', value: d })),
    ...filters.techStack.map(t => ({ type: 'techStack', value: t })),
    ...filters.years.map(y => ({ type: 'years', value: y })),
    ...filters.durations.map(d => ({ type: 'durations', value: d })),
  ];

  if (allFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-text-60">Active filters:</span>
      
      {allFilters.map((filter, index) => (
        <button
          key={`${filter.type}-${filter.value}-${index}`}
          onClick={() => onRemoveFilter(filter.type, filter.value)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500 rounded-full text-sm text-text-90 hover:from-purple-500/20 hover:to-violet-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        >
          <span>{FILTER_LABELS[filter.value] || filter.value}</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}

      <button
        onClick={onClearAll}
        className="text-sm text-accent-orange hover:text-accent-pink transition-colors focus:outline-none"
      >
        Clear All
      </button>
    </div>
  );
}
