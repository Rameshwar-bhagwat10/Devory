'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  FaSeedling, 
  FaBolt, 
  FaFire, 
  FaGem,
  FaGlobe,
  FaMobileAlt,
  FaCog,
  FaDesktop,
  FaChartBar,
  FaRobot,
  FaLink,
  FaPlug,
  FaGamepad,
  FaLock,
  FaCloud,
  FaDollarSign,
  FaTools,
  FaHospital,
  FaBuilding,
  FaBook,
  FaCode,
  FaVrCardboard,
  FaEye,
  FaBolt as FaEnergy,
  FaAtom,
  FaDna,
  FaGlobeAmericas,
  FaCalendarAlt,
  FaGraduationCap,
} from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiGo,
  SiRust,
  SiKotlin,
  SiSwift,
  SiFlutter,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiDjango,
  SiFastapi,
  SiExpress,
  SiTensorflow,
  SiPytorch,
  SiSolidity,
  SiBun,
  SiAstro,
  SiDeno,
  SiSolid,
  SiSvelte,
  SiRemix,
} from 'react-icons/si';
import { IconType } from 'react-icons';

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

// Icon mapping for different option types
const getOptionIcon = (label: string, value: string): { Icon: IconType; color: string } => {
  const labelLower = label.toLowerCase();
  const valueLower = value.toLowerCase();

  // Difficulty icons
  if (valueLower === 'beginner') return { Icon: FaSeedling, color: '#10B981' };
  if (valueLower === 'intermediate') return { Icon: FaBolt, color: '#F59E0B' };
  if (valueLower === 'advanced') return { Icon: FaFire, color: '#EF4444' };
  if (valueLower === 'expert') return { Icon: FaGem, color: '#A855F7' };

  // Domain icons
  if (valueLower.includes('web')) return { Icon: FaGlobe, color: '#3B82F6' };
  if (valueLower.includes('mobile')) return { Icon: FaMobileAlt, color: '#10B981' };
  if (valueLower.includes('backend')) return { Icon: FaCog, color: '#6B7280' };
  if (valueLower.includes('desktop')) return { Icon: FaDesktop, color: '#8B5CF6' };
  if (valueLower.includes('data')) return { Icon: FaChartBar, color: '#06B6D4' };
  if (valueLower.includes('machine') || valueLower.includes('ai')) return { Icon: FaRobot, color: '#A855F7' };
  if (valueLower.includes('blockchain')) return { Icon: FaLink, color: '#F59E0B' };
  if (valueLower.includes('iot')) return { Icon: FaPlug, color: '#10B981' };
  if (valueLower.includes('game')) return { Icon: FaGamepad, color: '#EC4899' };
  if (valueLower.includes('cyber')) return { Icon: FaLock, color: '#EF4444' };
  if (valueLower.includes('cloud')) return { Icon: FaCloud, color: '#3B82F6' };
  if (valueLower.includes('fintech')) return { Icon: FaDollarSign, color: '#10B981' };
  if (valueLower.includes('devops')) return { Icon: FaTools, color: '#F59E0B' };
  if (valueLower.includes('health')) return { Icon: FaHospital, color: '#EF4444' };
  if (valueLower.includes('enterprise')) return { Icon: FaBuilding, color: '#6B7280' };
  if (valueLower.includes('edtech')) return { Icon: FaBook, color: '#3B82F6' };
  if (valueLower.includes('developer')) return { Icon: FaCode, color: '#8B5CF6' };
  if (valueLower.includes('ar') || valueLower.includes('vr')) return { Icon: FaVrCardboard, color: '#EC4899' };
  if (valueLower.includes('robotics')) return { Icon: FaRobot, color: '#F59E0B' };
  if (valueLower.includes('computer_vision')) return { Icon: FaEye, color: '#06B6D4' };
  if (valueLower.includes('energy')) return { Icon: FaEnergy, color: '#F59E0B' };
  if (valueLower.includes('quantum')) return { Icon: FaAtom, color: '#8B5CF6' };
  if (valueLower.includes('bio')) return { Icon: FaDna, color: '#10B981' };
  if (valueLower.includes('environmental')) return { Icon: FaGlobeAmericas, color: '#10B981' };

  // Tech stack icons
  if (labelLower.includes('react') && !labelLower.includes('native')) return { Icon: SiReact, color: '#61DAFB' };
  if (labelLower.includes('next')) return { Icon: SiNextdotjs, color: '#FFFFFF' };
  if (labelLower.includes('vue')) return { Icon: SiVuedotjs, color: '#4FC08D' };
  if (labelLower.includes('angular')) return { Icon: SiAngular, color: '#DD0031' };
  if (labelLower.includes('python')) return { Icon: SiPython, color: '#3776AB' };
  if (labelLower.includes('node')) return { Icon: SiNodedotjs, color: '#339933' };
  if (labelLower.includes('typescript')) return { Icon: SiTypescript, color: '#3178C6' };
  if (labelLower.includes('javascript')) return { Icon: SiJavascript, color: '#F7DF1E' };
  if (labelLower === 'go') return { Icon: SiGo, color: '#00ADD8' };
  if (labelLower.includes('rust')) return { Icon: SiRust, color: '#CE422B' };
  if (labelLower.includes('java') && !labelLower.includes('javascript')) return { Icon: FaCode, color: '#007396' };
  if (labelLower.includes('kotlin')) return { Icon: SiKotlin, color: '#7F52FF' };
  if (labelLower.includes('swift')) return { Icon: SiSwift, color: '#FA7343' };
  if (labelLower.includes('flutter')) return { Icon: SiFlutter, color: '#02569B' };
  if (labelLower.includes('docker')) return { Icon: SiDocker, color: '#2496ED' };
  if (labelLower.includes('kubernetes')) return { Icon: SiKubernetes, color: '#326CE5' };
  if (labelLower.includes('aws')) return { Icon: SiAmazon, color: '#FF9900' };
  if (labelLower.includes('firebase')) return { Icon: SiFirebase, color: '#FFCA28' };
  if (labelLower.includes('mongo')) return { Icon: SiMongodb, color: '#47A248' };
  if (labelLower.includes('postgres')) return { Icon: SiPostgresql, color: '#4169E1' };
  if (labelLower.includes('redis')) return { Icon: SiRedis, color: '#DC382D' };
  if (labelLower.includes('graphql')) return { Icon: SiGraphql, color: '#E10098' };
  if (labelLower.includes('tailwind')) return { Icon: SiTailwindcss, color: '#06B6D4' };
  if (labelLower.includes('django')) return { Icon: SiDjango, color: '#092E20' };
  if (labelLower.includes('fastapi')) return { Icon: SiFastapi, color: '#009688' };
  if (labelLower.includes('express')) return { Icon: SiExpress, color: '#FFFFFF' };
  if (labelLower.includes('tensorflow')) return { Icon: SiTensorflow, color: '#FF6F00' };
  if (labelLower.includes('pytorch')) return { Icon: SiPytorch, color: '#EE4C2C' };
  if (labelLower.includes('solidity')) return { Icon: SiSolidity, color: '#C0C0C0' };
  if (labelLower.includes('bun')) return { Icon: SiBun, color: '#FBF0DF' };
  if (labelLower.includes('astro')) return { Icon: SiAstro, color: '#FF5D01' };
  if (labelLower.includes('deno')) return { Icon: SiDeno, color: '#70FFAF' };
  if (labelLower.includes('solid')) return { Icon: SiSolid, color: '#76B3E1' };
  if (labelLower.includes('svelte')) return { Icon: SiSvelte, color: '#FF3E00' };
  if (labelLower.includes('remix')) return { Icon: SiRemix, color: '#E8F5FD' };

  // Year icons
  if (labelLower.includes('second')) return { Icon: FaCalendarAlt, color: '#3B82F6' };
  if (labelLower.includes('third')) return { Icon: FaCalendarAlt, color: '#F59E0B' };
  if (labelLower.includes('final')) return { Icon: FaGraduationCap, color: '#A855F7' };

  // Duration icons
  if (labelLower.includes('week')) return { Icon: FaCalendarAlt, color: '#06B6D4' };

  // Default icon
  return { Icon: FaCode, color: '#8B5CF6' };
};

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
          flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all
          ${selectedCount > 0
            ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
            : 'bg-white/5 border-white/10 text-text-90 hover:border-white/20 hover:bg-white/10'
          }
          focus:outline-none focus:ring-2 focus:ring-purple-500/30 backdrop-blur-sm
        `}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        <span className="font-medium text-sm">{title}</span>
        {selectedCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 text-white text-xs flex items-center justify-center font-bold shadow-lg shadow-purple-600/30">
            {selectedCount}
          </span>
        )}
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-gradient-to-b from-[#050810]/80 via-[#080b14]/80 to-[#050810]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 z-50 max-h-96 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-white/[0.02] pointer-events-none rounded-2xl"></div>
          
          {/* Scrollable content with hidden scrollbar */}
          <div className="relative max-h-96 overflow-y-auto scrollbar-hide p-2">
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            
            <div className="space-y-1">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                const { Icon: OptionIcon, color: iconColor } = getOptionIcon(option.label, option.value);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => onToggle(option.value)}
                    className={`
                      w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-3 group
                      ${isSelected
                        ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 font-medium border border-purple-500/30 shadow-lg shadow-purple-500/10'
                        : 'text-text-90 hover:bg-white/5 border border-transparent hover:border-white/10'
                      }
                    `}
                  >
                    <OptionIcon style={{ color: iconColor }} className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{option.label}</span>
                    {isSelected && (
                      <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none rounded-b-2xl"></div>
        </div>
      )}
    </div>
  );
}
