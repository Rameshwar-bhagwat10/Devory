/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'dark-base': 'var(--dark-base)',
        'glass-5': 'var(--bg-glass-5)',
        'glass-10': 'var(--bg-glass-10)',
        
        // New accent colors (purple primary)
        'accent-purple': 'var(--accent-purple)',
        'accent-violet': 'var(--accent-violet)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-indigo': 'var(--accent-indigo)',
        
        // Legacy accent colors (kept for backward compatibility, mapped to new colors)
        'accent-orange': 'var(--accent-purple)',
        'accent-pink': 'var(--accent-violet)',
        'accent-red': 'var(--accent-cyan)',
        'accent-deep-orange': 'var(--accent-indigo)',
        'accent-blue': 'var(--accent-violet)',
        
        // Text colors
        'text-white': 'var(--text-white)',
        'text-90': 'var(--text-90)',
        'text-60': 'var(--text-60)',
        'text-20': 'var(--text-20)',
        
        // Borders
        'border-10': 'var(--border-10)',
        'border-20': 'var(--border-20)',
        
        // Status colors
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-tertiary': 'var(--gradient-tertiary)',
        'gradient-text': 'var(--gradient-text)',
        'gradient-glow': 'var(--gradient-glow)',
      },
      boxShadow: {
        'glow-sm': 'var(--glow-sm)',
        'glow-md': 'var(--glow-md)',
        'glow-lg': 'var(--glow-lg)',
        'glow-xl': 'var(--glow-xl)',
      },
    },
  },
  plugins: [],
}
