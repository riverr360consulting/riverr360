import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import caseStudiesData from '@/data/case-studies.json';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cs = (caseStudiesData as any[]).find(s => s.slug === params.slug);
  if (!cs) return { title: 'Case Study Not Found' };
  return {
    title: cs.metaTitle || cs.title,
    description: cs.metaDescription || cs.excerpt,
    alternates: { canonical: `https://riverr360.com/case-studies/${params.slug}` },
  };
}

export async function generateStaticParams() {
  return (caseStudiesData as any[]).map(s => ({ slug: s.slug }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = (caseStudiesData as any[]).find(s => s.slug === params.slug);
  if (!cs) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': cs.schemaType || 'Article',
    headline: cs.metaTitle || cs.title,
    description: cs.metaDescription || cs.excerpt,
    author: { '@type': 'Organization', name: 'Riverr360' },
    publisher: { '@type': 'Organization', name: 'Riverr360', url: 'https://riverr360.com' },
    url: `https://riverr360.com/case-studies/${params.slug}`,
    image: { '@type': 'ImageObject', url: cs.image, description: cs.imageAlt || cs.title },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom max-w-5xl mx-auto">
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                <li>/</li>
                <li><Link href="/case-studies" className="hover:text-primary-600">Case Studies</Link></li>
                <li>/</li>
                <li className="text-gray-900">{cs.client}</li>
              </ol>
            </nav>
            <div className="text-sm text-primary-600 font-semibold mb-4">{cs.industry}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{cs.title}</h1>
            {cs.image && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img src={cs.image} alt={cs.imageAlt || cs.title} className="w-full h-auto" />
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Client</div>
                <div className="text-xl font-bold text-gray-900">{cs.client}</div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="text-xl font-bold text-gray-900">{cs.timeline}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cs.metrics.map((metric: any, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-lg border border-primary-100">
                  <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-gray-400 line-through">{metric.before}</span>
                    <span className="text-2xl font-bold text-primary-600">{metric.after}</span>
                  </div>
                  <div className="text-green-600 font-semibold">{metric.change}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Situation */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Situation</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{cs.situation}</p>
          </div>
        </section>

        {/* Approach */}
        {cs.approach?.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Approach</h2>
              <div className="space-y-6">
                {cs.approach.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">{idx + 1}</div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Results</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">{cs.results}</p>
            {cs.testimonial && (
              <blockquote className="bg-white p-8 rounded-lg border-l-4 border-primary-600">
                <div className="text-4xl text-primary-600 mb-4">"</div>
                <p className="text-xl text-gray-800 italic mb-4">{cs.testimonial}</p>
                <cite className="text-gray-600 not-italic">— {cs.testimonialAuthor}, {cs.client}</cite>
              </blockquote>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Want Results Like This?</h2>
              <p className="text-xl mb-6 text-primary-100">Let's identify your marketing leaks and create a custom strategy for your business.</p>
              <Link href="/contact" className="btn-secondary">Plug Now</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
