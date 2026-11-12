import { loadEnv } from 'vite';
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

export function generateSeo(root, dist, mode = 'production') {
  const configured = loadEnv(mode, root, 'VITE_').VITE_SITE_URL?.trim();
  const robots = readFileSync(resolve(root, 'public/robots.txt'), 'utf8').trimEnd();
  const sitemapFile = resolve(dist, 'sitemap.xml');
  if (!configured) {
    rmSync(sitemapFile, { force: true });
    writeFileSync(resolve(dist, 'robots.txt'), `${robots}\n`);
    return false;
  }
  let url;
  try { url = new URL(configured); } catch { throw new Error('VITE_SITE_URL must be an absolute HTTP(S) URL.'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('VITE_SITE_URL must be an absolute HTTP(S) URL without credentials.');
  }
  url.search = '';
  url.hash = '';
  const base = url.href.replace(/\/+$/, '');
  const routes = JSON.parse(readFileSync(resolve(root, 'src/config/routes.json'), 'utf8'));
  const escapeXml = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
  const urls = routes.filter(route => route.index).map(route => `  <url><loc>${escapeXml(base + route.path)}</loc></url>`).join('\n');
  writeFileSync(sitemapFile, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  writeFileSync(resolve(dist, 'robots.txt'), `${robots}\n\nSitemap: ${base}/sitemap.xml\n`);
  return true;
}
