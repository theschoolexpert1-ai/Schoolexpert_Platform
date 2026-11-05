import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, HeartHandshake, School, Sparkles, Users, Handshake, Bell } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const audienceContent = {
  schools: {
    label: 'For Schools', title: 'A brighter way to connect your school with families.',
    description: 'A dedicated space for schools to showcase strengths, share programmes and connect with teachers and parents community.',
    icon: School, accent: '#087bd5', pale: '#e8f5ff',
  },
  parents: {
    label: 'For Parents', title: 'Your child’s next learning opportunity is on its way.',
    description: 'We’re creating a helpful space to discover schools, explore learning options and find trusted education resources for your child.',
    icon: HeartHandshake, accent: '#e58a28', pale: '#fff4e7',
  },
  teachers: {
    label: 'For Teachers', title: 'A new space for your teaching journey is coming.',
    description: 'We’re building a community where educators can discover opportunities, access useful resources and continue growing professionally.',
    icon: GraduationCap, accent: '#15966a', pale: '#e9f8f1',
  },
  vendors: {
    label: 'For Vendors', title: 'Bring your education services to the right community.',
    description: 'We’re preparing a dedicated space for education partners to introduce their services and build meaningful connections within the ecosystem.',
    icon: Handshake, accent: '#8054c8', pale: '#f2edff',
  },
} as const;

type Audience = keyof typeof audienceContent;

export default function ComingSoon({ audience }: { audience: Audience }) {
  const data = audienceContent[audience];
  const Icon = data.icon;
  const reduceMotion = useReducedMotion();
  useDocumentMeta({ title: `${data.label} — Coming Soon`, description: data.description, noIndex: true, canonicalPath: window.location.pathname });
  const floatTransition = reduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut' as const };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-150px)] items-center overflow-hidden bg-[linear-gradient(135deg,#f9fcff_0%,#edf7ff_52%,#e5f3ff_100%)] py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-36 -top-40 -z-10 size-[34rem] rounded-full bg-white/75 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-48 -left-32 -z-10 size-[32rem] rounded-full bg-[#c9e8ff]/70 blur-2xl" />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, ease: 'easeOut' }} className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#b9ddfb] bg-white/80 px-4 py-2 text-sm font-bold text-[#0873c9] shadow-sm"><Sparkles size={16}/> {data.label}</div>
          <h1 className="mt-6 max-w-2xl text-[2rem] font-bold leading-[1.14] tracking-tight text-[#071f49] sm:text-[2.5rem] lg:text-[3rem]">Something <span style={{ color: data.accent }}>wonderful</span> is on its way.</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-[#405775] sm:text-base">{data.description}</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white bg-white/80 px-5 py-4 shadow-[0_12px_36px_rgba(29,91,145,.10)]">
            <span className="grid size-11 place-items-center rounded-xl" style={{ backgroundColor: data.pale, color: data.accent }}><Bell size={22}/></span>
            <span><span className="block text-sm font-extrabold text-[#102c55]">Coming Soon</span><span className="mt-0.5 block text-sm text-[#60738d]"></span></span>
          </div>
          <div className="mt-8 max-w-xl border-l-[3px] pl-4 py-1" style={{ borderColor: data.accent }}>
            <p className="text-sm font-semibold tracking-wide text-[#244364]">A more connected education experience is taking shape.</p>
            <p className="mt-1 text-sm leading-relaxed text-[#60738d]">Thoughtfully designed around the people who make learning better.</p>
          </div>
          <a href="/" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0879df] px-6 py-3 font-bold text-white shadow-[0_10px_24px_rgba(8,121,223,.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#0568c2] hover:shadow-[0_14px_30px_rgba(8,121,223,.28)]"><ArrowLeft size={18}/> Back to Home</a>
        </motion.div>

        <div className="relative mx-auto flex min-h-[390px] w-full max-w-[520px] items-center justify-center sm:min-h-[470px]">
          <motion.div animate={reduceMotion ? undefined : { rotate: [0, 5, -4, 0], scale: [1, 1.025, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute size-[min(82vw,410px)] rounded-[42%_58%_58%_42%] border border-white/80 bg-white/55 shadow-[inset_0_0_70px_rgba(255,255,255,.9)]" />
          <motion.div animate={{ y: reduceMotion ? 0 : [0, -12, 0] }} transition={floatTransition} className="relative z-10 grid size-52 place-items-center rounded-[2.6rem] border border-white bg-white/80 shadow-[0_28px_70px_rgba(31,103,163,.16)] backdrop-blur-xl sm:size-60" style={{ color: data.accent }}>
            <div className="absolute inset-4 rounded-[2rem] border border-dashed" style={{ borderColor: `${data.accent}35` }} />
            <div className="grid size-32 place-items-center rounded-[2rem] sm:size-36" style={{ background: `linear-gradient(145deg,${data.pale},#ffffff)` }}><Icon className="size-20 sm:size-24" strokeWidth={1.55}/></div>
            <motion.span animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} className="absolute -right-4 -top-4 grid size-14 place-items-center rounded-2xl border border-white bg-white text-[#1689dc] shadow-lg"><Sparkles size={25}/></motion.span>
          </motion.div>
          <motion.div animate={{ y: reduceMotion ? 0 : [0, 9, 0], rotate: reduceMotion ? 0 : [0, -3, 0] }} transition={{ ...floatTransition, duration: 6.5 }} className="absolute left-0 top-[18%] rounded-2xl border border-white bg-white/90 p-4 shadow-[0_14px_35px_rgba(31,103,163,.12)]"><BookOpen className="size-7 text-[#1689dc]"/><span className="mt-2 block text-xs font-bold text-[#244364]">Learn & discover</span></motion.div>
          <motion.div animate={{ y: reduceMotion ? 0 : [0, -10, 0], rotate: reduceMotion ? 0 : [0, 3, 0] }} transition={{ ...floatTransition, duration: 7 }} className="absolute bottom-[13%] right-0 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_14px_35px_rgba(31,103,163,.12)]"><Users className="size-7" style={{ color: data.accent }}/><span className="mt-2 block text-xs font-bold text-[#244364]">Grow together</span></motion.div>
          <motion.div animate={{ scale: reduceMotion ? 1 : [1, 1.12, 1], opacity: reduceMotion ? 1 : [.55, 1, .55] }} transition={{ duration: 3.2, repeat: Infinity }} className="absolute right-[12%] top-[8%] size-3 rounded-full bg-[#68baff]" />
          <div className="absolute bottom-[8%] left-[17%] grid grid-cols-4 gap-2 opacity-70">{Array.from({ length: 12 }).map((_, i) => <span key={i} className="size-2 rounded-full bg-[#85c7fb]" />)}</div>
        </div>
      </div>
    </section>
  );
}
