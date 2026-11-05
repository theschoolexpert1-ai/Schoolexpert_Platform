import { useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  /** Rendered when the image file is missing, so layouts never show a broken icon. */
  fallback: ReactNode;
}

/**
 * Lazy-loaded image that degrades to a designed fallback when the asset
 * hasn't been supplied yet (see /public/images/README.md).
 */
export function SmartImage({ src, alt, width, height, className, priority, fallback }: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('h-auto max-w-full', className)}
    />
  );
}
