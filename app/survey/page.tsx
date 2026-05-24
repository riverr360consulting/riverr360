'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  q1_current_situation: string;
  q2_agency_experience: string;
  q3_biggest_challenge: string;
  q4_marketing_budget: string;
  q5_results_satisfaction: string;
  q6_knowledge_level: string;
  q7_learning_interest: string;
  q8_team_training: string;
  q9_expectations: string;
  q10_timeline: string;
}

const TOTAL_STEPS = 11;

const optionClass = (selected: boolean) =>
  `flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
    selected
      ? 'border-primary-600 bg-primary-50'
      : 'border-gray-200 hover:border-primary-400 hover:bg-gray-50'
  }`;

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', website: '',
    q1_current_situation: '', q2_agency_experience: '', q3_biggest_challenge: '',
    q4_marketing_budget: '', q5_results_satisfaction: '', q6_knowledge_level: '',
    q7_learning_interest: '', q8_team_training: '', q9_expectations: '', q10_timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const updateField = (field: keyof FormData, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
          subject: 'New R360 Diagnostic Survey Response',
          from_name: formData.name,
          'Contact Name': formData.name,
          'Email': formData.email,
          'Phone': formData.phone,
          'Company': formData.company,
          'Website': formData.website,
          'Q1 - Current Marketing Situation': formData.q1_current_situation,
          'Q2 - Agency/Freelancer Experience': formData.q2_agency_experience,
          'Q3 - Biggest Challenge': formData.q3_biggest_challenge,
          'Q4 - Monthly Marketing Budget': formData.q4_marketing_budget,
          'Q5 - Results Satisfaction': formData.q5_results_satisfaction,
          'Q6 - Digital Marketing Knowledge': formData.q6_knowledge_level,
          'Q7 - Interest in Learning Process': formData.q7_learning_interest,
          'Q8 - In-house Team Training': formData.q8_team_training,
          'Q9 - Marketing Expectations': formData.q9_expectations,
          'Q10 - Timeline for Results': formData.q10_timeline,
        }),
      });
      if (response.ok) setShowThankYou(true);
      else alert('Something went wrong. Please try again.');
    } catch {
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Diagnostic Complete</h1>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name.split(' ')[0]}. We have received your responses and will review them within 24 hours.
          </p>
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              {[
                'We analyse your 10 responses across the R360 Framework layers',
                'Our team prepares a personalised revenue leakage diagnosis',
                'We reach out within 24 hours to schedule your strategy call',
                'You receive a custom recovery roadmap on the call',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-600 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/" className="block btn-primary text-center mb-3">Back to Home</Link>
          <p className="text-sm text-gray-500">Confirmation sent to <strong>{formData.email}</strong></p>
        </div>
      </div>
    );
  }

  const RadioGroup = ({
    name, options, value, onChange,
  }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="space-y-3">
      {options.map(option => (
        <label key={option} className={optionClass(value === option)}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={e => onChange(e.target.value)}
            className="mt-1 accent-blue-600"
          />
          <span className="text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );

  const NavButtons = ({
    onBack, onNext, nextLabel = 'Next', nextDisabled = false,
  }: { onBack?: () => void; onNext: () => void; nextLabel?: string; nextDisabled?: boolean }) => (
    <div className="flex gap-4 mt-8">
      {onBack && (
        <button onClick={onBack} className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
          Back
        </button>
      )}
      <button onClick={onNext} disabled={nextDisabled} className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
        {nextLabel}
      </button>
    </div>
  );

  return (
    // layout.tsx Header is hidden for /survey via the pathname check
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">

      {/* Single minimal header — no global header shown on this route */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 flex justify-between items-center h-14">
          <Link href="/">
            <img src="/images/logo.png" alt="Riverr360" className="h-8 w-auto" />
          </Link>
          <span className="text-sm text-gray-500 font-medium">
            {step === 0 ? 'R360 Diagnostic Survey' : `Step ${step} of ${TOTAL_STEPS - 1}`}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {step === 0 && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                R360 Revenue Leakage Diagnostic
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Identify Where Your Marketing Budget Is Leaking
              </h1>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Answer 10 questions about your current marketing situation. We'll analyse your responses across the 5 layers of the R360 Framework and prepare a personalised diagnosis.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: '⏱️', label: '5 minutes', sub: 'Quick survey' },
                  { icon: '🎯', label: 'Personalised', sub: 'Custom roadmap' },
                  { icon: '🔍', label: 'Free diagnosis', sub: 'No obligation' },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="font-semibold text-gray-900 text-sm">{label}</div>
                    <div className="text-gray-500 text-xs">{sub}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="btn-primary w-full max-w-sm mx-auto block">
                Start Diagnostic →
              </button>
              <p className="text-xs text-gray-400 mt-4">No credit card required. Your data is never shared.</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <span className="text-sm text-primary-600 font-semibold">Your Details</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-6">Tell us a bit about yourself</h2>
              <div className="space-y-4">
                {[
                  { label: 'Full name', field: 'name', type: 'text', placeholder: 'Rahul Sharma', required: true },
                  { label: 'Email address', field: 'email', type: 'email', placeholder: 'rahul@company.com', required: true },
                  { label: 'Phone number', field: 'phone', type: 'tel', placeholder: '+91 98765 43210', required: true },
                  { label: 'Company name', field: 'company', type: 'text', placeholder: 'Your company', required: false },
                  { label: 'Website (optional)', field: 'website', type: 'url', placeholder: 'https://yoursite.com', required: false },
                ].map(({ label, field, type, placeholder, required }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[field as keyof FormData]}
                      onChange={e => updateField(field as keyof FormData, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <NavButtons
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
                nextLabel="Continue to Questions →"
                nextDisabled={!formData.name || !formData.email || !formData.phone}
              />
            </div>
          )}

          {[
            { s: 2, q: 1, field: 'q1_current_situation', title: 'How would you describe your current marketing situation?', subtitle: 'Select the option that best describes where you are right now.', options: ['Just starting — no marketing in place yet', 'Running ads but not getting expected results', 'Getting leads but poor quality or high cost', 'Marketing is working but want to scale', 'Tried multiple agencies — disappointed with results', 'Have in-house team but results are inconsistent'] },
            { s: 3, q: 2, field: 'q2_agency_experience', title: 'Have you worked with a digital marketing agency or freelancer before?', subtitle: null, options: ['Yes — and it worked well', 'Yes — but results were disappointing', 'Yes — currently working with one', 'No — first time exploring this', 'No — tried to do it in-house', 'Yes — multiple agencies, mixed results'] },
            { s: 4, q: 3, field: 'q3_biggest_challenge', title: 'What is your single biggest marketing challenge right now?', subtitle: 'Pick the one that impacts you the most.', options: ['Not getting enough leads', 'Leads are low quality or not converting', 'High cost per lead / cost per acquisition', 'Poor ROAS on paid ads', 'No clarity on what is actually working', 'Scaling without knowing what to fix first'] },
            { s: 5, q: 4, field: 'q4_marketing_budget', title: 'What is your current monthly marketing budget?', subtitle: 'Include ad spend and agency fees.', options: ['Under ₹25,000/month', '₹25,000 – ₹1,00,000/month', '₹1,00,000 – ₹3,00,000/month', '₹3,00,000 – ₹10,00,000/month', 'Above ₹10,00,000/month', 'Not currently spending — planning to start'] },
            { s: 6, q: 5, field: 'q5_results_satisfaction', title: 'How satisfied are you with your current marketing results?', subtitle: null, options: ['Very dissatisfied — wasting money with no results', 'Dissatisfied — some results but far below expectations', 'Neutral — getting results but not consistently', 'Satisfied — results are decent but want to grow', 'Very satisfied — but want to scale further', 'No marketing running — starting fresh'] },
            { s: 7, q: 6, field: 'q6_knowledge_level', title: 'How would you rate your own digital marketing knowledge?', subtitle: 'Be honest — this helps us calibrate your diagnosis.', options: ['Beginner — I know very little about it', 'Basic — I understand the concepts but not execution', 'Intermediate — I can manage campaigns but not optimise', 'Advanced — I understand strategy and execution', 'Expert — I have deep experience', 'Variable — strong in some areas, weak in others'] },
            { s: 8, q: 7, field: 'q7_learning_interest', title: 'Would you like to understand the real marketing process behind results?', subtitle: 'Understanding the process helps you make better decisions and avoid being misled.', options: ['Yes — I want to understand the complete process', 'Yes, but keep it simple', 'Maybe — depends on how much time it takes', 'No — I just want someone to handle it', 'I already understand it well', 'Not sure yet'] },
            { s: 9, q: 8, field: 'q8_team_training', title: 'Would you be interested in training your in-house team on marketing practices?', subtitle: null, options: ['Yes — train my entire team', 'Yes — only key team members', 'Maybe — depends on cost and time', 'No — prefer to fully outsource', 'I do not have an in-house team', 'Already have trained staff'] },
            { s: 10, q: 9, field: 'q9_expectations', title: 'What timeline are you expecting for meaningful results?', subtitle: 'Being realistic here helps us build the right plan for you.', options: ['Immediate — need results within days', 'Short-term — within 1-2 months', 'Medium-term — 3-6 months', 'Long-term — 6-12 months, done right', 'Realistic — I understand it takes time', 'Just want to stop wasting money first'] },
            { s: 11, q: 10, field: 'q10_timeline', title: 'When are you looking to start improving your marketing?', subtitle: null, options: ['Immediately — I need help now', 'Within the next month', 'Next 2-3 months', 'Next quarter — planning ahead', 'Just exploring options for now', 'Not sure yet'] },
          ].map(({ s, q, field, title, subtitle, options }) =>
            step === s ? (
              <div key={s}>
                <span className="text-sm text-primary-600 font-semibold">Question {q} of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-2">{title}</h2>
                {subtitle && <p className="text-gray-500 text-sm mb-6">{subtitle}</p>}
                {!subtitle && <div className="mb-6" />}
                <RadioGroup
                  name={`q${q}`}
                  options={options}
                  value={formData[field as keyof FormData]}
                  onChange={v => updateField(field as keyof FormData, v)}
                />
                <NavButtons
                  onBack={() => setStep(s - 1)}
                  onNext={s < 11 ? () => setStep(s + 1) : handleSubmit}
                  nextLabel={s < 11 ? 'Next Question →' : isSubmitting ? 'Submitting...' : 'Submit Diagnostic →'}
                  nextDisabled={!formData[field as keyof FormData] || isSubmitting}
                />
              </div>
            ) : null
          )}
        </div>
      </main>

      <footer className="text-center py-8">
        <p className="text-xs text-gray-400">
          © 2026 Riverr360. All rights reserved. · Your information is secure and never shared.
        </p>
      </footer>
    </div>
  );
}
