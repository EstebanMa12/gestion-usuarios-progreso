import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './src/pages/**/*.{html,js,ts,jsx,tsx}',
    './src/layouts/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#F3F4F6',
        accent: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}