import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageCircleQuestion,
  UsersRound,
  Bookmark,
  House,
  BookOpen,
  Newspaper,
  Download,
} from 'lucide-react';
import { useState } from 'react';
import { Logo } from '../Logo/Logo';

const links = [
  { label: 'Schools', href: '/schools' },
  { label: 'Parents', href: '/parents' },
  { label: 'Teachers', href: '/teachers' },
  { label: 'Vendors', href: '/vendors' },
];

const moreItems = [
  { label: 'Ask The School Expert', icon: MessageCircleQuestion },
  { label: 'Parents community', icon: UsersRound },
  { label: 'Marketplace', icon: Bookmark },
  { label: 'Homeschoolers hub', icon: House },
  { label: 'The Everhungry Bookworms Reading Club', icon: BookOpen },
  { label: 'Newsworms', icon: Newspaper },
  { label: 'Worksheets & Downloads', icon: Download },
];

const registrationCentreUrl = 'https://registration.schoolexpert.in';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    setMobileMoreOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-[#d9e9f8] bg-white/95 backdrop-blur-xl">
      <nav
        className="container-page grid min-h-[70px] grid-cols-[1fr_auto_1fr] items-center gap-4"
        aria-label="Main navigation"
      >
        <Logo className="shrink-0 justify-self-start" />

        {/* The middle grid track keeps navigation centred in the viewport. */}
        <div className="hidden items-center justify-self-center gap-10 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-[14px] font-semibold text-[#071f49] transition-colors duration-200 hover:text-[#0879d5]">
              {link.label}
            </a>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-[14px] font-semibold text-[#071f49] transition-colors duration-200 hover:text-[#0879d5]"
              aria-haspopup="true"
              aria-label="More navigation options"
            >
              More <ChevronDown size={15} className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div
              className="invisible absolute top-full mt-3 w-[290px] max-w-[calc(100vw-2rem)] translate-y-1 rounded-2xl border border-[#d8e9fb] bg-white/95 p-2 opacity-0 shadow-[0_18px_55px_rgba(24,74,130,0.16)] backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
              style={{ right: 'clamp(-178px, calc(642px - 50vw), -12px)' }}
            >
              {moreItems.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go('#services')}
                  className="group/item flex min-h-[42px] w-full items-center gap-2.5 rounded-xl px-2 py-1.5 text-left text-[13px] font-semibold tracking-[-0.015em] text-[#102b53] transition-colors duration-200 hover:bg-[#f1f7ff] hover:text-[#086fc8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fc7ff]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#edf6ff] text-[#3477df] transition-colors duration-200 group-hover/item:bg-[#e2f0ff]">
                    <Icon size={19} strokeWidth={2.1} />
                  </span>
                  <span className="min-w-0 flex-1 text-[12px] leading-[1.25]">{label}</span>
                  <span className="ml-auto inline-flex w-[82px] shrink-0 items-center justify-center gap-1 rounded-full border border-[#d7e7f8] bg-[#f4f8fd] px-1.5 py-1 text-[8px] font-semibold leading-none text-[#52749b]">
                    <span className="relative flex size-1.5">
                      <span className="relative inline-flex size-1.5 rounded-full bg-[#6b9ed5]" />
                    </span>
                    Coming soon
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden justify-self-end md:block">
          <a
            href={registrationCentreUrl}
            className="group inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-full border-2 border-[#0879e8] bg-white px-6 py-2 text-[14px] font-semibold text-[#082b63] shadow-[0_4px_16px_rgba(8,121,232,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0069d9] hover:bg-[#0879e8] hover:text-white hover:shadow-[0_9px_24px_rgba(8,121,232,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
          >
            <span>Registration Centre</span>
            <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

        <button
          className="col-start-3 row-start-1 grid size-10 place-self-end place-items-center rounded-lg text-[#071f49] transition-colors hover:bg-sky-50 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-sky-100 bg-white px-5 py-4 shadow-lg md:hidden">
          <div className="container-page space-y-1">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="block w-full rounded-lg px-3 py-3 text-left font-semibold text-[#071f49] transition-colors hover:bg-sky-50">
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              aria-expanded={mobileMoreOpen}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left font-semibold text-[#071f49] transition-colors hover:bg-sky-50"
            >
              More <ChevronDown size={16} className={`transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileMoreOpen && (
              <div className="ml-2 space-y-1 border-l-2 border-[#dcecff] py-1 pl-3">
                {moreItems.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => go('#services')}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#17375e] transition-colors hover:bg-[#f1f7ff] hover:text-[#0879d5]"
                  >
                    <Icon size={18} className="shrink-0 text-[#3477df]" />
                    <span className="min-w-0 flex-1">{label}</span>
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-[#dce8f5] bg-[#f5f8fc] px-1.5 py-1 text-[9px] font-semibold leading-none text-[#607d9d]">
                      <span className="size-1.5 rounded-full bg-[#2784e8]" />
                      Coming soon
                    </span>
                  </button>
                ))}
              </div>
            )}
            <a
              href={registrationCentreUrl}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0879e8] px-5 py-3 font-bold text-white shadow-md transition-colors hover:bg-[#0069d9]"
            >
              Registration Centre <ArrowRight size={18} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
