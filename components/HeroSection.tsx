import CTAButton from './CTAButton';
import Link from 'next/link';

const stats = [
  { value: '↓ 32%', label: 'Lower Acquisition Cost', sub: 'Average across client campaigns' },
  { value: '↑ 2.4X', label: 'Qualified Lead Growth', sub: 'After acquisition layer fix' },
  { value: '↑ 41%', label: 'Conversion Improvement', sub: 'From funnel optimisation' },
  { value: '↓ 28%', label: 'Customer Churn Reduction', sub: 'After retention layer fix' },
];

const targets = [
  { icon: '🏢', label: 'B2B Service Businesses' },
  { icon: '🛒', label: 'E-commerce Brands' },
  { icon: '💻', label: 'SaaS Companies' },
  { icon: '🚀', label: 'Growth-Stage Startups' },
];

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-purple-50 section-padding">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">

          {/* Who it's for */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {targets.map((t, i) => (
              <div key={i} className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm text-gray-600 shadow-sm">
                <span>{t.icon}</span> {t.label}
              </div>
            ))}
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Stop Losing Revenue Across <span className="text-primary-600">Your Marketing Funnel</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Riverr360 helps growing businesses identify hidden revenue leaks in acquisition, conversion, retention, and scaling — then builds systems that recover profitability.
            </p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              Using the proprietary <strong className="text-gray-700">R360 Revenue Leakage Framework</strong> — a 5-layer diagnostic system that identifies exactly where your business is losing money and builds a roadmap to recover it.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <CTAButton text="Get Free Revenue Leakage Audit" variant="primary" href="/get-started" />
            <Link href="/framework" className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-primary-400 hover:text-primary-600 transition-all">
              See How We Find Lost Revenue →
            </Link>
          </div>

          {/* Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-md text-center border border-gray-100">
                <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Trust bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Diagnosis-First Approach</div>
                  <div className="text-xs text-gray-500">We audit before we recommend anything</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">No Retainer Traps</div>
                  <div className="text-xs text-gray-500">Start with a free audit, no commitment</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Outcome-Tied Metrics</div>
                  <div className="text-xs text-gray-500">Every engagement has defined KPIs</div>
                </div>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-200"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">✓</div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">5-Layer R360 Framework</div>
                  <div className="text-xs text-gray-500">Proprietary diagnostic methodology</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
