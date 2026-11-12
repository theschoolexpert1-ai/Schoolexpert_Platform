import { ArrowLeft } from 'lucide-react';
import { buttonClasses } from '@/components/Button/Button';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({ title: 'Page not found', noIndex: true, canonicalPath: null });
  return (
    <section className="bg-light-blue py-20 text-center">
      <div className="container-page">
        <p className="eyebrow">404</p>
        <h1 className="section-title mt-3">Page not found</h1>
        <p className="section-lead">The page you requested does not exist. Return home to explore The School Expert.</p>
        <a href="/" className={buttonClasses('primary', 'lg', 'mt-8')}><ArrowLeft size={18} /> Back to Home</a>
      </div>
    </section>
  );
}
