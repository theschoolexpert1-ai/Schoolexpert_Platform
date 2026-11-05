import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, CircleHelp, Search, Sparkles } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import faqGroups from './faq-data.json';

type FAQItemData = { id: number; question: string; answer_html: string };
type FAQGroupData = { title: string; description: string; items: FAQItemData[] };
const groups = faqGroups as FAQGroupData[];
const faqGroupsOnly = groups.filter(group => group.title !== 'Important Note');
const importantNote = groups.find(group => group.title === 'Important Note')?.items[0];
const totalQuestions = faqGroupsOnly.reduce((total, group) => total + group.items.length, 0);

function FAQItem({ item, open, onToggle }: { item: FAQItemData; open: boolean; onToggle: () => void }) {
  const panelId = `faq-answer-${item.id}`;
  return (
    <div className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${open ? 'border-[#b9d8f8] bg-white shadow-[0_10px_28px_rgba(35,91,145,.07)]' : 'border-[#e0ecf8] bg-white/75 hover:border-[#c8def5]'}`}>
      <button type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[18px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#d7eaff]">
        <span className="flex min-w-0 items-start gap-3"><span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg text-[12px] font-bold ${open ? 'bg-[#e8f3ff] text-[#2875c8]' : 'bg-[#f1f7fe] text-[#6485ae]'}`}>{item.id}</span><span className="text-[14px] font-semibold leading-6 text-[#18345c] sm:text-[15px]">{item.question}</span></span>
        <ChevronDown size={19} className={`shrink-0 text-[#3979cf] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && <motion.div id={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: 'easeInOut' }} className="overflow-hidden">
          <div className="border-t border-[#e8f0f9] px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pl-[4.25rem]">
            <div className="faq-answer space-y-3 text-[14px] leading-[1.8] text-[#536985] sm:text-[15px]" dangerouslySetInnerHTML={{ __html: item.answer_html }} />
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default function FAQs() {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const filteredGroups = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return faqGroupsOnly;
    return faqGroupsOnly.map(group => ({ ...group, items: group.items.filter(item => `${item.question} ${item.answer_html.replace(/<[^>]+>/g, ' ')}`.toLowerCase().includes(term)) })).filter(group => group.items.length > 0);
  }, [query]);
  const resultCount = filteredGroups.reduce((total, group) => total + group.items.length, 0);

  useDocumentMeta({ title: 'Frequently Asked Questions', description: 'Find answers about The School Expert™, registration, verification, WhatsApp groups, the Founding Partner Programme and collaboration.', canonicalPath: '/faqs' });

  return (
    <section className="relative isolate min-h-[calc(100svh-140px)] overflow-hidden bg-[linear-gradient(135deg,#fbfdff_0%,#f2f8ff_55%,#eaf5ff_100%)] py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-8 -z-10 size-[34rem] rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full bg-[#d7edff]/70 blur-3xl" />

      <div className="mx-auto w-full px-5 sm:px-7" style={{ width: 'calc(100% - 40px)', maxWidth: '1000px', boxSizing: 'border-box' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe4fb] bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2875c8] shadow-sm"><Sparkles size={14} /> Help & information</div>
            <h1 className="mt-5 text-[2.15rem] font-bold leading-[1.12] tracking-[-0.035em] text-[#10234f] sm:text-[2.5rem] lg:text-[2.85rem]">Frequently Asked <span className="text-[#3979cf]">Questions</span></h1>
            <p className="mt-3 max-w-[650px] text-[15px] leading-relaxed text-[#5b6f8d] sm:text-base">Find clear answers about The School Expert™, registration, professional categories and partnerships.</p>
          </div>
          <a href="/" className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#b9d8f8] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#17477e] shadow-[0_5px_18px_rgba(31,91,148,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[#3886d8] hover:bg-white hover:text-[#086fc8] hover:shadow-[0_10px_24px_rgba(31,91,148,.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8dcff]"><ArrowLeft size={17} className="transition-transform duration-200 group-hover:-translate-x-1" />Back to Home</a>
        </motion.div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-[#c9def4] via-[#dce9f7] to-transparent sm:my-10" />

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }} className="mb-8 rounded-[24px] border border-[#d8e9fb] bg-white/85 p-5 shadow-[0_14px_40px_rgba(33,83,135,.05)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[#edf6ff] text-[#347bd0]"><CircleHelp size={22}/></span><div><h2 className="text-[17px] font-bold text-[#10234f]">How can we help?</h2><p className="mt-0.5 text-[13px] text-[#71839c]">Browse topics or search all {totalQuestions} questions.</p></div></div>
            <label className="relative block w-full sm:max-w-[360px]"><span className="sr-only">Search frequently asked questions</span><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c96b5]"/><input value={query} onChange={event => { setQuery(event.target.value); setOpenId(null); }} placeholder="Search a question..." className="h-12 w-full rounded-full border border-[#d7e6f6] bg-[#f9fcff] pl-11 pr-4 text-[14px] text-[#18345c] outline-none transition placeholder:text-[#91a3b9] focus:border-[#78b3ed] focus:ring-4 focus:ring-[#e6f3ff]" /></label>
          </div>
          {query.trim() && <p className="mt-4 text-[12px] font-medium text-[#71839c]" aria-live="polite">{resultCount} {resultCount === 1 ? 'matching question' : 'matching questions'} found</p>}
        </motion.div>

        <div className="space-y-8">
          {filteredGroups.map((group, groupIndex) => (
            <motion.section key={group.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: Math.min(groupIndex * 0.04, 0.2) }}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><h2 className="text-[18px] font-bold tracking-[-0.02em] text-[#10234f] sm:text-[20px]">{group.title}</h2><p className="mt-1 text-[13px] text-[#71839c]">{group.description}</p></div><span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[11px] font-semibold text-[#3979cf]">{group.items.length} {group.items.length === 1 ? 'question' : 'questions'}</span></div>
              <div className="space-y-3">{group.items.map(item => <FAQItem key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId(current => current === item.id ? null : item.id)} />)}</div>
            </motion.section>
          ))}
          {filteredGroups.length === 0 && <div className="rounded-2xl border border-dashed border-[#c8def5] bg-white/70 px-6 py-12 text-center"><Search size={25} className="mx-auto text-[#80a9d5]"/><h2 className="mt-3 text-base font-semibold text-[#18345c]">No matching questions</h2><p className="mt-1 text-sm text-[#71839c]">Try another keyword or clear your search.</p><button type="button" onClick={() => setQuery('')} className="mt-4 rounded-full border border-[#b9d8f8] bg-white px-4 py-2 text-sm font-semibold text-[#2875c8] transition hover:bg-[#f2f8ff]">Clear search</button></div>}
        </div>

        {!query.trim() && importantNote && <motion.aside initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }} className="faq-answer mt-9 rounded-[22px] border border-[#cfe3f8] bg-[linear-gradient(120deg,#f4faff_0%,#eaf5ff_100%)] p-5 text-[13px] leading-[1.8] text-[#536985] sm:p-6"><h2 className="mb-3 text-[16px] font-bold text-[#18345c]">Important Note</h2><div className="space-y-2" dangerouslySetInnerHTML={{ __html: importantNote.answer_html }} /></motion.aside>}

        <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-2xl border border-[#dceafa] bg-white/70 px-5 py-4 sm:flex-row sm:items-center"><p className="text-[13px] text-[#60738e]">Still have a question? Contact our team for assistance.</p><a href="/contact" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2875c8] transition hover:text-[#125cae] hover:underline">Contact Us <span aria-hidden="true">→</span></a></div>
      </div>
    </section>
  );
}
