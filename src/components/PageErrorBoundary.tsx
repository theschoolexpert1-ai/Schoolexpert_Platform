import { Component, type ReactNode } from 'react';
import { buttonClasses } from './Button/Button';

export default class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    if (this.state.failed) {
      return <section className="container-page py-20 text-center" role="alert">
        <h1 className="section-title">This page could not load</h1>
        <p className="section-lead">Check your connection and try reloading the page.</p>
        <button type="button" onClick={() => window.location.reload()} className={buttonClasses('primary', 'lg', 'mt-6')}>Reload page</button>
      </section>;
    }
    return this.props.children;
  }
}
