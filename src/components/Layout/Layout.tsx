import { useEffect, type ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const handleAnchor = () => {
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(decodeURIComponent(id))?.scrollIntoView({ behavior: 'smooth' });
    };
    const timer = window.setTimeout(handleAnchor, 80);
    window.addEventListener('hashchange', handleAnchor);
    return () => { window.clearTimeout(timer); window.removeEventListener('hashchange', handleAnchor); };
  }, []);
  return <div className="flex min-h-dvh flex-col overflow-x-clip"><Navbar /><main id="main" className="flex-1">{children}</main><Footer /></div>;
}
