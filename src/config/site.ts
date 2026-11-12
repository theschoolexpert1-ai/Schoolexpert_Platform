const env = import.meta.env;

export function publicWebUrl(value: string | undefined): string {
  if (!value?.trim()) return '';
  try {
    const url = new URL(value.trim());
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

const email = env.VITE_SUPPORT_EMAIL?.trim();
const configuredSiteUrl = publicWebUrl(env.VITE_SITE_URL);
export const site = {
  name: 'The School Expert',
  brand: 'The School Expert™',
  tagline: 'Celebrating Concepts Online',
  coreMessage: "India's Trusted K-12 Education Ecosystem — Parents, Schools, Teachers, Experts and Education Partners, Stronger Together.",
  defaultDescription: 'Find verified schools, tutors, hobby classes and education services. Connect parents, schools, teachers, experts and education partners across India — all in one place.',
  url: configuredSiteUrl ? configuredSiteUrl.replace(/[?#].*$/, '').replace(/\/+$/, '') : '',
  supportEmail: email && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email) ? email : 'info@schoolexpert.in',
  logo: '/images/the-school-expert-official-logo.png',
  logoLight: '/images/the-school-expert-official-logo.png',
  year: new Date().getFullYear(),
};

export type SocialKey = 'linkedin' | 'youtube' | 'instagram' | 'facebook';

// Keep the existing public profiles as defaults; optional environment values override them.
export const socialLinks: { key: SocialKey; label: string; href: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', href: publicWebUrl(env.VITE_SOCIAL_LINKEDIN || 'https://www.linkedin.com/company/the-school-expert') },
  { key: 'instagram', label: 'Instagram', href: publicWebUrl(env.VITE_SOCIAL_INSTAGRAM || 'https://www.instagram.com/theschoolexpert.in?srtk=MTlybmpjcW5xZTU5MQ==') },
  { key: 'youtube', label: 'YouTube', href: publicWebUrl(env.VITE_SOCIAL_YOUTUBE) },
  { key: 'facebook', label: 'Facebook', href: publicWebUrl(env.VITE_SOCIAL_FACEBOOK) },
].filter((link): link is { key: SocialKey; label: string; href: string } => Boolean(link.href));
