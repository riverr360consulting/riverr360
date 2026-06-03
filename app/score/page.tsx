'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const areas = [
  {
    id: 'lead_generation',
    number: '01',
    title: 'Lead Generation',
    icon: '🎯',
    color: 'border-red-400 bg-red-50',
    badge: 'bg-red-100 text-red-700',
    why: 'If your lead generation is leaking, everything downstream suffers. Most businesses either have too few lead sources or do not know which ones actually work.',
    items: [
      'We know our exact cost per lead by channel',
      'We have at least 2 consistent lead sources running',
      'Our target audience is clearly defined and documented',
      'We track which channels bring the highest quality leads',
      'We A/B test our lead generation campaigns regularly',
      'We have a content or organic strategy alongside paid',
      'We review lead quality monthly with sales or conversion data',
    ],
  },
  {
    id: 'lead_response',
    number: '02',
    title: 'Lead Response',
    icon: '⚡',
    color: 'border-orange-400 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    why: 'Speed kills or saves deals. Studies show that responding within 5 minutes vs 30 minutes can increase conversion by over 100%. Most businesses lose leads simply by being slow.',
    items: [
      'We respond to inbound leads within 1 hour',
      'We have an automated first-response system in place',
      'Every lead is assigned to a specific person immediately',
      'We have a defined script or framework for first contact',
      'We track response time as a metric',
      'Leads do not fall through the cracks on weekends or holidays',
      'We follow up with leads who do not reply to first contact',
    ],
  },
  {
    id: 'sales_conversion',
    number: '03',
    title: 'Sales Conversion',
    icon: '💼',
    color: 'border-yellow-400 bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
    why: 'Getting leads is only half the battle. A broken sales process quietly destroys the value of every rupee spent on marketing. Most conversion leakage goes untracked.',
    items: [
      'We know our lead-to-customer conversion rate',
      'Our sales process is documented and followed consistently',
      'We have a clear proposal or offer structure',
      'We address objections proactively during the sales process',
      'We track why deals are lost',
      'We have a follow-up sequence for prospects who go cold',
      'We know our average sales cycle length',
    ],
  },
  {
    id: 'follow_up',
    number: '04',
    title: 'Follow-up & Nurture',
    icon: '🔄',
    color: 'border-green-400 bg-green-50',
    badge: 'bg-green-100 text-green-700',
    why: 'Most sales happen after the 5th touchpoint. Yet most businesses give up after one or two follow-ups. This is one of the highest-ROI areas to fix — it costs nothing extra.',
    items: [
      'We have a structured email follow-up sequence after first contact',
      'We use a CRM to track all prospect touchpoints',
      'We send value-based content between sales touchpoints',
      'Prospects are not left without contact for more than 7 days',
      'We have a re-engagement campaign for cold leads',
      'Our follow-up is personalised, not generic',
      'We know the average number of touchpoints before a sale',
    ],
  },
  {
    id: 'retention',
    number: '05',
    title: 'Customer Retention',
    icon: '💎',
    color: 'border-blue-400 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    why: 'Acquiring a new customer costs 5–7x more than retaining an existing one. Churn is silent but devastating. Most businesses have no system to prevent it.',
    items: [
      'We track customer churn rate monthly',
      'We have an onboarding process for new customers',
      'We collect regular feedback from existing customers',
      'We have upsell or cross-sell offers for existing customers',
      'We identify and proactively contact at-risk customers',
      'We measure customer lifetime value (LTV)',
      'We have a referral or loyalty programme',
    ],
  },
  {
    id: 'pricing',
    number: '06',
    title: 'Pricing & Profitability',
    icon: '💰',
    color: 'border-purple-400 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
    why: 'Pricing leakage is invisible — businesses often grow revenue while shrinking margins. Discounting without policy, ignoring unprofitable offers, and never reviewing pricing are all silent profit killers.',
    items: [
      'We review pricing at least once per year',
      'We know our gross and net margin per product or service',
      'We do not discount without a clear reason or policy',
      'Our pricing is positioned relative to market and value delivered',
      'We have tiered or packaged pricing options',
      'We know which offers generate the most profit — not just revenue',
      'We have removed or paused unprofitable offers',
    ],
  },
  {
    id: 'data_attribution',
    number: '07',
    title: 'Data & Attribution',
    icon: '📊',
    color: 'border-teal-400 bg-teal-50',
    badge: 'bg-teal-100 text-teal-700',
    why: 'Without accurate attribution, every budget decision is a guess. Businesses waste millions funding channels that feel good but deliver little — simply because they cannot see the truth.',
    items: [
      'We know which marketing activity drives the most revenue',
      'Our analytics and tracking are correctly set up',
      'We review revenue attribution data monthly',
      'We make budget decisions based on data, not opinion',
      'We track the full customer journey from ad to sale',
      'We have clean, reliable CRM data',
      'We can identify our single biggest growth lever right now',
    ],
  },
];

export default function ScorePage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'details'>('intro');
  const [currentArea, setCurrentArea] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean[]>>(
    Object.fromEntries(areas.map(a => [a.id, Array(7).fill(false)]))
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
    // 7 items, max 10 points: each item = 10/7 ≈ 1.43, rounded to nearest integer, cap at 10
    const count = checked[areaId].filter(Boolean).length;
    return Math.round((count / 7) * (100 / 7));
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
      const params = new URLSearchParams({ name, total: String(total), scores: JSON.stringify(scores) });
      router.push(`/score/report?${params.toString()}`);
    } else {
      setSubmitting(false);
    }
  }

  const area = areas[currentArea];
  const areaScore = getAreaScore(area?.id);
  const checkedCount = checked[area?.id]?.filter(Boolean).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back</Link>
            <div className="text-lg font-bold text-primary-600">Revenue Leakage Score</div>
            <div className="w-12"></div>
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
            {step === 'quiz' && (
              <div className="flex gap-1.5 mt-2">
                {areas.map((a, i) => (
                  <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i < currentArea ? 'bg-primary-600' : i === currentArea ? 'bg-primary-400' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl py-10">

        {/* INTRO */}
        {step === 'intro' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Free · Takes 15 Minutes · Instant Report
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Find Your Revenue Leakage Score
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Score your business across 7 critical areas. Discover exactly where you are leaking revenue — and get a personalised report with your top fixes.
            </p>
            <p className="text-gray-500 text-sm mb-10">7 areas · 49 checkpoints · Score out of 100</p>

            {/* Score bands */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-xl mx-auto mb-10 text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">What Your Score Means</p>
              <div className="space-y-2">
                {[
                  { range: '0 – 30', label: '🔴 Critical', desc: 'Severe leakage — immediate action needed' },
                  { range: '31 – 50', label: '🟠 High Risk', desc: 'Significant revenue being lost across multiple areas' },
                  { range: '51 – 70', label: '🟡 Moderate', desc: 'Some systems working, clear gaps present' },
                  { range: '71 – 85', label: '🟢 Good', desc: 'Strong foundation — targeted fixes will lift revenue' },
                  { range: '86 – 100', label: '🏆 Excellent', desc: 'Well-optimised — focus on scaling what works' },
                ].map((band, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm font-bold text-gray-500 w-16 flex-shrink-0">{band.range}</span>
                    <span className="text-sm font-semibold w-28 flex-shrink-0">{band.label}</span>
                    <span className="text-sm text-gray-500">{band.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setStep('quiz')}
              className="bg-primary-600 text-white font-bold text-lg px-12 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
              Start My Revenue Leakage Score →
            </button>
            <p className="text-gray-400 text-sm mt-4">Free · No credit card · Instant PDF report</p>
          </div>
        )}

        {/* QUIZ */}
        {step === 'quiz' && (
          <div>
            {/* Why this matters */}
            <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 mb-5 flex items-start gap-3">
              <span className="text-yellow-500 text-lg flex-shrink-0 mt-0.5">💡</span>
              <p className="text-sm text-gray-600 leading-relaxed"><strong className="text-gray-800">Why this matters:</strong> {area.why}</p>
            </div>

            <div className={`rounded-2xl border-l-4 p-8 mb-5 ${area.color}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{area.icon}</span>
                  <div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${area.badge}`}>Area {area.number} of 07</span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">{area.title}</h2>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-primary-600">{areaScore}/14</div>
                  <div className="text-xs text-gray-500">{checkedCount}/7</div>
                </div>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Check all that apply to your business:</p>

              <div className="space-y-2">
                {area.items.map((item, idx) => (
                  <label key={idx}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${checked[area.id][idx] ? 'border-primary-400 bg-white shadow-sm' : 'border-transparent bg-white/70 hover:bg-white hover:border-gray-200'}`}>
                    <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all ${checked[area.id][idx] ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'}`}>
                      {checked[area.id][idx] && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={checked[area.id][idx]} onChange={() => toggleCheck(area.id, idx)} />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>

              {/* None of the above */}
              <button
                onClick={() => setChecked({ ...checked, [area.id]: Array(7).fill(false) })}
                className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
              >
                None of the above apply
              </button>
            </div>

            {/* Running total */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">Running Total</span>
                <span className="text-xl font-bold text-primary-600">{getTotalScore()}/100</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${(getTotalScore() / 100) * 100}%` }}></div>
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
                className="flex-1 bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-md text-lg">
                {currentArea < areas.length - 1 ? `Next: ${areas[currentArea + 1].title} →` : 'Get My Score Report →'}
              </button>
            </div>

            {/* Area dots */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {areas.map((a, i) => (
                <button key={i} onClick={() => setCurrentArea(i)} title={a.title}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${i === currentArea ? 'bg-primary-600 text-white scale-110' : i < currentArea ? 'bg-primary-200 text-primary-700' : 'bg-gray-200 text-gray-400'}`}>
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
              <p className="text-gray-600 mb-1">Your preliminary score: <span className="font-bold text-primary-600 text-2xl">{getTotalScore()}/100</span></p>
              <p className="text-gray-500 text-sm">Enter your details to generate your full personalised report</p>
            </div>

            {/* Score grid */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Score Summary</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {areas.map((a, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm mb-1">{a.icon}</div>
                    <div className={`text-lg font-bold ${getAreaScore(a.id) <= 3 ? 'text-red-500' : getAreaScore(a.id) <= 6 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {getAreaScore(a.id)}/10
                    </div>
                    <div className="text-xs text-gray-500 leading-tight mt-0.5">{a.title}</div>
                  </div>
                ))}
                <div className="text-center col-span-2 md:col-span-4 border-t pt-3 mt-1">
                  <div className="text-3xl font-bold text-primary-600">{getTotalScore()}/100</div>
                  <div className="text-xs text-gray-500">Total Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-2">Where Should We Send Your Report?</h3>
              <p className="text-gray-500 text-sm mb-6">Your personalised Revenue Leakage Score Report will include your full breakdown, top 3 priority fixes, and next steps.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Work Email *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="john@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business Name *</label>
                    <input type="text" required value={business} onChange={e => setBusiness(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="Your Company Pvt Ltd" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website</label>
                    <input type="text" value={website} onChange={e => setWebsite(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="https://yourwebsite.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Monthly Marketing Budget *</label>
                    <select required value={budget} onChange={e => setBudget(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm">
                      <option value="">Select range</option>
                      <option value="Under ₹50K">Under ₹50K / month</option>
                      <option value="₹50K–₹1L">₹50K – ₹1L / month</option>
                      <option value="₹1L–₹3L">₹1L – ₹3L / month</option>
                      <option value="₹3L–₹10L">₹3L – ₹10L / month</option>
                      <option value="Above ₹10L">Above ₹10L / month</option>
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
