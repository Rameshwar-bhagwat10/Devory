'use client';

import { useEffect } from 'react';
import FilterSidebar from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    domains: string[];
    difficulties: string[];
    techStack: string[];
    years: string[];
    durations: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-dark-base/80 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-dark-base border-l border-border-10 z-50 lg:hidden
          transform transition-transform duration-300 ease-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-90">Filters</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-glass-5 border border-border-10 flex items-center justify-center text-text-60 hover:text-text-90 hover:border-accent-orange transition-all focus:outline-none focus:ring-2 focus:ring-accent-orange/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filters */}
          <FilterSidebar filters={filters} onFilterChange={onFilterChange} />
        </div>
      </div>
    </>
  );
}
