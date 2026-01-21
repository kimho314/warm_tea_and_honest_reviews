# Tailwind CSS Configuration

## Book Review Website

---

## 1. Purpose

This document defines the **concrete Tailwind CSS configuration values** based on the approved UI Tone & Typography Guidelines.

The goal is to:

* Lock visual consistency early
* Prevent design drift during implementation
* Encode typography and spacing decisions into the system

---

## 2. Tailwind Setup Assumptions

* Tailwind CSS v3+
* Vue 3 + Vite
* JIT mode enabled (default)

---

## 3. tailwind.config.js (Core Theme)

```js
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F7',
        textPrimary: '#1A1A1A',
        textSecondary: '#6B6B6B',
        borderSubtle: '#E5E5E5',
        accent: '#5A5A42' // muted olive-brown
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
        xs: ['0.8rem', { lineHeight: '1.4' }],
        sm: ['0.9rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.75' }],
        lg: ['1.05rem', { lineHeight: '1.75' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['2rem', { lineHeight: '1.25' }],
        '4xl': ['2.5rem', { lineHeight: '1.2' }]
      },

      maxWidth: {
        content: '900px',
        prose: '720px'
      },

      spacing: {
        section: '4rem',
        paragraph: '1.25em'
      },

      transitionDuration: {
        150: '150ms',
        200: '200ms'
      }
    }
  },
  plugins: []
}
```

---

## 4. Base Layer Styles

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-textPrimary font-sans;
  }

  h1, h2, h3, h4 {
    @apply font-serif text-textPrimary;
  }

  p {
    @apply mb-[1.25em];
  }

  a {
    @apply text-textPrimary underline underline-offset-4 transition-opacity duration-150;
  }

  a:hover {
    @apply opacity-70;
  }
}
```

---

## 5. Typography Usage Rules

| Element       | Tailwind Usage             |
| ------------- | -------------------------- |
| Site Title    | text-4xl font-serif        |
| Page Title    | text-3xl font-serif        |
| Section Title | text-xl font-serif         |
| Body Text     | text-base font-sans        |
| Metadata      | text-sm text-textSecondary |

---

## 6. Layout Utility Conventions

### 6.1 Page Wrapper

```html
<div class="max-w-content mx-auto px-6">
```

### 6.2 Review Detail Wrapper

```html
<article class="max-w-prose mx-auto px-6">
```

---

## 7. Interaction & Motion

* Use `transition-opacity` only
* Duration: `duration-150` or `duration-200`
* No transform or scale animations

---

## 8. Design Lock Rules

* Do not introduce new colors without updating this config
* Do not override font sizes inline
* Typography changes must be system-level

---

## 9. Status

* Tailwind theme finalized
* Safe to begin UI implementation
* Acts as single source of truth for styling
