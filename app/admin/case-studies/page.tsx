'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Metric { label: string; before: string; after: string; }
interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  result: string;
  excerpt: string;
  image: string;
  content: string;
  metrics: Metric[];
}

const defaultStudies: CaseStudy[] = [
  { id: '1', slug: 'ecommerce-conversion-optimization', title: 'E-commerce Brand Increases Conversion Rate by 240%', industry: 'E-commerce', challenge: 'Low website conversion and cart abandonment', result: '240% increase in conversion rate', excerpt: 'An online retailer was getting traffic but struggling with a 0.8% conversion rate and 78% cart abandonment.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', content: '## The Challenge\n\nDescribe the client\'s problem here.\n\n## Our Approach\n\nExplain what you did.\n\n## The Results\n\nShare the outcomes.\n\n## Key Takeaways\n\nWhat can others learn from this?', metrics: [{ label: 'Conversion Rate', before: '0.8%', after: '2.7%' }, { label: 'Cart Abandonment', before: '78%', after: '42%' }, { label: 'Revenue', before: '₹45K/mo', after: '₹153K/mo' }] },
  { id: '2', slug: 'saas-ppc-roi-improvement', title: 'SaaS Company Cuts PPC Costs by 60% While Doubling Leads', industry: 'SaaS', challenge: 'Wasted ad spend with poor targeting', result: '60% cost reduction, 2X leads', excerpt: 'A B2B SaaS company was spending ₹15K/month on Google Ads with minimal qualified leads.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', content: '## The Challenge\n\nDescribe the client\'s problem here.\n\n## Our Approach\n\nExplain what you did.\n\n## The Results\n\nShare the outcomes.', metrics: [{ label: 'Cost per Lead', before: '₹450', after: '₹180' }, { label: 'Monthly Leads', before: '33', after: '83' }, { label: 'Ad Spend', before: '₹15K', after: '₹6K' }] },
  { id: '3', slug: 'local-business-seo-domination', title: 'Local Service Business Achieves #1 Rankings in 90 Days', industry: 'Professional Services', challenge: 'Zero organic visibility and traffic', result: '#1 rankings for 12 keywords', excerpt: 'A local law firm had no SEO presence and was paying ₹8K/month for every client through ads.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', content: '## The Challenge\n\nDescribe the client\'s problem here.\n\n## Our Approach\n\nExplain what you did.\n\n## The Results\n\nShare the outcomes.', metrics: [{ label: 'Organic Traffic', before: '120/mo', after: '2,400/mo' }, { label: 'Top 3 Rankings', before: '0', after: '12' }, { label: 'Organic Leads', before: '2/mo', after: '38/mo' }] },
];

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>(defaultStudies);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function emptyStudy(): CaseStudy {
    return { id: Date.now().toString(), slug: '', title: '', industry: '', challenge: '', result: '', excerpt: '', image: '', content: '## The Challenge\n\nDescribe the client\'s problem here.\n\n## Our Approach\n\nExplain what you did.\n\n## The Results\n\nShare the outcomes.\n\n## Key Takeaways\n\nWhat can others learn from this?\n\n**[Contact us for a free audit](/contact)**', metrics: [{ label: '', before: '', after: '' }, { label: '', before: '', after: '' }, { label: '', before: '', after: '' }] };
  }

  function updateMetric(idx: number, field: keyof Metric, val: string) {
    if (!editing) return;
    const metrics = [...editing.metrics];
    metrics[idx] = { ...metrics[idx], [field]: val };
    setEditing({ ...editing, metrics });
  }

  function saveEdit() {
    if (!editing) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const updated = { ...editing, slug };
    if (isNew) setStudies([...studies, updated]);
    else setStudies(studies.map(s => s.id === editing.id ? updated : s));
    setEditing(null);
    setMessage('saved-local');
  }

  async function saveToWebsite() {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/save-case-studies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studies }),
    });
    setMessage(res.ok ? 'success' : 'error');
    setSaving(false);
  }

  const inp = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box' as const, background: 'white', color: '#111827' };
  const lbl = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' } as React.CSSProperties;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Case Studies</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => { setEditing(emptyStudy()); setIsNew(true); setMessage(''); }} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>+ New Case Study</button>
            <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>

        {editing && (
          <div style={{ background: 'white', borderRadius: '12px', border: '2px solid #2563eb', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1d4ed8', margin: '0 0 1rem' }}>{isNew ? '+ New Case Study' : 'Edit Case Study'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div><label style={lbl}>Title</label><input style={inp} type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div><label style={lbl}>Industry</label><input style={inp} type="text" placeholder="E-commerce, SaaS..." value={editing.industry} onChange={e => setEditing({ ...editing, industry: e.target.value })} /></div>
                <div><label style={lbl}>Result (short)</label><input style={inp} type="text" placeholder="240% conversion increase" value={editing.result} onChange={e => setEditing({ ...editing, result: e.target.value })} /></div>
              </div>
              <div><label style={lbl}>Challenge</label><input style={inp} type="text" placeholder="What was the client's main problem?" value={editing.challenge} onChange={e => setEditing({ ...editing, challenge: e.target.value })} /></div>
              <div><label style={lbl}>Excerpt (shown on listing page)</label><textarea style={{ ...inp, resize: 'vertical' }} rows={2} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
              <div><label style={lbl}>Cover Image URL</label><input style={inp} type="text" placeholder="https://images.unsplash.com/..." value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} /></div>

              <div>
                <label style={lbl}>Key Metrics (Before and After)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af', paddingLeft: '4px' }}>Metric</span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Before</span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>After</span>
                </div>
                {editing.metrics.map((m, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '6px', marginBottom: '6px' }}>
                    <input style={inp} type="text" placeholder="e.g. Conversion Rate" value={m.label} onChange={e => updateMetric(i, 'label', e.target.value)} />
                    <input style={inp} type="text" placeholder="0.8%" value={m.before} onChange={e => updateMetric(i, 'before', e.target.value)} />
                    <input style={inp} type="text" placeholder="2.7%" value={m.after} onChange={e => updateMetric(i, 'after', e.target.value)} />
                  </div>
                ))}
              </div>

              <div>
                <label style={lbl}>Full Case Study Content (Markdown)</label>
                <textarea
                  style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: 1.6, minHeight: '300px' }}
                  value={editing.content}
                  onChange={e => setEditing({ ...editing, content: e.target.value })}
                />
                <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '4px' }}>Use ## for headings, **bold**, *italic*, - for bullet points</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1.25rem' }}>
              <button onClick={saveEdit} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>{isNew ? 'Add Case Study' : 'Update'}</button>
              <button onClick={() => setEditing(null)} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'white', color: '#374151', fontWeight: 500, border: '1px solid #d1d5db', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
          {studies.map(s => (
            <div key={s.id} style={{ background: 'white', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>{s.industry}</span>
                <p style={{ fontWeight: 600, color: '#111827', margin: '2px 0 0', fontSize: '0.9375rem' }}>{s.title}</p>
                <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '2px 0 0' }}>{s.result}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => { setEditing({ ...s }); setIsNew(false); }} style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => setStudies(studies.filter(x => x.id !== s.id))} style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={saveToWebsite} disabled={saving} style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', background: '#059669', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginBottom: '0.75rem' }}>
          {saving ? 'Saving...' : '💾 Save All to Website'}
        </button>

        {message === 'saved-local' && <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', color: '#1d4ed8' }}>Updated in editor. Click Save All to Website when done.</div>}
        {message === 'success' && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d' }}>✅ Saved to GitHub! Vercel will deploy in ~60 seconds.</div>}
        {message === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>❌ Something went wrong. Please try again.</div>}
      </div>
    </div>
  );
}
