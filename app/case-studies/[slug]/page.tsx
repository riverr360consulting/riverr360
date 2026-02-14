import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Case study data
const caseStudiesData: { [key: string]: any } = {
  'ecommerce-conversion-optimization': {
    title: 'E-commerce Brand Increases Conversion Rate by 240%',
    industry: 'E-commerce - Fashion Retail',
    challenge: 'Low website conversion and cart abandonment',
    result: '240% increase in conversion rate',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    client: 'Fashion E-commerce Brand',
    timeline: '3 months',
    metrics: [
      { label: 'Conversion Rate', before: '0.8%', after: '2.7%', change: '+240%' },
      { label: 'Cart Abandonment', before: '78%', after: '42%', change: '-46%' },
      { label: 'Revenue', before: '₹45K/mo', after: '₹153K/mo', change: '+240%' },
      { label: 'AOV', before: '₹67', after: '₹89', change: '+33%' },
    ],
    situation: "An online fashion retailer was driving 50,000 monthly visitors through paid ads but converting less than 1%. With a 78% cart abandonment rate, they were hemorrhaging money on traffic that wasn't buying.",
    approach: [
      {
        title: '1. Conversion Rate Audit',
        description: 'We analyzed heatmaps, session recordings, and checkout flow to identify friction points.',
      },
      {
        title: '2. Landing Page Redesign',
        description: 'Rebuilt product pages with better images, social proof, and clear CTAs.',
      },
      {
        title: '3. Checkout Optimization',
        description: 'Simplified checkout from 5 steps to 2, added trust badges and payment options.',
      },
      {
        title: '4. Abandoned Cart Recovery',
        description: 'Implemented automated email sequence with 15% discount for abandoned carts.',
      },
    ],
    results: "Within 90 days, conversion rate tripled from 0.8% to 2.7%. Cart abandonment dropped to 42%. Monthly revenue jumped from ₹45K to ₹153K with the same traffic volume.",
    testimonial: "Riverr360 didn't just improve our conversion rate - they completely transformed our business. We're now profitable on paid traffic and scaling rapidly.",
    testimonialAuthor: "Marketing Director",
  },
  'saas-ppc-roi-improvement': {
    title: 'SaaS Company Cuts PPC Costs by 60% While Doubling Leads',
    industry: 'B2B SaaS - Project Management',
    challenge: 'Wasted ad spend with poor targeting',
    result: '60% cost reduction, 2X qualified leads',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    client: 'B2B SaaS Platform',
    timeline: '4 months',
    metrics: [
      { label: 'Cost per Lead', before: '₹450', after: '₹180', change: '-60%' },
      { label: 'Monthly Leads', before: '33', after: '83', change: '+152%' },
      { label: 'Ad Spend', before: '₹15K', after: '₹6K', change: '-60%' },
      { label: 'Lead Quality Score', before: '4.2/10', after: '8.7/10', change: '+107%' },
    ],
    situation: "A B2B SaaS company was burning $15K/month on Google Ads with a $450 cost per lead. Most leads were unqualified, and sales team was frustrated with poor lead quality.",
    approach: [
      {
        title: '1. Account Restructure',
        description: 'Completely rebuilt campaigns around buyer intent keywords instead of broad terms.',
      },
      {
        title: '2. Negative Keywords Mastery',
        description: 'Added 500+ negative keywords to eliminate wasted spend on irrelevant searches.',
      },
      {
        title: '3. Landing Page Optimization',
        description: 'Created dedicated landing pages for each ad group with specific messaging.',
      },
      {
        title: '4. Audience Targeting',
        description: 'Implemented retargeting and lookalike audiences based on best customers.',
      },
    ],
    results: "Ad spend dropped from ₹15K to ₹6K while leads increased from 33 to 83 per month. Cost per lead fell to ₹180, and lead quality score jumped to 8.7/10.",
    testimonial: "We went from wasting money on Google Ads to it being our #1 lead source. The ROI is incredible now.",
    testimonialAuthor: "CEO",
  },
  'local-business-seo-domination': {
    title: 'Local Service Business Achieves #1 Rankings in 90 Days',
    industry: 'Professional Services - Legal',
    challenge: 'Zero organic visibility and traffic',
    result: '#1 rankings for 12 high-value keywords',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    client: 'Personal Injury Law Firm',
    timeline: '3 months',
    metrics: [
      { label: 'Organic Traffic', before: '120/mo', after: '2,400/mo', change: '+1,900%' },
      { label: 'Top 3 Rankings', before: '0', after: '12', change: '+1,200%' },
      { label: 'Organic Leads', before: '2/mo', after: '38/mo', change: '+1,800%' },
      { label: 'Cost per Lead', before: '₹850', after: '₹75', change: '-91%' },
    ],
    situation: "A local law firm was spending ₹8,000/month on PPC just to get clients. They had zero SEO presence and were invisible in organic search despite being in business for 15 years.",
    approach: [
      {
        title: '1. Technical SEO Foundation',
        description: 'Fixed site speed, mobile issues, and schema markup. Migrated to modern hosting.',
      },
      {
        title: '2. Local SEO Dominance',
        description: 'Optimized Google Business Profile, built local citations, and earned reviews.',
      },
      {
        title: '3. Content Strategy',
        description: 'Created 20+ location-specific service pages and practice area guides.',
      },
      {
        title: '4. Link Building',
        description: 'Earned backlinks from legal directories, local news, and industry associations.',
      },
    ],
    results: "Within 90 days, achieved #1 rankings for 12 high-value keywords. Organic traffic grew from 120 to 2,400 monthly visitors. Organic leads jumped from 2 to 38 per month.",
    testimonial: "We've cut our ad spend in half and get more clients than ever. SEO is now our main lead source.",
    testimonialAuthor: "Managing Partner",
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = caseStudiesData[params.slug];
  
  if (!caseStudy) {
    return { title: 'Case Study Not Found' };
  }

  return {
    title: `${caseStudy.title} | Riverr360 Case Studies`,
    description: `${caseStudy.result} - ${caseStudy.situation.substring(0, 150)}...`,
  };
}

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({
    slug: slug,
  }));
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudiesData[params.slug];

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-gray-600">
                <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
                <li>/</li>
                <li><Link href="/case-studies" className="hover:text-primary-600">Case Studies</Link></li>
                <li>/</li>
                <li className="text-gray-900">{caseStudy.client}</li>
              </ol>
            </nav>

            <div className="text-sm text-primary-600 font-semibold mb-4">
              {caseStudy.industry}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {caseStudy.title}
            </h1>

            {/* Cover Image */}
            {caseStudy.image && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Client</div>
                <div className="text-xl font-bold text-gray-900">{caseStudy.client}</div>
              </div>
              <div className="bg-white p-6 rounded-lg border">
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="text-xl font-bold text-gray-900">{caseStudy.timeline}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Results</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.metrics.map((metric: any, idx: number) => (
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

        {/* The Situation */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Situation</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {caseStudy.situation}
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Approach</h2>
            <div className="space-y-6">
              {caseStudy.approach.map((step: any, idx: number) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-700">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Results */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Results</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {caseStudy.results}
            </p>

            {/* Testimonial */}
            <div className="bg-white p-8 rounded-lg border-l-4 border-primary-600">
              <div className="text-4xl text-primary-600 mb-4">"</div>
              <p className="text-xl text-gray-800 italic mb-4">
                {caseStudy.testimonial}
              </p>
              <div className="text-gray-600">
                — {caseStudy.testimonialAuthor}, {caseStudy.client}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-3xl font-bold mb-4">
                Want Results Like This?
              </h3>
              <p className="text-xl mb-6 text-primary-100">
                Let's identify your marketing leaks and create a custom strategy for your business.
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
