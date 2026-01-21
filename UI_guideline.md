# UI Tone & Typography Guidelines

## Book Review Website

---

## 1. Design Goal

The UI aims to replicate the **calm, literary, editorial feel** of the reference site while remaining minimal, modern, and developer-friendly.

Key principles:

* Text-first experience
* Generous whitespace
* Quiet confidence (no visual noise)
* Timeless, book-like aesthetic

This is **not** a marketing-heavy or card-dense UI.

---

## 2. Overall UI Tone

### 2.1 Emotional Tone

| Attribute  | Description                         |
| ---------- | ----------------------------------- |
| Calm       | No visual urgency or bright accents |
| Reflective | Encourages slow reading             |
| Editorial  | Feels like a personal essay archive |
| Human      | Slight imperfections are acceptable |

---

### 2.2 What to Avoid

* Loud colors
* Heavy shadows
* Dense grids
* Overuse of icons
* Aggressive CTAs

---

## 3. Color Palette

### 3.1 Base Colors

| Role             | Color                    |
| ---------------- | ------------------------ |
| Background       | Warm off-white (#FAF9F7) |
| Primary Text     | Almost-black (#1A1A1A)   |
| Secondary Text   | Muted gray (#6B6B6B)     |
| Divider / Border | Light gray (#E5E5E5)     |

### 3.2 Accent Usage

* Accent colors are **optional and minimal**
* Use only for links or subtle hover states
* Recommended accent: muted brown or deep olive

---

## 4. Typography System

### 4.1 Font Philosophy

Typography should feel **print-inspired**, not tech-oriented.

Hierarchy is more important than decoration.

---

### 4.2 Font Stack

#### Headings (Serif)

```css
font-family: "Georgia", "Times New Roman", serif;
```

Purpose:

* Literary tone
* Authority and calmness

---

#### Body Text (Sans-serif)

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Purpose:

* Readability
* Familiarity
* Long-form comfort

---

### 4.3 Font Sizes

| Element           | Size         |
| ----------------- | ------------ |
| Site Title (Home) | 2.25–2.75rem |
| Page Title        | 2rem         |
| Section Title     | 1.25–1.5rem  |
| Body Text         | 1rem–1.05rem |
| Meta Text         | 0.85–0.9rem  |

---

### 4.4 Line Height & Spacing

| Element   | Line Height |
| --------- | ----------- |
| Body Text | 1.7–1.8     |
| Headings  | 1.2–1.3     |

Paragraph spacing:

* `margin-bottom: 1.25em`

---

## 5. Layout & Spacing

### 5.1 Content Width

| Page          | Max Width |
| ------------- | --------- |
| Home          | 900px     |
| Review List   | 900px     |
| Review Detail | 720px     |

Reason:

* Review pages should feel like book pages

---

### 5.2 Whitespace Rules

* Large top margins on pages
* Breathing room between sections
* Never stack elements tightly

---

## 6. Components Tone

### 6.1 Book Card (List Item)

* No card borders by default
* Title dominates
* Metadata is secondary and muted
* Hover effect: subtle underline or opacity change

---

### 6.2 Links

* Underlined or slightly darker on hover
* No button-like styling

---

### 6.3 Images (Covers)

* Rectangular, book-proportioned
* No rounded corners or shadows
* Optional grayscale or muted saturation

---

## 7. Motion & Interaction

* Minimal transitions
* Duration: 150–200ms
* Easing: `ease-out`

Avoid:

* Slide-ins
* Bounce effects
* Attention-grabbing animations

---

## 8. Accessibility

* High contrast text
* Minimum body font size: 16px
* Respect user font scaling

---

## 9. Implementation Notes (Vue + Tailwind)

* Define typography styles in Tailwind config
* Use utility classes sparingly
* Prefer semantic HTML (`article`, `section`, `header`)

---

## 10. Design Status

* UI tone defined
* Typography system finalized
* Ready for component-level design
