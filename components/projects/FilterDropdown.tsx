'use client';

import { useState, useRef, useEffect } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  icon?: React.ReactNode;
}

export default function FilterDropdown({
  title,
  options,
  selectedValues,
  onToggle,
  icon,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectedCount = selectedValues.length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all
          ${selectedCount > 0
            ? 'bg-accent-orange/10 border-accent-orange text-accent-orange'
            : 'bg-glass-5 border-border-10 text-text-90 hover:border-border-20'
          }
          focus:outline-none focus:ring-2 focus:ring-accent-orange/30
        `}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        <span className="font-medium text-sm">{title}</span>
        {selectedCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white text-xs flex items-center justify-center font-bold">
            {selectedCount}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-dark-base border border-border-10 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-2 space-y-1">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => onToggle(option.value)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between
                    ${isSelected
                      ? 'bg-accent-orange/10 text-accent-orange font-medium'
                      : 'text-text-90 hover:bg-glass-10'
                    }
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
