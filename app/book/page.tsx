'use client';

import { useState } from 'react';
import BookingCalendar from '@/components/BookingCalendar';

const BUDGET_OPTIONS = [
  'Under ₹50,000/month',
  '₹50,000 – ₹2,00,000/month',
  '₹2,00,000 – ₹5,00,000/month',
  'Above ₹5,00,000/month',
];

type Step = 'datetime' | 'details' | 'success';

export default function BookPage() {
  const [step, setStep] = useState<Step>('datetime');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', challenge: '', budget: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [meetLink, setMeetLink] = useState('');

  function handleSelect(date: string, time: string) {
    setSelectedDate(date);
    setSelectedTime(time);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, date: selectedDate, time: selectedTime }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      setMeetLink(data.meetLink || '');
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #eff6ff, #fff)' }}>
      <div className="container-custom py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Book a free strategy call
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            30 minutes · Google Meet · No obligation
          </p>
        </div>

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-3 mb-8">
            {(['datetime', 'details'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', fontSize: 13, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: step === s ? '#1d4ed8' : (i === 0 && step === 'details') ? '#eff6ff' : '#f1f5f9',
                  color: step === s ? '#fff' : (i === 0 && step === 'details') ? '#1d4ed8' : '#94a3b8',
                  border: (i === 0 && step === 'details') ? '1.5px solid #1d4ed8' : 'none',
                }}>
                  {i === 0 && step === 'details' ? '✓' : i + 1}
                </div>
                <span className="text-sm text-gray-500 hidden sm:inline">
                  {i === 0 ? 'Pick date & time' : 'Your details'}
                </span>
                {i === 0 && <div style={{ width: 32, height: 1, background: '#e2e8f0' }} />}
              </div>
            ))}
          </div>
        )}

        {/* ── Step 1: Date & Time ─────────────────────────────────────────── */}
        {step === 'datetime' && (
          <div className="max-w-2xl mx-auto space-y-4">

            {/* Calendar card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Pick a date &amp; time
              </p>
              <BookingCalendar
                onSelect={handleSelect}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            </div>

            {/* What to expect — horizontal chips on mobile */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                What to expect
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: '🕐', text: '30-minute focused call' },
                  { icon: '📊', text: 'Review your current marketing spend' },
                  { icon: '🔍', text: 'Identify your top 3 revenue leaks' },
                  { icon: '📋', text: 'Leave with a clear action plan' },
                  { icon: '💰', text: 'Zero cost, zero obligation' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                    <span className="text-base flex-shrink-0">{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue button */}
            <button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep('details')}
              className="w-full py-4 rounded-xl font-semibold text-base transition-colors"
              style={{
                background: selectedDate && selectedTime ? '#1d4ed8' : '#e2e8f0',
                color: selectedDate && selectedTime ? '#fff' : '#94a3b8',
                border: 'none',
                cursor: selectedDate && selectedTime ? 'pointer' : 'default',
              }}
            >
              {selectedDate && selectedTime
                ? `Continue — ${formattedDate} at ${selectedTime}`
                : 'Select a date and time to continue'}
            </button>
          </div>
        )}

        {/* ── Step 2: Details ─────────────────────────────────────────────── */}
        {step === 'details' && (
          <div className="max-w-lg mx-auto">
            <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-3 mb-4 flex items-center justify-between text-sm text-primary-700">
              <span>📅 {formattedDate} at {selectedTime} IST</span>
              <button
                onClick={() => setStep('datetime')}
                className="text-primary-600 font-semibold underline underline-offset-2 ml-3 flex-shrink-0"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}
              >
                Change
              </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Your details
              </p>

              {[
                { label: 'Full name', name: 'name', type: 'text', placeholder: 'Rahul Sharma', required: true },
                { label: 'Email address', name: 'email', type: 'email', placeholder: 'rahul@company.com', required: true },
                { label: 'Phone number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210', required: true },
              ].map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What's your main marketing challenge?
                </label>
                <textarea
                  name="challenge"
                  placeholder="e.g. High ad spend but getting poor quality leads..."
                  value={form.challenge}
                  onChange={handleChange}
                  style={{ width: '100%', boxSizing: 'border-box', height: 80, resize: 'none' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly marketing budget
                </label>
                <select name="budget" value={form.budget} onChange={handleChange} style={{ width: '100%' }}>
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-base text-white transition-colors"
                style={{
                  background: loading ? '#93c5fd' : '#1d4ed8',
                  border: 'none',
                  cursor: loading ? 'default' : 'pointer',
                }}
              >
                {loading ? 'Confirming your booking...' : 'Confirm booking →'}
              </button>
            </form>
          </div>
        )}

        {/* ── Step 3: Success ──────────────────────────────────────────────── */}
        {step === 'success' && (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
                ✅
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You're booked, {form.name.split(' ')[0]}!
              </h2>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                {formattedDate} at {selectedTime} IST<br />
                Check your email for the confirmation and Google Meet link.
              </p>
              {meetLink && (
                <a
                  href={meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl text-sm mb-4"
                  style={{ textDecoration: 'none' }}
                >
                  Join Google Meet
                </a>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Calendar invite sent to {form.email}
              </p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
