import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import industriesConfig from '@/data/industries-config.json';

export const metadata: Metadata = {
  title: 'B2C SaaS Marketing & Revenue Growth | Riverr360',
  description:
    'Fix self-serve signup, freemium conversion, and churn for your B2C SaaS product — where high volume means small leaks cost real revenue.',
  alternates: { canonical: 'https://riverr360.com/industries/saas/b2c' },
};

export default function B2CSaaSPage() {
  const config = (industriesConfig as any).saas;
  if (!config?.b2c) notFound();

  return (
    <main>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom max-w-4xl mx-auto">
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/industries/saas" className="hover:text-primary-600">SaaS</Link> / B2C
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            B2C SaaS: Small Leaks, Massive Volume, Real Revenue Loss
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            At scale, a 2% drop in trial-to-paid conversion isn't a rounding error — it's thousands of
            dollars a month walking out the door.
          </p>
          <Link href="/book" className="btn-primary">Book a Strategy Call</Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Where B2C SaaS funnels leak</h2>
          <div className="space-y-6">
            {[
              { title: 'Freemium users who never activate', desc: 'Signups that never hit the "aha moment" and quietly churn before ever seeing value.' },
              { title: 'Self-serve checkout friction', desc: 'Every extra field or unclear pricing tier costs conversions at volume.' },
              { title: 'Involuntary churn from failed payments', desc: 'Card declines and expired payment methods silently canceling subscriptions.' },
              { title: 'No systematic win-back flow', desc: 'Cancelled users who could be re-engaged, with no automated path back in.' },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">See your B2C SaaS score</h2>
          <Link href="/industries/saas/score-calculator" className="btn-primary">
            Calculate Your Score →
          </Link>
        </div>
      </section>
    </main>
  );
}
