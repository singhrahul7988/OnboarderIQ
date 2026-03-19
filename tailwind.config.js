/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#534AB7',
          teal: '#1D9E75',
          navy: '#0a0a1a',
          ink: '#12122a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(83, 74, 183, 0.4), 0 12px 40px rgba(83, 74, 183, 0.28)',
        teal: '0 0 0 1px rgba(29, 158, 117, 0.35), 0 12px 36px rgba(29, 158, 117, 0.2)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6E62F6 0%, #534AB7 50%, #1D9E75 100%)',
      },
    },
  },
  plugins: [],
};
