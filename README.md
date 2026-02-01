# Warm Tea & Honest Reviews

This project is a personal book review website that allows you to statically publish book reviews written in Microsoft Word (.docx) files. It operates entirely as a static site without a backend, providing a calm and editorial UI designed for focused reading, inspired by the "Bookish Wayfarer" design philosophy.

## Key Features

- **Static Architecture**: Based on Vue 3 and Vite, enabling static hosting on platforms like GitHub Pages or Vercel without a dedicated backend.
- **Word Document Integration**: Uses `mammoth.js` to convert `.docx` file content into HTML in real-time.
- **Editorial Typography**: A print-inspired reading environment using a combination of serif and sans-serif fonts, generous whitespace, and a clean white background.
- **New Page Additions**: Includes 'About', 'Privacy Policy', and 'Terms and Conditions' pages for a complete blog experience.
- **Simple Content Management**: Publish new reviews simply by adding metadata to the `public/reviews.json` file and placing assets in corresponding folders.
- **Responsive Layout**: Maintains optimal readability across desktop, tablet, and mobile devices.

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4 / CSS3
- **Parsing**: mammoth.js (DOCX to HTML conversion)

## Project Structure

```text
public/
 ├─ reviews/        # Review body files (.docx)
 ├─ covers/         # Book cover images
 ├─ images/         # Site assets (Logo, Profile image)
 └─ reviews.json    # Review metadata
src/
 ├─ pages/          # Page components (Home, ReviewList, ReviewDetail, About, PrivacyPolicy, TermsAndConditions)
 ├─ router/         # Router configuration
 └─ styles/         # Global styles (main.css)
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation & Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```
   Access `http://localhost:5173` in your browser.

### Build & Deployment

1. Build static files:
   ```bash
   npm run build
   ```
   The build output will be generated in the `dist/` folder.

## How to Add Reviews

1. Write your review body in Microsoft Word (`.docx`) and save it in `public/reviews/` (e.g., `my-review.docx`).
2. Save the cover image in `public/covers/`.
3. Add the review's metadata (title, author, rating, slug, etc.) to `public/reviews.json`.
4. Push your changes, and the site will be updated automatically depending on your deployment environment.
