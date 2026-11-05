import Hero from '@/components/Hero/Hero';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import AboutSection from './sections/AboutSection';
import FinalCtaSection from './sections/FinalCtaSection';
import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';

export default function Home() {
  useDocumentMeta({});
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <FinalCtaSection />
    </>
  );
}
