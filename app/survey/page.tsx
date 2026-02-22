'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  // Contact Info
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  
  // Survey Questions
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

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    q1_current_situation: '',
    q2_agency_experience: '',
    q3_biggest_challenge: '',
    q4_marketing_budget: '',
    q5_results_satisfaction: '',
    q6_knowledge_level: '',
    q7_learning_interest: '',
    q8_team_training: '',
    q9_expectations: '',
    q10_timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const totalSteps = 11; // Intro + Contact + 10 Questions
  const progress = (step / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your key
          subject: 'New Survey Response - Free ₹5,000 Consultation',
          from_name: formData.name,
          
          // Contact Information
          'Contact Name': formData.name,
          'Email': formData.email,
          'Phone': formData.phone,
          'Company': formData.company,
          'Website': formData.website,
          
          // Survey Responses
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
        })
      });

      if (response.ok) {
        setShowThankYou(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You! 🎉</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your survey has been submitted successfully!
          </p>

          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-8 mb-8">
            <div className="text-5xl font-bold mb-2">₹5,000</div>
            <div className="text-xl">FREE Consultation Unlocked!</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-blue-600">📅</span>
              What Happens Next?
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>We'll review your responses within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Our team will email you to schedule your FREE ₹5,000 consultation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>We'll prepare a custom analysis based on your survey answers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Get a personalized digital marketing roadmap (worth ₹5,000!)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <Link href="/" className="block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Back to Home
            </Link>
            <p className="text-sm text-gray-500">
              Check your email: <strong>{formData.email}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <img src="/images/logo.png" alt="Riverr360" className="h-10 md:h-12 w-auto" />
            </Link>
            <div className="text-sm text-gray-600">
              Step {step + 1} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {Math.round(progress)}% Complete
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* Step 0: Introduction */}
          {step === 0 && (
            <div className="text-center">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎁 Limited Time Offer
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get FREE ₹5,000 Consultation
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Complete this 10-question survey and unlock a personalized digital marketing consultation worth ₹5,000 - absolutely FREE!
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="text-4xl mb-3">⏱️</div>
                  <h3 className="font-bold text-gray-900 mb-2">5 Minutes</h3>
                  <p className="text-sm text-gray-600">Quick & easy survey</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-bold text-gray-900 mb-2">Personalized</h3>
                  <p className="text-sm text-gray-600">Custom marketing roadmap</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-bold text-gray-900 mb-2">₹5,000 Value</h3>
                  <p className="text-sm text-gray-600">100% free consultation</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-3">What You'll Get:</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Complete analysis of your current marketing situation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Personalized 90-day digital marketing roadmap</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Expert insights on improving your ROI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Action plan to fix current challenges</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setStep(1)}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-xl font-bold px-12 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Survey - Get FREE Consultation
              </button>

              <p className="text-sm text-gray-500 mt-4">
                No credit card required • Takes only 5 minutes
              </p>
            </div>
          )}

          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Contact Information</h2>
              <p className="text-gray-600 mb-8">We'll use this to send you the consultation details</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your Company Pvt Ltd"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website (Optional)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(0)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.company}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Survey
                </button>
              </div>
            </div>
          )}

          {/* Question 1 */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 1 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">What best describes your current digital marketing situation?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Currently working with an agency',
                  'Working with a freelancer',
                  'Have an in-house marketing team',
                  'Doing it myself (founder/owner)',
                  'Not doing any digital marketing yet',
                  'Mix of agency and in-house'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q1"
                      value={option}
                      checked={formData.q1_current_situation === option}
                      onChange={(e) => updateField('q1_current_situation', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} disabled={!formData.q1_current_situation} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 2 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">How satisfied are you with your current agency/freelancer/team's performance?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Very satisfied - Getting great results',
                  'Somewhat satisfied - Okay results but could be better',
                  'Neutral - Not seeing much impact',
                  'Dissatisfied - Poor results for the money spent',
                  'Very dissatisfied - Complete waste of money',
                  'Not applicable - Don\'t have anyone currently'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q2"
                      value={option}
                      checked={formData.q2_agency_experience === option}
                      onChange={(e) => updateField('q2_agency_experience', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(2)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(4)} disabled={!formData.q2_agency_experience} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 3 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">What's your BIGGEST challenge with digital marketing right now?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Not getting enough leads/customers',
                  'Spending too much money with poor ROI',
                  'Don\'t understand what my agency is actually doing',
                  'Can\'t track or measure results properly',
                  'Marketing team lacks expertise',
                  'No clear strategy or plan',
                  'Too many tools and platforms - feeling overwhelmed',
                  'Don\'t know if I\'m targeting the right audience'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q3"
                      value={option}
                      checked={formData.q3_biggest_challenge === option}
                      onChange={(e) => updateField('q3_biggest_challenge', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(3)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(5)} disabled={!formData.q3_biggest_challenge} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 4 */}
          {step === 5 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 4 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">What's your monthly digital marketing budget?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Less than ₹25,000/month',
                  '₹25,000 - ₹50,000/month',
                  '₹50,000 - ₹1,00,000/month',
                  '₹1,00,000 - ₹2,50,000/month',
                  '₹2,50,000 - ₹5,00,000/month',
                  'More than ₹5,00,000/month',
                  'No budget allocated yet'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q4"
                      value={option}
                      checked={formData.q4_marketing_budget === option}
                      onChange={(e) => updateField('q4_marketing_budget', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(4)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(6)} disabled={!formData.q4_marketing_budget} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 5 */}
          {step === 6 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 5 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">Are you getting the results you expected from your marketing investment?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Yes, exceeding expectations',
                  'Getting some results but not enough',
                  'Breaking even - no growth',
                  'Losing money - negative ROI',
                  'Can\'t tell - no proper tracking',
                  'Just started - too early to say'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q5"
                      value={option}
                      checked={formData.q5_results_satisfaction === option}
                      onChange={(e) => updateField('q5_results_satisfaction', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(5)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(7)} disabled={!formData.q5_results_satisfaction} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 6 */}
          {step === 7 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 6 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">How would you rate your understanding of how digital marketing actually works?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Expert - I know the ins and outs',
                  'Advanced - Pretty good understanding',
                  'Intermediate - Know the basics',
                  'Beginner - Limited knowledge',
                  'Complete beginner - No idea how it works',
                  'I understand some channels but not others'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q6"
                      value={option}
                      checked={formData.q6_knowledge_level === option}
                      onChange={(e) => updateField('q6_knowledge_level', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(6)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(8)} disabled={!formData.q6_knowledge_level} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 7 */}
          {step === 8 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 7 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">Would you like to understand the REAL digital marketing process (not just "put money, get leads")?</h2>
                <p className="text-gray-600 mt-2">Understanding the process helps you make better decisions and avoid being misled by promises of instant results.</p>
              </div>

              <div className="space-y-3">
                {[
                  'Yes! I want to understand the complete process',
                  'Yes, but keep it simple - I don\'t need all the details',
                  'Maybe - depends on how complicated it is',
                  'No - I just want someone to handle it for me',
                  'I already understand it well',
                  'Not sure - need to think about it'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q7"
                      value={option}
                      checked={formData.q7_learning_interest === option}
                      onChange={(e) => updateField('q7_learning_interest', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(7)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(9)} disabled={!formData.q7_learning_interest} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 8 */}
          {step === 9 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 8 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">Would you be interested in training your in-house team on proper digital marketing practices?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Yes! Train my entire team',
                  'Yes, but only key team members',
                  'Maybe - depends on cost and time',
                  'No - prefer to outsource completely',
                  'Don\'t have an in-house team',
                  'Already have trained staff'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q8"
                      value={option}
                      checked={formData.q8_team_training === option}
                      onChange={(e) => updateField('q8_team_training', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(8)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(10)} disabled={!formData.q8_team_training} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Next Question</button>
              </div>
            </div>
          )}

          {/* Question 9 */}
          {step === 10 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 9 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">What do you expect from digital marketing?</h2>
                <p className="text-gray-600 mt-2">Be honest - this helps us provide realistic solutions.</p>
              </div>

              <div className="space-y-3">
                {[
                  'Instant results - leads/sales within days',
                  'Quick results - within 1-2 months',
                  'Gradual growth - willing to wait 3-6 months',
                  'Long-term strategy - 6-12 months',
                  'Realistic expectations - understand it takes time',
                  'Just want to stop wasting money'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q9"
                      value={option}
                      checked={formData.q9_expectations === option}
                      onChange={(e) => updateField('q9_expectations', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(9)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(11)} disabled={!formData.q9_expectations} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg disabled:opacity-50">Final Question</button>
              </div>
            </div>
          )}

          {/* Question 10 */}
          {step === 11 && (
            <div>
              <div className="mb-6">
                <span className="text-sm text-primary-600 font-semibold">Question 10 of 10</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">When are you looking to improve your digital marketing?</h2>
              </div>

              <div className="space-y-3">
                {[
                  'Immediately - need help now!',
                  'Within the next month',
                  'Next 2-3 months',
                  'Just exploring options for now',
                  'Planning for next quarter',
                  'Not sure yet - gathering information'
                ].map((option) => (
                  <label key={option} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition-all">
                    <input
                      type="radio"
                      name="q10"
                      value={option}
                      checked={formData.q10_timeline === option}
                      onChange={(e) => updateField('q10_timeline', e.target.value)}
                      className="mt-1"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setStep(10)} className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">Back</button>
                <button 
                  onClick={handleSubmit}
                  disabled={!formData.q10_timeline || isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit & Get FREE ₹5,000 Consultation'}
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2026 Riverr360 Digital Marketing. All rights reserved.</p>
          <p className="text-xs mt-2">Your information is secure and will never be shared.</p>
        </div>
      </footer>
    </div>
  );
}
