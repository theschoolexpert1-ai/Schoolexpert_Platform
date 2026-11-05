import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Globe, Mail, Phone, Sparkles } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const contactRows = [
  { label: 'Website', value: 'www.schoolexpert.in', href: 'https://www.schoolexpert.in', icon: Globe },
  { label: 'Email', value: 'info@schoolexpert.in', href: 'mailto:info@schoolexpert.in', icon: Mail },
  { label: 'Phone', value: '9972915700', href: 'tel:9972915700', icon: Phone },
];

export default function Contact() {
  useDocumentMeta({
    title: 'Contact Us',
    description: 'Contact The School Expert™ by Poornaphala Media and Infotech Services LLP.',
    canonicalPath: '/contact',
  });

  return (
    <section className="relative isolate min-h-[calc(100svh-140px)] overflow-hidden bg-[linear-gradient(135deg,#fbfdff_0%,#f2f8ff_55%,#eaf5ff_100%)] py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-8 -z-10 size-[34rem] rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full bg-[#d7edff]/70 blur-3xl" />

      <div className="mx-auto w-full px-5 sm:px-7" style={{ width: 'calc(100% - 40px)', maxWidth: '1000px', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe4fb] bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2875c8] shadow-sm">
              <Sparkles size={14} /> Get in touch
            </div>
            <h1 className="mt-5 text-[2.15rem] font-bold leading-[1.12] tracking-[-0.035em] text-[#10234f] sm:text-[2.5rem] lg:text-[2.85rem]">Contact <span className="text-[#3979cf]">Us</span></h1>
            <p className="mt-3 text-[15px] font-semibold text-[#5b6f8d] sm:text-base lg:text-[17px]">The School Expert™</p>
          </div>
          <a href="/" className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#b9d8f8] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#17477e] shadow-[0_5px_18px_rgba(31,91,148,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[#3886d8] hover:bg-white hover:text-[#086fc8] hover:shadow-[0_10px_24px_rgba(31,91,148,.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8dcff">
            <ArrowLeft size={17} className="transition-transform duration-200 group-hover:-translate-x-1" /> Back to Home
          </a>
        </motion.div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-[#c9def4] via-[#dce9f7] to-transparent sm:my-10" />

        <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }} className="relative overflow-hidden rounded-[26px] border border-[#d8e9fb] bg-white/90 px-6 py-8 shadow-[0_20px_60px_rgba(33,83,135,.07)] backdrop-blur-sm sm:rounded-[30px] sm:px-10 sm:py-10 lg:px-12 lg:py-11">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[radial-gradient(circle,#e7f3ff_0%,rgba(231,243,255,0)_70%)]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#edf6ff] text-[#347bd0]"><Building2 size={22} /></span>
              <div><h2 className="text-[21px] font-bold tracking-[-0.02em] text-[#10234f] sm:text-[23px]">The School Expert™</h2><p className="mt-1.5 text-[14px] leading-relaxed text-[#60738e] sm:text-[15px]">Poornaphala Media and Infotech Services LLP</p></div>
            </div>
            <div className="mt-7 divide-y divide-[#dce9f7] border-y border-[#dce9f7]">
              {contactRows.map(({ label, value, href, icon: Icon }) => (
                <div key={label} className="grid gap-2 py-4 sm:grid-cols-[minmax(130px,0.7fr)_1.8fr] sm:items-center sm:py-5">
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-[#5b6f8d] sm:text-[15px]"><Icon size={17} className="text-[#3979cf] sm:hidden" />{label}</div>
                  <a href={href} target={label === 'Website' ? '_blank' : undefined} rel={label === 'Website' ? 'noopener noreferrer' : undefined} className="w-fit text-[15px] font-medium text-[#3979cf] transition-colors hover:text-[#125cae] hover:underline sm:text-[16px]">{value}</a>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
