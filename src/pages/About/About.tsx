import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, Heart, Sparkles } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const paragraphs = [
  'A Montessori-trained professional with experience in educational instruction, student counselling, and IT sales and marketing, Shalini Santhosh brings a multidisciplinary perspective to the education ecosystem. Her passion for books and meaningful learning inspired her to establish The Ever-hungry Bookworms, a reading and storytelling initiative for children.',
  'Her experiences as a parent, along with her interest in homeschooling and diverse approaches to learning, shaped her vision of creating a platform that connects parents, schools, educators, and education professionals.',
  'Through The School Expert™, she aims to bridge information gaps, bring valuable expertise into the spotlight, and foster meaningful connections that contribute to better educational experiences for every child.',
];

export default function About() {
  useDocumentMeta({
    title: 'Meet Our Founder',
    description: 'Meet Shalini Santhosh, Founder of The School Expert™, and learn about the vision behind a more connected education ecosystem.',
    canonicalPath: '/about',
  });

  return (
    <section className="relative isolate min-h-[calc(100svh-140px)] overflow-hidden bg-[linear-gradient(135deg,#fbfdff_0%,#f2f8ff_55%,#eaf5ff_100%)] py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-8 -z-10 size-[34rem] rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-40 -z-10 size-[34rem] rounded-full bg-[#d7edff]/70 blur-3xl" />

      <div
        className="mx-auto w-full px-5 sm:px-7"
        style={{ width: 'calc(100% - 40px)', maxWidth: '1000px', boxSizing: 'border-box' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe4fb] bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2875c8] shadow-sm">
              <Sparkles size={14} /> Our story
            </div>
            <h1 className="mt-5 text-[2.15rem] font-bold leading-[1.12] tracking-[-0.035em] text-[#10234f] sm:text-[2.5rem] lg:text-[2.85rem]">
              Meet Our <span className="text-[#3979cf]">Founder</span>
            </h1>
            <p className="mt-3 text-[15px] font-semibold text-[#5b6f8d] sm:text-base lg:text-[17px]">
              Shalini Santhosh <span className="mx-1.5 text-[#9bb1ca]">|</span> Founder, The School Expert™
            </p>
          </div>

          <a
            href="/"
            className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#b9d8f8] bg-white/85 px-5 py-2.5 text-sm font-semibold text-[#17477e] shadow-[0_5px_18px_rgba(31,91,148,.07)] transition duration-200 hover:-translate-y-0.5 hover:border-[#3886d8] hover:bg-white hover:text-[#086fc8] hover:shadow-[0_10px_24px_rgba(31,91,148,.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b8dcff]"
          >
            <ArrowLeft size={17} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </a>
        </motion.div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-[#c9def4] via-[#dce9f7] to-transparent sm:my-10" />

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[26px] border border-[#d8e9fb] bg-white/90 px-6 py-8 shadow-[0_20px_60px_rgba(33,83,135,.07)] backdrop-blur-sm sm:rounded-[30px] sm:px-10 sm:py-10 lg:px-14 lg:py-12"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[radial-gradient(circle,#e7f3ff_0%,rgba(231,243,255,0)_70%)]" />
          <div className="relative">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#edf6ff] text-[#347bd0]"><BookOpen size={22} /></span>
              <span className="text-[13px] font-semibold tracking-wide text-[#3472b8] sm:text-sm">The vision behind The School Expert™</span>
            </div>

            <div className="max-w-[1280px] space-y-5 sm:space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-[14px] leading-[1.75] text-[#405675] sm:text-[15px] lg:text-base lg:leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-[#e5eef8] pt-5 text-[13px] font-medium sm:text-sm text-[#627895]">
              <span className="grid size-9 place-items-center rounded-xl bg-[#f0f7ff] text-[#3979cf]"><GraduationCap size={20} /></span>
              <span className="flex items-center gap-2">A more connected learning ecosystem <Heart size={14} className="fill-[#75a9e6] text-[#75a9e6]" /></span>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
