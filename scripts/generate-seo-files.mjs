// Writes dist/sitemap.xml and dist/robots.txt after `vite build`.
// The site URL comes from VITE_SITE_URL (environment, .env.production or .env).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');

function readEnvFile(name) {
  const file = resolve(root, name);
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, 'utf8')
      .split(/\r?\n/)
      .map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/))
      .filter(Boolean)
      .map(([, k, v]) => [k, v.replace(/^['"]|['"]$/g, '')]),
  );
}

const siteUrl = (
  process.env.VITE_SITE_URL ||
  readEnvFile('.env.production').VITE_SITE_URL ||
  readEnvFile('.env').VITE_SITE_URL ||
  ''
).replace(/\/$/, '');

// Audience pages are intentionally marked noindex while their content is in preparation.
const publicRoutes = [{ path: '/', priority: '1.0', changefreq: 'weekly' }];

const robotsLines = ['User-agent: *', 'Allow: /'];

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = publicRoutes
    .map(
      (r) =>
        `  <url>\n    <loc>${siteUrl}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    )
    .join('\n');
  writeFileSync(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  robotsLines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  console.log(`✓ sitemap.xml written for ${siteUrl}`);
} else {
  console.warn('! VITE_SITE_URL is not set — skipped sitemap.xml (robots.txt written without a Sitemap line).');
}

writeFileSync(resolve(dist, 'robots.txt'), robotsLines.join('\n') + '\n');
console.log('✓ robots.txt written');
