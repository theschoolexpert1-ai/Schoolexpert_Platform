import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, LockKeyhole, Mail, ExternalLink } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import sections from './privacy-policy.json';

type PolicySection = { title: string; paragraphs: string[] };
const policySections = sections as PolicySection[];

export default function PrivacyPolicy() {
  useDocumentMeta({
    title: 'Privacy Policy',
    description: 'Read The School Expert™ Privacy Policy to understand how personal data is collected, used, shared, retained and protected.',
    canonicalPath: '/privacy-policy',
  });

  return (
    <section className="relative isolate min-h-[calc(100svh-140px)] overflow-hidden bg-[linear-gradient(135deg,#fbfdff_0%,#f2f8ff_55%,#eaf5ff_100%)] py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-8 -z-10 size-[34rem] rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full bg-[#d7edff]/70 blur-3xl" />

      <div className="mx-auto w-full px-5 sm:px-7" style={{ width: 'calc(100% - 40px)', maxWidth: '1000px', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe4fb] bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2875c8] shadow-sm"><ShieldCheck size={14} /> Your privacy matters</div>
            <h1 className="mt-5 text-[2.15rem] font-bold leading-[1.12] tracking-[-0.035em] text-[#10234f] sm:text-[2.5rem] lg:text-[2.85rem]">Privacy <span className="text-[#3979cf]">Policy</span></h1>
            <p className="mt-3 max-w-[650px] text-[15px] leading-relaxed text-[#5b6f8d] sm:text-base">The School Expert™ · Poornaphala Media and Infotech Services LLP</p>
          </div>
          <a href="/" className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#b9d8f8] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#17477e] shadow-[0_5px_18px_rgba(31,91,148,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[#3886d8] hover:bg-white hover:text-[#086fc8] hover:shadow-[0_10px_24px_rgba(31,91,148,.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8dcff]"><ArrowLeft size={17} className="transition-transform duration-200 group-hover:-translate-x-1" />Back to Home</a>
        </motion.div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-[#c9def4] via-[#dce9f7] to-transparent sm:my-10" />

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }} className="mb-7 rounded-[22px] border border-[#d8e9fb] bg-white/80 p-5 shadow-[0_12px_34px_rgba(33,83,135,.05)] sm:p-6">
          <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf6ff] text-[#347bd0]"><LockKeyhole size={20}/></span><div><h2 className="text-[15px] font-bold text-[#18345c]">About this policy</h2><p className="mt-1 text-[13px] leading-[1.7] text-[#60738e]">This policy explains how information is handled when you visit or use our website, forms, services, enquiries, registrations, listings and communications.</p></div></div>
          <nav aria-label="Privacy policy contents" className="mt-5 border-t border-[#e5eef8] pt-4"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#7188a5]">On this page</p><div className="flex flex-wrap gap-2">{policySections.map((section, i) => <a key={section.title} href={`#privacy-section-${i+1}`} className="rounded-full border border-[#d9e9f8] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-medium text-[#37658f] transition hover:border-[#9fc8ef] hover:bg-[#edf6ff] hover:text-[#176bb5]">{section.title.replace(/^\d+\.\s*/, '')}</a>)}</div></nav>
        </motion.div>

        <article className="overflow-hidden rounded-[26px] border border-[#d8e9fb] bg-white/95 shadow-[0_20px_60px_rgba(33,83,135,.07)] sm:rounded-[30px]">
          <div className="border-b border-[#e5eef8] bg-[linear-gradient(110deg,#f8fbff_0%,#eef7ff_100%)] px-6 py-6 sm:px-9"><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#3979cf]">The School Expert™</p><h2 className="mt-1 text-xl font-bold text-[#10234f] sm:text-2xl">Privacy Policy</h2></div>
          <div className="divide-y divide-[#eaf1f8] px-6 sm:px-9">
            {policySections.map((section, index) => <section id={`privacy-section-${index+1}`} key={section.title} className="scroll-mt-24 py-6 sm:py-7">
              <h3 className="text-[16px] font-bold leading-snug text-[#17365f] sm:text-[17px]">{section.title}</h3>
              <div className="mt-3 space-y-3">{section.paragraphs.map((paragraph, pIndex) => <p key={pIndex} className="text-[13px] leading-[1.8] text-[#536985] sm:text-[14px]">{paragraph}</p>)}</div>
              {section.title.startsWith('45.') && <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#3b628a]"><a className="inline-flex items-center gap-1.5 font-semibold hover:text-[#087bd5]" href="https://www.schoolexpert.in" target="_blank" rel="noreferrer">www.schoolexpert.in <ExternalLink size={13}/></a><a className="inline-flex items-center gap-1.5 font-semibold hover:text-[#087bd5]" href="mailto:info@schoolexpert.in"><Mail size={14}/>info@schoolexpert.in</a></div>}
            </section>)}
          </div>
        </article>

        <div className="mt-7 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#dceafa] bg-white/75 px-5 py-4 sm:flex-row sm:items-center"><p className="text-[13px] text-[#60738e]">Questions about this Privacy Policy? Get in touch with our team.</p><a href="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2875c8] transition hover:text-[#125cae] hover:underline">Contact Us <span aria-hidden="true">→</span></a></div>
      </div>
    </section>
  );
}
