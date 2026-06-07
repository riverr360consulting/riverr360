import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'R360 Revenue Leakage Framework | Riverr360 Consulting',
  description: 'The R360 Revenue Leakage Framework — a 5-layer diagnostic system that identifies exactly where your business is losing revenue across Acquisition, Attribution, Conversion, Retention, and Scaling.',
};

const layers = [
  {
    number: '01',
    name: 'Acquisition Leakage',
    icon: '🎯',
    color: { bg: 'bg-red-50', border: 'border-red-400', badge: 'bg-red-100 text-red-700', icon: 'bg-red-100', dot: 'bg-red-400' },
    problem: 'You are spending on traffic that never converts. Wrong channels, wrong audience targeting, and misaligned messaging mean your budget is leaking before a single prospect enters your funnel.',
    signals: ['High Cost Per Lead (CPL) with poor lead quality','Low Click-Through Rates (CTR) on paid campaigns','Bounce rates above 70% on key landing pages','Wrong audience demographics in ad platforms','High volume of leads that never qualify','Seasonal spikes with no predictable baseline'],
    diagnosis: ['Full channel mix audit across paid, organic, social, and referral','Audience targeting and persona alignment review','Ad creative and messaging relevance analysis','Landing page to ad message congruence check','Competitor channel benchmarking','Traffic quality scoring and source analysis'],
    outcome: 'Right traffic at the right cost — a consistent flow of qualified prospects entering your funnel from channels that actually convert for your business model and market.',
  },
  {
    number: '02',
    name: 'Attribution Leakage',
    icon: '📡',
    color: { bg: 'bg-orange-50', border: 'border-orange-400', badge: 'bg-orange-100 text-orange-700', icon: 'bg-orange-100', dot: 'bg-orange-400' },
    problem: 'Without knowing which marketing efforts actually drive revenue, you keep funding what feels good instead of what works. Budget flows to the wrong channels every single month — and you never know it.',
    signals: ['No clear ROI visibility across campaigns','Multiple disconnected tools with no unified view','Over-crediting last-click or first-touch only','Dark funnel activity not captured anywhere','CRM data not connected to ad platform data','Inability to answer "what is working?"'],
    diagnosis: ['Full tracking stack audit (GA4, Meta, CRM, etc.)','Attribution model selection and configuration','CRM-to-ad platform data mapping','Conversion path and assisted conversion analysis','UTM parameter hygiene and consistency check','Cross-device and cross-channel journey mapping'],
    outcome: 'Full funnel visibility — every marketing investment tracked to actual revenue so you can make confident budget decisions based on data, not intuition.',
  },
  {
    number: '03',
    name: 'Conversion Leakage',
    icon: '🔄',
    color: { bg: 'bg-yellow-50', border: 'border-yellow-400', badge: 'bg-yellow-100 text-yellow-700', icon: 'bg-yellow-100', dot: 'bg-yellow-400' },
    problem: 'Traffic arrives but fails to convert. Broken funnels, weak offers, confusing UX, and poor call-to-actions silently destroy your revenue potential — without spending a single extra rupee on acquisition.',
    signals: ['Website conversion rate below 2%','High cart or form abandonment rates','Visitors browsing multiple pages but not converting','Low email open rates and click rates','Weak or unclear calls-to-action throughout the funnel','Sales team receiving unqualified or cold leads'],
    diagnosis: ['End-to-end conversion funnel mapping and gap analysis','UX audit and heatmap/session recording review','Offer clarity and value proposition assessment','CTA placement, copy, and design optimisation','Lead magnet and nurture sequence review','A/B testing roadmap for high-impact pages'],
    outcome: 'More revenue from your existing traffic — a measurable lift in conversion rates that compounds over time without increasing your ad spend.',
  },
  {
    number: '04',
    name: 'Retention Leakage',
    icon: '💎',
    color: { bg: 'bg-green-50', border: 'border-green-400', badge: 'bg-green-100 text-green-700', icon: 'bg-green-100', dot: 'bg-green-400' },
    problem: 'You win a customer, then lose them. No post-sale nurture, no loyalty systems, no upsell strategy. High churn erodes the revenue you worked hard and spent significantly to generate.',
    signals: ['High customer churn rate month-on-month','No structured post-sale communication sequence','Low Lifetime Value (LTV) relative to acquisition cost','No referral or word-of-mouth system in place','Customers not returning for repeat purchases','Poor Net Promoter Score (NPS) or review ratings'],
    diagnosis: ['Full customer journey mapping post-conversion','LTV vs CAC ratio analysis and benchmarking','Email nurture and retention sequence audit','Upsell and cross-sell opportunity identification','Loyalty programme and referral system design','Churn trigger identification and intervention planning'],
    outcome: 'Customers who stay longer, spend more, and actively refer others — creating compounding revenue growth that dramatically reduces your dependency on new customer acquisition.',
  },
  {
    number: '05',
    name: 'Scaling Leakage',
    icon: '🚀',
    color: { bg: 'bg-blue-50', border: 'border-blue-400', badge: 'bg-blue-100 text-blue-700', icon: 'bg-blue-100', dot: 'bg-blue-400' },
    problem: 'When you try to scale, costs rise faster than revenue. No systems, no automation, and no operational leverage means that growth becomes unsustainable — and eventually breaks the business.',
    signals: ['Customer Acquisition Cost (CAC) rises as you scale','Team overwhelmed with manual, repetitive tasks','No marketing automation or CRM workflows','Inconsistent campaign results across markets','Cannot maintain quality while increasing volume','Growth requires proportional headcount increases'],
    diagnosis: ['Marketing technology and automation stack review','Process mapping and operational efficiency audit','Scaling bottleneck identification across all channels','Team capacity vs output analysis','Growth system and playbook development','Technology consolidation and integration opportunities'],
    outcome: 'A scalable, systemised growth engine — where increasing budget and volume predictably generates proportionally more revenue without breaking your team or your margins.',
  },
];

export default function FrameworkPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Proprietary Methodology
          </div>
          <h1 className="text-5xl font-bold mb-6">R360 Revenue Leakage Framework</h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            A 5-layer diagnostic system that identifies exactly where your business is losing revenue — and builds a precise roadmap to recover it, sustainably.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['Acquisition', 'Attribution', 'Conversion', 'Retention', 'Scaling'].map((l, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                {String(i + 1).padStart(2, '0')} {l}
              </div>
            ))}
          </div>
          {/* Hero CTAs */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/score" className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
                Get Your Revenue Leakage Score →
              </Link>
              <Link href="/ai-audit" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
                🧠 Try Free AI Audit
              </Link>
            </div>
            <p className="text-white/60 text-xs">
              Not sure which to choose? AI Audit gives instant results · Score gives the full report
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary-50 border-l-4 border-primary-600 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Why Most Businesses Never Find Their Revenue Leaks</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most businesses look at their marketing in silos — checking ad performance here, website traffic there, and churn numbers somewhere else. This fragmented view means revenue leaks go undetected for months or years.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The R360 Revenue Leakage Framework takes a unified view across all 5 critical layers simultaneously — so nothing is missed and every recovery opportunity is identified and prioritised.
            </p>
          </div>

          {/* 5 Layers */}
          <div className="space-y-12">
            {layers.map((layer, index) => (
              <div key={index} className={`rounded-2xl border-l-4 ${layer.color.border} ${layer.color.bg} p-8`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 ${layer.color.icon} rounded-xl flex items-center justify-center text-2xl`}>
                    {layer.icon}
                  </div>
                  <div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${layer.color.badge}`}>Layer {layer.number}</span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">{layer.name}</h2>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">The Problem</h3>
                  <p className="text-gray-700 leading-relaxed">{layer.problem}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-xl p-5">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Leakage Signals</h3>
                    <ul className="space-y-2">
                      {layer.signals.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${layer.color.dot}`}></span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-5">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Diagnosis Areas</h3>
                    <ul className="space-y-2">
                      {layer.diagnosis.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-primary-500 mt-0.5 flex-shrink-0">✓</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 border-l-4 border-primary-400">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Outcome</h3>
                  <p className="text-gray-800 font-medium leading-relaxed">{layer.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Diagnose Your Revenue Leakage?</h2>
          <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
            Get a personalised assessment across all 5 layers of the R360 Framework — completely free.
          </p>
          {/* Funnel hint */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-sm text-white/70">
            <span className="flex items-center gap-1.5">🧠 <strong className="text-white">AI Audit</strong> — instant, no details needed</span>
            <span className="hidden sm:block text-white/30">→</span>
            <span className="flex items-center gap-1.5">📊 <strong className="text-white">Score & Report</strong> — detailed, qualified</span>
            <span className="hidden sm:block text-white/30">→</span>
            <span className="flex items-center gap-1.5">📅 <strong className="text-white">Book a Call</strong> — personalised roadmap</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/score" className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
              Get Your Revenue Leakage Score →
            </Link>
            <Link href="/ai-audit" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
              🧠 Try Free AI Audit
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
