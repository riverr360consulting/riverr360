import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Free Revenue Leakage Diagnosis',
    description: 'Complete our 5-layer R360 diagnostic to identify exactly which areas of your business are leaking revenue — and by how much.',
    icon: '🔍',
    color: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-700',
  },
  {
    number: '02',
    title: 'Personalised Recovery Plan',
    description: 'We map your leakage across all 5 layers and build a prioritised roadmap — starting with the highest-impact fixes for your specific situation.',
    icon: '🗺️',
    color: 'bg-orange-50 border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    number: '03',
    title: 'Implement & Measure',
    description: 'We execute the recovery plan with full transparency — every action tied to a metric so you always know exactly what is moving and why.',
    icon: '⚡',
    color: 'bg-yellow-50 border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  {
    number: '04',
    title: 'Build Scalable Growth Systems',
    description: 'Once leakage is plugged, we build the systems that make growth predictable — so results compound over time without proportional cost increases.',
    icon: '🚀',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-700',
  },
];

export default function SolutionsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            How We Work
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            From Diagnosis to Scalable Growth — in 4 Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every Riverr360 engagement follows the same proven process — diagnose first, then recover, then scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className={`p-8 rounded-xl border-2 ${step.color}`}>
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{step.icon}</div>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${step.badge}`}>Step {step.number}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-primary-600 to-purple-700 text-white p-10 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find and Fix Your Revenue Leaks?</h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start with a free diagnosis across all 5 layers of the R360 Framework — no commitment, no fluff, just clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
              Start Free Diagnosis →
            </Link>
            <Link href="/framework" className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
              Explore the Framework
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
