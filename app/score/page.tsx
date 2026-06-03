'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const areas = [
  {
    id: 'lead_response',
    number: '01',
    title: 'Lead Response',
    icon: '⚡',
    color: 'border-red-400 bg-red-50',
    badge: 'bg-red-100 text-red-700',
    items: [
      'We respond to leads within 1 hour',
      'We have an automated first response',
      'We track response time in our CRM',
      'We follow up at least 3 times before closing a lead',
      'We have a defined lead qualification process',
    ],
  },
  {
    id: 'landing_page',
    number: '02',
    title: 'Landing Page',
    icon: '🎯',
    color: 'border-orange-400 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    items: [
      'Our landing pages have a single clear CTA',
      'We have separate pages for each service or offer',
      'Our pages load in under 3 seconds',
      'We have trust signals — reviews, case studies, testimonials',
      'We A/B test our landing pages regularly',
    ],
  },
  {
    id: 'follow_up',
    number: '03',
    title: 'Follow-up Automation',
    icon: '🔄',
    color: 'border-yellow-400 bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
    items: [
      'We have automated email sequences after a lead signs up',
      'We send reminders for abandoned enquiries',
      'We use segmentation in our email marketing',
      'We have a post-sale nurture sequence',
      'We track email open and click rates',
    ],
  },
  {
    id: 'crm',
    number: '04',
    title: 'CRM Usage',
    icon: '📊',
    color: 'border-green-400 bg-green-50',
    badge: 'bg-green-100 text-green-700',
    items: [
      'We use a CRM to track all leads',
      'Every lead has a status and follow-up date',
      'Our sales team logs every interaction',
      'We track deal value and pipeline',
      'We review CRM data weekly',
    ],
  },
  {
    id: 'retargeting',
    number: '05',
    title: 'Retargeting',
    icon: '📡',
    color: 'border-blue-400 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    items: [
      'We run retargeting ads on Meta or Google',
      'We have separate retargeting campaigns for different audiences',
      'We retarget website visitors who did not convert',
      'We have a retargeting budget allocated monthly',
      'We track retargeting ROAS separately',
    ],
  },
  {
    id: 'reviews',
    number: '06',
    title: 'Review Management',
    icon: '⭐',
    color: 'border-purple-400 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
    items: [
      'We actively ask customers for reviews after every sale',
      'We respond to all Google reviews within 48 hours',
      'We have 10 or more Google reviews',
      'We monitor reviews across all platforms',
      'We use reviews in our marketing and website',
    ],
  },
  {
    id: 'tracking',
    number: '07',
    title: 'Conversion Tracking',
    icon: '📈',
    color: 'border-teal-400 bg-teal-50',
    badge: 'bg-teal-100 text-teal-700',
    items: [
      'We have Google Analytics or GA4 installed',
      'We track form submissions as conversions',
      'We track phone calls as conversions',
      'We connect ad spend to actual revenue',
      'We review conversion data monthly',
    ],
  },
];

export default function ScorePage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'details'>('intro');
  const [currentArea, setCurrentArea] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean[]>>(
    Object.fromEntries(areas.map(a => [a.id, Array(5).fill(false)]))
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [website, setWebsite] = useState('');
  const [budget, setBudget] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  function toggleCheck(areaId: string, idx: number) {
    const current = [...checked[areaId]];
    current[idx] = !current[idx];
    setChecked({ ...checked, [areaId]: current });
  }

  function getAreaScore(areaId: string) {
    return checked[areaId].filter(Boolean).length * 2;
  }

  function getTotalScore() {
    return areas.reduce((sum, a) => sum + getAreaScore(a.id), 0);
  }

  function getProgress() {
    if (step === 'intro') return 0;
    if (step === 'details') return 95;
    return Math.round(((currentArea + 1) / areas.length) * 85);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const scores = Object.fromEntries(areas.map(a => [a.id, getAreaScore(a.id)]));
    const total = getTotalScore();

    const res = await fetch('/api/score/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, business, website, budget, scores, total, checked }),
    });

    if (res.ok) {
      const params = new URLSearchParams({
        name, total: String(total),
        scores: JSON.stringify(scores),
      });
      router.push(`/score/report?${params.toString()}`);
    } else {
      setSubmitting(false);
    }
  }

  const area = areas[currentArea];
  const areaScore = getAreaScore(area?.id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <img src="/images/logo.png" alt="Riverr360" className="h-10 w-auto" />
            </Link>
            <div className="text-sm font-medium text-gray-500">Revenue Leakage Score</div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {step !== 'intro' && (
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-3xl py-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>{step === 'quiz' ? `Area ${currentArea + 1} of ${areas.length}` : 'Almost done!'}</span>
              <span className="text-primary-600 font-bold">{getProgress()}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full transition-all duration-500" style={{ width: `${getProgress()}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl py-10">

        {/* INTRO */}
        {step === 'intro' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Free Tool — Takes 15 Minutes
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Find Your Revenue Leakage Score
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Score your business across 7 critical areas. Discover exactly where you are leaking revenue — and get a personalised report with your top fixes.
            </p>
            <p className="text-gray-500 text-sm mb-10">7 areas · 35 checkboxes · Score out of 70</p>

            {/* Score bands preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xl mx-auto mb-10">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Score Bands</p>
              <div className="space-y-2">
                {[
                  { range: '0 – 20', label: 'Critical', desc: 'Severe leakage across multiple areas', color: 'text-red-600', bg: 'bg-red-50' },
                  { range: '21 – 35', label: 'High Risk', desc: 'Significant revenue being lost', color: 'text-orange-600', bg: 'bg-orange-50' },
                  { range: '36 – 50', label: 'Moderate', desc: 'Some systems working, gaps present', color: 'text-yellow-600', bg: 'bg-yellow-50' },
                  { range: '51 – 63', label: 'Good', desc: 'Strong foundation, room to optimise', color: 'text-green-600', bg: 'bg-green-50' },
                  { range: '64 – 70', label: 'Excellent', desc: 'Well-optimised, focus on scaling', color: 'text-primary-600', bg: 'bg-primary-50' },
                ].map((band, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${band.bg}`}>
                    <span className={`font-bold text-sm w-16 flex-shrink-0 ${band.color}`}>{band.range}</span>
                    <span className={`font-semibold text-sm ${band.color}`}>{band.label}</span>
                    <span className="text-gray-500 text-sm">{band.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setStep('quiz')}
              className="bg-primary-600 text-white font-bold text-lg px-12 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
              Start Scoring My Business →
            </button>
            <p className="text-gray-400 text-sm mt-4">Free · No credit card · Instant PDF report</p>
          </div>
        )}

        {/* QUIZ */}
        {step === 'quiz' && (
          <div>
            <div className={`rounded-2xl border-l-4 p-8 mb-6 ${area.color}`}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{area.icon}</span>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${area.badge}`}>Area {area.number} of 07</span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">{area.title}</h2>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-primary-600">{areaScore}/10</div>
                  <div className="text-xs text-gray-500">current score</div>
                </div>
              </div>

              <div className="space-y-3">
                {area.items.map((item, idx) => (
                  <label key={idx} className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${checked[area.id][idx] ? 'border-primary-400 bg-white shadow-sm' : 'border-transparent bg-white/60 hover:bg-white'}`}>
                    <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all ${checked[area.id][idx] ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                      {checked[area.id][idx] && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={checked[area.id][idx]} onChange={() => toggleCheck(area.id, idx)} />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Running total */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">Running Total Score</span>
                <span className="text-xl font-bold text-primary-600">{getTotalScore()}/70</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${(getTotalScore() / 70) * 100}%` }}></div>
              </div>
            </div>

            <div className="flex gap-3">
              {currentArea > 0 && (
                <button onClick={() => setCurrentArea(currentArea - 1)}
                  className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                  ← Back
                </button>
              )}
              <button
                onClick={() => currentArea < areas.length - 1 ? setCurrentArea(currentArea + 1) : setStep('details')}
                className="flex-1 bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-md">
                {currentArea < areas.length - 1 ? `Next: ${areas[currentArea + 1].title} →` : 'Get My Score Report →'}
              </button>
            </div>

            {/* Area indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {areas.map((a, i) => (
                <button key={i} onClick={() => setCurrentArea(i)}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition-all ${i === currentArea ? 'bg-primary-600 text-white' : i < currentArea ? 'bg-primary-200 text-primary-700' : 'bg-gray-200 text-gray-400'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DETAILS FORM */}
        {step === 'details' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🎯</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Scoring Complete!</h2>
              <p className="text-gray-600">Your preliminary score: <span className="font-bold text-primary-600 text-xl">{getTotalScore()}/70</span></p>
              <p className="text-gray-500 text-sm mt-1">Enter your details to generate your full personalised report</p>
            </div>

            {/* Score summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Score Summary</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {areas.map((a, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-primary-600">{getAreaScore(a.id)}/10</div>
                    <div className="text-xs text-gray-500 mt-0.5">{a.title}</div>
                  </div>
                ))}
                <div className="text-center col-span-2 md:col-span-4 border-t pt-3 mt-1">
                  <div className="text-2xl font-bold text-gray-900">{getTotalScore()}/70</div>
                  <div className="text-xs text-gray-500">Total Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-6">Where Should We Send Your Report?</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name *</label>
                    <input type="text" required value={business} onChange={e => setBusiness(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Your Company Pvt Ltd" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website</label>
                    <input type="text" value={website} onChange={e => setWebsite(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="https://yourwebsite.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Marketing Budget *</label>
                    <select required value={budget} onChange={e => setBudget(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm">
                      <option value="">Select range</option>
                      <option value="Under ₹50K">Under ₹50K/month</option>
                      <option value="₹50K–₹1L">₹50K – ₹1L/month</option>
                      <option value="₹1L–₹3L">₹1L – ₹3L/month</option>
                      <option value="₹3L–₹10L">₹3L – ₹10L/month</option>
                      <option value="Above ₹10L">Above ₹10L/month</option>
                    </select>
                  </div>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg disabled:opacity-50 mt-2">
                  {submitting ? 'Generating Your Report...' : 'Generate My Revenue Leakage Score Report →'}
                </button>
                <p className="text-center text-xs text-gray-400">Your data is private and will never be shared or sold.</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
