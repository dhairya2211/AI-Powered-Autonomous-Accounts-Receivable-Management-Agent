/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: '#0B1120',
        sidebar: '#111827',
        card: '#172033',
        line: '#25314A',
        primary: '#3B82F6',
        accent: '#8B5CF6',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 28px rgba(59, 130, 246, 0.18)',
        purple: '0 0 28px rgba(139, 92, 246, 0.18)',
        card: '0 12px 40px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        'mesh':
          'radial-gradient(1200px 600px at 80% -10%, rgba(59,130,246,0.14), transparent 50%), radial-gradient(800px 400px at 0% 100%, rgba(139,92,246,0.10), transparent 45%)',
      },
    },
  },
  plugins: [],
}
