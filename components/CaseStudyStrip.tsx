import Link from 'next/link';

const cases = [
  {
    client: 'Ecommerce Brand',
    icon: '🛒',
    problem: 'High CAC',
    fix: 'Funnel optimisation',
    result: '↓ 38% lower CAC',
    resultColor: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    client: 'SaaS Company',
    icon: '💻',
    problem: 'Poor attribution',
    fix: 'Tracking rebuild',
    result: '↑ 2.1X ROAS',
    resultColor: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-100',
  },
  {
    client: 'Clinic',
    icon: '🏥',
    problem: 'Low conversion rate',
    fix: 'CRO + LP redesign',
    result: '↑ 47% more leads',
    resultColor: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
];

export default function CaseStudyStrip() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Proven Results
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Real Revenue Leakage We Fixed</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          {cases.map((c, i) => (
            <div key={i} className={`rounded-2xl border ${c.border} ${c.bg} p-6`}>
              <div className="text-3xl mb-4">{c.icon}</div>
              <div className="text-sm font-bold text-gray-900 mb-4">{c.client}</div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Problem</p>
                  <p className="text-sm text-gray-700 font-medium">{c.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Fix</p>
                  <p className="text-sm text-gray-700 font-medium">{c.fix}</p>
                </div>
                <div className={`pt-3 border-t border-gray-200`}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Result</p>
                  <p className={`text-xl font-bold ${c.resultColor}`}>{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/case-studies" className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm">
            View detailed case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
