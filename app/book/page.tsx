'use client';

import { useState } from 'react';
import BookingCalendar from '@/components/BookingCalendar';
import type { Metadata } from 'next';

// Add this to a separate layout or page-level export for SEO:
// export const metadata: Metadata = {
//   title: 'Book a Free Strategy Call | Riverr360',
//   description: 'Book a free 30-minute strategy call with Team Riverr360. We will identify where your marketing budget is leaking and how to fix it.',
// };

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
    <main>
      <section style={{ background: 'linear-gradient(to bottom, #eff6ff, #fff)', padding: '48px 0 64px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', margin: '0 0 12px' }}>
              Book a free strategy call
            </h1>
            <p style={{ fontSize: 16, color: '#64748b', margin: 0 }}>
              30 minutes · Google Meet · No obligation
            </p>
          </div>

          {/* Step indicator */}
          {step !== 'success' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
              {(['datetime', 'details'] as Step[]).map((s, i) => (
                <>
                  <div key={s} style={{
                    width: 28, height: 28, borderRadius: '50%', fontSize: 13, fontWeight: 500,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: step === s ? '#1d4ed8' : (i === 0 && step === 'details') ? '#eff6ff' : '#f1f5f9',
                    color: step === s ? '#fff' : (i === 0 && step === 'details') ? '#1d4ed8' : '#94a3b8',
                    border: (i === 0 && step === 'details') ? '1px solid #1d4ed8' : 'none',
                  }}>
                    {i === 0 && step === 'details' ? '✓' : i + 1}
                  </div>
                  {i === 0 && <div key="line" style={{ width: 48, height: 1, background: '#e2e8f0' }} />}
                </>
              ))}
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 'datetime' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 720, margin: '0 auto' }}>
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#64748b', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Pick a date & time
                </p>
                <BookingCalendar
                  onSelect={handleSelect}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                />
              </div>

              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: '#64748b', margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    What to expect
                  </p>
                  {[
                    { icon: '🕐', text: '30-minute focused call' },
                    { icon: '📊', text: 'We review your current marketing spend' },
                    { icon: '🔍', text: 'Identify your top 3 revenue leaks' },
                    { icon: '📋', text: 'Leave with a clear action plan' },
                    { icon: '💰', text: 'Zero cost, zero obligation' },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 12, fontSize: 14, color: '#374151' }}>
                      <span>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep('details')}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 8,
                    background: selectedDate && selectedTime ? '#1d4ed8' : '#e2e8f0',
                    color: selectedDate && selectedTime ? '#fff' : '#94a3b8',
                    border: 'none', fontSize: 15, fontWeight: 600,
                    cursor: selectedDate && selectedTime ? 'pointer' : 'default',
                    marginTop: 16,
                  }}
                >
                  {selectedDate && selectedTime
                    ? `Continue — ${formattedDate} at ${selectedTime}`
                    : 'Select a date and time to continue'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Details form */}
          {step === 'details' && (
            <div style={{ maxWidth: 560, margin: '0 auto' }}>
              <div style={{ background: '#eff6ff', border: '0.5px solid #bfdbfe', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: '#1e40af' }}>
                📅 {formattedDate} at {selectedTime} IST ·{' '}
                <button onClick={() => setStep('datetime')} style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontSize: 14, textDecoration: 'underline', padding: 0 }}>
                  Change
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 28 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: '#64748b', margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Your details
                </p>

                {[
                  { label: 'Full name', name: 'name', type: 'text', placeholder: 'Rahul Sharma', required: true },
                  { label: 'Email address', name: 'email', type: 'email', placeholder: 'rahul@company.com', required: true },
                  { label: 'Phone number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210', required: true },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>
                      {field.label} {field.required && <span style={{ color: '#ef4444' }}>*</span>}
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

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>
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

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 500 }}>
                    Monthly marketing budget
                  </label>
                  <select name="budget" value={form.budget} onChange={handleChange} style={{ width: '100%' }}>
                    <option value="">Select a range</option>
                    {BUDGET_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {error && (
                  <div style={{ background: '#fef2f2', border: '0.5px solid #fca5a5', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#b91c1c' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%', padding: '13px', borderRadius: 8,
                    background: loading ? '#93c5fd' : '#1d4ed8',
                    color: '#fff', border: 'none', fontSize: 15,
                    fontWeight: 600, cursor: loading ? 'default' : 'pointer',
                  }}
                >
                  {loading ? 'Confirming your booking...' : 'Confirm booking →'}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ background: '#fff', border: '0.5px solid #e2e8f0', borderRadius: 12, padding: 40 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>
                  ✅
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
                  You're booked, {form.name.split(' ')[0]}!
                </h2>
                <p style={{ color: '#64748b', margin: '0 0 24px' }}>
                  {formattedDate} at {selectedTime} IST<br />
                  Check your email for the confirmation and Google Meet link.
                </p>

                {meetLink && (
                  <a
                    href={meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block', background: '#1d4ed8', color: '#fff',
                      padding: '12px 28px', borderRadius: 8, textDecoration: 'none',
                      fontWeight: 600, fontSize: 15, marginBottom: 16,
                    }}
                  >
                    Join Google Meet
                  </a>
                )}

                <p style={{ fontSize: 13, color: '#94a3b8', margin: '16px 0 0' }}>
                  A calendar invite has been sent to {form.email}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
