'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const areas = [
  {
    id: 'lead_generation',
    number: '01',
    title: 'Lead Generation',
    layer: 'Acquisition Layer',
    icon: '🎯',
    color: 'border-red-400 bg-red-50',
    badge: 'bg-red-100 text-red-700',
    why: 'If your lead generation is broken, everything downstream suffers. Most businesses either have too few lead sources or do not know which ones actually work.',
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
    layer: 'Acquisition Layer',
    icon: '⚡',
    color: 'border-orange-400 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    why: 'Responding within 5 minutes vs 30 minutes can increase conversion by over 100%. Most businesses lose leads simply by being slow or unstructured in their response.',
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
    layer: 'Conversion Layer',
    icon: '💼',
    color: 'border-yellow-400 bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
    why: 'A broken sales process quietly destroys the value of every rupee spent on marketing. Most conversion leakage goes untracked and unaddressed for months.',
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
    layer: 'Conversion Layer',
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
    layer: 'Retention Layer',
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
    layer: 'Scaling Layer',
    icon: '💰',
    color: 'border-purple-400 bg-purple-50',
    badge: 'bg-purple-100 text-purple-700',
    why: 'Pricing leakage is invisible — businesses grow revenue while shrinking margins. Discounting without policy and never reviewing pricing are silent profit killers.',
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
    layer: 'Attribution Layer',
    icon: '📊',
    color: 'border-teal-400 bg-teal-50',
    badge: 'bg-teal-100 text-teal-700',
    why: 'Without accurate attribution, every budget decision is a guess. Businesses waste millions funding channels that feel good but deliver little — because they cannot see the truth.',
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

const faqs = [
  { q: 'What is a Revenue Leakage Assessment?', a: 'A Revenue Leakage Assessment is a structured diagnostic that identifies exactly where your business is losing revenue across acquisition, conversion, retention, and scaling systems. Unlike a generic audit, the R360 assessment scores your business across 7 critical areas and gives you a prioritised recovery roadmap.' },
  { q: 'How is this different from a business growth audit?', a: 'Most business growth audits focus on what to add. The R360 Revenue Leakage Assessment focuses on what to fix — identifying the systemic gaps that are costing you money right now before investing in growth tactics.' },
  { q: 'Who is this Revenue Optimisation Framework for?', a: 'The R360 framework is designed for B2B service businesses, SaaS companies, e-commerce brands, and growth-stage startups with a monthly marketing budget of ₹50,000 or more who are not getting the returns they expect.' },
  { q: 'What is a Customer Acquisition Audit?', a: 'A customer acquisition audit reviews your entire lead generation and response process — from channel mix to CPL to lead quality. It is Layer 01 and 02 of the R360 framework, and it is one of the highest-impact areas to optimise.' },
  { q: 'How does the Conversion Rate Audit work?', a: 'Our conversion rate audit maps your entire sales funnel — from first contact to closed deal — and identifies exactly where prospects are dropping off, why deals are being lost, and what changes will have the fastest impact on your conversion rate.' },
  { q: 'How long does the score tool take?', a: 'The score tool takes approximately 15 minutes. There are 7 sections with 7 checkboxes each. You can skip any section — skipped sections score 0, which actually helps identify your biggest leakage areas.' },
  { q: 'Is the score report free?', a: 'Yes — the Revenue Leakage Score and full report are completely free. If your score reveals significant leakage, you will have the option to book a free 30-minute preliminary audit with our team.' },
  { q: 'What happens after I get my score?', a: 'You receive a personalised score report showing your rating across all 7 areas, your top 3 priority fixes, and the option to book a free 30-minute call where we review your results together and discuss the fastest path to recovery.' },
];

const testimonials = [
  { name: 'E-commerce Brand', result: '↓ 38% lower CAC', quote: 'We had no idea our lead response time was causing this much leakage. After fixing our follow-up system, our cost per acquisition dropped significantly within 60 days.' },
  { name: 'SaaS Company', result: '↑ 2.1X ROAS', quote: 'The attribution layer diagnosis revealed we were funding the wrong channels entirely. Rebuilding our tracking gave us clarity we had never had before.' },
  { name: 'Clinic', result: '↑ 47% more leads', quote: 'Our landing pages were converting at under 1%. The conversion audit identified 3 specific changes that nearly tripled our lead volume without changing ad spend.' },
];

export default function ScorePage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'details'>('intro');
  const [currentArea, setCurrentArea] = useState(0);
  const [checked, setChecked] = useState<Record<string, boolean[]>>(
    Object.fromEntries(areas.map(a => [a.id, Array(7).fill(false)]))
  );
  const [noneChecked, setNoneChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(areas.map(a => [a.id, false]))
  );
  const [skipped, setSkipped] = useState<Record<string, boolean>>(
    Object.fromEntries(areas.map(a => [a.id, false]))
  );
  const [showValidation, setShowValidation] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitEmail, setExitEmail] = useState('');
  const [exitSaved, setExitSaved] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [business, setBusiness] = useState('');
  const [website, setWebsite] = useState('');
  const [budget, setBudget] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Exit intent detection
  useEffect(() => {
    if (step !== 'quiz') return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitSaved) setShowExitIntent(true);
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [step, exitSaved]);

  function toggleCheck(areaId: string, idx: number) {
    const current = [...checked[areaId]];
    current[idx] = !current[idx];
    setChecked({ ...checked, [areaId]: current });
    if (noneChecked[areaId]) setNoneChecked({ ...noneChecked, [areaId]: false });
    setShowValidation(false);
  }

  function toggleNone(areaId: string) {
    const isNone = !noneChecked[areaId];
    setNoneChecked({ ...noneChecked, [areaId]: isNone });
    if (isNone) setChecked({ ...checked, [areaId]: Array(7).fill(false) });
    setShowValidation(false);
  }

  function skipSection() {
    setSkipped({ ...skipped, [areas[currentArea].id]: true });
    setChecked({ ...checked, [areas[currentArea].id]: Array(7).fill(false) });
    setNoneChecked({ ...noneChecked, [areas[currentArea].id]: false });
    goNext();
  }

  function goNext() {
    setShowValidation(false);
    if (currentArea < areas.length - 1) {
      setCurrentArea(currentArea + 1);
    } else {
      setStep('details');
    }
  }

  function handleNext() {
    const areaId = areas[currentArea].id;
    const hasChecked = checked[areaId].some(Boolean);
    const isNone = noneChecked[areaId];
    if (!hasChecked && !isNone) {
      setShowValidation(true);
      return;
    }
    goNext();
  }

  function getAreaScore(areaId: string) {
    if (skipped[areaId]) return 0;
    const count = checked[areaId].filter(Boolean).length;
    return Math.round((count / 7) * (100 / 7));
  }

  function getTotalScore() {
    return Math.min(100, areas.reduce((sum, a) => sum + getAreaScore(a.id), 0));
  }

  function getProgress() {
    if (step === 'intro') return 0;
    if (step === 'details') return 95;
    return Math.round(((currentArea + 1) / areas.length) * 85);
  }

  async function saveExitEmail() {
    if (!exitEmail) return;
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
        subject: 'Exit Intent Capture — Score Tool',
        Email: exitEmail,
        'Partial Score': getTotalScore(),
        'Area Reached': areas[currentArea].title,
      }),
    }).catch(() => {});
    setExitSaved(true);
    setShowExitIntent(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const scores = Object.fromEntries(areas.map(a => [a.id, getAreaScore(a.id)]));
    const total = getTotalScore();
    await fetch('/api/score/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, business, website, budget, scores, total, checked }),
    }).catch(() => {});
    const params = new URLSearchParams({ name, total: String(total), scores: JSON.stringify(scores), checked: JSON.stringify(checked) });
    router.push(`/score/report?${params.toString()}`);
  }

  const area = areas[currentArea];
  const checkedCount = checked[area?.id]?.filter(Boolean).length || 0;
  const areaScore = getAreaScore(area?.id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Exit intent popup */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-3xl mb-3">⏸️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Save your progress</h3>
            <p className="text-gray-600 mb-5 text-sm">You are {getProgress()}% through your Revenue Leakage Score. Enter your email and we will send you a link to continue later.</p>
            {exitSaved ? (
              <p className="text-green-600 font-semibold">✅ Saved! Check your email.</p>
            ) : (
              <>
                <input type="email" value={exitEmail} onChange={e => setExitEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com" />
                <button onClick={saveExitEmail}
                  className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-all mb-3">
                  Save My Progress
                </button>
              </>
            )}
            <button onClick={() => setShowExitIntent(false)}
              className="w-full text-gray-400 text-sm hover:text-gray-600 transition-colors">
              Continue scoring
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back</Link>
            <div className="text-base font-bold text-primary-600">Revenue Leakage Score</div>
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
                  <div key={i} className={`flex-1 h-1 rounded-full transition-all ${skipped[a.id] ? 'bg-gray-300' : i < currentArea ? 'bg-primary-600' : i === currentArea ? 'bg-primary-400' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl py-10">

        {/* INTRO */}
        {step === 'intro' && (
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Free · 15 Minutes · Instant Report
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
                Find Your Revenue Leakage Score
              </h1>
              <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
                Score your business across 7 critical areas of the R360 Revenue Leakage Framework. Discover exactly where revenue is leaking — and get a personalised AI-powered report with your top fixes.
              </p>
              <p className="text-sm text-gray-400 mb-8">7 areas · 49 checkpoints · Score out of 100 · AI analysis included</p>

              {/* 7 areas preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">The 7 Areas We Diagnose</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {areas.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="text-xl">{a.icon}</span>
                      <div>
                        <div className="text-xs text-gray-400 font-medium">{a.layer}</div>
                        <div className="font-semibold text-gray-900 text-sm">{a.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample report preview */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Sample Report Preview</p>
                <div className="relative">
                  <div className="space-y-3">
                    {[
                      { label: 'Lead Generation', score: 71, color: 'bg-yellow-400' },
                      { label: 'Lead Response', score: 28, color: 'bg-red-500' },
                      { label: 'Sales Conversion', score: 57, color: 'bg-yellow-400' },
                      { label: 'Follow-up & Nurture', score: 14, color: 'bg-red-500' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{item.label}</span>
                          <span className="font-bold text-gray-900">{item.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.score}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Blur overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white flex items-end justify-center pb-2">
                    <span className="text-xs text-gray-400 font-medium bg-white px-3 py-1 rounded-full border border-gray-200">Complete your score to see full report</span>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 text-left">
                    <div className="text-primary-600 font-bold text-lg mb-2">{t.result}</div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">"{t.quote}"</p>
                    <div className="text-xs font-semibold text-gray-400">{t.name}</div>
                  </div>
                ))}
              </div>

              {/* Score bands */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Score Bands</p>
                <div className="space-y-2">
                  {[
                    { range: '0 – 30', label: '🔴 Critical', desc: 'Severe leakage — immediate action needed' },
                    { range: '31 – 50', label: '🟠 High Risk', desc: 'Significant revenue being lost' },
                    { range: '51 – 70', label: '🟡 Moderate', desc: 'Some systems working, clear gaps present' },
                    { range: '71 – 85', label: '🟢 Good', desc: 'Strong foundation — targeted fixes will lift revenue' },
                    { range: '86 – 100', label: '🏆 Excellent', desc: 'Well-optimised — focus on scaling' },
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
                className="bg-primary-600 text-white font-bold text-lg px-12 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg mb-4">
                Start My Revenue Leakage Score →
              </button>
              <p className="text-gray-400 text-sm mb-12">Free · No credit card · Instant AI-powered report</p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{faq.q}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {step === 'quiz' && (
          <div>
            {/* Why this matters */}
            <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 mb-4 flex items-start gap-3">
              <span className="text-yellow-500 text-lg flex-shrink-0 mt-0.5">💡</span>
              <p className="text-sm text-gray-600 leading-relaxed"><strong className="text-gray-800">Why this matters:</strong> {area.why}</p>
            </div>

            <div className={`rounded-2xl border-l-4 p-7 mb-4 ${area.color}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{area.icon}</span>
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{area.layer}</div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${area.badge}`}>Area {area.number} of 07</span>
                    <h2 className="text-xl font-bold text-gray-900 mt-1">{area.title}</h2>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-bold text-primary-600">{areaScore}/14</div>
                  <div className="text-xs text-gray-500">{checkedCount}/7 ticked</div>
                </div>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Tick all that apply to your business:</p>

              <div className="space-y-2 mb-4">
                {area.items.map((item, idx) => (
                  <label key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer border-2 transition-all ${checked[area.id][idx] ? 'border-primary-400 bg-white shadow-sm' : 'border-transparent bg-white/70 hover:bg-white hover:border-gray-200'}`}>
                    <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all ${checked[area.id][idx] ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'}`}>
                      {checked[area.id][idx] && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={checked[area.id][idx]} onChange={() => toggleCheck(area.id, idx)} />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>

              {/* None of the above */}
              <label className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border-2 transition-all ${noneChecked[area.id] ? 'border-gray-400 bg-white' : 'border-transparent bg-white/50 hover:bg-white hover:border-gray-200'}`}>
                <div className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${noneChecked[area.id] ? 'bg-gray-500 border-gray-500' : 'border-gray-300 bg-white'}`}>
                  {noneChecked[area.id] && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <input type="checkbox" className="hidden" checked={noneChecked[area.id]} onChange={() => toggleNone(area.id)} />
                <span className="text-gray-500 text-sm font-medium">None of the above apply to my business</span>
              </label>
            </div>

            {/* Validation message */}
            {showValidation && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
                <span className="text-red-500 flex-shrink-0">⚠️</span>
                <p className="text-red-700 text-sm font-medium">Please tick at least one item, or select <strong>"None of the above"</strong> to continue. You can also skip this section — it will score 0.</p>
              </div>
            )}

            {/* Running total */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">Running Total</span>
                <span className="text-xl font-bold text-primary-600">{getTotalScore()}/100</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full transition-all" style={{ width: `${getTotalScore()}%` }}></div>
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              {currentArea > 0 && (
                <button onClick={() => { setCurrentArea(currentArea - 1); setShowValidation(false); }}
                  className="px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                  ← Back
                </button>
              )}
              <button onClick={handleNext}
                className="flex-1 bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-all shadow-md text-base">
                {currentArea < areas.length - 1 ? `Next: ${areas[currentArea + 1].title} →` : 'Get My Score Report →'}
              </button>
            </div>

            {/* Skip link */}
            <div className="text-center mb-6">
              <button onClick={skipSection} className="text-xs text-gray-400 hover:text-gray-600 transition-colors underline">
                Skip this section (scores 0)
              </button>
            </div>

            {/* Area dots */}
            <div className="flex justify-center gap-2 flex-wrap">
              {areas.map((a, i) => (
                <button key={i} onClick={() => { setCurrentArea(i); setShowValidation(false); }} title={a.title}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${i === currentArea ? 'bg-primary-600 text-white scale-110' : skipped[a.id] ? 'bg-gray-300 text-gray-500' : i < currentArea ? 'bg-primary-200 text-primary-700' : 'bg-gray-200 text-gray-400'}`}>
                  {skipped[a.id] ? '—' : i + 1}
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
              <p className="text-gray-500 text-sm">Enter your details to generate your AI-powered report</p>
            </div>

            {/* Score grid */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-4">Score Summary</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {areas.map((a, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg mb-0.5">{a.icon}</div>
                    <div className={`text-lg font-bold ${skipped[a.id] ? 'text-gray-400' : getAreaScore(a.id) <= 4 ? 'text-red-500' : getAreaScore(a.id) <= 8 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {skipped[a.id] ? '—' : `${getAreaScore(a.id)}/14`}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight">{a.title}</div>
                  </div>
                ))}
                <div className="text-center col-span-2 md:col-span-4 border-t pt-3 mt-1">
                  <div className="text-3xl font-bold text-primary-600">{getTotalScore()}/100</div>
                  <div className="text-xs text-gray-500">Total Score</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-1">Where Should We Send Your AI Report?</h3>
              <p className="text-gray-500 text-sm mb-5">Your personalised AI-powered Revenue Leakage Score Report includes full breakdown, passed/failed checkpoints, solutions, and a recovery roadmap.</p>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="Your Company" />
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
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg disabled:opacity-50">
                  {submitting ? 'Generating Your AI Report...' : 'Generate My Revenue Leakage Score Report →'}
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
