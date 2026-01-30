# Product Requirements Document (PRD)

## Warm Tea & Honest Reviews (Static, Word-based)

---

## 1. Product Overview

This document defines the Product Requirements for **Bookish Wayfarer**, a static book review website with no backend.
Review content is written in **Microsoft Word (.docx)** files, metadata is managed via **JSON**, and images are handled as **separate static assets**.

The product aims to deliver a calm, text-focused reading experience inspired by the "Bookish Wayfarer" design philosophy, while remaining simple to maintain and easy to extend in the future.

---

## 2. Goals & Success Metrics

### 2.1 Goals

* Lower the barrier to content creation by using Word for writing reviews
* Operate entirely without a backend (static hosting only)
* Provide a structure that can later be migrated to a Spring Boot backend
* Deliver a reading-first UX focused on typography and whitespace

### 2.2 Success Metrics

* New reviews can be published without modifying application code
* End-to-end review publishing takes less than 10 minutes
* Readability is preserved across mobile and desktop devices

---

## 3. Non-Goals

* User authentication or accounts
* Comments or social interaction features
* Real-time editing or admin dashboard
* Advanced search or recommendation systems

---

## 4. Target Users

* Individuals who want to maintain a long-term archive of book reviews
* Developers who prefer writing content in Word rather than Markdown
* Users seeking a curated review archive rather than a traditional blog

---

## 5. Information Architecture

### 5.1 Page Structure

```
/                → Home
/reviews         → All Reviews (Books)
/reviews/:slug   → Review Detail
/about           → About
```

---

## 6. Core Design Principles

### 6.1 Responsibility Separation

| Area         | Responsibility           |
| ------------ | ------------------------ |
| Word (.docx) | Review body content only |
| JSON         | All metadata             |
| Images       | Cover images & Assets    |

Word documents must **not** contain any metadata.

### 6.2 Design Philosophy: Bookish Wayfarer
* Content-first blog with editorial typography.
* Warm and relaxed feeling.
* Move focus to content by minimizing UI distractions.
* Limit accent colors and prioritize typography over complex components.

---

## 7. Content Management

### 7.1 Directory Structure

```
public/
 ├─ reviews/        # Review bodies (.docx)
 ├─ covers/         # Cover images (.jpg/.png)
 ├─ images/         # Site assets (Logo, About image)
 └─ reviews.json    # Metadata
```

---

### 7.2 Word Document Requirements

* File format: `.docx`
* File naming: `{slug}.docx`
* Allowed content: review body text only
* Must NOT include:

    * Title
    * Author
    * Rating
    * Summary / excerpt
    * Images

Word documents are written in free-form prose with no enforced structure.

---

### 7.3 Metadata Schema (reviews.json)

```json
{
  "slug": "string",
  "title": "string",
  "author": "string",
  "rating": "number",
  "category": "string",
  "publishedAt": "YYYY-MM-DD",
  "file": "string (.docx)",
  "cover": "string (image)",
  "excerpt": "string"
}
```

---

## 8. Home Page Requirements

### 8.1 Purpose

* Communicate the identity of the site at a glance
* Highlight the most recent reviews
* Provide a simple, curated first impression

### 8.2 Sections

1. **Hero Section**

    * Short site description
    * Large typography
    * Whitespace-driven layout

2. **Recent Reviews**

    * Display the 5–6 most recent reviews
    * Sorted by `publishedAt`
    * Uses reusable BookCard components

3. **Categories**

    * List of available categories
    * Links to Category Archive pages

> The Home page does **not** include a Featured Review section.

---

## 9. Review List Page Requirements

* Displays all reviews
* Card-based layout
* Fully driven by metadata from `reviews.json`

---

## 10. Review Detail Page Requirements

### 10.1 Layout

```
[Cover Image]
Title
Author · Rating · Date
Category

------------------------

[Review body rendered from Word]
```

### 10.2 Data Sources

| Element                 | Source          |
| ----------------------- | --------------- |
| Title / Author / Rating | reviews.json    |
| Cover Image             | /covers         |
| Review Body             | /reviews/*.docx |

---

## 11. Functional Requirements

* Convert Word (.docx) files to HTML on the frontend
* Render lists, sorting, and filtering using JSON metadata
* Support static hosting environments (GitHub Pages, Vercel)

---

## 12. Non-Functional Requirements

* Fully responsive design
* Fast initial load time (static assets only)
* Minimal maintenance overhead when publishing content

---

## 13. Content Publishing Workflow

1. Write the review body in Word
2. Save as `{slug}.docx`
3. Prepare a cover image (`/covers`)
4. Add metadata to `reviews.json`
5. Commit and push to GitHub
6. Automatic deployment completes

---

## 14. Future Considerations

* Integrating a Spring Boot backend
* Automating Word uploads
* CMS or Notion integration
* Search and recommendation features

---

## 15. Status

* PRD completed
* Architecture finalized
* Design Guide (design.json) implemented
* UI Tone & Typography system implemented
* About Page with images added
* Ready for content population

---