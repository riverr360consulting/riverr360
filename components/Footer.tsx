import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img src="/images/logo-white.png" alt="Riverr360" className="h-12 w-auto" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-4">
              Riverr360 helps growing businesses uncover hidden revenue leakage and build scalable growth systems — driven by intelligence, efficiency, and measurable profitability.
            </p>
            <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-full text-xs text-gray-300 font-medium">
              <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
              R360 Revenue Leakage Framework
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/profile' },
                { label: 'Framework', href: '/framework' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Blog', href: '/blog' },
                { label: 'Webinars', href: '/webinars' },
                { label: 'Contact', href: '/contact' },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2">
              {[
                'Revenue Leakage Audit',
                'Acquisition Strategy',
                'Conversion Optimisation',
                'Retention Systems',
                'Scaling Framework',
                'Attribution & Analytics',
              ].map((item, i) => (
                <li key={i}>
                  <Link href="/get-started" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2026 Riverr360. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="/get-started" className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
              Free Audit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
