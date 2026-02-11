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
        
        // Accent colors
        'accent-orange': 'var(--accent-orange)',
        'accent-pink': 'var(--accent-pink)',
        'accent-red': 'var(--accent-red)',
        'accent-deep-orange': 'var(--accent-deep-orange)',
        
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
