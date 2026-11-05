import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/Button/Button';
import { useRoleModal } from '@/context/RoleModalContext';

export default function FinalCtaSection() {
  const { openRoleModal } = useRoleModal();
  return (
    <section aria-labelledby="cta-heading" className="bg-[#f1faff] py-5 sm:py-7">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-700 px-6 py-7 text-center shadow-[var(--shadow-card-hover)] sm:px-10 sm:py-8 lg:flex lg:items-center lg:gap-10 lg:text-left">
          <svg
            className="absolute inset-0 -z-10 h-full w-full"
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0 260c200-60 380 40 600-10s420-90 600-40v110H0z" fill="#fff" fillOpacity=".05" />
            <circle cx="1100" cy="40" r="160" fill="#8FD3FF" fillOpacity=".08" />
          </svg>
          <span className="mx-auto grid size-16 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 lg:mx-0 lg:size-20">
            <BookOpen className="size-8 text-sky-accent lg:size-10" strokeWidth={1.6} aria-hidden />
          </span>
          <div className="mt-6 lg:mt-0 lg:flex-1">
            <h2 id="cta-heading" className="text-[1.55rem] font-bold text-white sm:text-[1.85rem]">
              Explore. Connect. Grow in Education.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[14px] leading-relaxed text-white/80 sm:text-[15px] lg:mx-0">
              Be part of a stronger, more connected K-12 education community with The School Expert.
            </p>
          </div>
          <Button variant="light" size="lg" className="mt-8 lg:mt-0" onClick={openRoleModal} aria-haspopup="dialog">
            Explore the Platform <ArrowRight className="size-[18px]" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
