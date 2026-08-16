import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import industriesConfig from '@/data/industries-config.json';

export const metadata: Metadata = {
  title: 'B2B SaaS Marketing & Revenue Growth | Riverr360',
  description:
    'Fix pipeline leakage across your B2B SaaS funnel — from ABM targeting to enterprise trial conversion to net revenue retention.',
  alternates: { canonical: 'https://riverr360.com/industries/saas/b2b' },
};

export default function B2BSaaSPage() {
  const config = (industriesConfig as any).saas;
  if (!config?.b2b) notFound();

  return (
    <main>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom max-w-4xl mx-auto">
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/industries/saas" className="hover:text-primary-600">SaaS</Link> / B2B
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            B2B SaaS: Fix the Leaks in Your Enterprise Pipeline
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Long sales cycles and multiple stakeholders mean your leaks compound. A weak signal at MQL
            costs you a closed-won deal six months later.
          </p>
          <Link href="/book" className="btn-primary">Book a Strategy Call</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Where B2B SaaS pipelines break down</h2>
          <div className="space-y-6">
            {[
              { title: 'ABM targeting that misses ICP', desc: 'Ad spend and outbound going to accounts that will never convert, diluting your sales team\'s time.' },
              { title: 'Attribution across long cycles', desc: 'Multi-touch deals where the first-touch channel gets all the credit, or none.' },
              { title: 'Demo-to-close conversion', desc: 'Qualified opportunities stalling because the demo doesn\'t map to the buyer\'s actual use case.' },
              { title: 'Expansion revenue left on the table', desc: 'Existing accounts that could upsell or expand seats, with no systematic process to catch it.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 text-center">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">See your B2B SaaS score</h2>
          <Link href="/industries/saas/score-calculator" className="btn-primary">
            Calculate Your Score →
          </Link>
        </div>
      </section>
    </main>
  );
}
