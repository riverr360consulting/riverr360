export default function LeakageImpact() {
  const problems = [
    {
      number: '01',
      title: 'Rising Acquisition Costs',
      description:
        'You spend more on marketing, but growth becomes harder to sustain.',
      bg: 'bg-blue-50/60',
      border: 'border-blue-100',
    },
    {
      number: '02',
      title: 'Poor Funnel Conversion',
      description:
        'Traffic increases, but too few visitors become paying customers.',
      bg: 'bg-slate-50',
      border: 'border-slate-200',
    },
    {
      number: '03',
      title: 'Weak Customer Retention',
      description:
        'New customers come in, but repeat revenue stays low.',
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100',
    },
    {
      number: '04',
      title: 'Unclear Performance Data',
      description:
        'Decisions are made without knowing what is actually driving revenue.',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
    },
    {
      number: '05',
      title: 'Inefficient Scaling',
      description:
        'Businesses grow faster than their systems can support profitably.',
      bg: 'bg-sky-50/60',
      border: 'border-sky-100',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Where Revenue Leakage Becomes Expensive
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            As businesses scale, hidden inefficiencies across acquisition,
            conversion, retention, and reporting systems quietly reduce
            profitability.
          </p>
        </div>

        {/* Problem Blocks */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {problems.map((problem) => (
            <div
              key={problem.number}
              className={`${problem.bg} ${problem.border} border rounded-3xl p-8 md:p-10 transition-all duration-300 hover:shadow-sm`}
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Left */}
                <div className="md:col-span-4">
                  <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary-600 shadow-sm mb-5">
                    {problem.number}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {problem.title}
                  </h3>
                </div>

                {/* Right */}
                <div className="md:col-span-8">
                  <p className="text-lg leading-relaxed text-gray-700 max-w-3xl">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Outcome Section */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-10 md:p-14">
            <div className="max-w-3xl mb-10">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-5">
                What Efficient Growth Systems Restore
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                Revenue leakage affects more than marketing performance — it
                impacts visibility, scalability, operational efficiency, and
                long-term profitability.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                'Better Conversion Performance',
                'More Profitable Acquisition',
                'Stronger Customer Retention',
                'Clearer Revenue Visibility',
                'Scalable Growth Efficiency',
              ].map((item, index) => (
                <div
                  key={index}
                  className="px-5 py-3 rounded-full bg-primary-50 text-primary-700 text-sm md:text-base font-medium border border-primary-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}