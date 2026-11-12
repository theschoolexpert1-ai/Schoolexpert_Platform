import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { RoleModalProvider } from './context/RoleModalContext';
import Layout from './components/Layout/Layout';
import PageErrorBoundary from './components/PageErrorBoundary';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import { resolveRoute } from './config/routes';
import { scrollToHash } from './utils/navigation';

const About = lazy(() => import('./pages/About/About'));
const FoundingPartnerProgramme = lazy(() => import('./pages/FoundingPartnerProgramme/FoundingPartnerProgramme'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const FAQs = lazy(() => import('./pages/FAQs/FAQs'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions/TermsConditions'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy/CookiePolicy'));
const ComingSoon = lazy(() => import('./pages/ComingSoon/ComingSoon'));

// Commit after the lazy page is ready so direct section links can find their target.
function PageContent({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleHash = () => { scrollToHash(window.location.hash); };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  return children;
}

export default function App() {
  const route = resolveRoute(window.location.pathname);
  let page: ReactNode;
  switch (route?.page) {
    case 'home': page = <Home />; break;
    case 'founding-partner-programme': page = <FoundingPartnerProgramme />; break;
    case 'about': page = <About />; break;
    case 'contact': page = <Contact />; break;
    case 'faqs': page = <FAQs />; break;
    case 'privacy': page = <PrivacyPolicy />; break;
    case 'terms': page = <TermsConditions />; break;
    case 'cookies': page = <CookiePolicy />; break;
    case 'schools': case 'parents': case 'teachers': case 'vendors':
      page = <ComingSoon audience={route.page} />; break;
    default: page = <NotFound />;
  }
  return (
    <MotionConfig reducedMotion="user">
      <RoleModalProvider>
        <Layout>
          <PageErrorBoundary><Suspense fallback={<p role="status" className="container-page py-16 text-center">Loading page…</p>}>
            <PageContent>{page}</PageContent>
          </Suspense></PageErrorBoundary>
        </Layout>
      </RoleModalProvider>
    </MotionConfig>
  );
}
