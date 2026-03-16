import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://warm-tea-and-honest-reviews.vercel.app';
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const REVIEWS_FILE = path.join(PUBLIC_DIR, 'reviews.json');
const SITEMAP_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

async function generateSitemap() {
  try {
    const reviewsData = JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf-8'));
    const currentDate = new Date().toISOString().split('T')[0];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/reviews</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE_URL}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

    // Dynamic Review Pages
    reviewsData.forEach(review => {
      sitemap += `  <url>
    <loc>${BASE_URL}/reviews/${review.slug}</loc>
    <lastmod>${review.createdAt || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });

    sitemap += `</urlset>`;

    fs.writeFileSync(SITEMAP_FILE, sitemap);
    console.log(`Successfully generated sitemap.xml at ${SITEMAP_FILE}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
