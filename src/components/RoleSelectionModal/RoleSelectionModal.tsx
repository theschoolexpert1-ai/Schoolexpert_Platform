import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { site } from '@/config/site';

const roles = [
  { label: 'School', description: 'Manage your school profile, showcase programs, and connect with parents.', tone: 'school', image: '/images/role-school.png', href: '/schools' },
  { label: 'Parents', description: 'Discover schools, explore learning resources, and support your child’s journey.', tone: 'parent', image: '/images/role-parent.png', href: '/parents' },
  { label: 'Teacher', description: 'Explore teaching opportunities, learning resources, and professional growth.', tone: 'teacher', image: '/images/role-teacher.png', href: '/teachers' },
  { label: 'Vendor', description: 'Offer your services to schools and the education community across India.', tone: 'vendor', image: '/images/role-vendor.png', href: '/vendors' },
];

// Warm the role illustrations before the first interaction so the modal opens
// without waiting for image downloads or decode work.
if (typeof window !== 'undefined') {
  roles.forEach(({ image }) => {
    const preload = new Image();
    preload.src = image;
  });
}

interface Props { open: boolean; onClose: () => void }

export default function RoleSelectionModal({ open, onClose }: Props) {
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  return createPortal(
    <AnimatePresence>
      {open && <motion.div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-[#071f49]/45 p-3 backdrop-blur-[3px] [transform:translateZ(0)] sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18, ease: "easeOut" }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        <motion.section role="dialog" aria-modal="true" aria-labelledby={titleId} initial={{ opacity: 0, y: 10, scale: .995 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .998 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} style={{ willChange: 'transform, opacity' }} className="relative my-auto w-full max-w-[930px] overflow-hidden rounded-[30px] border border-white/90 bg-[radial-gradient(ellipse_at_100%_0%,#c9eaff_0%,transparent_38%),linear-gradient(135deg,#fbfdff_0%,#eaf5ff_58%,#f9fcff_100%)] px-5 pb-7 pt-7 shadow-[0_30px_90px_#001b3d55] sm:px-8 sm:pb-9 sm:pt-8 lg:px-8">
          <div className="pointer-events-none absolute -right-16 -top-28 h-64 w-[430px] rotate-[-22deg] rounded-[50%] border-[25px] border-sky-300/20" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-48 w-96 rounded-[50%] border-[22px] border-sky-300/25" />
          <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 z-20 grid size-10 place-items-center rounded-full bg-white/85 text-slate-600 shadow-sm transition hover:bg-white"><X size={22} /></button>
          <div className="relative z-10"><img src={site.logo} alt={site.brand} className="h-auto w-[250px] max-w-[72%] object-contain object-left" /><h2 id={titleId} className="mt-7 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-tight tracking-tight text-[#071f49]">Explore the Platform</h2><p className="mt-2 max-w-2xl text-[14px] leading-[1.6] text-[#59677f] sm:text-base">Tell us who you are, so we can show you the right experience,<br className="hidden sm:block" /> tools and resources.</p><span className="mt-4 block h-1.5 w-[84px] rounded-full bg-[#2998ed]" /></div>
          <div className="relative z-10 mt-7 grid gap-3.5 sm:grid-cols-2 sm:gap-4">
            {roles.map((role, index) => <motion.a key={role.label} href={role.href} onClick={onClose} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.045 + index * 0.045, duration: 0.32, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -3, transition: { duration: 0.18 } }} whileTap={{ scale: 0.985 }} className={`group relative flex min-h-[178px] items-center gap-3 overflow-hidden rounded-[23px] border-2 border-white/95 p-3.5 text-left shadow-[0_5px_15px_#19456b0a] transform-gpu transition-[box-shadow] duration-300 ease-out hover:shadow-[0_12px_28px_#19456b20] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/70 sm:min-h-[190px] sm:gap-4 sm:p-4 ${role.tone === 'school' ? 'bg-[linear-gradient(135deg,#e9f6ff,#cce9ff)]' : role.tone === 'parent' ? 'bg-[linear-gradient(135deg,#fff6e9,#ffeedb)]' : role.tone === 'teacher' ? 'bg-[linear-gradient(135deg,#e8fbf5,#d2f4e9)]' : 'bg-[linear-gradient(135deg,#f3edff,#e5dcff)]'}`}>
              <span className="flex h-[125px] w-[38%] shrink-0 items-center justify-center sm:h-[145px]"><img src={role.image} alt="" loading="eager" decoding="async" className="max-h-full max-w-full object-contain mix-blend-multiply" /></span>
              <span className="min-w-0 flex-1 pb-2"><span className="block text-[clamp(1.1rem,1.7vw,1.4rem)] font-bold tracking-tight text-[#071f49]">{role.label}</span><span className="mt-1.5 block text-[13px] leading-[1.5] text-[#1d3559] sm:text-[14px]">{role.description}</span></span>
              <span className={`absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 shadow-[0_3px_10px_#16446b20] transition group-hover:translate-x-1 ${role.tone === 'school' ? 'text-[#087bd5]' : role.tone === 'parent' ? 'text-[#e58a13]' : role.tone === 'teacher' ? 'text-[#15966b]' : 'text-[#8651db]'}`}><ArrowRight size={22} strokeWidth={2.6} /></span>
            </motion.a>)}
          </div>
        </motion.section>
      </motion.div>}
    </AnimatePresence>, document.body,
  );
}
