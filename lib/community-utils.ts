import { ProjectDifficulty } from '@prisma/client';

/**
 * Format timestamp to relative time (e.g., "5m ago", "2h ago")
 */
export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const dateObj = date instanceof Date ? date : new Date(date);
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

/**
 * Sanitize content to prevent XSS
 */
export function sanitizeContent(content: string): string {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Generate URL-safe slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get difficulty badge colors
 */
export function getDifficultyColor(difficulty: ProjectDifficulty): {
  bg: string;
  border: string;
  text: string;
} {
  const colors = {
    BEGINNER: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
    },
    INTERMEDIATE: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
    },
    ADVANCED: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
    },
    EXPERT: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      text: 'text-indigo-400',
    },
  };
  
  return colors[difficulty];
}

/**
 * Format number with K/M suffix
 */
export function formatCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
  return `${(count / 1000000).toFixed(1)}M`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Get post type icon (returns icon name for rendering)
 */
export function getPostTypeIcon(type: 'IDEA' | 'COLLABORATION'): 'lightbulb' | 'users' {
  return type === 'IDEA' ? 'lightbulb' : 'users';
}

/**
 * Validate post title
 */
export function validateTitle(title: string): { valid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }
  
  if (title.length < 10) {
    return { valid: false, error: 'Title must be at least 10 characters' };
  }
  
  if (title.length > 200) {
    return { valid: false, error: 'Title must be less than 200 characters' };
  }
  
  return { valid: true };
}

/**
 * Validate description
 */
export function validateDescription(description: string, minLength: number = 20): { valid: boolean; error?: string } {
  if (!description || description.trim().length === 0) {
    return { valid: false, error: 'Description is required' };
  }
  
  if (description.length < minLength) {
    return { valid: false, error: `Description must be at least ${minLength} characters` };
  }
  
  if (description.length > 5000) {
    return { valid: false, error: 'Description must be less than 5000 characters' };
  }
  
  return { valid: true };
}


/**
 * Get reputation badge tier
 */
export function getReputationBadge(score: number): {
  tier: string;
  color: string;
  icon: string;
} {
  if (score >= 300) {
    return {
      tier: 'Top Builder',
      color: 'from-yellow-400 to-orange-500',
      icon: '🏆',
    };
  } else if (score >= 150) {
    return {
      tier: 'Innovator',
      color: 'from-purple-400 to-pink-500',
      icon: '⚡',
    };
  } else if (score >= 50) {
    return {
      tier: 'Contributor',
      color: 'from-blue-400 to-cyan-500',
      icon: '🌟',
    };
  } else {
    return {
      tier: 'New Member',
      color: 'from-gray-400 to-gray-500',
      icon: '🌱',
    };
  }
}
