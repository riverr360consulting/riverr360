import Link from 'next/link';

const problems = [
  {
    number: '01',
    title: 'Rising Acquisition Costs',
    description: 'You spend more on marketing, but growth becomes harder to sustain.',
    icon: '📈',
    color: 'bg-red-50 border-red-400',
    badge: 'bg-red-100 text-red-700',
  },
  {
    number: '02',
    title: 'Poor Funnel Conversion',
    description: 'Traffic increases, but too few visitors become paying customers.',
    icon: '🔽',
    color: 'bg-orange-50 border-orange-400',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    number: '03',
    title: 'Weak Customer Retention',
    description: 'New customers come in, but repeat revenue stays low.',
    icon: '💸',
    color: 'bg-yellow-50 border-yellow-400',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    number: '04',
    title: 'Unclear Performance Data',
    description: 'Decisions are made without knowing what is actually driving revenue.',
    icon: '🌫️',
    color: 'bg-purple-50 border-purple-400',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    number: '05',
    title: 'Inefficient Scaling',
    description: 'Businesses grow faster than their systems can support profitably.',
    icon: '⚙️',
    color: 'bg-blue-50 border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
  },
];

export default function ProblemsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            These Problems Are Costing You Revenue Right Now
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Where Revenue Leakage Becomes Expensive
          </h2>
          <p className="text-xl text-gray-600">
            These are not isolated marketing problems. They are interconnected symptoms of a deeper systemic issue — and they compound silently until the damage becomes visible.
          </p>
        </div>

        {/* Problems — first 3 */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
          {problems.slice(0, 3).map((problem, index) => (
            <div key={index} className={`border-l-4 rounded-xl p-6 ${problem.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{problem.icon}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${problem.badge}`}>
                  Problem {problem.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Problems — last 2 centered */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {problems.slice(3).map((problem, index) => (
            <div key={index} className={`border-l-4 rounded-xl p-6 ${problem.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{problem.icon}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${problem.badge}`}>
                  Problem {problem.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom connector to framework */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-primary-100 rounded-2xl p-8 text-center shadow-sm">
            <p className="text-lg text-gray-700 mb-2">
              The <strong className="text-primary-600">R360 Revenue Leakage Framework</strong> was built to diagnose and resolve all 5 of these problems — simultaneously, not in isolation.
            </p>
            <p className="text-gray-500 text-sm mb-6">Each problem maps directly to one of the 5 layers of the framework.</p>
            <Link href="/score" className="inline-block bg-primary-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-md">
              Get Your Revenue Leakage Score →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
