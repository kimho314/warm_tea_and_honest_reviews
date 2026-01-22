# Tailwind CSS Configuration

## Book Review Website (Document-first)

---

## 1. Purpose

This document defines the **final Tailwind CSS configuration** aligned with the **Document-first, typography-driven design philosophy** inspired by the reference site.

The goal is to:

- Match the reference site’s editorial, essay-like feel
- Treat typography and spacing as the primary design tools
- Avoid card, grid, or app-like UI patterns
- Lock design decisions to prevent future drift

---

## 2. Tailwind Setup Assumptions

- Tailwind CSS v3+
- Vue 3 + Vite
- JIT mode enabled (default)

---

## 3. tailwind.config.js (Final)

```js
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
```

---

## 4. Base Layer Styles (Critical)

These base styles intentionally keep Tailwind **out of the way** and allow the layout to feel like a traditional document.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-text font-sans;
  }

  h1, h2, h3, h4 {
    @apply font-serif text-text;
  }

  p {
    @apply mb-[1.25em];
  }

  a {
    @apply text-text underline underline-offset-4 transition-opacity duration-100;
  }

  a:hover {
    @apply opacity-70;
  }
}
```

---

## 5. Typography Usage Rules (Mandatory)

| Element | Tailwind Class |
|------|---------------|
| Site Title (Home) | `text-site font-serif` |
| Page Title | `text-page font-serif` |
| Section Title | `text-section font-serif` |
| Body Text | `text-base font-sans` |
| Metadata | `text-meta text-muted` |

> **Do not** use Tailwind’s default `text-xl`, `text-2xl`, etc.
> All typography must come from the system above.

---

## 6. Layout Conventions

### 6.1 Page Wrapper (List & Home)

```html
<div class="max-w-list mx-auto px-6 pt-page-top">
```

### 6.2 Review Detail Wrapper

```html
<article class="max-w-detail mx-auto px-6 pt-page-top">
```

---

## 7. Interaction & Motion Rules

- Only opacity transitions are allowed
- Duration: `duration-100`
- No transforms, scales, shadows, or animations

This site should feel **static, calm, and print-like**.

---

## 8. Design Lock Rules (Strict)

- ❌ No cards
- ❌ No grids
- ❌ No shadows
- ❌ No decorative UI components

- ✅ Articles
- ✅ Headings
- ✅ Paragraph flow

Any visual change must be justified by typography or spacing, not UI effects.

---

## 9. Status

- Tailwind configuration finalized (A-track)
- Reference-aligned
- Ready for clean implementation