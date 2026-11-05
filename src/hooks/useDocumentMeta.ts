import { useEffect } from 'react';
import { site } from '@/config/site';

interface Meta {
  title?: string;
  description?: string;
  noIndex?: boolean;
  canonicalPath?: string;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Sets the page title, description, Open Graph tags and canonical URL. */
export function useDocumentMeta({ title, description, noIndex, canonicalPath = '/' }: Meta) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.brand}` : `${site.brand} — India's Trusted K-12 Education Ecosystem`;
    const desc = description ?? site.defaultDescription;
    const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const url = site.url ? `${site.url}${normalizedPath}` : null;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    if (url) setMeta('property', 'og:url', url);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setCanonical(url);
  }, [title, description, noIndex, canonicalPath]);
}
