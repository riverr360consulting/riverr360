import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Stop Losing Revenue | Free Marketing Audit — Riverr360',
  description: 'Get a free R360 Revenue Leakage Audit. We identify exactly where your marketing budget is leaking and build a roadmap to recover it.',
  robots: { index: false, follow: false },
};

export default function LandingPage() {
  return (
    // No global Header or Footer — this page uses pathname check in Header.tsx
    <div className="min-h-screen bg-white">

      {/* Minimal header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <img src="/images/logo.png" alt="Riverr360" className="h-8 w-auto" />
          </Link>
          <a href="tel:+919876543210" className="text-sm text-gray-600 hover:text-primary-600 font-medium">
            📞 Call us now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-purple-50 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Free Revenue Leakage Audit — Limited Spots
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Stop Losing Revenue<br />
                <span className="text-primary-600">Across Your Marketing Funnel</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Most businesses waste 40–60% of their marketing budget without knowing where. The R360 Framework pinpoints exactly where your revenue is leaking — and builds a roadmap to recover it.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { stat: '↓ 32%', label: 'Lower Acquisition Cost' },
                  { stat: '↑ 2.4X', label: 'Qualified Lead Growth' },
                  { stat: '↑ 41%', label: 'Conversion Improvement' },
                  { stat: '↓ 28%', label: 'Customer Churn Reduction' },
                ].map(({ stat, label }) => (
                  <div key={label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <div className="text-2xl font-bold text-primary-600">{stat}</div>
                    <div className="text-xs text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                {['✓ No retainer traps', '✓ Diagnosis-first approach', '✓ Outcome-tied metrics'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Get Your Free Revenue Leakage Audit</h2>
              <p className="text-sm text-gray-500 mb-6">Takes 2 minutes. No commitment required.</p>
              <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
                <input type="hidden" name="access_key" value="bd8222f1-81ef-4ed7-9182-09c0c52ae333" />
                <input type="hidden" name="subject" value="New Landing Page Lead — Riverr360" />
                <input type="hidden" name="redirect" value="https://riverr360.com/thank-you" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" placeholder="Rahul Sharma" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" placeholder="rahul@company.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" placeholder="+91 98765 43210" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly marketing budget</label>
                  <select name="budget">
                    <option value="">Select a range</option>
                    <option>Under ₹25,000/month</option>
                    <option>₹25,000 – ₹1,00,000/month</option>
                    <option>₹1,00,000 – ₹3,00,000/month</option>
                    <option>₹3,00,000 – ₹10,00,000/month</option>
                    <option>Above ₹10,00,000/month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biggest marketing challenge</label>
                  <textarea name="challenge" placeholder="e.g. High ad spend but poor quality leads..." style={{ height: 72 }} />
                </div>
                <button type="submit" className="btn-primary w-full text-center">
                  Get My Free Revenue Leakage Audit →
                </button>
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <Link href="/book" className="block w-full btn-secondary text-center text-sm">
                  📅 Book a 30-min Strategy Call Instead
                </Link>
                <p className="text-xs text-gray-400 text-center pt-1">
                  🔒 Your information is secure and never shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-8 font-medium uppercase tracking-wide">Real results from the R360 Framework</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🛒', type: 'E-commerce Brand', problem: 'High CAC with low ROAS on Meta Ads', result: '↓ 38% lower cost per acquisition' },
              { icon: '💻', type: 'SaaS Company', problem: 'No attribution clarity across channels', result: '↑ 2.1X ROAS after tracking rebuild' },
              { icon: '🏥', type: 'Healthcare Clinic', problem: 'Low Google Ads conversion rate', result: '↑ 47% more qualified leads' },
            ].map(({ icon, type, problem, result }) => (
              <div key={type} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="text-2xl mb-3">{icon}</div>
                <div className="text-xs font-semibold text-primary-600 mb-2">{type}</div>
                <p className="text-sm text-gray-600 mb-3">{problem}</p>
                <p className="text-sm font-bold text-gray-900">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How the Free Audit Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit the form', desc: 'Takes 2 minutes. No credit card.' },
              { step: '02', title: 'We review your situation', desc: 'Within 24 hours we analyse your details.' },
              { step: '03', title: 'Diagnosis call', desc: '30-min Google Meet to walk through findings.' },
              { step: '04', title: 'Recovery roadmap', desc: 'You leave with a clear action plan.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">{step}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-primary-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Stop the Leaks?</h2>
          <p className="text-primary-100 mb-6">Get your free R360 Revenue Leakage Audit today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#top" className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Get Free Revenue Leakage Audit →
            </a>
            <Link href="/book" className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal footer — NO global footer */}
      <footer className="border-t border-gray-100 py-6 text-center bg-white">
        <p className="text-xs text-gray-400">
          © 2026 Riverr360. All rights reserved. ·{' '}
          <Link href="/contact" className="hover:text-gray-600">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}
