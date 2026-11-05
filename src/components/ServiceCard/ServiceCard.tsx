import { motion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface Service {
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  cta: string;
  to: string;
  tint: string;
  iconTone: string;
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <motion.a
      href={service.to}
      aria-label={`${service.cta} — ${service.description}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.055, duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
      whileTap={{ scale: 0.985 }}
      className={cn(
        'group relative flex min-h-[195px] flex-col rounded-[18px] p-5 shadow-[0_5px_18px_rgba(15,65,105,0.035)]',
        'transform-gpu transition-[box-shadow,background-color] duration-300 ease-out',
        'hover:shadow-[0_18px_38px_rgba(24,93,145,0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/70',
        service.tint,
      )}
    >
      <Icon className={cn('mb-3 size-9 transition-transform duration-300 ease-out group-hover:scale-110', service.iconTone)} strokeWidth={2.5} />
      <h3 className="text-[17px] font-bold text-[#071f49]">{service.title}</h3>
      <p className="mt-2 max-w-[260px] text-[14px] leading-[1.55] text-[#102b53]">{service.description}</p>
      <span className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-white text-[#092d5e] shadow-sm transition-[transform,box-shadow] duration-300 ease-out group-hover:translate-x-1 group-hover:shadow-md">
        <ArrowRight size={19} />
      </span>
    </motion.a>
  );
}
