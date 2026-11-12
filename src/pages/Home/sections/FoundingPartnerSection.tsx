import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Award, Eye, Sparkles, Star } from 'lucide-react';

const highlights = [
  {
    icon: Award,
    title: 'Lifetime Recognition',
    description: 'Receive recognition through a lifetime Founding Partner badge.',
  },
  {
    icon: Eye,
    title: 'Enhanced Visibility',
    description: 'Explore opportunities for increased visibility through relevant platform initiatives.',
  },
  {
    icon: Star,
    title: 'Priority Opportunities',
    description: 'Explore priority access to events and relevant initiatives, subject to programme terms.',
  },
];

export default function FoundingPartnerSection() {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section aria-labelledby="founding-partner-promo-heading" className="overflow-hidden bg-white py-10 sm:py-12">
      <div className="container-page">
        <motion.div
          {...reveal}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#061f42] via-[#083d74] to-[#0874b9] px-5 py-8 shadow-[0_24px_70px_-30px_rgba(6,31,66,0.65)] sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-[#8fd3ff]/20 blur-2xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 left-[34%] size-72 rounded-full bg-[#16a8ee]/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)] bg-[size:24px_24px] opacity-30" />

          <div className="relative grid items-center gap-9 lg:grid-cols-[1.02fr_.98fr] lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#bde6ff] backdrop-blur-sm">
                <Sparkles size={14} aria-hidden="true" />
                An Exclusive Opportunity
              </div>
              <h2 id="founding-partner-promo-heading" className="mt-5 max-w-2xl text-[2rem] font-bold leading-[1.12] tracking-[-0.035em] text-white sm:text-[2.55rem] lg:text-[3rem]">
                Become a <span className="bg-gradient-to-r from-[#a9e0ff] to-white bg-clip-text text-transparent">Founding Partner</span> of The School Expert™
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#d9edff] sm:text-base">
                Join The School Expert™ Founding Partner Programme and explore opportunities to strengthen your organisation&apos;s presence, visibility, and connections within India&apos;s education ecosystem.
              </p>
              <a
                href="/founding-partner-programme"
                className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#07376b] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eef9ff] hover:shadow-[0_15px_36px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#8fd3ff]/50"
              >
                Explore Founding Partner Programme
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>

            <motion.div
              {...(reduceMotion ? {} : { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 } })}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
              className="relative rounded-[24px] border border-white/20 bg-white/[0.11] p-4 shadow-[0_24px_55px_-30px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-5"
            >
              <div className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.12] p-4 sm:p-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#bde6ff] text-[#075d98] shadow-lg sm:size-16">
                  <Award size={32} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a9dcff]">Recognition</p>
                  <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">Founding Partner</h3>
                  <p className="mt-1 text-xs text-[#d9edff]">The School Expert™</p>
                </div>
              </div>

              <ul className="mt-4 grid gap-3">
                {highlights.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="group flex gap-3 rounded-2xl border border-white/10 bg-[#061f42]/25 p-3.5 transition-colors duration-200 hover:bg-white/[0.1] sm:p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-[#a9dcff]">
                      <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white">{title}</h3>
                      <p className="mt-1 text-xs leading-[1.55] text-[#cfe7fa]">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
