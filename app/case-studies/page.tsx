import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Riverr360 Digital Marketing',
  description: 'See how we\'ve helped businesses stop wasting marketing budget and achieve real ROI.',
};

// Sample case studies - in production, this would come from your CMS
const caseStudies = [
  {
    slug: 'ecommerce-conversion-rate-optimization',
    title: 'E-commerce Brand Increases Conversion Rate by 240%',
    industry: 'E-commerce',
    challenge: 'Low website conversion and cart abandonment',
    result: '240% increase in conversion rate',
    excerpt: 'An online retailer was getting traffic but struggling with a 0.8% conversion rate and 78% cart abandonment.',
  },
  {
    slug: 'saas-ppc-roi-improvement',
    title: 'SaaS Company Cuts PPC Costs by 60% While Doubling Leads',
    industry: 'SaaS',
    challenge: 'Wasted ad spend with poor targeting',
    result: '60% cost reduction, 2X leads',
    excerpt: 'A B2B SaaS company was spending $15K/month on Google Ads with minimal qualified leads and sky-high CPAs.',
  },
  {
    slug: 'local-business-seo-domination',
    title: 'Local Service Business Achieves #1 Rankings in 90 Days',
    industry: 'Professional Services',
    challenge: 'Zero organic visibility and traffic',
    result: '#1 rankings for 12 keywords',
    excerpt: 'A local law firm had no SEO presence and was paying $8K/month for every client through ads.',
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Case Studies
              </h1>
              <p className="text-xl text-gray-600">
                Real results from real businesses. See how we've helped companies 
                plug marketing leaks and maximize ROI.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="text-sm text-primary-600 font-semibold mb-2">
                      {study.industry}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {study.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{study.excerpt}</p>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="text-sm text-gray-500 mb-1">Result</div>
                      <div className="text-lg font-semibold text-primary-600">
                        {study.result}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4">
                    <span className="text-primary-600 font-semibold">
                      Read Case Study →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-primary-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Write Your Success Story?
              </h3>
              <p className="text-xl mb-6 text-primary-100">
                Let's identify your marketing leaks and create an ROI improvement plan.
              </p>
              <Link href="/contact" className="btn-secondary">
                Plug Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
