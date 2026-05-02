'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminWebinarsPage() {
  const [mode, setMode] = useState<'coming-soon' | 'active'>('coming-soon');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('3:00 PM IST');
  const [duration, setDuration] = useState('60 minutes');
  const [registrationLink, setRegistrationLink] = useState('');
  const [topics, setTopics] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    const payload = mode === 'coming-soon'
      ? { mode: 'coming-soon' }
      : { mode: 'active', title, description, date, time, duration, registrationLink, topics: topics.split('\n').filter(t => t.trim()) };

    const res = await fetch('/api/admin/save-webinar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setMessage(res.ok ? 'success' : 'error');
    setSaving(false);
  }

  const inp = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box' as const, background: 'white', color: '#111827' };
  const lbl = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' } as React.CSSProperties;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Webinar Manager</h1>
          </div>
          <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>

        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 0.75rem' }}>Webinar status</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setMode('coming-soon')}
              style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', border: mode === 'coming-soon' ? '2px solid #2563eb' : '1px solid #d1d5db', background: mode === 'coming-soon' ? '#eff6ff' : 'white', color: mode === 'coming-soon' ? '#1d4ed8' : '#6b7280', fontWeight: 500, fontSize: '0.9375rem', cursor: 'pointer' }}>
              Coming Soon
            </button>
            <button onClick={() => setMode('active')}
              style={{ flex: 1, padding: '0.65rem', borderRadius: '8px', border: mode === 'active' ? '2px solid #2563eb' : '1px solid #d1d5db', background: mode === 'active' ? '#eff6ff' : 'white', color: mode === 'active' ? '#1d4ed8' : '#6b7280', fontWeight: 500, fontSize: '0.9375rem', cursor: 'pointer' }}>
              Active Webinar
            </button>
          </div>
        </div>

        {mode === 'coming-soon' && (
          <div style={{ background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', padding: '1.25rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.9375rem', color: '#1d4ed8', margin: 0 }}>Your website will show a <strong>Coming Soon</strong> banner. All past webinars remain visible below.</p>
          </div>
        )}

        {mode === 'active' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.25rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Webinar details</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div><label style={lbl}>Title</label><input style={inp} type="text" placeholder="e.g. Google Ads Mastery 2026" value={title} onChange={e => setTitle(e.target.value)} /></div>
              <div><label style={lbl}>Description</label><textarea style={{ ...inp, resize: 'vertical' }} rows={3} placeholder="Short description of the webinar..." value={description} onChange={e => setDescription(e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div><label style={lbl}>Date</label><input style={inp} type="text" placeholder="June 15, 2026" value={date} onChange={e => setDate(e.target.value)} /></div>
                <div><label style={lbl}>Time</label><input style={inp} type="text" placeholder="3:00 PM IST" value={time} onChange={e => setTime(e.target.value)} /></div>
              </div>
              <div><label style={lbl}>Duration</label><input style={inp} type="text" placeholder="60 minutes" value={duration} onChange={e => setDuration(e.target.value)} /></div>
              <div><label style={lbl}>Zoom registration link</label><input style={inp} type="text" placeholder="https://zoom.us/webinar/register/..." value={registrationLink} onChange={e => setRegistrationLink(e.target.value)} /></div>
              <div><label style={lbl}>Topics (one per line)</label><textarea style={{ ...inp, resize: 'vertical' }} rows={5} placeholder={"Google Algorithm Updates 2026\nAI-Powered SEO Strategies\nTechnical SEO Essentials"} value={topics} onChange={e => setTopics(e.target.value)} /></div>
            </div>
          </div>
        )}

        <button onClick={handleSave} disabled={saving}
          style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginBottom: '0.75rem' }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {message === 'success' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d', fontSize: '0.9375rem' }}>
            ✅ Saved! Now run in Command Prompt:
            <pre style={{ background: '#dcfce7', borderRadius: '6px', padding: '8px', marginTop: '8px', fontSize: '0.8125rem', color: '#166534' }}>{'git add data/webinars.ts\ngit commit -m "update: webinar"\ngit push origin main'}</pre>
          </div>
        )}
        {message === 'error' && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626', fontSize: '0.9375rem' }}>❌ Something went wrong. Please try again.</div>
        )}
      </div>
    </div>
  );
}
