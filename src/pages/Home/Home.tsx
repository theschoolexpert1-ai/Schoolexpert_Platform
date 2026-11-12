import Hero from '@/components/Hero/Hero';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import AboutSection from './sections/AboutSection';
import FinalCtaSection from './sections/FinalCtaSection';
import FoundingPartnerSection from './sections/FoundingPartnerSection';
import ServicesSection from './sections/ServicesSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';

export default function Home() {
  useDocumentMeta({});
  return (
    <>
      <Hero />
      <FoundingPartnerSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <FinalCtaSection />
    </>
  );
}
