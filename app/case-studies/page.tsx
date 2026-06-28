import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Real Results by Riverr360',
  description: 'See how Riverr360 helped businesses cut acquisition costs, double leads, and recover lost revenue using the R360 Framework.',
  alternates: { canonical: 'https://riverr360.com/case-studies' },
};

const caseStudies = [
  {
    slug: 'ecommerce-conversion-optimization',
    title: 'E-commerce Brand Increases Conversion Rate by 240%',
    industry: 'E-commerce',
    challenge: 'Low website conversion and cart abandonment',
    result: '240% increase in conversion rate',
    excerpt: 'An online retailer was getting traffic but struggling with a 0.8% conversion rate and 78% cart abandonment.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    metrics: [
      { label: 'Conversion Rate', before: '0.8%', after: '2.7%' },
      { label: 'Cart Abandonment', before: '78%', after: '40%' },
      { label: 'Revenue', before: '₹45K/mo', after: '₹153K/mo' },
    ],
  },
  {
    slug: 'saas-ppc-roi-improvement',
    title: 'SaaS Company Cuts PPC Costs 60% While Doubling Leads',
    industry: 'SaaS',
    challenge: 'Wasted ad spend with poor targeting',
    result: '60% cost reduction, 2X leads',
    excerpt: 'A B2B SaaS company was spending ₹15K/month on Google Ads with minimal qualified leads.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    metrics: [
      { label: 'Cost per Lead', before: '₹450', after: '₹180' },
      { label: 'Monthly Leads', before: '33', after: '83' },
      { label: 'Ad Spend', before: '₹15K', after: '₹6K' },
    ],
  },
  {
    slug: 'local-business-seo-domination',
    title: 'Law Firm Achieves #1 SEO Rankings in 90 Days',
    industry: 'Professional Services',
    challenge: 'Zero organic visibility and traffic',
    result: '#1 rankings for 12 keywords',
    excerpt: 'A local law firm had no SEO presence and was paying ₹8K/month for every client through ads.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    metrics: [
      { label: 'Organic Traffic', before: '120/mo', after: '2,400/mo' },
      { label: 'Top 3 Rankings', before: '0', after: '12' },
      { label: 'Organic Leads', before: '2/mo', after: '38/mo' },
    ],
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Case Studies | Riverr360',
  description: 'Real results from businesses that fixed revenue leakage with the R360 Framework.',
  url: 'https://riverr360.com/case-studies',
  publisher: { '@type': 'Organization', name: 'Riverr360', url: 'https://riverr360.com' },
};

export default function CaseStudiesPage() {
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
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">{study.industry}</div>
                  {/* h3 fine here — sr-only h2 is parent */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.excerpt}</p>
                  <div className="border-t pt-4">
                    <div className="text-sm font-semibold text-gray-900 mb-2">Key Results:</div>
                    <div className="space-y-1">
                      {study.metrics.slice(0, 2).map((metric, idx) => (
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
            {/* h2 not h3 */}
            <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-6 text-primary-100">Let us identify your marketing leaks and create an ROI improvement plan.</p>
            <Link href="/contact" className="btn-secondary">Plug Now</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
