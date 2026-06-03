'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

const areas = [
  { id: 'lead_response', title: 'Lead Response', icon: '⚡' },
  { id: 'landing_page', title: 'Landing Page', icon: '🎯' },
  { id: 'follow_up', title: 'Follow-up Automation', icon: '🔄' },
  { id: 'crm', title: 'CRM Usage', icon: '📊' },
  { id: 'retargeting', title: 'Retargeting', icon: '📡' },
  { id: 'reviews', title: 'Review Management', icon: '⭐' },
  { id: 'tracking', title: 'Conversion Tracking', icon: '📈' },
];

const fixes: Record<string, string> = {
  lead_response: 'Set up an automated lead response within 5 minutes using your CRM or email tool.',
  landing_page: 'Create dedicated landing pages for each service with a single CTA and trust signals.',
  follow_up: 'Build a 5-email nurture sequence triggered immediately after a lead signs up.',
  crm: 'Implement a CRM with pipeline stages and set weekly review reminders.',
  retargeting: 'Launch a basic retargeting campaign targeting website visitors from the last 30 days.',
  reviews: 'Send automated review request emails 3 days after every completed sale.',
  tracking: 'Install GA4 and set up conversion events for all forms and calls.',
};

function getBand(score: number) {
  if (score <= 30) return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', emoji: '🔴', message: 'Your business has severe revenue leakage across multiple areas. Immediate action is needed to stop the financial drain.' };
  if (score <= 70) return { label: 'High Risk', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-300', emoji: '🟠', message: 'Significant revenue is leaking from your funnel. Several key systems are either missing or underperforming.' };
  if (score <= 70) return { label: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', emoji: '🟡', message: 'Some systems are working well, but clear gaps exist that are costing you revenue. Targeted fixes will make a big difference.' };
  if (score <= 85) return { label: 'Good', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300', emoji: '🟢', message: 'You have a solid foundation. Optimising the weaker areas will significantly improve your revenue efficiency.' };
  return { label: 'Excellent', color: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-300', emoji: '🏆', message: 'Your systems are well-optimised. Focus on scaling what is working and testing new growth levers.' };
}

function ReportContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'there';
  const total = parseInt(params.get('total') || '0');
  const scoresRaw = params.get('scores') || '{}';
  const scores: Record<string, number> = JSON.parse(scoresRaw);
  const band = getBand(total);

  // Find 3 weakest areas
  const sorted = areas
    .map(a => ({ ...a, score: scores[a.id] || 0 }))
    .sort((a, b) => a.score - b.score);
  const weakest = sorted.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back to Home</Link>
            <div className="text-lg font-bold text-primary-600">Revenue Leakage Score Report</div>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl py-10">

        {/* Score hero */}
        <div className={`rounded-2xl border-2 ${band.border} ${band.bg} p-8 mb-8 text-center`}>
          <p className="text-gray-600 mb-2">Hi {name}, your Revenue Leakage Score is</p>
          <div className={`text-7xl font-bold ${band.color} mb-2`}>{total}<span className="text-3xl text-gray-400">/100</span></div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${band.color} ${band.bg} border ${band.border} mb-4`}>
            {band.emoji} {band.label}
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto">{band.message}</p>
        </div>

        {/* Area breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">Score Breakdown by Area</h2>
          <div className="space-y-4">
            {areas.map((area, i) => {
              const score = scores[area.id] || 0;
              const pct = (score / 14) * 100;
              const barColor = score <= 2 ? 'bg-red-500' : score <= 4 ? 'bg-orange-400' : score <= 6 ? 'bg-yellow-400' : score <= 8 ? 'bg-green-400' : 'bg-primary-500';
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span>{area.icon}</span>
                      <span className="text-sm font-semibold text-gray-700">{area.title}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{score}/14</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`${barColor} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 3 fixes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-2">Your Top 3 Priority Fixes</h2>
          <p className="text-gray-500 text-sm mb-5">Based on your lowest scoring areas — fix these first for the fastest revenue recovery.</p>
          <div className="space-y-4">
            {weakest.map((area, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{area.icon}</span>
                    <span className="font-semibold text-gray-900">{area.title}</span>
                    <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">{area.score}/10</span>
                  </div>
                  <p className="text-gray-600 text-sm">{fixes[area.id]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — Free 30-min audit */}
        <div className="bg-gradient-to-br from-primary-600 to-purple-700 text-white rounded-2xl p-8 mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🎯 Next Step
          </div>
          <h2 className="text-3xl font-bold mb-3">Get Your Free 30-Min Preliminary Audit</h2>
          <p className="text-white/90 text-lg mb-3 max-w-2xl mx-auto">
            Your score reveals where the leaks are. A 30-minute call with our team will show you exactly how much revenue you are losing — and the fastest way to recover it.
          </p>
          <p className="text-white/70 text-sm mb-8">
            We will review your score together, diagnose the root causes, and give you a prioritised action plan — completely free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendar.app.google/JMgapqTEJMGsDCzu7" target="_blank" rel="noopener noreferrer"
              className="inline-block bg-white text-primary-700 font-bold px-10 py-4 rounded-xl hover:bg-gray-50 transition-all shadow-lg">
              Book Free 30-Min Audit →
            </a>
            <Link href="/framework"
              className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/20 transition-all">
              Learn About Full R360 Audit
            </Link>
          </div>
          <p className="text-white/60 text-xs mt-4">Limited slots available each week</p>
        </div>

        {/* What happens next */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-900 mb-5">What Happens After Your 30-Min Audit?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Free Preliminary Audit', desc: '30-min call reviewing your score. We identify root causes and give you a prioritised action plan.', icon: '🔍' },
              { step: '02', title: 'Full R360 Audit', desc: 'Complete 5-layer diagnostic of your entire revenue funnel with a detailed recovery roadmap.', icon: '📋' },
              { step: '03', title: 'Implementation', desc: 'We build and execute the recovery systems — tracking every metric until results are achieved.', icon: '🚀' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-xs font-bold text-gray-400 mb-1">Step {item.step}</div>
                <div className="font-bold text-gray-900 mb-2">{item.title}</div>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Retake */}
        <div className="text-center">
          <Link href="/score" className="text-primary-600 text-sm font-semibold hover:text-primary-700">
            ← Retake the Score Tool
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading your report...</p></div>}>
      <ReportContent />
    </Suspense>
  );
}
