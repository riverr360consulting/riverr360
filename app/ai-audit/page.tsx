'use client';

import { useState } from 'react';
import Link from 'next/link';

// ── Types ────────────────────────────────────────────────────────────────────
type Phase = 'intro' | 'questions' | 'capture' | 'analysing' | 'diagnosis';

interface Answers {
  [key: number]: string;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
}

// ── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    layer: 'Acquisition',
    emoji: '🎯',
    question: 'Where are you currently getting most of your leads or customers from?',
    options: [
      'Paid ads (Google / Meta)',
      'Organic search (SEO / Content)',
      'Referrals / Word of mouth',
      'Social media',
      "I'm not getting enough leads",
    ],
  },
  {
    layer: 'Conversion',
    emoji: '🔄',
    question: 'What happens most often when a potential customer reaches you?',
    options: [
      'They enquire but don\'t buy',
      'They visit the website but don\'t contact',
      'They start the process but drop off',
      'Conversion is decent but inconsistent',
      'I don\'t track this at all',
    ],
  },
  {
    layer: 'Retention',
    emoji: '🔁',
    question: 'How often do your customers come back or refer others?',
    options: [
      'Rarely — most are one-time buyers',
      'Sometimes — no system in place',
      'Often — we have a referral / loyalty system',
      'Always — strong repeat business',
      'Not applicable to my business model',
    ],
  },
  {
    layer: 'Monetisation',
    emoji: '💰',
    question: 'How would you describe your current revenue growth?',
    options: [
      'Declining — losing customers / revenue',
      'Flat — revenue is stagnant',
      'Slow growth — not where I want it',
      'Growing — but want to accelerate',
      'Strong — looking to scale further',
    ],
  },
  {
    layer: 'Attribution',
    emoji: '📊',
    question: 'Do you know which marketing activities are actually driving results?',
    options: [
      'No idea — we just spend and hope',
      'Partial — I track some things',
      'Somewhat — basic analytics only',
      'Yes — I have clear attribution',
      'We don\'t do any marketing tracking',
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function buildPrompt(answers: Answers, lead: LeadData): string {
  const lines = QUESTIONS.map((q, i) => `${q.layer}: "${answers[i]}"`).join('\n');
  return `You are a senior marketing consultant at Riverr360, experts in the R360 Revenue Leakage Framework.

A prospect named ${lead.name} has just completed a quick 5-question marketing audit. Here are their answers across the 5 R360 layers:

${lines}

Write a warm, consultative diagnosis (NOT salesy). Structure your response EXACTLY as follows:

1. A personalised 2-sentence opening addressing ${lead.name} by first name, acknowledging their situation empathetically.

2. "**Where Your Revenue May Be Leaking**" — identify 2-3 specific leaks based on their answers. For each leak, write 1-2 sentences explaining the issue and its business impact. Be specific and insightful, not generic.

3. "**Your Quick Wins**" — give 2-3 actionable recommendations they can implement immediately. Each should be 1-2 sentences, practical and specific to their answers.

4. A closing 1-sentence that creates curiosity about their full R360 score without being pushy.

Keep the total response under 300 words. Use a warm, expert, consultative tone — like advice from a trusted advisor, not a sales pitch. Use **bold** for section headings only.`;
}

// ── Typewriter component ─────────────────────────────────────────────────────
function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useState(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  });

  // Convert **bold** markdown to JSX
  const renderText = (t: string) => {
    const parts = t.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-gray-900">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
      {renderText(displayed)}
      {!done && <span className="inline-block w-0.5 h-4 bg-primary-600 animate-pulse ml-0.5 align-middle" />}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function AIAuditPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState<LeadData>({ name: '', email: '', phone: '' });
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState('');

  const progress = Math.round((currentQ / QUESTIONS.length) * 100);

  // ── Answer a question ──────────────────────────────────────────────────────
  function handleAnswer(option: string) {
    const updated = { ...answers, [currentQ]: option };
    setAnswers(updated);
    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(q => q + 1), 300);
    } else {
      setTimeout(() => setPhase('capture'), 300);
    }
  }

  // ── Submit lead + call AI ──────────────────────────────────────────────────
  async function handleCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.name || !lead.email || !lead.phone) return;
    setPhase('analysing');

    // Save lead to Web3Forms
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
          subject: `New AI Audit Lead — ${lead.name}`,
          from_name: lead.name,
          Name: lead.name,
          Email: lead.email,
          Phone: lead.phone,
          Source: 'AI Audit',
          'Acquisition Answer': answers[0],
          'Conversion Answer': answers[1],
          'Retention Answer': answers[2],
          'Monetisation Answer': answers[3],
          'Attribution Answer': answers[4],
        }),
      });
    } catch {
      // Don't block the AI diagnosis if web3forms fails
    }

    // Call Claude API
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: buildPrompt(answers, lead) }],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || 'We were unable to generate your diagnosis. Please try again.';
      setDiagnosis(text);
      setPhase('diagnosis');
    } catch {
      setError('Something went wrong. Please try again.');
      setPhase('capture');
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f5f3ff 100%)' }}>

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <img src="/images/logo.png" alt="Riverr360" className="h-8 w-auto" />
          </Link>
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            AI Marketing Audit
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        {phase === 'intro' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
              🧠
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Is Your Marketing<br />
              <span className="text-primary-600">Actually Healthy?</span>
            </h1>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Answer 5 quick questions across the R360 Framework layers. Our AI analyses your answers and identifies exactly where your revenue may be leaking — instantly.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8 max-w-sm mx-auto">
              {[
                { icon: '⚡', label: '2 minutes', sub: 'Quick audit' },
                { icon: '🤖', label: 'AI powered', sub: 'Instant analysis' },
                { icon: '🎯', label: 'Personalised', sub: 'Your diagnosis' },
              ].map(({ icon, label, sub }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-xs font-semibold text-gray-900">{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase('questions')}
              className="btn-primary px-10 py-4 text-base rounded-xl shadow-md"
            >
              Start My Free Audit →
            </button>
            <p className="text-xs text-gray-400 mt-3">No credit card · No commitment · Instant results</p>
          </div>
        )}

        {/* ── Questions ─────────────────────────────────────────────────────── */}
        {phase === 'questions' && (
          <div>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
                <span>{progress}% complete</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
                />
              </div>
              {/* Layer indicators */}
              <div className="flex justify-between mt-2">
                {QUESTIONS.map((q, i) => (
                  <div
                    key={i}
                    className="text-xs flex flex-col items-center gap-1"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                      i < currentQ ? 'bg-primary-600 text-white' :
                      i === currentQ ? 'bg-primary-100 text-primary-600 border-2 border-primary-600' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {i < currentQ ? '✓' : q.emoji}
                    </div>
                    <span className={`hidden sm:block text-xs ${i === currentQ ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
                      {q.layer}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{QUESTIONS[currentQ].emoji}</span>
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                  {QUESTIONS[currentQ].layer}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-6 leading-snug">
                {QUESTIONS[currentQ].question}
              </h2>
              <div className="space-y-3">
                {QUESTIONS[currentQ].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left flex items-center gap-3 p-4 rounded-xl border-2 transition-all hover:border-primary-400 hover:bg-primary-50 group"
                    style={{ borderColor: answers[currentQ] === option ? '#1d4ed8' : '#e5e7eb', background: answers[currentQ] === option ? '#eff6ff' : '#fff' }}
                  >
                    <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all"
                      style={{ borderColor: answers[currentQ] === option ? '#1d4ed8' : '#d1d5db', background: answers[currentQ] === option ? '#1d4ed8' : 'transparent' }}
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Back button */}
            {currentQ > 0 && (
              <button
                onClick={() => setCurrentQ(q => q - 1)}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {/* ── Lead Capture ──────────────────────────────────────────────────── */}
        {phase === 'capture' && (
          <div>
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                ✅
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Great — your answers are ready to analyse!
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Enter your details and our AI will generate a personalised diagnosis of your marketing health across all 5 R360 layers.
              </p>
            </div>

            <form onSubmit={handleCapture} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              {[
                { label: 'Full name', name: 'name', type: 'text', placeholder: 'Rahul Sharma' },
                { label: 'Email address', name: 'email', type: 'email', placeholder: 'rahul@company.com' },
                { label: 'Phone number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={lead[field.name as keyof LeadData]}
                    onChange={e => setLead(l => ({ ...l, [field.name]: e.target.value }))}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary w-full py-4 rounded-xl text-base">
                Generate My AI Diagnosis →
              </button>
              <p className="text-xs text-gray-400 text-center">
                🔒 Your information is secure and never shared.
              </p>
            </form>
          </div>
        )}

        {/* ── Analysing ─────────────────────────────────────────────────────── */}
        {phase === 'analysing' && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="w-16 h-16 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-xl">🧠</div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analysing your answers...</h2>
            <p className="text-gray-500 text-sm">Our AI is reviewing your responses across all 5 R360 layers</p>
            <div className="flex justify-center gap-2 mt-6">
              {QUESTIONS.map((q, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-sm animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                    {q.emoji}
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:block">{q.layer}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Diagnosis ─────────────────────────────────────────────────────── */}
        {phase === 'diagnosis' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                🧠
              </div>
              <div>
                <p className="text-xs text-gray-400">AI Marketing Consultant</p>
                <p className="text-sm font-semibold text-gray-900">R360 Revenue Leakage Diagnosis</p>
              </div>
            </div>

            {/* AI response bubble */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <TypewriterText text={diagnosis} />
            </div>

            {/* Answers summary */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Your Answers</p>
              <div className="space-y-3">
                {QUESTIONS.map((q, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-base flex-shrink-0 mt-0.5">{q.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold text-primary-600">{q.layer}</p>
                      <p className="text-sm text-gray-700">{answers[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary-600 rounded-2xl p-6 text-center text-white">
              <h3 className="text-lg font-bold mb-2">Want Your Full R360 Score?</h3>
              <p className="text-primary-100 text-sm mb-5">
                Get a detailed score across all 5 layers, a full report, and a personalised recovery roadmap.
              </p>
              <Link
                href="/get-started"
                className="inline-block bg-white text-primary-600 font-bold px-8 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
              >
                Get My Full Score & Report →
              </Link>
              <p className="text-primary-200 text-xs mt-3">Free · Takes 5 minutes · No obligation</p>
            </div>

            {/* Start over */}
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setPhase('intro');
                  setCurrentQ(0);
                  setAnswers({});
                  setLead({ name: '', email: '', phone: '' });
                  setDiagnosis('');
                }}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ↺ Start a new audit
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Minimal footer */}
      <footer className="text-center py-8 border-t border-gray-100 mt-10">
        <p className="text-xs text-gray-400">
          © 2026 Riverr360 · Powered by R360 Revenue Leakage Framework ·{' '}
          <Link href="/contact" className="hover:text-gray-600">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
}
