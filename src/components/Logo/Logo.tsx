import { site } from '@/config/site';
import { cn } from '@/utils/cn';

interface LogoProps {
  variant?: 'default' | 'light';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Shared brand lockup used in the navbar, modal and footer.
 */
export function Logo({ variant = 'default', className, onClick }: LogoProps) {
  const light = variant === 'light';
  return (
    <a href="#top" onClick={onClick} className={cn('group inline-flex shrink-0 items-center', className)} aria-label={`${site.brand} — home`}>
      <img src={light ? site.logoLight : site.logo} alt={site.brand} width={1306} height={749} className="h-[29px] w-[51px] object-contain sm:h-[32px] sm:w-[56px]" decoding="async" />
    </a>
  );
}
