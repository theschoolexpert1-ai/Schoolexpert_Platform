import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Mail, Scale } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import sections from './terms-conditions.json';

type TermsSection = { title: string; paragraphs: string[] };
const termsSections = sections as TermsSection[];

export default function TermsConditions() {
  useDocumentMeta({
    title: 'Terms & Conditions',
    description: 'Read The School Expert™ Terms of Use governing access to www.schoolexpert.in and related services.',
    canonicalPath: '/terms-and-conditions',
  });

  return (
    <section className="relative isolate min-h-[calc(100svh-140px)] overflow-hidden bg-[linear-gradient(135deg,#fbfdff_0%,#f2f8ff_55%,#eaf5ff_100%)] py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-8 -z-10 size-[34rem] rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full bg-[#d7edff]/70 blur-3xl" />

      <div className="mx-auto w-full px-5 sm:px-7" style={{ width: 'calc(100% - 40px)', maxWidth: '1000px', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe4fb] bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2875c8] shadow-sm"><Scale size={14} /> Platform terms of use</div>
            <h1 className="mt-5 text-[2.15rem] font-bold leading-[1.12] tracking-[-0.035em] text-[#10234f] sm:text-[2.5rem] lg:text-[2.85rem]">Terms &amp; <span className="text-[#3979cf]">Conditions</span></h1>
            <p className="mt-3 max-w-[650px] text-[15px] leading-relaxed text-[#5b6f8d] sm:text-base">The School Expert™ · Poornaphala Media and Infotech Services LLP</p>
          </div>
          <a href="/" className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#b9d8f8] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#17477e] shadow-[0_5px_18px_rgba(31,91,148,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[#3886d8] hover:bg-white hover:text-[#086fc8] hover:shadow-[0_10px_24px_rgba(31,91,148,.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8dcff]"><ArrowLeft size={17} className="transition-transform duration-200 group-hover:-translate-x-1" />Back to Home</a>
        </motion.div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-[#c9def4] via-[#dce9f7] to-transparent sm:my-10" />

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }} className="mb-7 rounded-[22px] border border-[#d8e9fb] bg-white/80 p-5 shadow-[0_12px_34px_rgba(33,83,135,.05)] sm:p-6">
          <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf6ff] text-[#347bd0]"><FileText size={20}/></span><div><h2 className="text-[15px] font-bold text-[#18345c]">About these terms</h2><p className="mt-1 text-[13px] leading-[1.7] text-[#60738e]">These Terms of Use govern your use of www.schoolexpert.in and related services (the “Platform”) operated by Poornaphala Media and Infotech Services LLP (“The School Expert™”, “we”, “us”).</p></div></div>
          <nav aria-label="Terms and conditions contents" className="mt-5 border-t border-[#e5eef8] pt-4"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#7188a5]">On this page</p><div className="flex flex-wrap gap-2">{termsSections.map((section, i) => <a key={section.title} href={`#terms-section-${i+1}`} className="rounded-full border border-[#d9e9f8] bg-[#f8fbff] px-3 py-1.5 text-[11px] font-medium text-[#37658f] transition hover:border-[#9fc8ef] hover:bg-[#edf6ff] hover:text-[#176bb5]">{section.title.replace(/^\d+\.\s*/, '')}</a>)}</div></nav>
        </motion.div>

        <article className="overflow-hidden rounded-[26px] border border-[#d8e9fb] bg-white/95 shadow-[0_20px_60px_rgba(33,83,135,.07)] sm:rounded-[30px]">
          <div className="border-b border-[#e5eef8] bg-[linear-gradient(110deg,#f8fbff_0%,#eef7ff_100%)] px-6 py-6 sm:px-9"><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#3979cf]">The School Expert™</p><h2 className="mt-1 text-xl font-bold text-[#10234f] sm:text-2xl">Terms &amp; Conditions</h2></div>
          <div className="divide-y divide-[#eaf1f8] px-6 sm:px-9">
            {termsSections.map((section, index) => <section id={`terms-section-${index+1}`} key={section.title} className="scroll-mt-24 py-6 sm:py-7">
              <h3 className="text-[16px] font-bold leading-snug text-[#17365f] sm:text-[17px]">{section.title}</h3>
              <div className="mt-3 space-y-3">{section.paragraphs.map((paragraph, pIndex) => <p key={pIndex} className="text-[13px] leading-[1.8] text-[#536985] sm:text-[14px]">{paragraph}</p>)}</div>
              {index === 9 && <a className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3b628a] transition hover:text-[#087bd5]" href="mailto:info@schoolexpert.in"><Mail size={14}/>info@schoolexpert.in</a>}
            </section>)}
          </div>
        </article>

        <div className="mt-7 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#dceafa] bg-white/75 px-5 py-4 sm:flex-row sm:items-center"><p className="text-[13px] text-[#60738e]">For grievances, refer to the Privacy Centre or contact our team.</p><a href="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2875c8] transition hover:text-[#125cae] hover:underline">Contact Us <span aria-hidden="true">→</span></a></div>
      </div>
    </section>
  );
}
