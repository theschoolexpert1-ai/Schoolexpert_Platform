import { type ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-dvh flex-col overflow-x-clip"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3">Skip to main content</a><Navbar /><main id="main" tabIndex={-1} className="flex-1">{children}</main><Footer /></div>;
}
