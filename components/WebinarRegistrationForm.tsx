'use client';

import { useState } from 'react';

interface WebinarRegistrationFormProps {
  webinarTitle: string;
  webinarDate: string;
  webinarTime: string;
}

export default function WebinarRegistrationForm({ webinarTitle, webinarDate, webinarTime }: WebinarRegistrationFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', role: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Web3Forms
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
          subject: `Webinar Registration: ${webinarTitle}`,
          from_name: formData.name,
          'Webinar Title': webinarTitle,
          'Webinar Date': webinarDate,
          'Webinar Time': webinarTime,
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Company: formData.company,
          Role: formData.role,
          'Registration Date': new Date().toISOString(),
        }),
      });

      // Submit to Zoho CRM (works silently even if not configured yet)
      await fetch('/api/admin/zoho-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          source: 'Webinar Registration',
          description: `Webinar: ${webinarTitle}\nDate: ${webinarDate} ${webinarTime}\nRole: ${formData.role}`,
        }),
      });

      if (web3Response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', role: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">You're Registered!</h3>
        <p className="text-lg text-gray-600 mb-6">Check your email for webinar details and calendar invite.</p>
        <div className="bg-primary-50 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-gray-900 mb-3">What Happens Next:</h4>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span><span>You'll receive a confirmation email with webinar link</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span><span>You'll get a reminder 24 hours before the webinar</span></li>
            <li className="flex items-start gap-2"><span className="text-green-600 mt-0.5">✓</span><span>Recording will be emailed if you can't attend live</span></li>
          </ul>
        </div>
        <button onClick={() => setShowSuccess(false)} className="text-primary-600 hover:text-primary-700 font-semibold">Register Another Person</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Register via Form</h3>
        <p className="text-gray-600">Fill in your details to reserve your spot. It's 100% free!</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="John Smith" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
          <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="john@company.com" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <input type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
          <input type="text" required value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your Company Pvt Ltd" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Role *</label>
          <select required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option value="">Select your role</option>
            <option value="Business Owner">Business Owner</option>
            <option value="Marketing Manager">Marketing Manager</option>
            <option value="Marketing Director">Marketing Director</option>
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Agency Owner">Agency Owner</option>
            <option value="Student">Student</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
          {isSubmitting ? 'Registering...' : 'Reserve My Spot - Free'}
        </button>
        <p className="text-center text-sm text-gray-500">100% Free | No Credit Card | Instant Confirmation</p>
      </form>
    </div>
  );
}
