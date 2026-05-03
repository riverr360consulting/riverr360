'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const [siteTitle, setSiteTitle] = useState('Riverr360 | Revenue Leakage Consulting');
  const [siteDesc, setSiteDesc] = useState('Riverr360 helps businesses identify and fix revenue leakage through strategic consulting and data-driven solutions.');
  const [metaPixelId, setMetaPixelId] = useState('1529840028657513');
  const [gtmId, setGtmId] = useState('');
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
    const res = await fetch('/api/admin/save-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteTitle, siteDesc, metaPixelId, gtmId }),
    });
    setMessage(res.ok ? 'success' : 'error');
    setSaving(false);
  }

  const inp = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box' as const, background: 'white', color: '#111827' };
  const lbl = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' } as React.CSSProperties;
  const hint = { fontSize: '0.8125rem', color: '#9ca3af', marginTop: '3px' } as React.CSSProperties;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Site Settings</h1>
          </div>
          <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>

        {/* SEO */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>SEO & Meta</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={lbl}>Site title</label>
              <input style={inp} type="text" value={siteTitle} onChange={e => setSiteTitle(e.target.value)} />
              <p style={hint}>Shown in browser tab and Google search results</p>
            </div>
            <div>
              <label style={lbl}>Meta description</label>
              <textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={siteDesc} onChange={e => setSiteDesc(e.target.value)} />
              <p style={hint}>Shown in Google search results — keep under 160 characters ({siteDesc.length}/160)</p>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Analytics & Tracking</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={lbl}>Meta Pixel ID</label>
              <input style={inp} type="text" value={metaPixelId} onChange={e => setMetaPixelId(e.target.value)} />
              <p style={hint}>Current: 1529840028657513</p>
            </div>
            <div>
              <label style={lbl}>Google Tag Manager ID (optional)</label>
              <input style={inp} type="text" placeholder="GTM-XXXXXXX" value={gtmId} onChange={e => setGtmId(e.target.value)} />
              <p style={hint}>Format: GTM-XXXXXXX — Add when you have your GTM account ready</p>
            </div>
          </div>
        </div>

        {/* Zoho CRM notice */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e', margin: '0 0 0.5rem' }}>Zoho CRM Integration</p>
          <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
            When you have your official Zoho account ready, add these to Vercel Environment Variables:
          </p>
          <ul style={{ fontSize: '0.8125rem', color: '#92400e', margin: '0.5rem 0 0', paddingLeft: '1.25rem' }}>
            <li><code>ZOHO_API_TOKEN</code> — your Zoho API token</li>
            <li><code>ZOHO_ACCOUNT_OWNER</code> — your work email</li>
          </ul>
        </div>

        <button onClick={handleSave} disabled={saving}
          style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginBottom: '0.75rem' }}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>

        {message === 'success' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d' }}>
            ✅ Saved! Vercel will deploy in ~60 seconds.
          </div>
        )}
        {message === 'error' && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>❌ Something went wrong. Please try again.</div>
        )}
      </div>
    </div>
  );
}
