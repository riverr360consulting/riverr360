'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Hide header on these pages completely
  if (pathname === '/get-started' || pathname === '/lp' || pathname === '/survey') return null;

  const resources = [
    { href: '/blog', icon: '📝', label: 'Blog', desc: 'Marketing insights & tips' },
    { href: '/case-studies', icon: '📊', label: 'Case Studies', desc: 'Real results from clients' },
    { href: '/webinars', icon: '🎙️', label: 'Webinars', desc: 'Live & recorded sessions' },
  ];

  // Flat list only — no B2B/B2C shown here. If an industry has a real
  // B2B/B2C split, that choice lives on its own hub page as internal links.
  const industries = [
    { href: '/industries/saas', label: 'SaaS' },
    { href: '/industries/fintech', label: 'Fintech' },
    { href: '/industries/realtors', label: 'Realtors' },
    { href: '/industries/legal', label: 'Legal' },
    { href: '/industries/ecommerce', label: 'Ecommerce' },
    { href: '/industries/insurance', label: 'Insurance' },
    { href: '/industries/healthcare', label: 'Healthcare' },
    { href: '/industries/travel-tourism', label: 'Travel & Tourism' },
    { href: '/industries/education', label: 'Education' },
    { href: '/industries/hospitality', label: 'Hospitality' },
    { href: '/industries/home-services', label: 'Home Services' },
    { href: '/industries/automotive', label: 'Automotive' },
    { href: '/industries/manufacturers', label: 'Manufacturers' },
    { href: '/industries/professionals', label: 'Professionals' },
    { href: '/industries/marketing', label: 'Marketing' },
    { href: '/industries/sales', label: 'Sales' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Riverr360 Consulting"
              className="h-10 md:h-12 w-auto transition-transform hover:scale-105"
              width={180}
              height={48}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors text-sm">
              Home
            </Link>
            <Link href="/framework" className="text-gray-700 hover:text-primary-600 transition-colors text-sm">
              Framework
            </Link>

            {/* Industries mega menu */}
            <div
              className="relative"
              ref={industriesRef}
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors text-sm">
                Industries
                <svg className={`w-4 h-4 transition-transform ${industriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {industriesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50">
                  {/* Triangle pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                    <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1 mx-auto" />
                  </div>
                  <div className="grid grid-cols-4 gap-x-4 gap-y-1">
                    {industries.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className="text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                        onClick={() => setIndustriesOpen(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources mega menu */}
            <div
              className="relative"
              ref={resourcesRef}
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition-colors text-sm">
                Resources
                <svg className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {/* Triangle pointer */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                    <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1 mx-auto" />
                  </div>
                  {resources.map(({ href, icon, label, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      <span className="text-xl mt-0.5">{icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{label}</div>
                        <div className="text-xs text-gray-500">{desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/profile" className="text-gray-700 hover:text-primary-600 transition-colors text-sm">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors text-sm">
              Contact
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/book" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/framework', label: 'Framework' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="block px-2 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                {label}
              </Link>
            ))}

            {/* Industries section in mobile */}
            <div className="px-2 pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Industries</p>
              <div className="grid grid-cols-2 gap-x-2">
                {industries.map(({ href, label }) => (
                  <Link key={href} href={href} className="py-2 text-sm text-gray-700 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources section in mobile */}
            <div className="px-2 pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Resources</p>
              {resources.map(({ href, icon, label }) => (
                <Link key={href} href={href} className="flex items-center gap-2 py-2 text-gray-700 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>
                  <span>{icon}</span> {label}
                </Link>
              ))}
            </div>

            {[
              { href: '/profile', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="block px-2 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                {label}
              </Link>
            ))}

            <div className="pt-2">
              <Link href="/book" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
