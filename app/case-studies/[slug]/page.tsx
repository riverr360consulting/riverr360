import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Sample case study data - in production, fetch from CMS
const caseStudies = {
  'saas-company-revenue-recovery': {
    title: 'SaaS Company Recovers $1.2M in Annual Revenue',
    industry: 'SaaS',
    challenge: 'Inconsistent pricing and missed renewals',
    result: '$1.2M recovered annually',
    clientName: 'Confidential SaaS Company',
    timeframe: '4 months',
    metrics: [
      { label: 'Revenue Recovered', value: '$1.2M annually' },
      { label: 'Contract Compliance', value: '95% improvement' },
      { label: 'Renewal Rate', value: '+28%' },
      { label: 'Time to Invoice', value: '-45%' },
    ],
    content: {
      challenge: `A mid-sized SaaS company with 500+ enterprise clients was experiencing significant revenue leakage. Their manual pricing processes led to inconsistent discounting, and they had no systematic way to track contract renewals. As a result, they were losing hundreds of thousands in revenue annually.

Key issues identified:
• Inconsistent pricing across similar customer segments
• Missed renewal opportunities due to poor tracking
• Manual invoice generation leading to delays
• No visibility into contract compliance`,
      
      solution: `We implemented a comprehensive revenue recovery program:

1. Revenue Leakage Audit
   - Analyzed 18 months of billing data
   - Identified $1.8M in annual leakage
   - Prioritized highest-impact fixes

2. Pricing Governance
   - Established pricing tiers and approval workflows
   - Implemented automated discount validation
   - Created pricing playbook for sales team

3. Contract Management System
   - Deployed automated renewal tracking
   - Set up 90/60/30-day renewal reminders
   - Integrated with CRM for visibility

4. Billing Automation
   - Automated invoice generation
   - Implemented usage-based billing
   - Created revenue recognition dashboards`,
      
      results: `The impact was immediate and substantial:

• Recovered $1.2M in annual revenue
• Increased renewal rate from 72% to 95%
• Reduced pricing errors by 90%
• Cut invoice generation time by 45%
• Improved cash flow by 30 days

The company now has a robust revenue operations framework that scales with their growth. They continue to use our monitoring service to ensure leakage stays minimal.`,
    },
  },
  // Add other case studies here
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const caseStudy = caseStudies[params.slug as keyof typeof caseStudies];
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.title} | Riverr360 Case Studies`,
    description: `${caseStudy.challenge} - ${caseStudy.result}`,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = caseStudies[params.slug as keyof typeof caseStudies];

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm text-primary-600 font-semibold mb-4">
                {caseStudy.industry}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {caseStudy.title}
              </h1>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
                    <div className="text-xl font-bold text-primary-600">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            {/* Overview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 pb-12 border-b">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                <p className="text-gray-600">{caseStudy.clientName}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Industry</h3>
                <p className="text-gray-600">{caseStudy.industry}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Timeframe</h3>
                <p className="text-gray-600">{caseStudy.timeframe}</p>
              </div>
            </div>

            {/* Challenge */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Challenge</h2>
              <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                {caseStudy.content.challenge}
              </div>
            </div>

            {/* Solution */}
            <div className="mb-12 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solution</h2>
              <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                {caseStudy.content.solution}
              </div>
            </div>

            {/* Results */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Results</h2>
              <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                {caseStudy.content.results}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready for Similar Results?
              </h3>
              <p className="text-xl mb-6 text-primary-100">
                Let's discuss how we can help you recover lost revenue.
              </p>
              <CTAButton text="Schedule a Consultation" variant="secondary" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
