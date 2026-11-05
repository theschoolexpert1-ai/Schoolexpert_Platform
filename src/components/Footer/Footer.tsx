import { Linkedin, Instagram, ShieldCheck } from 'lucide-react';
import { Logo } from '../Logo/Logo';

const groups = [
  { title: 'Explore', links: [['Schools', '/schools'], ['Parents', '/parents'], ['Teachers', '/teachers'], ['Vendors', '/vendors']] },
  { title: 'Company', links: [['About Us', '/about'], ['Our Services', '#services'], ['Why Choose Us', '#why-choose-us'], ['Contact Us', '/contact']] },
  { title: 'Legal', links: [['FAQs', '/faqs'], ['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms-and-conditions'], ['Cookie Policy', '/cookie-policy']] },
];
const socials = [
  ['LinkedIn', Linkedin, 'text-[#0878c9]', 'https://www.linkedin.com/company/the-school-expert'],
  ['Instagram', Instagram, 'text-[#d629a8]', 'https://www.instagram.com/theschoolexpert.in?srtk=MTlybmpjcW5xZTU5MQ=='],
] as const;

export default function Footer() {
  const go = (href: string) => { if (href.startsWith('/')) { window.location.href = href; return; } const target = document.querySelector(href); if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' }); else window.location.href = `/${href}`; };
  return <footer className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#ffffff_0%,#f8fcff_58%,#f1f9ff_100%)] text-[#071f49]">
    <svg className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[180px] w-full" viewBox="0 0 1600 220" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90C180 65 250 180 480 150S760 55 960 95s350 95 500 35 110-40 140-40v130H0Z" fill="#d8efff"/><path d="M0 150C220 115 330 215 550 185s300-100 500-65 350 100 550 25v75H0Z" fill="#bfe3ff" opacity=".8"/></svg>
    <div className="container-page grid gap-9 py-10 sm:py-12 lg:grid-cols-[1.8fr_repeat(3,1fr)] lg:gap-0 lg:py-16">
      <div className="max-w-[440px] lg:pr-10"><Logo className="[&>img]:h-[46px] [&>img]:w-[80px]"/><p className="mt-5 text-[14px] leading-[1.65] text-[#203a5e] sm:text-[15px]">India’s trusted education ecosystem connecting parents, schools, teachers, experts and education partners.</p><div className="mt-7 flex gap-4">{socials.map(([label, Icon, tone, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit The School Expert on ${label}`} className="grid size-12 place-items-center rounded-[17px] border border-[#acd7ff] bg-white/70 transition hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168ce0]"><Icon size={24} className={tone}/></a>)}</div></div>
      {groups.map((group, index) => <div key={group.title} className={`lg:border-l lg:border-[#c9d8e8] lg:px-7 ${index === 2 ? 'lg:pr-0' : ''}`}><h3 className="text-[17px] font-bold text-[#071f49] sm:text-lg">{group.title}</h3><span className="mt-3 block h-1.5 w-14 rounded-full bg-[#168ce0]"/><ul className="mt-5 space-y-3">{group.links.map(([label, href]) => <li key={label}><button onClick={() => go(href)} className="text-[13px] text-[#152e53] transition hover:text-[#087bd5] sm:text-[14px]">{label}</button></li>)}</ul></div>)}
    </div>
    <div className="container-page border-t border-[#a9c9e8] py-5"><div className="flex flex-col gap-4 text-sm text-[#142e53] sm:flex-row sm:items-center sm:justify-between sm:text-base"><p>© {new Date().getFullYear()} The School Expert™. All rights reserved.</p><p className="flex items-center gap-3"><ShieldCheck size={30} className="shrink-0 text-[#087bd5]"/> A Safer, Inclusive and Trusted Education Platform for India</p></div></div>
  </footer>;
}
