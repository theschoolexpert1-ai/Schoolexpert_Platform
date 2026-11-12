// Uses the same environment-file precedence as Vite, including .env.local.
import { resolve } from 'node:path';
import { generateSeo } from './seo.mjs';

const root = resolve(import.meta.dirname, '..');
const mode = process.argv[2] || 'production';
if (generateSeo(root, resolve(root, 'dist'), mode)) {
  console.log('sitemap.xml and robots.txt written');
} else {
  console.warn('VITE_SITE_URL is not set — sitemap.xml skipped; robots.txt written.');
}
