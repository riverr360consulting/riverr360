'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
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
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: formData.name,
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Company: formData.company,
          Service: formData.service,
          Message: formData.message,
          'Submission Date': new Date().toISOString(),
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
          source: 'Contact Form',
          description: `Service: ${formData.service}\n\nMessage: ${formData.message}`,
        }),
      });

      if (web3Response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
        <button onClick={() => setShowSuccess(false)} className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
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
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
          <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your Company" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Interested In</label>
        <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option value="">Select a service</option>
          <option value="Marketing Audit">Free Marketing Audit</option>
          <option value="Google Ads">Google Ads Management</option>
          <option value="SEO">SEO Services</option>
          <option value="Social Media">Social Media Marketing</option>
          <option value="Content Marketing">Content Marketing</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
        <textarea required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Tell us about your business and what you're looking to achieve..." />
      </div>
      <button type="submit" disabled={isSubmitting}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      <p className="text-center text-sm text-gray-500">We respond within 24 hours</p>
    </form>
  );
}
