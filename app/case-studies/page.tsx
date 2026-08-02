import Link from 'next/link';
import type { Metadata } from 'next';
import caseStudiesData from '@/data/case-studies.json';

export const metadata: Metadata = {
  title: 'Case Studies | Real Results by Riverr360',
  description: 'See how Riverr360 helped businesses cut acquisition costs, double leads, and recover lost revenue using the R360 Framework.',
  alternates: { canonical: 'https://riverr360.com/case-studies' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Case Studies | Riverr360',
  description: 'Real results from businesses that fixed revenue leakage with the R360 Framework.',
  url: 'https://riverr360.com/case-studies',
  publisher: { '@type': 'Organization', name: 'Riverr360', url: 'https://riverr360.com' },
};

export default function CaseStudiesPage() {
  const studies = caseStudiesData as any[];

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Case Studies</h1>
            <p className="text-xl text-gray-600">Real results from real businesses. See how we have helped companies plug marketing leaks and maximize ROI.</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="sr-only">All Case Studies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img src={study.image} alt={study.imageAlt || study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">{study.industry}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.excerpt}</p>
                  <div className="border-t pt-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Key Results:</div>
                    <div className="space-y-1">
                      {study.metrics.slice(0, 2).map((metric: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{metric.label}:</span>
                          <span className="font-semibold text-green-600">{metric.before} → {metric.after}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 text-primary-600 font-semibold text-sm group-hover:translate-x-2 transition-transform inline-block">View Full Case Study →</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-primary-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-6 text-primary-100">Let us identify your marketing leaks and create an ROI improvement plan.</p>
            <Link href="/contact" className="btn-secondary">Plug Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
