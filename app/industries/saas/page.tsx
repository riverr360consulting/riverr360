import Link from 'next/link';
import type { Metadata } from 'next';
import industriesConfig from '@/data/industries-config.json';

export const metadata: Metadata = {
  title: 'Marketing & Revenue Growth for SaaS Companies | Riverr360',
  description:
    'Plug revenue leaks across acquisition, conversion, and retention for your SaaS business. See where you\'re losing revenue with the free R360 Score Calculator.',
  alternates: { canonical: 'https://riverr360.com/industries/saas' },
};

const config = (industriesConfig as any).saas;

export default function SaaSIndustryPage() {
  const showB2B = config?.b2b;
  const showB2C = config?.c2c ?? config?.b2c;
  const showBoth = showB2B && showB2C;

  return (
    <main>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full bg-primary-100 text-primary-700 mb-6">
            For SaaS Companies
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your SaaS is Losing Revenue You Can&apos;t See
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Trial signups don&apos;t convert. Churn eats your MRR growth. Attribution is a guessing game.
            The R360 Framework finds exactly where SaaS businesses leak revenue — and fixes it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/industries/saas/score-calculator" className="btn-primary">
              Calculate Your SaaS Score →
            </Link>
            <Link href="/book" className="btn-secondary">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* B2B / B2C split — only shows once at least one is built */}
      {(showB2B || showB2C) && (
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {showBoth ? 'Choose your SaaS model' : 'Built for your model'}
            </h2>
            <div className={`grid gap-6 ${showBoth ? 'md:grid-cols-2' : 'max-w-md mx-auto'}`}>
              {showB2B && (
                <Link
                  href="/industries/saas/b2b"
                  className="group bg-gray-50 border border-gray-100 rounded-xl p-6 hover:bg-primary-50 hover:border-primary-200 transition-colors"
                >
                  <div className="text-3xl mb-3">🏢</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 mb-2">
                    B2B SaaS
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Long sales cycles, multiple stakeholders, ABM-driven pipelines. See B2B-specific strategies →
                  </p>
                </Link>
              )}
              {showB2C && (
                <Link
                  href="/industries/saas/b2c"
                  className="group bg-gray-50 border border-gray-100 rounded-xl p-6 hover:bg-primary-50 hover:border-primary-200 transition-colors"
                >
                  <div className="text-3xl mb-3">👤</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 mb-2">
                    B2C SaaS
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Self-serve signups, freemium funnels, high-volume conversion optimization. See B2C-specific strategies →
                  </p>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* The 5 leakage layers, SaaS-specific framing */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Where SaaS Companies Leak Revenue
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: '🎯', title: 'Acquisition', desc: 'Paying for traffic that never converts to trials, or trials that never fit your ICP.' },
              { icon: '📊', title: 'Attribution', desc: 'Not knowing which channel actually drives paying customers, not just signups.' },
              { icon: '💳', title: 'Conversion', desc: 'Trial-to-paid conversion stuck below benchmark because onboarding doesn\'t prove value fast enough.' },
              { icon: '🔄', title: 'Retention', desc: 'Churn quietly erasing your new MRR every month before it compounds.' },
              { icon: '📈', title: 'Scaling', desc: 'Growth that breaks your systems instead of building repeatable playbooks.' },
            ].map((layer) => (
              <div key={layer.title} className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="text-2xl mb-2">{layer.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{layer.title}</h3>
                <p className="text-gray-600 text-sm">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-600">
        <div className="container-custom max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Find your SaaS revenue leaks in 2 minutes</h2>
          <p className="text-primary-100 mb-8">
            No lengthy audit. Answer 5 quick questions and get your R360 Score instantly.
          </p>
          <Link href="/industries/saas/score-calculator" className="btn-secondary">
            Calculate Your Score →
          </Link>
        </div>
      </section>
    </main>
  );
}
