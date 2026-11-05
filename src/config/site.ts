const env = import.meta.env;

export const site = {
  name: 'The School Expert',
  brand: 'The School Expert™',
  tagline: 'Celebrating Concepts Online',
  coreMessage:
    "India's Trusted K-12 Education Ecosystem — Parents, Schools, Teachers, Experts and Education Partners, Stronger Together.",
  defaultDescription:
    'Find verified schools, tutors, hobby classes and education services. Connect parents, schools, teachers, experts and education partners across India — all in one place.',
  url: (env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || '',
  supportEmail: (env.VITE_SUPPORT_EMAIL as string | undefined) || '',
  logo: '/images/the-school-expert-official-logo.png',
  logoLight: '/images/the-school-expert-official-logo.png',
  year: new Date().getFullYear(),
};

export type SocialKey = 'linkedin' | 'youtube' | 'instagram' | 'facebook';

/** Only profiles configured in .env are shown — no invented URLs. */
export const socialLinks: { key: SocialKey; label: string; href: string }[] = (
  [
    { key: 'linkedin', label: 'LinkedIn', href: env.VITE_SOCIAL_LINKEDIN },
    { key: 'youtube', label: 'YouTube', href: env.VITE_SOCIAL_YOUTUBE },
    { key: 'instagram', label: 'Instagram', href: env.VITE_SOCIAL_INSTAGRAM },
    { key: 'facebook', label: 'Facebook', href: env.VITE_SOCIAL_FACEBOOK },
  ] as { key: SocialKey; label: string; href: string | undefined }[]
).filter((s): s is { key: SocialKey; label: string; href: string } => Boolean(s.href));
