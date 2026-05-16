export default function LeakageImpact() {
  const problems = [
    {
      title: 'Rising Acquisition Costs',
      description:
        'You spend more on marketing, but growth becomes harder to sustain.',
    },
    {
      title: 'Poor Funnel Conversion',
      description:
        'Traffic increases, but too few visitors become paying customers.',
    },
    {
      title: 'Weak Customer Retention',
      description:
        'New customers come in, but repeat revenue stays low.',
    },
    {
      title: 'Unclear Performance Data',
      description:
        'Decisions are made without knowing what is actually driving revenue.',
    },
    {
      title: 'Inefficient Scaling',
      description:
        'Businesses grow faster than their systems can support profitably.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Revenue Leakage Impact
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Where Revenue Leakage Becomes Expensive
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            As businesses scale, hidden inefficiencies across marketing, conversion, and retention systems quietly reduce profitability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-sm font-semibold text-primary-600 mb-3">
                0{index + 1}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {problem.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-14 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              What Efficient Growth Systems Restore
            </h3>
            <p className="text-gray-600">
              Revenue leakage affects more than marketing performance — it impacts scalability, visibility, and profitability across the business.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              'Better Conversion Performance',
              'More Profitable Acquisition',
              'Stronger Customer Retention',
              'Clearer Revenue Visibility',
              'Scalable Growth Efficiency',
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl px-4 py-5 text-sm font-medium text-gray-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
