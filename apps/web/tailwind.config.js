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
        // Teamwork Graph inspired aesthetic
        primary: {
          900: '#111213', // App background
          800: '#1C1E21', // Card background
          700: '#2C2F33', // Hover states
          600: '#3D4148', // Borders
        },
        accent: {
          blue: '#0C66E4',
          purple: '#8777D9',
          green: '#22A06B',
          red: '#EF5350'
        },
        background: '#111213',
        foreground: '#F4F5F7',
        border: '#2C2F33',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
      }
    },
  },
  plugins: [],
}
