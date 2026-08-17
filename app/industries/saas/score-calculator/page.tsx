'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitToWeb3Forms } from '@/lib/web3forms';

// ── R360 SaaS Score formula ──────────────────────────────────────────────
// One quick question per framework layer. Each answer maps to a 0–100
// sub-score. Final score is a weighted average — weights reflect how much
// each layer typically drives SaaS revenue leakage.
//
// Acquisition   20%  — is traffic actually qualified?
// Attribution   15%  — do you know what's working?
// Conversion    30%  — trial/signup → paid (biggest lever for SaaS)
// Retention     25%  — monthly churn (compounds over time)
// Scaling       10%  — repeatable systems vs ad hoc
//
// This is intentionally simple — a calculator, not a 40-question audit.

type Layer = 'acquisition' | 'attribution' | 'conversion' | 'retention' | 'scaling';

const WEIGHTS: Record<Layer, number> = {
  acquisition: 0.20,
  attribution: 0.15,
  conversion: 0.30,
  retention: 0.25,
  scaling: 0.10,
};

const QUESTIONS: {
  layer: Layer;
  title: string;
  question: string;
  options: { label: string; score: number }[];
}[] = [
  {
    layer: 'acquisition',
    title: 'Acquisition',
    question: 'What % of your website visitors start a free trial or signup?',
    options: [
      { label: 'Under 1%', score: 20 },
      { label: '1–3%', score: 50 },
      { label: '3–6%', score: 75 },
      { label: 'Over 6%', score: 95 },
    ],
  },
  {
    layer: 'attribution',
    title: 'Attribution',
    question: 'Do you know which marketing channel actually drives your paying customers (not just signups)?',
    options: [
      { label: "No, we don't track this", score: 15 },
      { label: 'We track signups by channel, not paid conversions', score: 45 },
      { label: 'We track paid conversions but not accurately', score: 70 },
      { label: 'Yes, full-funnel attribution to revenue', score: 95 },
    ],
  },
  {
    layer: 'conversion',
    title: 'Conversion',
    question: 'What is your trial-to-paid (or freemium-to-paid) conversion rate?',
    options: [
      { label: 'Under 5%', score: 20 },
      { label: '5–10%', score: 50 },
      { label: '10–20%', score: 75 },
      { label: 'Over 20%', score: 95 },
    ],
  },
  {
    layer: 'retention',
    title: 'Retention',
    question: 'What is your monthly customer churn rate?',
    options: [
      { label: 'Over 8%', score: 20 },
      { label: '4–8%', score: 50 },
      { label: '2–4%', score: 75 },
      { label: 'Under 2%', score: 95 },
    ],
  },
  {
    layer: 'scaling',
    title: 'Scaling',
    question: 'Do you have documented, repeatable playbooks for acquisition and onboarding?',
    options: [
      { label: 'No, everything is ad hoc', score: 20 },
      { label: 'Some processes, not documented', score: 50 },
      { label: 'Documented but not consistently followed', score: 70 },
      { label: 'Yes, fully documented and followed', score: 95 },
    ],
  },
];

export default function ScoreCalculatorPage() {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const [answers, setAnswers] = useState<Partial<Record<Layer, number>>>({});
  const [showResult, setShowResult] = useState(false);

  const allAnswered = QUESTIONS.every((q) => answers[q.layer] !== undefined);

  const finalScore = allAnswered
    ? Math.round(
        QUESTIONS.reduce((sum, q) => sum + (answers[q.layer]! * WEIGHTS[q.layer]), 0)
      )
    : 0;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setSubmittingEmail(true);
    // Just unlocks the calculator — no notification is sent at this point.
    // The single notification goes out once they've actually completed the
    // calculator (see handleSeeScore below), sent only to your configured
    // admin email, never to the visitor.
    setEmailSubmitted(true);
    setSubmittingEmail(false);
  }

  async function handleSeeScore() {
    setShowResult(true);
    try {
      const answerLines = QUESTIONS.map(
        (q) => `${q.title}: ${q.options.find((o) => o.score === answers[q.layer])?.label} (score: ${answers[q.layer]})`
      ).join('\n');

      await submitToWeb3Forms({
        subject: `SaaS Score Calculator completed — ${email.trim()} (Score: ${finalScore})`,
        'Visitor Email': email.trim(),
        'Final Score': `${finalScore}/100`,
        'Answer Breakdown': answerLines,
        Source: 'SaaS Score Calculator',
      });
    } catch {
      /* don't block the user's result if this fails silently */
    }
  }

  function selectAnswer(layer: Layer, score: number) {
    setAnswers((prev) => ({ ...prev, [layer]: score }));
  }

  function getScoreLabel(score: number) {
    if (score >= 80) return { label: 'Strong', color: 'text-green-600' };
    if (score >= 60) return { label: 'Moderate leakage', color: 'text-yellow-600' };
    if (score >= 40) return { label: 'Significant leakage', color: 'text-orange-600' };
    return { label: 'Critical leakage', color: 'text-red-600' };
  }

  return (
    <main>
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/industries/saas" className="hover:text-primary-600">SaaS</Link> / Score Calculator
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SaaS Revenue Leakage Calculator
          </h1>
          <p className="text-gray-600">
            5 quick questions across the R360 framework. Get your score instantly.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          {!showResult ? (
            <div className="space-y-6">
              {/* Email field sits at the top of the same view — not a separate
                  gate screen. Questions below stay visible the whole time,
                  just locked until this is submitted. */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {emailSubmitted ? '✅ Calculator unlocked' : 'Enter your email to unlock the calculator'}
                </p>
                {!emailSubmitted && (
                  <>
                    <p className="text-xs text-gray-500 mb-4">
                      We'll use this to send your full breakdown if you'd like a deeper analysis later.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm"
                        required
                      />
                      <button type="submit" disabled={submittingEmail} className="btn-primary px-6 whitespace-nowrap">
                        {submittingEmail ? 'Unlocking...' : 'Unlock Calculator →'}
                      </button>
                    </form>
                    {emailError && <p className="text-sm text-red-600 mt-2">{emailError}</p>}
                  </>
                )}
              </div>

              {/* Questions — always rendered, disabled until email is submitted */}
              <div className={`space-y-6 transition-opacity ${!emailSubmitted ? 'opacity-40 pointer-events-none select-none' : ''}`}>
                {QUESTIONS.map((q, idx) => (
                  <div key={q.layer} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded-full">
                        {idx + 1}/5 · {q.title}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-900 mb-4">{q.question}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {q.options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => selectAnswer(q.layer, opt.score)}
                          className={`text-sm px-4 py-3 rounded-lg border text-left transition-colors ${
                            answers[q.layer] === opt.score
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSeeScore}
                  disabled={!allAnswered}
                  className="btn-primary w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {allAnswered ? 'See My Score →' : `Answer all ${QUESTIONS.length} questions to continue`}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100 mb-8">
                <p className="text-sm text-gray-500 mb-2">Your R360 Score</p>
                <p className="text-6xl font-bold text-gray-900 mb-2">{finalScore}<span className="text-2xl text-gray-400">/100</span></p>
                <p className={`font-semibold ${getScoreLabel(finalScore).color}`}>
                  {getScoreLabel(finalScore).label}
                </p>
              </div>

              <div className="space-y-3 mb-8 text-left">
                {QUESTIONS.map((q) => (
                  <div key={q.layer} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-28 flex-shrink-0">{q.title}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${answers[q.layer]}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-10 text-right">{answers[q.layer]}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 mb-6">
                Your biggest opportunity is in <strong>
                  {QUESTIONS.reduce((lowest, q) =>
                    (answers[q.layer] ?? 100) < (answers[lowest.layer] ?? 100) ? q : lowest
                  ).title}
                </strong>. Book a free strategy call to get a full breakdown and action plan.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/book" className="btn-primary">Book a Strategy Call</Link>
                <button
                  onClick={() => { setShowResult(false); setAnswers({}); setEmailSubmitted(false); setEmail(''); }}
                  className="btn-secondary"
                >
                  Retake Calculator
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
