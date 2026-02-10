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
        'bg-main': 'var(--bg-main)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        
        // Primary brand color
        'primary': 'var(--primary)',
        'primary-soft': 'var(--primary-soft)',
        
        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        
        // Borders
        'border-default': 'var(--border-default)',
        'border-soft': 'var(--border-soft)',
        
        // Status colors
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'error': 'var(--error)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
      },
      backgroundColor: {
        'primary-glow': 'var(--primary-glow)',
      },
    },
  },
  plugins: [],
}
