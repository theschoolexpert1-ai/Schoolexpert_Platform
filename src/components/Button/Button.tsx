import { LoaderCircle } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60 active:translate-y-px';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-dark focus-visible:ring-primary/30',
  secondary: 'bg-secondary text-white hover:bg-primary focus-visible:ring-secondary/30',
  outline: 'border border-line bg-white text-ink hover:border-primary hover:text-primary focus-visible:ring-primary/20',
  ghost: 'text-primary hover:bg-light-blue focus-visible:ring-primary/20',
  light: 'bg-white text-navy-900 shadow-sm hover:bg-light-blue focus-visible:ring-white/40',
  'outline-light': 'border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:ring-white/30',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-[52px] px-7 text-base',
};

export const buttonClasses = (variant: Variant = 'primary', size: Size = 'md', className?: string) =>
  cn(base, variants[variant], sizes[size], className);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, disabled, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
});

