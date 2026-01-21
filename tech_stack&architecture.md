# Tech Stack & Architecture

## Book Review Website (Static, Word-based)

---

## 1. Purpose of This Document

This document defines the **technical stack** and **system architecture** for the Book Review Website described in the PRD.

The goal is to:

* Translate product requirements into concrete technical decisions
* Keep the system simple, maintainable, and backend-free
* Ensure future extensibility (e.g. Spring Boot backend integration)

---

## 2. High-Level Architecture

### 2.1 Architecture Overview

The system is a **fully static, frontend-driven application**.
All content is served as static assets and rendered in the browser.

```
Browser
  ↓
Static Frontend (Vue)
  ↓
Static Assets (JSON / DOCX / Images)
  ↓
GitHub Repository
  ↓
Static Hosting (GitHub Pages / Vercel)
```

---

## 3. Technology Stack

### 3.1 Frontend Framework

| Area       | Technology | Reason                                     |
| ---------- | ---------- | ------------------------------------------ |
| Framework  | Vue 3      | Composition API, lightweight, future-proof |
| Build Tool | Vite       | Fast dev server, simple static build       |
| Routing    | Vue Router | Client-side routing for SPA                |

---

### 3.2 Styling

| Area          | Technology                  | Reason                                   |
| ------------- | --------------------------- | ---------------------------------------- |
| CSS Framework | Tailwind CSS                | Rapid UI development, consistent spacing |
| Typography    | System fonts or serif stack | Reading-focused UX                       |

---

### 3.3 Content Processing

| Area         | Technology | Reason                          |
| ------------ | ---------- | ------------------------------- |
| Word Parsing | mammoth.js | Reliable DOCX → HTML conversion |
| Metadata     | JSON       | Simple, backend-agnostic        |

---

### 3.4 Hosting & Deployment

| Area           | Technology             | Reason                   |
| -------------- | ---------------------- | ------------------------ |
| Source Control | GitHub                 | Versioned content + code |
| Hosting        | GitHub Pages or Vercel | Static hosting, CI/CD    |
| Deployment     | Git push → auto deploy | Zero manual deployment   |

---

## 4. Directory & Module Architecture

### 4.1 Repository Structure

```
book-review-site/
│
├─ public/
│   ├─ reviews/        # Review bodies (.docx)
│   ├─ covers/         # Cover images
│   └─ reviews.json    # Metadata
│
├─ src/
│   ├─ pages/          # Route-level pages
│   ├─ components/     # Reusable UI components
│   ├─ utils/          # Parsing & data utilities
│   ├─ router/         # Vue Router config
│   └─ styles/         # Global styles (if needed)
│
└─ README.md
```

---

## 5. Data Flow & Rendering

### 5.1 Home / List Pages

```
Home.vue / ReviewList.vue
  ↓
Fetch reviews.json
  ↓
Sort / Filter in frontend
  ↓
Render BookCard components
```

---

### 5.2 Review Detail Page

```
ReviewDetail.vue
  ↓
Route param (slug)
  ↓
Load metadata from reviews.json
  ↓
Fetch Word file (/reviews/{slug}.docx)
  ↓
Convert DOCX → HTML (mammoth.js)
  ↓
Render content with v-html
```

---

## 6. Routing Strategy

### 6.1 Client-Side Routing

| Route           | Description                 |
| --------------- | --------------------------- |
| /               | Home                        |
| /reviews        | All reviews                 |
| /reviews/:slug  | Review detail               |
| /categories/:id | Category archive (optional) |

All routes are handled client-side via Vue Router.

---

## 7. Content Linking Strategy

### 7.1 Slug-Based Mapping

A single `slug` is used to connect all related assets:

| Asset       | Naming Convention |
| ----------- | ----------------- |
| Review file | `{slug}.docx`     |
| Cover image | `{slug}.jpg`      |
| Detail URL  | `/reviews/{slug}` |

This ensures predictable, backend-free linking.

---

## 8. Security & Constraints

* No user input or uploads (read-only)
* No authentication or authorization
* Minimal attack surface due to static hosting

---

## 9. Performance Considerations

* Static assets served via CDN
* DOCX files fetched only on detail pages
* Optional lazy loading for images

---

## 10. Future Architecture Evolution

The current architecture is intentionally backend-agnostic.

### Potential Future Changes

* Replace `reviews.json` with REST API (Spring Boot)
* Upload Word files via admin UI
* Store images in object storage (S3)
* Introduce search and recommendation services

The frontend architecture is designed to remain largely unchanged.

---

## 11. Status

* Tech stack finalized
* Architecture approved
* Ready for implementation
