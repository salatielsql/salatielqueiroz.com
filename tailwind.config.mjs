/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      /* theme colors */
      'off-white': ' #F1F5F9',
      'dark-bluish-gray': '#111827',
      'dark-gray': ' #6C7B9A',
      gray: '#94A3B8',
      'light-blue': ' #5F9CD9',
      'white-10': ' rgba(255, 255, 255, 0.1)',
      'white-5': ' rgba(255, 255, 255, 0.05)',
      brand: '#FBBF24',
      'brand-highlight': '#FBBF24',
      highlight: '#E879F9',
      'dark-highlight': '#680078',

      /* technologies colors */
      typescript: '#007acc',
      javascript: '#d5c01e',
      react: '#41C6EB',
      'react-native': '#41C6EB',
      vue: '#41B883',
      node: '#74C36C',
      stapi: '#4945FF',
      git: '#E95026',
    },
    fontFamily: {
      sans: ['DM Sans', 'sans-serif'],
      subtitle: ['Borel', 'cursive'],
      label: ['DM Mono', 'monospace'],
      code: ['DM Mono', 'monospace'],
    },
    fontSize: {
      xxs: ['0.6875rem', { lineHeight: '1rem' }], // 11px
      xs: ['0.875rem', { lineHeight: '1.35rem' }], // 14px
      sm: ['1rem', { lineHeight: '1.25rem' }], // 16px
      md: ['1.125rem', { lineHeight: '2rem' }], // 18px
      lg: ['1.25rem', { lineHeight: '2rem' }], // 20px
      xl: ['1.5rem', { lineHeight: '2rem' }], // 24px
      '2xl': ['3rem', { lineHeight: '3.15rem' }], // 24px
    },
    extend: {
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(25deg)' },
        },
      },
      animation: {
        'slow-wave': 'wave 750ms ease 2',
        'wave-infinite': 'wave 500ms ease-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    'text-typescript',
    'hover:text-typescript',
    'text-javascript',
    'hover:text-javascript',
    'text-react',
    'hover:text-react',
    'text-vue',
    'hover:text-vue',
    'text-node',
    'hover:text-node',
    'text-stapi',
    'hover:text-stapi',
    'text-git',
    'hover:text-git',
  ],
}
