'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const layers = [
  {
    number: '01',
    name: 'Acquisition',
    icon: '🎯',
    color: 'border-red-400 bg-red-50',
    badge: 'bg-red-100 text-red-700',
    question: 'Where are you currently struggling most with acquiring customers?',
    options: [
      'High ad costs with poor quality leads',
      'Low traffic — not enough people finding us',
      'Wrong audience clicking our ads',
      'Not sure which channels to focus on',
      'All of the above',
    ],
  },
  {
    number: '02',
    name: 'Attribution',
    icon: '📡',
    color: 'border-orange-400 bg-orange-50',
    badge: 'bg-orange-100 text-orange-700',
    question: 'How well do you currently track which marketing efforts drive revenue?',
    options: [
      'We have no tracking set up at all',
      'We track clicks but not actual revenue',
      'Our data is inconsistent across platforms',
      'We cannot connect marketing spend to sales',
      'We have good tracking but need help interpreting it',
    ],
  },
  {
    number: '03',
    name: 'Conversion',
    icon: '🔄',
    color: 'border-yellow-400 bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-700',
    question: 'What is your biggest conversion challenge right now?',
    options: [
      'Traffic arrives but nobody fills our forms',
      'High cart or enquiry abandonment',
      'Leads come in but sales team cannot close them',
      'Our website does not clearly explain our offer',
      'We get leads but they are low quality',
    ],
  },
  {
    number: '04',
    name: 'Retention',
    icon: '💎',
    color: 'border-green-400 bg-green-50',
    badge: 'bg-green-100 text-green-700',
    question: 'How would you describe your customer retention situation?',
    options: [
      'Customers buy once and we never hear from them again',
      'High churn — customers leave after a short time',
      'No post-sale communication or nurture system',
      'We have no referral or loyalty programme',
      'Retention is fine but we want to grow LTV',
    ],
  },
  {
    number: '05',
    name: 'Scaling',
    icon: '🚀',
    color: 'border-blue-400 bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    question: 'What happens when you try to scale your marketing?',
    options: [
      'Costs rise faster than revenue when we spend more',
      'Our team gets overwhelmed with manual work',
      'Results are inconsistent — some months great, some terrible',
      'We have no systems or playbooks to replicate success',
      'We are not scaling yet — not sure where to start',
    ],
  },
];

export default function GetStartedPage() {
  const [currentLayer, setCurrentLayer] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState<'quiz' | 'form'>('quiz');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLayer, phase]);

  function selectAnswer(answer: string) {
    setAnswers({ ...answers, [currentLayer]: answer });
  }

  function nextLayer() {
    if (currentLayer < layers.length - 1) {
      setCurrentLayer(currentLayer + 1);
    } else {
      setPhase('form');
    }
  }

  function prevLayer() {
    if (currentLayer > 0) setCurrentLayer(currentLayer - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const summary = layers.map((l, i) => `Layer ${l.number} — ${l.name}: ${answers[i] || 'Not answered'}`).join('\n');

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
          subject: `R360 Diagnosis Request from ${name}`,
          from_name: name,
          Name: name,
          Email: email,
          Phone: phone,
          Company: company,
          'R360 Diagnosis Summary': summary,
          'Submission Date': new Date().toISOString(),
        }),
      });

      await fetch('/api/admin/zoho-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, company,
          source: 'R360 Diagnosis Tool',
          description: `R360 Revenue Leakage Diagnosis:\n${summary}`,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  const progress = phase === 'form' ? 100 : Math.round(((currentLayer + (answers[currentLayer] ? 1 : 0)) / layers.length) * 90);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Diagnosis Submitted!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you, {name}. We have received your R360 Revenue Leakage Diagnosis and will review your responses carefully.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 text-left">
            <h3 className="font-bold text-gray-900 mb-4">Your Diagnosis Summary:</h3>
            <div className="space-y-3">
              {layers.map((layer, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{layer.icon}</span>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm">Layer {layer.number} — {layer.name}:</span>
                    <p className="text-gray-600 text-sm">{answers[i] || 'Not answered'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-gray-600 mb-6">We will contact you within 24 hours to discuss your personalised revenue recovery plan.</p>
          <Link href="/" className="inline-block bg-primary-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-700 transition-all">
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <img src="/images/logo.png" alt="Riverr360" className="h-10 w-auto" />
            </Link>
            <div className="text-sm text-gray-500 font-medium">
              Free Revenue Leakage Diagnosis
            </div>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">
              {phase === 'quiz' ? `Layer ${currentLayer + 1} of ${layers.length}` : 'Almost done!'}
            </span>
            <span className="text-xs text-primary-600 font-bold">{progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          {phase === 'quiz' && (
            <div className="flex gap-2 mt-2">
              {layers.map((l, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i < currentLayer ? 'bg-primary-600' : i === currentLayer ? 'bg-primary-400' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl py-12">

        {phase === 'quiz' && (
          <div>
            {/* Intro on first layer */}
            {currentLayer === 0 && (
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  R360 Revenue Leakage Diagnosis
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Discover Where Your Business Is Leaking Revenue
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Answer 5 quick questions — one for each layer of the R360 Framework — and we will build a personalised revenue recovery plan for your business.
                </p>
              </div>
            )}

            {/* Layer card */}
            <div className={`bg-white rounded-2xl border-l-4 shadow-lg p-8 mb-6 ${layers[currentLayer].color}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{layers[currentLayer].icon}</div>
                <div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${layers[currentLayer].badge}`}>
                    Layer {layers[currentLayer].number} — {layers[currentLayer].name} Leakage
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mt-2">{layers[currentLayer].question}</h2>
                </div>
              </div>

              <div className="space-y-3">
                {layers[currentLayer].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-sm ${
                      answers[currentLayer] === option
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${answers[currentLayer] === option ? 'border-primary-600 bg-primary-600' : 'border-gray-300'}`}>
                        {answers[currentLayer] === option && <span className="w-2 h-2 bg-white rounded-full"></span>}
                      </span>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentLayer > 0 && (
                <button onClick={prevLayer} className="flex-1 py-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                  ← Previous
                </button>
              )}
              <button
                onClick={nextLayer}
                disabled={!answers[currentLayer]}
                className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
                  answers[currentLayer]
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentLayer < layers.length - 1 ? `Next: ${layers[currentLayer + 1].name} →` : 'Get My Diagnosis →'}
              </button>
            </div>

            {/* Layer indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {layers.map((l, i) => (
                <div key={i} className="text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mx-auto mb-1 ${i < currentLayer ? 'bg-primary-600 text-white' : i === currentLayer ? 'bg-primary-100 text-primary-700 border-2 border-primary-600' : 'bg-gray-100 text-gray-400'}`}>
                    {i < currentLayer ? '✓' : i + 1}
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">{l.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 'form' && (
          <div>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎯</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Diagnosis Complete!</h2>
              <p className="text-lg text-gray-600">
                Enter your details below and we will prepare a personalised R360 Revenue Recovery Plan based on your responses.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Your Diagnosis Summary</h3>
              <div className="space-y-3">
                {layers.map((layer, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-lg flex-shrink-0">{layer.icon}</span>
                    <div>
                      <span className="font-semibold text-gray-700">Layer {layer.number} — {layer.name}:</span>
                      <p className="text-gray-600">{answers[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-bold text-gray-900 mb-6">Where Should We Send Your Recovery Plan?</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Work Email *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@company.com" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input type="text" required value={company} onChange={e => setCompany(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your Company" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 98765 43210" />
                  </div>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg">
                  {submitting ? 'Submitting...' : 'Get My Free Revenue Recovery Plan →'}
                </button>
                <p className="text-center text-sm text-gray-500">We respond within 24 hours. No spam, ever.</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
