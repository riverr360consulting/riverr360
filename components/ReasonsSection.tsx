import CTAButton from './CTAButton';

const reasons = [
  {
    layer: '01',
    title: 'Acquisition Leakage',
    description: 'Wrong channels, wrong audiences, wrong message. You are spending on traffic that will never convert — wasting budget before anyone even sees your offer.',
    icon: '🎯',
    color: 'border-red-400',
    tag: 'bg-red-100 text-red-700',
  },
  {
    layer: '02',
    title: 'Attribution Leakage',
    description: 'Without knowing which efforts drive revenue, you keep funding what feels good instead of what works. Budget goes to the wrong channels every single month.',
    icon: '📡',
    color: 'border-orange-400',
    tag: 'bg-orange-100 text-orange-700',
  },
  {
    layer: '03',
    title: 'Conversion Leakage',
    description: 'Traffic arrives but never converts. Broken funnels, weak CTAs, and poor landing pages silently kill your revenue before a sale can happen.',
    icon: '🔄',
    color: 'border-yellow-400',
    tag: 'bg-yellow-100 text-yellow-700',
  },
  {
    layer: '04',
    title: 'Retention Leakage',
    description: 'You win a customer then lose them. No nurture, no loyalty system, no upsell. High churn erodes the revenue you worked hard to generate.',
    icon: '💎',
    color: 'border-green-400',
    tag: 'bg-green-100 text-green-700',
  },
  {
    layer: '05',
    title: 'Scaling Leakage',
    description: 'When you try to scale, costs rise faster than revenue. No systems, no automation, and no leverage means growth becomes unsustainable.',
    icon: '🚀',
    color: 'border-blue-400',
    tag: 'bg-blue-100 text-blue-700',
  },
  {
    layer: '✓',
    title: 'The R360 Solution',
    description: 'Our framework diagnoses all 5 layers simultaneously — giving you a complete picture of where you are leaking and a precise roadmap to recover your revenue.',
    icon: '🛡️',
    color: 'border-primary-600',
    tag: 'bg-primary-100 text-primary-700',
  },
];

export default function ReasonsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Where Businesses Leak Revenue — And Why Most Never Find It
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The R360 Revenue Leakage Framework covers 5 critical layers where businesses silently lose revenue every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <div key={index} className={`bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 ${reason.color}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{reason.icon}</div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${reason.tag}`}>
                  {reason.layer === '✓' ? 'Solution' : `Layer ${reason.layer}`}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton text="Get a Free Revenue Leakage Audit" variant="primary" href="/get-started" />
        </div>
      </div>
    </section>
  );
}
