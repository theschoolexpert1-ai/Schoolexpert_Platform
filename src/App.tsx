import { MotionConfig } from 'framer-motion';
import { RoleModalProvider } from './context/RoleModalContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import FAQs from './pages/FAQs/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import CookiePolicy from './pages/CookiePolicy/CookiePolicy';

const audienceRoutes: Record<string, 'schools' | 'parents' | 'teachers' | 'vendors'> = {
  '/schools': 'schools', '/for/schools': 'schools',
  '/parents': 'parents', '/for/parents': 'parents',
  '/teachers': 'teachers', '/for/teachers': 'teachers',
  '/vendors': 'vendors', '/for/vendors': 'vendors',
};

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '') || '/';
  const audience = audienceRoutes[pathname];
  return (
    <MotionConfig reducedMotion="user">
      <RoleModalProvider>
        <Layout>
          {pathname === '/cookie-policy' || pathname === '/cookies' ? <CookiePolicy /> : pathname === '/terms-and-conditions' || pathname === '/terms' ? <TermsConditions /> : pathname === '/privacy-policy' || pathname === '/privacy' ? <PrivacyPolicy /> : pathname === '/about' || pathname === '/about-us' ? <About /> : pathname === '/contact' || pathname === '/contact-us' ? <Contact /> : pathname === '/faqs' || pathname === '/faq' ? <FAQs /> : audience ? <ComingSoon audience={audience} /> : <Home />}
        </Layout>
      </RoleModalProvider>
    </MotionConfig>
  );
}
