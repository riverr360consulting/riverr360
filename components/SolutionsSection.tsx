import CTAButton from './CTAButton';

const solutions = [
  {
    title: 'Marketing Leak Audit',
    description: 'Comprehensive analysis of your digital marketing to identify all money-draining issues.',
    details: [
      'Website conversion rate analysis',
      'Ad campaign performance review',
      'SEO gap analysis and competitor research',
      'Detailed report with ROI improvement plan',
    ],
  },
  {
    title: 'Conversion Optimization',
    description: 'Transform your website and landing pages into high-converting sales machines.',
    details: [
      'Landing page design and optimization',
      'A/B testing and user experience improvements',
      'Call-to-action optimization',
      'Mobile responsiveness and speed optimization',
    ],
  },
  {
    title: 'Paid Advertising Management',
    description: 'Strategic ad campaigns that deliver ROI, not just clicks.',
    details: [
      'Google Ads and Meta Ads management',
      'Advanced audience targeting and retargeting',
      'Ad creative testing and optimization',
      'Budget allocation and bid management',
    ],
  },
  {
    title: 'SEO & Content Strategy',
    description: 'Dominate search results and attract high-quality organic traffic.',
    details: [
      'Keyword research and content planning',
      'On-page and technical SEO optimization',
      'Link building and authority growth',
      'Content creation and optimization',
    ],
  },
  {
    title: 'Email Marketing Automation',
    description: 'Turn subscribers into customers with strategic email campaigns.',
    details: [
      'Automated email funnel setup',
      'List segmentation and personalization',
      'Welcome sequences and nurture campaigns',
      'Performance tracking and optimization',
    ],
  },
  {
    title: 'Analytics & Reporting',
    description: 'Track what matters and make data-driven decisions.',
    details: [
      'Google Analytics 4 setup and tracking',
      'Custom dashboards and KPI monitoring',
      'Monthly performance reports',
      'ROI tracking across all channels',
    ],
  },
];

export default function SolutionsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Digital Marketing Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Data-driven strategies to plug your marketing leaks and maximize ROI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-primary-50 to-white p-8 rounded-lg border border-primary-100"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">✓</span>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary-600 text-white p-8 rounded-lg text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Plug Your Marketing Leaks?</h3>
          <p className="text-xl mb-6 text-primary-100">
            Let's identify how much you're wasting and create a plan to maximize your ROI.
          </p>
          <CTAButton text="Plug Now" href="/contact" variant="secondary" />
        </div>
      </div>
    </section>
  );
}
