import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { generateSeo } from '../scripts/seo.mjs';
import { loadTs } from './load-ts.mjs';

const routes = JSON.parse(readFileSync('src/config/routes.json', 'utf8'));
const { resolveRoute } = loadTs('src/config/routes.ts');
const faq = JSON.parse(readFileSync('src/pages/FAQs/faq-data.json', 'utf8'));
const { filterFAQGroups, safeAnswerHref } = loadTs('src/pages/FAQs/faq-content.ts');

test('all canonical paths, aliases and trailing slashes resolve; unknown paths do not', () => {
  const seen = new Set();
  for (const route of routes) {
    for (const path of [route.path, ...route.aliases]) {
      assert.equal(seen.has(path), false, `duplicate ${path}`);
      seen.add(path);
      assert.equal(resolveRoute(path)?.page, route.page);
      assert.equal(resolveRoute(`${path}/`)?.path, route.path);
    }
  }
  for (const path of ['/missing', '/login', '/__proto__', '/ABOUT']) assert.equal(resolveRoute(path), undefined);
});

test('fragment navigation safely decodes IDs and honors reduced motion', t => {
  let scrolled;
  let redirected;
  let reduced = false;
  const target = { scrollIntoView: options => { scrolled = options; } };
  const originalWindow = globalThis.window;
  const originalDocument = globalThis.document;
  globalThis.window = { matchMedia: () => ({ matches: reduced }), location: { assign: value => { redirected = value; } } };
  globalThis.document = { getElementById: id => id === 'terms section' || id === 'services' ? target : null };
  t.after(() => { globalThis.window = originalWindow; globalThis.document = originalDocument; });
  const { scrollToHash, goToHomeSection } = loadTs('src/utils/navigation.ts');
  assert.equal(scrollToHash('#%E0%A4%A'), false);
  assert.equal(scrollToHash('#'), false);
  assert.equal(scrollToHash('#[invalid-selector'), false);
  assert.equal(scrollToHash('#terms%20section'), true);
  assert.equal(scrolled.behavior, 'smooth');
  reduced = true;
  goToHomeSection('#services');
  assert.equal(scrolled.behavior, 'instant');
  assert.equal(redirected, undefined);
  goToHomeSection('#missing');
  assert.equal(redirected, '/#missing');
});

test('FAQ filtering finds answer text, is case-insensitive and handles empty results', () => {
  const groups = faq.filter(group => group.title !== 'Important Note');
  assert.equal(filterFAQGroups(groups, '   ').flatMap(group => group.items).length, 25);
  assert.ok(filterFAQGroups(groups, '  THREE-YEAR  ').flatMap(group => group.items).some(item => item.id === 16));
  assert.deepEqual(filterFAQGroups(groups, '<script>not-a-question'), []);
  assert.equal(new Set(faq.flatMap(group => group.items.map(item => item.id))).size, 26);
});

test('FAQ links reject executable URLs; renderer escapes text and preserves formatting', () => {
  for (const href of ['javascript:alert(1)', 'data:text/html,test', 'https://user:pass@example.com', '\njavascript:alert(1)', '//example.com']) {
    assert.equal(safeAnswerHref(href), undefined);
  }
  assert.equal(safeAnswerHref('mailto:info@schoolexpert.in'), 'mailto:info@schoolexpert.in');
  const { default: FAQAnswer } = loadTs('src/pages/FAQs/FAQAnswer.tsx');
  const html = renderToStaticMarkup(createElement(FAQAnswer, { nodes: [
    { type: 'text', text: '<script>alert(1)</script>' },
    { type: 'a', href: 'javascript:alert(1)', children: [{ type: 'text', text: 'unsafe link' }] },
    { type: 'a', href: 'https://example.com', newTab: true, children: [{ type: 'strong', children: [{ type: 'text', text: 'Safe' }] }] },
  ] }));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('javascript:'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.ok(html.includes('<strong>Safe</strong>'));
  for (const group of faq) for (const item of group.items) {
    assert.doesNotThrow(() => renderToStaticMarkup(createElement(FAQAnswer, { nodes: item.answer })));
  }
});

test('public configuration preserves defaults and wires validated overrides into visible links', () => {
  const { site, socialLinks } = loadTs('src/config/site.ts');
  assert.equal(site.supportEmail, 'info@schoolexpert.in');
  assert.equal(socialLinks.length, 2);
  const env = { VITE_SUPPORT_EMAIL: 'help@example.com', VITE_SOCIAL_LINKEDIN: 'https://example.com/team', VITE_SOCIAL_YOUTUBE: 'javascript:alert(1)' };
  const configured = loadTs('src/config/site.ts', env);
  assert.equal(configured.socialLinks.some(link => link.key === 'youtube'), false);
  const { default: Contact } = loadTs('src/pages/Contact/Contact.tsx', env);
  assert.ok(renderToStaticMarkup(createElement(Contact)).includes('mailto:help@example.com'));
  const { default: Footer } = loadTs('src/components/Footer/Footer.tsx', env);
  const footer = renderToStaticMarkup(createElement(Footer));
  assert.ok(footer.includes('href="https://example.com/team"'));
  assert.ok(footer.includes('href="/#services"'));
  const { Logo } = loadTs('src/components/Logo/Logo.tsx');
  assert.ok(renderToStaticMarkup(createElement(Logo)).includes('href="/"'));
});

test('informational pages and all four audience variants render without component errors', () => {
  const pages = [
    ['About', 'About', 'Founder'], ['Contact', 'Contact', 'Get in touch'],
    ['FoundingPartnerProgramme', 'FoundingPartnerProgramme', 'Founding Partner Programme'],
    ['FAQs', 'FAQs', 'Search frequently asked questions'],
    ['PrivacyPolicy', 'PrivacyPolicy', 'privacy-section-44'],
    ['TermsConditions', 'TermsConditions', 'terms-section-10'],
    ['CookiePolicy', 'CookiePolicy', 'cookie-section-12'],
    ['NotFound', 'NotFound', 'Page not found'],
  ];
  for (const [directory, file, expected] of pages) {
    const { default: Page } = loadTs(`src/pages/${directory}/${file}.tsx`);
    assert.ok(renderToStaticMarkup(createElement(Page)).includes(expected), file);
  }
  const { default: ComingSoon } = loadTs('src/pages/ComingSoon/ComingSoon.tsx');
  for (const audience of ['schools', 'parents', 'teachers', 'vendors']) {
    assert.ok(renderToStaticMarkup(createElement(ComingSoon, { audience })).includes('Coming Soon'));
  }
});

test('SEO uses Vite env precedence, includes public pages, excludes aliases/placeholders, and removes stale sitemap', t => {
  const root = mkdtempSync(join(tmpdir(), 'school-expert-seo-test-'));
  for (const dir of ['dist', 'public', 'src/config']) mkdirSync(join(root, dir), { recursive: true });
  copyFileSync('public/robots.txt', join(root, 'public/robots.txt'));
  copyFileSync('src/config/routes.json', join(root, 'src/config/routes.json'));
  const originalEnv = process.env.VITE_SITE_URL;
  delete process.env.VITE_SITE_URL;
  t.after(() => {
    if (originalEnv === undefined) delete process.env.VITE_SITE_URL; else process.env.VITE_SITE_URL = originalEnv;
    // root is the exact directory returned by mkdtempSync for this test.
    assert.equal(dirname(root), resolve(tmpdir()));
    rmSync(root, { recursive: true, force: true });
  });
  const dist = join(root, 'dist');
  writeFileSync(join(root, '.env'), 'VITE_SITE_URL=https://base.example\n');
  writeFileSync(join(root, '.env.local'), 'VITE_SITE_URL=https://local.example\n');
  generateSeo(root, dist);
  let xml = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  assert.ok(xml.includes('https://local.example/about'));
  assert.ok(xml.includes('https://local.example/founding-partner-programme'));
  assert.equal((xml.match(/<url>/g) ?? []).length, 8);
  assert.ok(!xml.includes('/schools'));
  assert.ok(!xml.includes('/about-us'));
  writeFileSync(join(root, '.env.production.local'), 'VITE_SITE_URL=https://production.example\n');
  generateSeo(root, dist);
  assert.ok(readFileSync(join(dist, 'sitemap.xml'), 'utf8').includes('https://production.example'));
  process.env.VITE_SITE_URL = 'https://process.example/';
  generateSeo(root, dist);
  assert.ok(readFileSync(join(dist, 'robots.txt'), 'utf8').includes('Sitemap: https://process.example/sitemap.xml'));
  process.env.VITE_SITE_URL = 'javascript:alert(1)';
  assert.throws(() => generateSeo(root, dist), /HTTP\(S\)/);
  process.env.VITE_SITE_URL = '';
  generateSeo(root, dist);
  assert.equal(existsSync(join(dist, 'sitemap.xml')), false);
  assert.equal(readFileSync(join(dist, 'robots.txt'), 'utf8').trim(), readFileSync('public/robots.txt', 'utf8').trim());
});

test('Founding Partner Programme is promoted from the homepage while preserving official content and email actions', () => {
  const { default: Navbar } = loadTs('src/components/Navbar/Navbar.tsx');
  const navbar = renderToStaticMarkup(createElement(Navbar));
  assert.equal(navbar.includes('Founding Partner Programme'), false);
  assert.equal((navbar.match(/href="\/founding-partner-programme"/g) ?? []).length, 0);

  const { default: FoundingPartnerSection } = loadTs('src/pages/Home/sections/FoundingPartnerSection.tsx');
  const promotion = renderToStaticMarkup(createElement(FoundingPartnerSection));
  assert.ok(promotion.includes('An Exclusive Opportunity'));
  assert.ok(promotion.includes('Become a'));
  assert.ok(promotion.includes('Lifetime Recognition'));
  assert.ok(promotion.includes('Enhanced Visibility'));
  assert.ok(promotion.includes('Priority Opportunities'));
  assert.equal((promotion.match(/href="\/founding-partner-programme"/g) ?? []).length, 1);

  const homeSource = readFileSync(join(process.cwd(), 'src/pages/Home/Home.tsx'), 'utf8');
  assert.ok(homeSource.indexOf('<FoundingPartnerSection />') < homeSource.indexOf('<ServicesSection />'));

  const { default: Page } = loadTs('src/pages/FoundingPartnerProgramme/FoundingPartnerProgramme.tsx');
  const page = renderToStaticMarkup(createElement(Page));
  const benefitTitles = [
    'One-Time Registration Fee',
    'Three-Year Waiver of Annual Renewal Fees',
    'Lifetime Founding Partner Badge',
    'Invitation to Participate in Committees and Councils',
    'Priority Access to Events',
    'Enhanced Visibility',
    'Partner References and Introductions',
    'Selected Marketing Opportunities',
  ];
  for (const title of benefitTitles) assert.ok(page.includes(title), title);
  const requiredStatements = [
    'Build a stronger presence within India&#x27;s education ecosystem.',
    'The Founding Partner Programme is designed for eligible registered vendors, institutions, businesses and organisations',
    'A one-time registration fee applies at the time of registration.',
    'Founding Partners are exempt from annual renewal fees for the first three years',
    'Recognition of their status as a Founding Partner of The School Expert™.',
    'Opportunities to be invited to participate in The School Expert™ committees and councils',
    'Priority access to events hosted by The School Expert™.',
    'Increased visibility through relevant platform initiatives and promotional activities.',
    'We take our references to our Founding Partners wherever we go',
    'Potential inclusion in relevant events, communications, newsletters and other promotional initiatives, where applicable.',
    'Specific benefits, eligibility and participation arrangements will be confirmed individually.',
    'The School Expert™ may have multiple Founding Partners within the same category.',
    'Please email your organisation’s profile, details of your services and a brief proposal',
  ];
  for (const statement of requiredStatements) assert.ok(page.includes(statement), statement);
  assert.ok(page.includes('All benefits are subject to the agreed terms and conditions of our association.'));
  assert.ok(page.includes('Founding Partner status does not automatically grant category exclusivity.'));
  assert.ok(page.includes('Exclusivity is not automatic and will apply only if expressly agreed in writing'));
  assert.ok(page.includes('Applications are subject to review, suitability and mutually agreed terms.'));
  assert.equal((page.match(/mailto:shalini@schoolexpert.in\?subject=Founding%20Partner%20Application/g) ?? []).length, 2);
  assert.equal((page.match(/mailto:shalini@schoolexpert.in\?subject=Exclusive%20Founding%20Partners%20Application/g) ?? []).length, 1);
  assert.equal(page.includes('guaranteed'), false);
});
