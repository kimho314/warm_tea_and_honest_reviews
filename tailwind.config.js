import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F7',
        text: '#1A1A1A',
        muted: '#555555',
        border: '#E5E5E5'
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          ...defaultTheme.fontFamily.sans
        ]
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.8' }],
        meta: ['0.9rem', { lineHeight: '1.6' }],
        section: ['2rem', { lineHeight: '1.3' }],
        page: ['2.75rem', { lineHeight: '1.2' }],
        site: ['3.25rem', { lineHeight: '1.15' }]
      },
      maxWidth: {
        list: '720px',
        detail: '640px'
      },
      spacing: {
        'page-top': '5rem',
        'section-gap': '3.5rem'
      },
      transitionDuration: {
        100: '100ms'
      }
    }
  },
  plugins: []
}