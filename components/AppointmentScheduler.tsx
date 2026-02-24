// FILE: components/AppointmentScheduler.tsx
// Add this component to your contact page

'use client';

import { useState } from 'react';

export default function AppointmentScheduler() {
  const [isLoading, setIsLoading] = useState(false);

  // Use your actual Google Calendar URL
  // We'll set up a redirect on your domain for security
  const handleScheduleClick = () => {
    setIsLoading(true);
    
    // Option 1: Use your own domain redirect (RECOMMENDED)
    // Set up: riverr360.vercel.app/schedule → Google Calendar
    window.open('/schedule', '_blank');
    
    // Option 2: Direct link (if you prefer)
    // window.open('https://calendar.app.google/9mfVZcWdj9DssBZ37', '_blank');
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-8 md:p-10 border-2 border-primary-100 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Schedule Your Free Consultation
        </h3>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pick a time that works for you. No commitment required - just a friendly chat about your marketing goals.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl mb-2">⏰</div>
          <div className="font-semibold text-gray-900 mb-1">30 Minutes</div>
          <div className="text-sm text-gray-600">Quick & focused</div>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">📹</div>
          <div className="font-semibold text-gray-900 mb-1">Video Call</div>
          <div className="text-sm text-gray-600">Google Meet included</div>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="font-semibold text-gray-900 mb-1">100% FREE</div>
          <div className="text-sm text-gray-600">Worth ₹5,000</div>
        </div>
      </div>

      {/* What to Expect */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-primary-600">📋</span>
          What to Expect During the Call:
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            <span className="text-gray-700">We'll discuss your current marketing challenges and goals</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <span className="text-gray-700">Review what's working (and what's not) in your marketing</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            <span className="text-gray-700">Get actionable recommendations you can implement immediately</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            <span className="text-gray-700">Understand realistic timelines and expected ROI for your goals</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">5</span>
            <span className="text-gray-700">No pressure sales pitch - just honest, expert advice</span>
          </li>
        </ul>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={handleScheduleClick}
          disabled={isLoading}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-lg px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-3"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {isLoading ? 'Opening Calendar...' : 'Schedule Free Consultation Now'}
        </button>
        
        <p className="text-sm text-gray-500 mt-4">
          ✓ Choose your preferred time slot • ✓ Instant confirmation • ✓ Add to your calendar
        </p>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% Free Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
