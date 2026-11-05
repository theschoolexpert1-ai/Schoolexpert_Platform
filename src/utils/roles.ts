import { GraduationCap, Handshake, School, Users, type LucideIcon } from 'lucide-react';

export interface RoleMeta {
  slug: 'school' | 'parent' | 'teacher' | 'vendor';
  label: string; // "School", "Parents", …  (as shown in the modal)
  singular: string; // "school", "parent", …
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the role card theme */
  theme: { card: string; icon: string; ring: string };
  audiencePath: string;
}

export const ROLES: RoleMeta[] = [
  {
    slug: 'school',
    label: 'School',
    singular: 'school',
    description: 'Manage your school profile, showcase programs and connect with parents.',
    icon: School,
    theme: {
      card: 'bg-role-school border-[#cfe7f5]',
      icon: 'bg-white text-primary',
      ring: 'focus-visible:ring-primary/40 hover:border-primary/50',
    },
    audiencePath: '/schools',
  },
  {
    slug: 'parent',
    label: 'Parents',
    singular: 'parent',
    description: "Discover schools, explore learning resources and support your child's journey.",
    icon: Users,
    theme: {
      card: 'bg-role-parent border-[#f6dcc8]',
      icon: 'bg-white text-[#b85c1c]',
      ring: 'focus-visible:ring-[#b85c1c]/40 hover:border-[#e2a77c]',
    },
    audiencePath: '/parents',
  },
  {
    slug: 'teacher',
    label: 'Teacher',
    singular: 'teacher',
    description: 'Explore teaching opportunities, learning resources and professional growth.',
    icon: GraduationCap,
    theme: {
      card: 'bg-role-teacher border-[#cce8d6]',
      icon: 'bg-white text-[#25774a]',
      ring: 'focus-visible:ring-[#25774a]/40 hover:border-[#8fcaa5]',
    },
    audiencePath: '/teachers',
  },
  {
    slug: 'vendor',
    label: 'Vendor',
    singular: 'vendor',
    description: 'Offer your services to schools and the education community across India.',
    icon: Handshake,
    theme: {
      card: 'bg-role-vendor border-[#e0d6f4]',
      icon: 'bg-white text-[#6a4bb0]',
      ring: 'focus-visible:ring-[#6a4bb0]/40 hover:border-[#b9a6e3]',
    },
    audiencePath: '/vendors',
  },
];

export const roleBySlug = (slug: string | null | undefined): RoleMeta | undefined => ROLES.find((r) => r.slug === slug);


