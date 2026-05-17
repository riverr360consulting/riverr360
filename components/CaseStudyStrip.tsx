import Link from 'next/link';

const cases = [
  {
    client: 'Ecommerce Brand',
    problem: 'High CAC',
    fix: 'Funnel optimisation',
    result: '↓ 38% lower CAC',
    color: 'text-red-600',
  },
  {
    client: 'SaaS Company',
    problem: 'Poor attribution',
    fix: 'Tracking rebuild',
    result: '↑ 2.1X ROAS',
    color: 'text-primary-600',
  },
  {
    client: 'Clinic',
    problem: 'Low conversion rate',
    fix: 'CRO + LP redesign',
    result: '↑ 47% more leads',
    color: 'text-green-600',
  },
];

export default function CaseStudyStrip() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Proven Results
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Real Revenue Leakage We Fixed</h2>
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-8">
            {/* Header row */}
            <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 px-6 py-3">
              {['Client', 'Problem', 'Fix', 'Result'].map((h, i) => (
                <div key={i} className="text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</div>
              ))}
            </div>
            {/* Data rows */}
            {cases.map((c, i) => (
              <div key={i} className={`grid grid-cols-4 px-6 py-5 items-center ${i !== cases.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
                <div className="font-semibold text-gray-900 text-sm">{c.client}</div>
                <div className="text-gray-600 text-sm">{c.problem}</div>
                <div className="text-gray-600 text-sm">{c.fix}</div>
                <div className={`font-bold text-base ${c.color}`}>{c.result}</div>
              </div>
            ))}
          </div>

          {/* Cards — mobile */}
          <div className="md:hidden space-y-4 mb-8">
            {cases.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="font-bold text-gray-900 mb-3">{c.client}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5">Problem</span>
                    <span className="text-gray-700">{c.problem}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide block mb-0.5">Fix</span>
                    <span className="text-gray-700">{c.fix}</span>
                  </div>
                </div>
                <div className={`mt-3 font-bold text-lg ${c.color}`}>{c.result}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/case-studies" className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition-colors text-sm">
              View detailed case studies →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
