import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Riverr360 | Revenue Leakage Consulting',
  description: 'Riverr360 helps businesses uncover hidden revenue leakage and build scalable growth systems using the R360 Revenue Leakage Framework.',
};

const values = [
  { icon: '🎯', title: 'Diagnosis Before Solutions', description: 'We never prescribe before we diagnose. Every engagement starts with a rigorous audit across all 5 layers of the R360 Framework before a single recommendation is made.' },
  { icon: '📊', title: 'Data Over Assumptions', description: 'Every decision is backed by data. We map your actual numbers — because your leakage is unique to your business, your market, and your funnel.' },
  { icon: '🔄', title: 'Systems Over Tactics', description: 'We build scalable growth systems, not one-off campaigns. The goal is a self-reinforcing engine where efficiency compounds and revenue grows predictably.' },
  { icon: '📈', title: 'Measurable Outcomes Only', description: 'We commit to outcomes, not activities. Every engagement has defined metrics — and we track them obsessively so you always know what is working.' },
];

const layers = [
  { number: '01', name: 'Acquisition Leakage', color: 'bg-red-100 text-red-700', desc: 'Finding and fixing the right traffic at the right cost' },
  { number: '02', name: 'Attribution Leakage', color: 'bg-orange-100 text-orange-700', desc: 'Full funnel visibility and accurate revenue attribution' },
  { number: '03', name: 'Conversion Leakage', color: 'bg-yellow-100 text-yellow-700', desc: 'Converting more of the traffic you already have' },
  { number: '04', name: 'Retention Leakage', color: 'bg-green-100 text-green-700', desc: 'Keeping customers longer and growing their value' },
  { number: '05', name: 'Scaling Leakage', color: 'bg-blue-100 text-blue-700', desc: 'Building systems that scale without breaking' },
];

const services = [
  { icon: '🔍', title: 'Revenue Leakage Audits', desc: 'A comprehensive diagnostic across all 5 layers to identify and quantify exactly where your business is losing revenue.' },
  { icon: '🗺️', title: 'Growth System Design', desc: 'Building the systems, processes, and playbooks that make growth scalable, predictable, and efficient.' },
  { icon: '📡', title: 'Attribution & Analytics', desc: 'Full-funnel tracking setup so every marketing investment is connected to actual revenue outcomes.' },
  { icon: '🎯', title: 'Acquisition Strategy', desc: 'Identifying the right channels, audiences, and messaging to generate qualified leads at sustainable cost.' },
  { icon: '🔄', title: 'Conversion Optimisation', desc: 'Fixing the funnel gaps that prevent traffic from becoming customers — without increasing ad spend.' },
  { icon: '💎', title: 'Retention & LTV Growth', desc: 'Building post-sale systems that increase customer lifetime value and generate referrals consistently.' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Revenue Leakage Consulting
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              We Help Businesses Stop Leaking Revenue — and Start Growing Profitably
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Riverr360 helps businesses uncover hidden revenue leakage and build scalable growth systems driven by intelligence, efficiency, and measurable profitability.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Riverr360 Exists</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Most businesses invest significantly in marketing — and yet a large portion of that investment quietly leaks away before it ever generates revenue. Poor targeting, broken funnels, weak attribution, high churn, and unscalable systems all compound into a silent profit drain.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Riverr360 was built to solve this. Not with generic marketing advice or one-size-fits-all tactics — but with a structured, diagnostic-first approach that identifies exactly where revenue is leaking and builds a precise roadmap to recover it.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  The result is a business that grows efficiently, predictably, and profitably — without burning budget on things that do not work.
                </p>
              </div>
              <div className="bg-primary-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Core Belief</h3>
                <div className="space-y-4">
                  {[
                    'Revenue leakage is not a marketing problem. It is a systems problem.',
                    'Most businesses are closer to profitability than they realise — the leaks just need to be found.',
                    'The best growth strategies are built on diagnosis, not assumptions.',
                    'Scalable growth requires systems, not just campaigns.',
                  ].map((belief, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary-600 font-bold text-lg mt-0.5">→</span>
                      <p className="text-gray-700">{belief}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R360 Framework */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Methodology — The R360 Revenue Leakage Framework</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A proprietary 5-layer diagnostic system that identifies exactly where your business is leaking revenue — and builds a roadmap to recover it.
              </p>
            </div>
            <div className="space-y-4 mb-10">
              {layers.map((layer, index) => (
                <div key={index} className="bg-white rounded-xl p-6 flex items-center gap-6 shadow-sm">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${layer.color}`}>Layer {layer.number}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{layer.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{layer.desc}</p>
                  </div>
                  <Link href="/framework" className="text-primary-600 text-sm font-semibold hover:text-primary-700 flex-shrink-0">Learn more →</Link>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/framework" className="inline-block bg-primary-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
                Explore the Full Framework →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Work</h2>
              <p className="text-xl text-gray-600">The principles that guide every client engagement.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Work On</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {services.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Revenue Leaks?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Start with a free diagnostic consultation — we will identify which of the 5 layers is costing you the most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
              Start Free Diagnosis →
            </Link>
            <Link href="/contact" className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
