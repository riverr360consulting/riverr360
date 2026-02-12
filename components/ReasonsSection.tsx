import CTAButton from './CTAButton';

const reasons = [
  {
    title: 'Poor Website Conversion',
    description: 'Your website gets traffic but visitors leave without converting. Weak CTAs, confusing navigation, and slow loading kill sales.',
    icon: '🌐',
  },
  {
    title: 'Wasted Ad Spend',
    description: 'Poorly targeted campaigns, wrong keywords, and no retargeting mean your ad budget evaporates with minimal ROI.',
    icon: '💸',
  },
  {
    title: 'Invisible SEO Presence',
    description: 'Your competitors rank while you don\'t. No organic traffic means you\'re paying for every single visitor.',
    icon: '🔍',
  },
  {
    title: 'Ineffective Email Marketing',
    description: 'Low open rates, poor segmentation, and no automation mean you\'re leaving money in your subscriber list.',
    icon: '📧',
  },
  {
    title: 'No Social Media Strategy',
    description: 'Random posts with no engagement or conversions. Your competitors are building communities while you post into the void.',
    icon: '📱',
  },
  {
    title: 'Missing Analytics & Tracking',
    description: 'You can\'t improve what you don\'t measure. Without proper tracking, you\'re flying blind and wasting money.',
    icon: '📊',
  },
];

export default function ReasonsSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Common Marketing Leaks Draining Your Budget
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding where and why your marketing dollars leak is the first step to maximizing ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton text="Get a Free Marketing Audit" variant="primary" />
        </div>
      </div>
    </section>
  );
}
