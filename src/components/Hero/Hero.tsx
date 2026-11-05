import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, BookOpen, Sprout, BriefcaseBusiness, GraduationCap, School, Layers } from 'lucide-react';
import { useRoleModal } from '@/context/RoleModalContext';
import { Button } from '../Button/Button';

const audiences = [['Parents', Users, '/parents'], ['Schools', School, '/schools'], ['Teachers', GraduationCap, '/teachers'], ['Experts', BriefcaseBusiness, '/vendors'], ['Education Partners', Layers, '/vendors']] as const;

export default function Hero() {
  const { openRoleModal } = useRoleModal();
  const go = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[linear-gradient(112deg,#f8fcff_0%,#edf7ff_55%,#e1f2ff_100%)] text-[#071f49]">
      <div className="pointer-events-none absolute -right-28 -top-40 h-[680px] w-[680px] rounded-full bg-[#d9efff]/70" />
      <div className="pointer-events-none absolute right-[8%] top-16 h-[520px] w-[520px] rounded-[42%_58%_55%_45%] bg-white/55 blur-[1px]" />
      <div className="container-page relative grid min-h-[590px] items-center gap-4 py-12 lg:grid-cols-[1.02fr_.98fr] lg:py-10">
        <div className="relative z-10 max-w-[740px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c6e5ff] bg-[#e4f3ff] px-4 py-2 text-[13px] font-semibold text-[#075da9]"><ShieldCheck size={17} /> India’s Trusted Education Ecosystem</div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-5 max-w-[760px] text-[clamp(2rem,3.35vw,3.05rem)] font-bold leading-[1.13] tracking-tight text-[#071f49]">Bringing India’s K-12 education community together.</motion.h1>
          <p className="mt-4 max-w-[660px] text-[15px] leading-[1.65] text-[#294465] sm:text-base">Find verified schools, tutors, hobby classes and education services. Hire great teachers, explore trusted resources and connect with the right education partners across India — all in one place.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Button variant="primary" size="lg" onClick={openRoleModal}>Explore the Platform <ArrowRight size={19} /></Button><Button variant="outline" size="lg" onClick={go}>Discover Our Services</Button></div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[13px] font-semibold text-[#17375e]">{[[ShieldCheck, 'Verified Information'], [Users, 'Diverse Education Options'], [BookOpen, 'Helpful Resources'], [Sprout, 'A Stronger Education Community']].map(([Icon, label]: any) => <span key={label} className="flex items-center gap-2"><Icon size={22} className="text-[#087bd5]" />{label}</span>)}</div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18, scale: .985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex min-h-[350px] w-full max-w-[720px] items-center justify-center lg:min-h-[530px]"
          aria-label="Students and education opportunities"
        >
          {/* Soft ambient lighting and organic shapes make the artwork feel native to the hero. */}
          <div className="pointer-events-none absolute inset-[5%] rounded-[48%] bg-[radial-gradient(ellipse_at_center,rgba(112,190,245,.30)_0%,rgba(207,235,255,.42)_48%,rgba(235,247,255,0)_76%)] blur-2xl" />
          <div className="pointer-events-none absolute right-[7%] top-[5%] h-[82%] w-[82%] rounded-[46%_54%_58%_42%] bg-gradient-to-br from-white/70 via-[#d9efff]/75 to-[#c7e7ff]/45" />
          <div className="pointer-events-none absolute right-[15%] top-[12%] h-[68%] w-[68%] rounded-full border border-white/70" />
          <img
            src="/images/hero-students.png"
            alt="Students smiling and looking ahead"
            className="hero-students-art relative z-10 h-full max-h-[550px] w-full object-contain object-center mix-blend-multiply"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 82% 82% at 53% 52%, #000 61%, rgba(0,0,0,.94) 73%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 82% 82% at 53% 52%, #000 61%, rgba(0,0,0,.94) 73%, transparent 100%)',
            }}
          />
          <div className="absolute right-[1%] top-[7%] z-20 hidden max-w-[275px] rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[0_12px_34px_-18px_rgba(20,91,150,.42)] backdrop-blur-md sm:block">
            <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f4ff]"><GraduationCap className="size-6 text-[#087bd5]" /></span><div><p className="text-sm font-bold leading-tight text-[#102b50]">Multiple School Options</p><p className="mt-1 text-xs leading-snug text-[#526782]">Mainstream, Alternative, Inclusive and more</p></div></div>
          </div>
          <div className="absolute bottom-[13%] left-[1%] z-20 hidden max-w-[225px] rounded-2xl border border-white/90 bg-white/90 px-4 py-3 shadow-[0_12px_34px_-18px_rgba(20,91,150,.38)] backdrop-blur-md md:block">
            <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f4ff]"><Users className="size-5 text-[#087bd5]" /></span><div><p className="text-sm font-bold leading-tight text-[#102b50]">Compare &amp; Explore</p><p className="mt-1 text-xs leading-snug text-[#526782]">Find the right fit for every learner</p></div></div>
          </div>
        </motion.div>
      </div>
      <div className="relative border-t border-[#d5eaff] bg-white/65"><div className="container-page flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-5"><p className="shrink-0 text-sm font-extrabold text-[#071f49]">I’m here for</p><div className="flex flex-wrap gap-3">{audiences.map(([label, Icon, href]) => <a key={label} href={href} className="inline-flex items-center gap-2 rounded-full border border-[#c6e2fa] bg-[#edf7ff] px-4 py-2 text-sm font-bold text-[#092c59] transition hover:bg-[#dcefff]"><Icon size={17} className="text-[#087bd5]" />{label}</a>)}</div></div></div>
    </section>
  );
}
