export function scrollToHash(hash: string): boolean {
  if (!hash.startsWith('#') || hash.length === 1) return false;
  let id: string;
  try { id = decodeURIComponent(hash.slice(1)); } catch { return false; }
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
  return true;
}

export function goToHomeSection(hash: string) {
  if (!scrollToHash(hash)) window.location.assign(`/${hash}`);
}
