'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

const PRESETS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 28 days', days: 28 },
  { label: 'Last 3 months', days: 90 },
];

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

type TabId = 'settings' | 'gsc';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('settings');

  // --- Site settings state ---
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDesc, setSiteDesc] = useState('');
  const [metaPixelId, setMetaPixelId] = useState('');
  const [gtmId, setGtmId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // --- GSC dashboard state ---
  const [gscRows, setGscRows] = useState<GscRow[]>([]);
  const [gscLoading, setGscLoading] = useState(false);
  const [gscError, setGscError] = useState('');
  const [gscLoaded, setGscLoaded] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activePreset, setActivePreset] = useState<number | null>(28);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/seo');
        if (res.ok) {
          const data = await res.json();
          setSiteTitle(data.siteTitle);
          setSiteDesc(data.siteDesc);
          setMetaPixelId(data.metaPixelId);
          setGtmId(data.gtmId);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteTitle, siteDesc, metaPixelId, gtmId }),
      });
      if (res.ok) {
        setMessage('success');
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('Save failed:', errData);
        setMessage('error');
      }
    } catch (err) {
      console.error('Save request failed:', err);
      setMessage('error');
    } finally {
      setSaving(false);
    }
  }

  // --- GSC dashboard logic ---
  const fetchGscData = useCallback(async (start: string, end: string) => {
    setGscLoading(true);
    setGscError('');
    try {
      const res = await fetch(`/api/gsc?startDate=${start}&endDate=${end}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load');
      setGscRows(data.rows || []);
    } catch (err: any) {
      setGscError(err.message);
    } finally {
      setGscLoading(false);
      setGscLoaded(true);
    }
  }, []);

  const applyPreset = (days: number) => {
    setActivePreset(days);
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    const s = formatDate(start);
    const e = formatDate(end);
    setStartDate(s);
    setEndDate(e);
    fetchGscData(s, e);
  };

  const handleCustomFetch = () => {
    if (startDate && endDate) {
      setActivePreset(null);
      fetchGscData(startDate, endDate);
    }
  };

  // Lazy-load GSC data only when that tab is first opened
  useEffect(() => {
    if (activeTab === 'gsc' && !gscLoaded) {
      applyPreset(28);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const chartData = gscRows.slice(0, 10).map((r) => ({
    query: r.keys[0].length > 18 ? r.keys[0].slice(0, 18) + '…' : r.keys[0],
    impressions: r.impressions,
    clicks: r.clicks,
  }));

  const totals = gscRows.reduce(
    (acc, r) => ({
      clicks: acc.clicks + r.clicks,
      impressions: acc.impressions + r.impressions,
    }),
    { clicks: 0, impressions: 0 }
  );
  const avgCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const avgPosition =
    gscRows.length > 0 ? gscRows.reduce((a, r) => a + r.position, 0) / gscRows.length : 0;

  const inp = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box' as const, background: 'white', color: '#111827' };
  const lbl = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' } as React.CSSProperties;
  const hint = { fontSize: '0.8125rem', color: '#9ca3af', marginTop: '3px' } as React.CSSProperties;

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '0.9375rem' }}>Loading settings...</p>
      </div>
    );
  }

  const tabBtn = (id: TabId, label: string) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        padding: '0.6rem 1.1rem',
        border: 'none',
        borderBottom: activeTab === id ? '2px solid #2563eb' : '2px solid transparent',
        background: 'none',
        color: activeTab === id ? '#2563eb' : '#6b7280',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>SEO & Analytics</h1>
          </div>
          <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', borderBottom: '1px solid #e5e7eb', marginBottom: '1.25rem' }}>
          {tabBtn('settings', 'SEO & Analytics')}
          {tabBtn('gsc', 'Search Console')}
        </div>

        {/* --- Tab: Site Settings --- */}
        {activeTab === 'settings' && (
          <>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>SEO & Meta</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Site title</label>
                  <input style={inp} type="text" value={siteTitle} onChange={e => setSiteTitle(e.target.value)} maxLength={70} />
                  <p style={hint}>Shown in browser tab and Google search results ({siteTitle.length}/70)</p>
                </div>
                <div>
                  <label style={lbl}>Meta description</label>
                  <textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={siteDesc} onChange={e => setSiteDesc(e.target.value)} maxLength={160} />
                  <p style={hint}>Shown in Google search results — keep under 160 characters ({siteDesc.length}/160)</p>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Analytics & Tracking</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Meta Pixel ID</label>
                  <input style={inp} type="text" value={metaPixelId} onChange={e => setMetaPixelId(e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Google Tag Manager ID (optional)</label>
                  <input style={inp} type="text" placeholder="GTM-XXXXXXX" value={gtmId} onChange={e => setGtmId(e.target.value)} />
                  <p style={hint}>Format: GTM-XXXXXXX</p>
                </div>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving}
              style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginBottom: '0.75rem' }}>
              {saving ? 'Saving...' : 'Save Settings'}
            </button>

            {message === 'success' && (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d' }}>
                ✅ Saved to GitHub! Vercel will redeploy automatically in ~60 seconds.
              </div>
            )}
            {message === 'error' && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>
                ❌ Something went wrong. Check the browser console or Vercel logs for details.
              </div>
            )}
          </>
        )}

        {/* --- Tab: Search Console --- */}
        {activeTab === 'gsc' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', margin: '0 0 1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => applyPreset(p.days)}
                  style={{
                    fontSize: '0.8125rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: activePreset === p.days ? '1px solid #2563eb' : '1px solid #d1d5db',
                    background: activePreset === p.days ? '#eff6ff' : '#f9fafb',
                    color: activePreset === p.days ? '#2563eb' : '#374151',
                    cursor: 'pointer',
                    fontWeight: activePreset === p.days ? 600 : 400,
                  }}
                >
                  {p.label}
                </button>
              ))}
              <span style={{ color: '#d1d5db', margin: '0 0.25rem' }}>|</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ fontSize: '0.8125rem', padding: '0.35rem 0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
              <span style={{ color: '#9ca3af', fontSize: '0.8125rem' }}>to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ fontSize: '0.8125rem', padding: '0.35rem 0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              />
              <button
                onClick={handleCustomFetch}
                style={{ fontSize: '0.8125rem', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #2563eb', background: '#2563eb', color: 'white', cursor: 'pointer' }}
              >
                Apply
              </button>
            </div>

            {gscLoading && <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Loading…</p>}
            {gscError && <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{gscError}</p>}

            {!gscLoading && !gscError && gscRows.length > 0 && (
              <>
                {/* Summary stat cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'Clicks', value: totals.clicks },
                    { label: 'Impressions', value: totals.impressions },
                    { label: 'Avg CTR', value: `${avgCtr.toFixed(2)}%` },
                    { label: 'Avg Position', value: avgPosition.toFixed(1) },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: '#f9fafb', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', border: '1px solid #f3f4f6' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>{stat.value}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="query" angle={-20} textAnchor="end" interval={0} height={70} tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="impressions" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>

                <div style={{ overflowX: 'auto', marginTop: '1.25rem', maxHeight: '320px', overflowY: 'auto', border: '1px solid #f3f4f6', borderRadius: '8px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                    <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                      <tr>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '0.5rem' }}>Query</th>
                        <th style={{ borderBottom: '1px solid #e5e7eb', padding: '0.5rem' }}>Clicks</th>
                        <th style={{ borderBottom: '1px solid #e5e7eb', padding: '0.5rem' }}>Impressions</th>
                        <th style={{ borderBottom: '1px solid #e5e7eb', padding: '0.5rem' }}>CTR</th>
                        <th style={{ borderBottom: '1px solid #e5e7eb', padding: '0.5rem' }}>Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gscRows.map((row, i) => (
                        <tr key={i}>
                          <td style={{ padding: '0.5rem' }}>{row.keys[0]}</td>
                          <td style={{ textAlign: 'center', padding: '0.5rem' }}>{row.clicks}</td>
                          <td style={{ textAlign: 'center', padding: '0.5rem' }}>{row.impressions}</td>
                          <td style={{ textAlign: 'center', padding: '0.5rem' }}>{(row.ctr * 100).toFixed(2)}%</td>
                          <td style={{ textAlign: 'center', padding: '0.5rem' }}>{row.position.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {!gscLoading && !gscError && gscRows.length === 0 && gscLoaded && (
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>No data for this range.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
