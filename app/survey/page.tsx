'use client';

import { useState } from 'react';
import Link from 'next/link';

const questions = [
  {
    id: 'q1',
    area: 'R360 Framework Experience',
    icon: '🎯',
    question: 'How familiar are you with the R360 Revenue Leakage Framework?',
    options: [
      'I have just discovered it and want to learn more',
      'I have read about it but have not applied it yet',
      'I have partially applied 1–2 layers of the framework',
      'I have applied most of the framework to my business',
    ],
  },
  {
    id: 'q2',
    area: 'Acquisition Layer',
    icon: '🎯',
    question: 'How well is your business performing on Acquisition (Layer 01)?',
    options: [
      'We have no clear lead generation system — leads come in randomly',
      'We have 1 lead source but it is inconsistent',
      'We have 2 sources running but CAC is too high',
      'Our acquisition is efficient and cost per lead is improving',
    ],
  },
  {
    id: 'q3',
    area: 'Attribution Layer',
    icon: '📡',
    question: 'Can you accurately attribute revenue to specific marketing activities (Layer 02)?',
    options: [
      'No — we have no tracking or attribution in place',
      'Partially — we track clicks but not actual revenue',
      'Mostly — we have attribution but it is not fully reliable',
      'Yes — we have clean data connecting spend to revenue',
    ],
  },
  {
    id: 'q4',
    area: 'Conversion Layer',
    icon: '🔄',
    question: 'How would you describe your current conversion performance (Layer 03)?',
    options: [
      'Poor — traffic comes in but very few convert',
      'Below average — conversion rate under 2%',
      'Average — converting but leaving money on the table',
      'Good — conversion is optimised and improving',
    ],
  },
  {
    id: 'q5',
    area: 'Retention Layer',
    icon: '💎',
    question: 'How strong is your customer retention system (Layer 04)?',
    options: [
      'We have no post-sale process — customers are left on their own',
      'We do some follow-up but it is inconsistent',
      'We have a basic retention process but churn is still high',
      'We have strong retention systems and track LTV monthly',
    ],
  },
  {
    id: 'q6',
    area: 'Scaling Layer',
    icon: '🚀',
    question: 'How ready is your business to scale profitably (Layer 05)?',
    options: [
      'Not ready — we have no systems or automation in place',
      'Early stage — we have some systems but they break under pressure',
      'Moderate — we can scale but costs rise faster than revenue',
      'Ready — we have proven systems and scaling is predictable',
    ],
  },
  {
    id: 'q7',
    area: 'Revenue Leakage Impact',
    icon: '💸',
    question: 'Based on your experience, where do you believe your biggest revenue leak is right now?',
    options: [
      'Acquisition — we are paying too much for poor quality leads',
      'Conversion — leads come in but do not convert to customers',
      'Retention — customers are not staying or buying again',
      'Scaling — growth stalls or becomes unprofitable when we try to scale',
    ],
  },
  {
    id: 'q8',
    area: 'Previous Audit Experience',
    icon: '📋',
    question: 'Have you ever had a formal marketing or revenue audit done for your business?',
    options: [
      'Never — this would be my first audit',
      'Informally — we have reviewed things internally',
      'Yes — a partial audit covering 1–2 areas',
      'Yes — a comprehensive audit covering the full funnel',
    ],
  },
  {
    id: 'q9',
    area: 'Urgency & Priority',
    icon: '⏱️',
    question: 'How urgent is fixing your revenue leakage for your business right now?',
    options: [
      'Critical — we are losing significant revenue every month',
      'High — it is costing us but we are managing for now',
      'Medium — we want to fix it but it is not an emergency',
      'Low — we are exploring options for future improvement',
    ],
  },
  {
    id: 'q10',
    area: 'Half-Price Audit Interest',
    icon: '🎁',
    question: 'The R360 Revenue Leakage Audit is normally ₹10,000. As a survey participant, you qualify for a 50% discount (₹5,000). How interested are you?',
    options: [
      'Very interested — I want to book it now',
      'Interested — I want to know more before deciding',
      'Considering it — timing needs to be right',
      'Not right now — but keep me updated',
    ],
  },
];

export default function SurveyPage() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'details' | 'success'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const progress = step === 'quiz' ? Math.round(((currentQ + 1) / questions.length) * 85) : step === 'details' ? 95 : step === 'success' ? 100 : 0;
  const q = questions[currentQ];
  const isInterested = answers['q10'] === 'Very interested — I want to book it now' || answers['q10'] === 'Interested — I want to know more before deciding';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const summary = questions.map(q => `${q.area}: ${answers[q.id] || 'Not answered'}`).join('\n');
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
          subject: `R360 Framework Survey — ${name} (${answers['q10']?.substring(0, 30)})`,
          from_name: name,
          Name: name, Email: email, Phone: phone, Company: company,
          'Survey Summary': summary,
          'Audit Interest': answers['q10'],
          'Biggest Leak': answers['q7'],
          'Submission Date': new Date().toISOString(),
        }),
      });
      setStep('success');
    } catch {
      alert('Error submitting. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← Back</Link>
            <div className="text-base font-bold text-primary-600">R360 Framework Survey</div>
            <div className="w-12"></div>
          </div>
        </div>
      </header>

      {/* Progress */}
      {step !== 'intro' && step !== 'success' && (
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 max-w-3xl py-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>{step === 'quiz' ? `Question ${currentQ + 1} of ${questions.length}` : 'Almost done!'}</span>
              <span className="text-primary-600 font-bold">{progress}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl py-10">

        {/* INTRO */}
        {step === 'intro' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🎁 Exclusive — 50% Off R360 Audit
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">R360 Framework Performance Survey</h1>
            <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Help us understand how businesses are applying the R360 Revenue Leakage Framework — and qualify for a 50% discount on the full R360 Revenue Leakage Audit.
            </p>
            <p className="text-gray-500 text-sm mb-8">10 questions · Takes 5 minutes · Instant discount offer</p>

            <div className="bg-white rounded-2xl border border-primary-100 shadow-sm p-6 max-w-xl mx-auto mb-10">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '📋', title: '10 Questions', desc: 'About your R360 experience' },
                  { icon: '⏱️', title: '5 Minutes', desc: 'Quick and focused' },
                  { icon: '🎁', title: '50% Discount', desc: 'On R360 Audit (₹5,000 vs ₹10,000)' },
                  { icon: '🔒', title: 'Private', desc: 'Your data is never shared' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setStep('quiz')}
              className="bg-primary-600 text-white font-bold text-lg px-12 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
              Start Survey →
            </button>
            <p className="text-gray-400 text-sm mt-3">Free · No obligation · Takes 5 minutes</p>
          </div>
        )}

        {/* QUIZ */}
        {step === 'quiz' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-5">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{q.icon}</span>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{q.area}</span>
                  <h2 className="text-xl font-bold text-gray-900 mt-1">{q.question}</h2>
                </div>
              </div>

              <div className="space-y-3">
                {q.options.map((option, idx) => (
                  <label key={idx}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${answers[q.id] === option ? 'border-primary-400 bg-primary-50' : 'border-gray-100 bg-gray-50 hover:border-primary-200 hover:bg-white'}`}>
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center mt-0.5 transition-all ${answers[q.id] === option ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'}`}>
                      {answers[q.id] === option && <span className="w-2 h-2 bg-white rounded-full block"></span>}
                    </div>
                    <input type="radio" className="hidden" checked={answers[q.id] === option} onChange={() => setAnswers({ ...answers, [q.id]: option })} />
                    <span className="text-gray-700 text-sm leading-relaxed">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {currentQ > 0 && (
                <button onClick={() => setCurrentQ(currentQ - 1)}
                  className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                  ← Back
                </button>
              )}
              <button
                onClick={() => currentQ < questions.length - 1 ? setCurrentQ(currentQ + 1) : setStep('details')}
                disabled={!answers[q.id]}
                className={`flex-1 font-bold py-4 rounded-xl transition-all text-lg ${answers[q.id] ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {currentQ < questions.length - 1 ? 'Next →' : 'Get My Discount →'}
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              {questions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentQ ? 'bg-primary-600 w-4' : i < currentQ ? 'bg-primary-300' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>
        )}

        {/* DETAILS */}
        {step === 'details' && (
          <div>
            <div className="text-center mb-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${isInterested ? 'bg-green-100' : 'bg-primary-100'}`}>
                {isInterested ? '🎁' : '✅'}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Survey Complete!</h2>
              {isInterested ? (
                <p className="text-gray-600">You qualify for the <strong className="text-primary-600">50% discount on the R360 Revenue Leakage Audit</strong> — just ₹5,000 instead of ₹10,000.</p>
              ) : (
                <p className="text-gray-600">Thank you for completing the survey. Enter your details and we will send you your personalised results.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-bold text-gray-900 mb-6">
                {isInterested ? 'Claim Your 50% Discount' : 'Get Your Survey Results'}
              </h3>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Company Name</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm" placeholder="Your Company" />
                  </div>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg disabled:opacity-50">
                  {submitting ? 'Submitting...' : isInterested ? 'Claim My 50% Discount →' : 'Submit Survey →'}
                </button>
                <p className="text-center text-xs text-gray-400">Your data is private and will never be shared.</p>
              </form>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === 'success' && (
          <div className="text-center max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10">
              <div className="text-5xl mb-4">{isInterested ? '🎁' : '✅'}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {isInterested ? 'Your Discount is Reserved!' : 'Thank You!'}
              </h2>
              {isInterested ? (
                <>
                  <p className="text-gray-600 mb-6">
                    We have received your survey and reserved your <strong className="text-primary-600">50% discount on the R360 Revenue Leakage Audit (₹5,000)</strong>. Our team will contact you within 24 hours to schedule your audit.
                  </p>
                  <div className="bg-primary-50 rounded-xl p-5 mb-6 text-left">
                    <p className="text-sm font-bold text-primary-700 mb-2">What happens next:</p>
                    <ul className="space-y-2">
                      {['We review your survey responses', 'Our team contacts you within 24 hours', 'We schedule your R360 Revenue Leakage Audit', 'You receive a full diagnosis + action plan at ₹5,000'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-primary-600">
                          <span className="font-bold flex-shrink-0">{i + 1}.</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href="/book" className="inline-block bg-primary-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
                    Book Your Audit Call Now →
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">Thank you for completing the R360 Framework Survey. We will be in touch with your personalised insights shortly.</p>
                  <Link href="/" className="inline-block bg-primary-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg">
                    Back to Homepage →
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
