/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Premium Dark Theme
        primary: {
          900: '#0A0A0C', // Very deep base
          800: '#141417', // Elevated card background
          700: '#1F1F24', // Hover states
          600: '#2E2E36', // Borders
        },
        accent: {
          blue: '#2563EB', // Deeper modern blue
          purple: '#8B5CF6', 
          green: '#10B981',
          red: '#F43F5E'
        },
        background: '#0A0A0C',
        foreground: '#F8FAFC',
        border: '#1F1F24',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.15)',
      }
    },
  },
  plugins: [],
}
