import { GraduationCap, Handshake, School, Users } from 'lucide-react';
import { ServiceCard, type Service } from '@/components/ServiceCard/ServiceCard';

const services: Service[] = [
  {
    title: 'For Schools',
    icon: School,
    description: 'Showcase your school, reach interested parents and build your presence.',
    cta: 'Explore Schools',
    to: '/schools',
    tint: 'bg-[#e3f2fb]',
    iconTone: 'text-primary',
  },
  {
    title: 'For Parents',
    icon: Users,
    description: "Discover the right schools, access helpful resources ,support your child's learning journey and more.",
    cta: 'Explore for Parents',
    to: '/parents',
    tint: 'bg-[#fdeee2]',
    iconTone: 'text-[#b85c1c]',
  },
  {
    title: 'For Teachers',
    icon: GraduationCap,
    description: 'Connect with your community and explore teaching opportunities, learning resources, professional growth and more.',
    cta: 'Explore for Teachers',
    to: '/teachers',
    tint: 'bg-[#e2f3e8]',
    iconTone: 'text-[#25774a]',
  },
  {
    title: 'For Vendors',
    icon: Handshake,
    description: 'Connect with schools and the education community to share your services and solutions.',
    cta: 'Explore Vendors',
    to: '/vendors',
    tint: 'bg-[#ede7f8]',
    iconTone: 'text-[#6a4bb0]',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white py-10 sm:py-12">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Our Services</p>
          <h2 id="services-heading" className="section-title mt-3">
            A Complete Education Ecosystem
          </h2>
          <p className="section-lead">Tools, resources and connections for every stakeholder in education.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
