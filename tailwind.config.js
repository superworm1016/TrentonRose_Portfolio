/** @type {import('tailwindcss').Config} */
const rgb = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: rgb('bg'),
        elev: rgb('elev'),
        elev2: rgb('elev2'),
        ink: rgb('ink'),
        accent: rgb('accent'),
        purple: rgb('purple'),
        indigo: rgb('indigo'),
        green: rgb('green'),
        orange: rgb('orange'),
        pink: rgb('pink'),
        cyan: rgb('cyan'),
        t1: 'var(--text-1)',
        t2: 'var(--text-2)',
        t3: 'var(--text-3)',
        line: 'var(--line)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        page: '72rem',
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        caret: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        halo: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        flow: 'flow 2.4s linear infinite',
        bob: 'bob 1.8s ease-in-out infinite',
        marquee: 'marquee 50s linear infinite',
        'marquee-reverse': 'marquee-reverse 55s linear infinite',
        caret: 'caret 1s steps(1) infinite',
        'spin-slow': 'spin 6s linear infinite',
        progress: 'progress 7s linear forwards',
        halo: 'halo 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
