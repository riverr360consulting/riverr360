import Link from 'next/link';

const layers = [
  {
    number: '01',
    name: 'Acquisition Leakage',
    color: 'bg-red-50 border-red-400',
    badge: 'bg-red-100 text-red-700',
    problem: 'Spending on traffic that never converts — wrong channels, wrong audience, wrong message.',
    signals: ['High CPL with low quality leads', 'Low CTR on ads', 'Bounced traffic above 70%', 'Wrong audience demographics'],
    diagnosis: ['Channel mix audit', 'Audience targeting review', 'Ad creative analysis', 'Landing page relevance check'],
    outcome: 'Right traffic, right cost — qualified leads flowing into your funnel consistently.',
  },
  {
    number: '02',
    name: 'Attribution Leakage',
    color: 'bg-orange-50 border-orange-400',
    badge: 'bg-orange-100 text-orange-700',
    problem: 'Not knowing which marketing efforts actually drive revenue — leading to wrong budget decisions.',
    signals: ['No clear ROI visibility', 'Multiple tools, no unified view', 'Over-crediting last-click', 'Dark funnel blind spots'],
    diagnosis: ['Tracking stack audit', 'Attribution model review', 'CRM-to-ad platform mapping', 'Conversion path analysis'],
    outcome: 'Full funnel visibility — every rupee tracked to revenue so you invest in what works.',
  },
  {
    number: '03',
    name: 'Conversion Leakage',
    color: 'bg-yellow-50 border-yellow-400',
    badge: 'bg-yellow-100 text-yellow-700',
    problem: 'Traffic arrives but doesn\'t convert — broken funnels, weak offers, and poor user experience.',
    signals: ['Sub-2% website conversion rate', 'High cart abandonment', 'Low form completion', 'Weak landing page performance'],
    diagnosis: ['Conversion funnel mapping', 'UX and CRO audit', 'Offer and CTA review', 'A/B test opportunities'],
    outcome: 'More revenue from existing traffic — higher conversion rates without spending more on ads.',
  },
  {
    number: '04',
    name: 'Retention Leakage',
    color: 'bg-green-50 border-green-400',
    badge: 'bg-green-100 text-green-700',
    problem: 'Winning customers but losing them fast — no nurture, no loyalty, no repeat business.',
    signals: ['High churn rate', 'No post-sale communication', 'Low LTV vs CAC ratio', 'No referral or upsell system'],
    diagnosis: ['Customer journey mapping', 'Email nurture audit', 'LTV and churn analysis', 'Loyalty and referral gaps'],
    outcome: 'Customers who stay longer, spend more, and refer others — compounding growth over time.',
  },
  {
    number: '05',
    name: 'Scaling Leakage',
    color: 'bg-blue-50 border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    problem: 'Trying to scale but costs rise faster than revenue — no systems, no efficiency, no leverage.',
    signals: ['CAC increases as you scale', 'Team overwhelmed with manual tasks', 'No automation in place', 'Inconsistent campaign performance'],
    diagnosis: ['Automation and tech stack review', 'Process efficiency audit', 'Scaling bottleneck identification', 'Growth system blueprint'],
    outcome: 'A scalable, systemised growth engine — where spending more predictably generates more revenue.',
  },
];

export default function LeakageExplained() {
  return (
    <section id="leakage-explained" className="section-padding bg-white">
      <div className="container-custom">

        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Proprietary System
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The R360 Revenue Leakage Framework
          </h2>
          <p className="text-xl text-gray-600">
            A 5-layer diagnostic system that identifies exactly where your business is losing revenue — and builds a roadmap to recover it.
          </p>
        </div>

        {/* 5 Layers */}
        <div className="space-y-6 max-w-5xl mx-auto mb-12">
          {layers.map((layer, index) => (
            <div key={index} className={`border-l-4 rounded-xl p-6 ${layer.color}`}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Layer number and name */}
                <div className="md:w-56 flex-shrink-0">
                  <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 ${layer.badge}`}>
                    Layer {layer.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{layer.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{layer.problem}</p>
                </div>

                {/* Details grid */}
                <div className="flex-1 grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Leakage Signals</p>
                    <ul className="space-y-1">
                      {layer.signals.map((s, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
                          <span className="text-red-400 mt-0.5">▸</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Diagnosis Areas</p>
                    <ul className="space-y-1">
                      {layer.diagnosis.map((d, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
                          <span className="text-primary-500 mt-0.5">▸</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Outcome</p>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{layer.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/framework" className="inline-block bg-primary-600 text-white font-bold gap-4 px-8 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg mr-4">
            Explore Full Framework →
          </Link>
          <Link href="/get-started" className="inline-block bg-white text-primary-600 font-bold gap-4 px-8 py-4 rounded-xl border-2 border-primary-600 hover:bg-primary-50 transition-all">
            Diagnose My Business
          </Link>
        </div>
      </div>
    </section>
  );
}
