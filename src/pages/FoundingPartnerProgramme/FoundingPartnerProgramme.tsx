import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarCheck,
  Eye,
  Handshake,
  Mail,
  Megaphone,
  Network,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { buttonClasses } from '@/components/Button/Button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

const applicationEmail = 'shalini@schoolexpert.in';
const applicationSubject = 'Founding Partner Application';
const exclusivitySubject = 'Exclusive Founding Partners Application';
const applicationMailto = `mailto:${applicationEmail}?subject=${encodeURIComponent(applicationSubject)}`;
const exclusivityMailto = `mailto:${applicationEmail}?subject=${encodeURIComponent(exclusivitySubject)}`;

const benefits = [
  {
    icon: ReceiptText,
    title: 'One-Time Registration Fee',
    description: 'A one-time registration fee applies at the time of registration.',
  },
  {
    icon: CalendarCheck,
    title: 'Three-Year Waiver of Annual Renewal Fees',
    description: 'Founding Partners are exempt from annual renewal fees for the first three years from their date of registration with The School Expert™.',
  },
  {
    icon: Award,
    title: 'Lifetime Founding Partner Badge',
    description: 'Recognition of their status as a Founding Partner of The School Expert™.',
  },
  {
    icon: UsersRound,
    title: 'Invitation to Participate in Committees and Councils',
    description: 'Opportunities to be invited to participate in The School Expert™ committees and councils that contribute towards shaping and strengthening the education ecosystem.',
  },
  {
    icon: Sparkles,
    title: 'Priority Access to Events',
    description: 'Priority access to events hosted by The School Expert™.',
  },
  {
    icon: Eye,
    title: 'Enhanced Visibility',
    description: 'Increased visibility through relevant platform initiatives and promotional activities.',
  },
  {
    icon: Network,
    title: 'Partner References and Introductions',
    description: 'We take our references to our Founding Partners wherever we go, helping create relevant opportunities for visibility, introductions and collaboration.',
  },
  {
    icon: Megaphone,
    title: 'Selected Marketing Opportunities',
    description: 'Potential inclusion in relevant events, communications, newsletters and other promotional initiatives, where applicable.',
  },
] as const;

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.45, ease: 'easeOut' as const },
};

export default function FoundingPartnerProgramme() {
  useDocumentMeta({
    title: 'Founding Partner Programme',
    description: 'Explore The School Expert™ Founding Partner Programme, including potential benefits, category exclusivity and application details.',
    canonicalPath: '/founding-partner-programme',
  });

  return (
    <div className="overflow-hidden bg-white text-[#071f49]">
      <section className="relative isolate overflow-hidden bg-[linear-gradient(125deg,#f9fcff_0%,#edf7ff_55%,#e2f2ff_100%)] py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-44 -z-10 size-[34rem] rounded-full bg-white/70 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-28 -z-10 size-[28rem] rounded-full bg-[#cce9ff]/60 blur-3xl" />
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#bedefa] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#176fbb] shadow-sm">
              <Handshake size={16} /> Partner with purpose
            </p>
            <h1 className="mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#071f49]">
              Founding Partner <span className="text-[#197bc8]">Programme</span>
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-[1.7] text-[#38536f] sm:text-lg">
              Build a stronger presence within India&apos;s education ecosystem.
            </p>
            <a href={applicationMailto} className={buttonClasses('primary', 'lg', 'mt-8 w-full sm:w-auto')}>
              Apply to Become a Founding Partner <ArrowRight size={19} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }} className="relative mx-auto w-full max-w-[470px]">
            <div className="rounded-[32px] border border-white/90 bg-white/80 p-7 shadow-[0_24px_70px_rgba(26,91,145,.14)] backdrop-blur-sm sm:p-9">
              <div className="grid size-16 place-items-center rounded-2xl bg-[#e7f4ff] text-[#197bc8]"><BadgeCheck size={34} /></div>
              <h2 className="mt-6 text-2xl font-bold">Grow with the ecosystem</h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-[#536985]">Build meaningful visibility, connections and participation through an association shaped around agreed terms.</p>
              <div className="mt-7 flex items-center gap-3 border-t border-[#dceaf7] pt-5 text-sm font-semibold text-[#315579]">
                <ShieldCheck className="shrink-0 text-[#197bc8]" size={22} /> Eligibility and arrangements are confirmed individually.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-20" aria-labelledby="programme-introduction">
        <motion.div {...reveal} className="container-page">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-[#d9e9f8] bg-[#f8fcff] px-6 py-8 shadow-[0_14px_42px_rgba(32,89,139,.06)] sm:px-10 sm:py-10">
            <p className="eyebrow">About the programme</p>
            <h2 id="programme-introduction" className="mt-3 text-[1.7rem] font-bold leading-tight sm:text-[2.15rem]">What is The School Expert™ Founding Partner Programme?</h2>
            <p className="mt-5 text-[15px] leading-[1.8] text-[#405675] sm:text-base">The Founding Partner Programme is designed for eligible registered vendors, institutions, businesses and organisations that wish to build a stronger presence within India’s education ecosystem and contribute to its growth.</p>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#f2f9ff] py-14 sm:py-18 lg:py-20" aria-labelledby="programme-benefits">
        <div className="container-page">
          <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Programme benefits</p>
            <h2 id="programme-benefits" className="section-title mt-3">What are the benefits of becoming a Founding Partner?</h2>
            <p className="section-lead">Depending on the terms of our association, Founding Partners may receive the following benefits:</p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2), ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="rounded-[22px] border border-[#d7e8f8] bg-white p-6 shadow-[0_8px_28px_rgba(26,83,133,.06)]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-[#eaf5ff] text-[#197bc8]"><Icon size={25} /></span>
                <h3 className="mt-5 text-[17px] font-bold leading-snug">{title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-[#536985]">{description}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside {...reveal} className="mt-8 flex items-start gap-4 rounded-[22px] border border-[#bcdcf6] bg-[#eaf6ff] p-5 sm:p-6" aria-label="Important programme conditions">
            <ShieldCheck className="mt-0.5 shrink-0 text-[#197bc8]" size={25} />
            <div>
              <h3 className="font-bold text-[#17365f]">Important conditions</h3>
              <p className="mt-1 text-sm leading-[1.7] text-[#48627e]">All benefits are subject to the agreed terms and conditions of our association. Specific benefits, eligibility and participation arrangements will be confirmed individually.</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="py-14 sm:py-18 lg:py-20" aria-labelledby="programme-exclusivity">
        <div className="container-page">
          <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Category exclusivity</p>
            <h2 id="programme-exclusivity" className="section-title mt-3">Founding Partner exclusivity</h2>
          </motion.div>
          <div className="mx-auto mt-9 grid max-w-5xl gap-5 lg:grid-cols-2">
            <motion.article {...reveal} className="rounded-[24px] border border-[#d9e8f6] bg-white p-6 shadow-[0_12px_36px_rgba(33,83,135,.06)] sm:p-8">
              <h3 className="text-lg font-bold leading-snug">Can The School Expert™ have more than one Founding Partner in the same category?</h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#536985]">Yes. The School Expert™ may have multiple Founding Partners within the same category. Founding Partner status does not automatically grant category exclusivity.</p>
            </motion.article>
            <motion.article {...reveal} className="rounded-[24px] border border-[#bcdcf6] bg-[#f5faff] p-6 shadow-[0_12px_36px_rgba(33,83,135,.06)] sm:p-8">
              <h3 className="text-lg font-bold leading-snug">Can I apply to become an Exclusive Founding Partner in my category?</h3>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#536985]">Yes. If you are interested in exploring category exclusivity, please email <a className="font-semibold text-[#197bc8] hover:underline" href={`mailto:${applicationEmail}`}>{applicationEmail}</a> with the subject line:</p>
              <p className="mt-3 font-bold text-[#17365f]">Exclusive Founding Partners Application</p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[#536985]">Exclusive Founding Partner applications will be reviewed separately. Exclusivity is not automatic and will apply only if expressly agreed in writing by The School Expert™.</p>
              <a href={exclusivityMailto} className={buttonClasses('outline', 'md', 'mt-6 w-full sm:w-auto')}><Mail size={17} /> Apply for Category Exclusivity</a>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="bg-[#f1faff] py-10 sm:py-14" aria-labelledby="programme-application">
        <div className="container-page">
          <motion.div {...reveal} className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 px-6 py-9 text-center text-white shadow-[var(--shadow-card-hover)] sm:px-10 sm:py-11 lg:flex lg:items-center lg:gap-10 lg:text-left">
            <div aria-hidden="true" className="absolute -right-20 -top-32 -z-10 size-80 rounded-full border-[28px] border-white/5" />
            <span className="mx-auto grid size-16 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 lg:mx-0"><Mail size={30} className="text-[#8fd3ff]" /></span>
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <h2 id="programme-application" className="text-[1.55rem] font-bold text-white sm:text-[1.85rem]">How do I apply for the Founding Partner Programme?</h2>
              <p className="mt-3 text-[14px] leading-[1.75] text-white/85 sm:text-[15px]">Please email your organisation’s profile, details of your services and a brief proposal to <a className="font-semibold text-white underline decoration-white/50 underline-offset-4" href={`mailto:${applicationEmail}`}>{applicationEmail}</a> with the subject line Founding Partner Application.</p>
              <p className="mt-2 text-sm font-semibold text-[#bcdfff]">Applications are subject to review, suitability and mutually agreed terms.</p>
            </div>
            <a href={applicationMailto} className={buttonClasses('light', 'lg', 'mt-8 w-full sm:w-auto lg:mt-0')}>Apply Now <ArrowRight size={18} /></a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
