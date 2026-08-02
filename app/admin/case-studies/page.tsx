'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SCHEMA_TYPES = ['Article', 'CaseStudy', 'None'];

interface Metric { label: string; before: string; after: string; change: string; }
interface ApproachStep { title: string; description: string; }
interface CaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  industry: string;
  client: string;
  timeline: string;
  challenge: string;
  result: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  schemaType: string;
  internalLinks: string;
  metrics: Metric[];
  situation: string;
  approach: ApproachStep[];
  results: string;
  testimonial: string;
  testimonialAuthor: string;
}

function emptyStudy(): CaseStudy {
  return {
    slug: '', title: '', metaTitle: '', metaDescription: '',
    industry: '', client: '', timeline: '3 months',
    challenge: '', result: '', excerpt: '',
    image: '', imageAlt: '', schemaType: 'Article', internalLinks: '',
    metrics: [
      { label: '', before: '', after: '', change: '' },
      { label: '', before: '', after: '', change: '' },
      { label: '', before: '', after: '', change: '' },
      { label: '', before: '', after: '', change: '' },
    ],
    situation: '',
    approach: [
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    results: '',
    testimonial: '',
    testimonialAuthor: '',
  };
}

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'metrics' | 'seo' | 'schema' | 'links'>('content');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/get-case-studies')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStudies(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function startEdit(study: CaseStudy) {
    setEditing({ ...study });
    setIsNew(false);
    setActiveTab('content');
    setMessage('');
  }

  function startNew() {
    setEditing(emptyStudy());
    setIsNew(true);
    setActiveTab('content');
    setMessage('');
  }

  function updateMetric(idx: number, field: keyof Metric, val: string) {
    if (!editing) return;
    const metrics = [...editing.metrics];
    metrics[idx] = { ...metrics[idx], [field]: val };
    setEditing({ ...editing, metrics });
  }

  function updateApproach(idx: number, field: keyof ApproachStep, val: string) {
    if (!editing) return;
    const approach = [...editing.approach];
    approach[idx] = { ...approach[idx], [field]: val };
    setEditing({ ...editing, approach });
  }

  function addApproachStep() {
    if (!editing) return;
    setEditing({ ...editing, approach: [...editing.approach, { title: '', description: '' }] });
  }

  function removeApproachStep(idx: number) {
    if (!editing) return;
    setEditing({ ...editing, approach: editing.approach.filter((_, i) => i !== idx) });
  }

  function saveLocal() {
    if (!editing) return;
    const slug = editing.slug || editing.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updated = { ...editing, slug };
    if (isNew) setStudies([...studies, updated]);
    else setStudies(studies.map(s => s.slug === editing.slug ? updated : s));
    setEditing(null);
    setMessage('saved-local');
  }

  async function saveToGitHub() {
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

  const inp: React.CSSProperties = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box', background: 'white', color: '#111827' };
  const lbl: React.CSSProperties = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' };
  const hint: React.CSSProperties = { fontSize: '0.8125rem', color: '#9ca3af', marginTop: '3px' };
  const tabBtn = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: active ? 600 : 400,
    background: active ? '#2563eb' : 'white', color: active ? 'white' : '#6b7280',
    border: active ? 'none' : '1px solid #e5e7eb', cursor: 'pointer',
  });

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  if (!editing) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
              <span style={{ color: '#d1d5db' }}>|</span>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Case Studies</h1>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={startNew} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>+ New Case Study</button>
              <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Loading case studies...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
              {studies.map(s => (
                <div key={s.slug} style={{ background: 'white', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 600 }}>{s.industry}</span>
                    <p style={{ fontWeight: 600, color: '#111827', margin: '2px 0 0', fontSize: '0.9375rem' }}>{s.title}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '2px 0 0' }}>{s.result}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <a href={`/case-studies/${s.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#f3f4f6', color: '#374151', textDecoration: 'none' }}>
                      View →
                    </a>
                    <button onClick={() => startEdit(s)} style={{ fontSize: '0.8125rem', padding: '0.35rem 0.875rem', borderRadius: '6px', border: '1px solid #bfdbfe', background: '#eff6ff', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                    <button onClick={() => { if (confirm('Delete this case study?')) setStudies(studies.filter(x => x.slug !== s.slug)); }}
                      style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={saveToGitHub} disabled={saving || loading}
            style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', background: '#059669', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginBottom: '0.75rem' }}>
            {saving ? 'Saving...' : '💾 Save All to GitHub'}
          </button>

          {message === 'saved-local' && <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', color: '#1d4ed8' }}>✏️ Updated locally. Click Save All to GitHub when done with all edits.</div>}
          {message === 'success' && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d' }}>✅ Saved to GitHub! Vercel will redeploy in ~60 seconds.</div>}
          {message === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>❌ Something went wrong. Check GitHub token and repo settings.</div>}
        </div>
      </div>
    );
  }

  // ── EDIT VIEW ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => setEditing(null)} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>← Case Studies</button>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>
              {isNew ? 'New Case Study' : `Editing: ${editing.slug}`}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!isNew && (
              <a href={`/case-studies/${editing.slug}`} target="_blank" rel="noopener noreferrer"
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'white', color: '#374151', fontSize: '0.875rem', border: '1px solid #d1d5db', textDecoration: 'none' }}>
                View Live →
              </a>
            )}
            <button onClick={saveLocal}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>
              {isNew ? '+ Add' : '✓ Update'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {(['content', 'metrics', 'seo', 'schema', 'links'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabBtn(activeTab === tab)}>
              {tab === 'content' && '📝 Content'}
              {tab === 'metrics' && '📊 Metrics'}
              {tab === 'seo' && '🔍 SEO'}
              {tab === 'schema' && '🏗 Schema'}
              {tab === 'links' && '🔗 Links & Slug'}
            </button>
          ))}
        </div>

        {/* ── CONTENT TAB ── */}
        {activeTab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Basic Info</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div><label style={lbl}>Title *</label><input style={inp} type="text" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div><label style={lbl}>Industry</label><input style={inp} type="text" placeholder="E-commerce, SaaS..." value={editing.industry} onChange={e => setEditing({ ...editing, industry: e.target.value })} /></div>
                  <div><label style={lbl}>Client</label><input style={inp} type="text" placeholder="Fashion E-commerce Brand" value={editing.client} onChange={e => setEditing({ ...editing, client: e.target.value })} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div><label style={lbl}>Timeline</label><input style={inp} type="text" placeholder="3 months" value={editing.timeline} onChange={e => setEditing({ ...editing, timeline: e.target.value })} /></div>
                  <div><label style={lbl}>Result (short)</label><input style={inp} type="text" placeholder="240% conversion increase" value={editing.result} onChange={e => setEditing({ ...editing, result: e.target.value })} /></div>
                </div>
                <div><label style={lbl}>Challenge</label><input style={inp} type="text" placeholder="What was the client's main problem?" value={editing.challenge} onChange={e => setEditing({ ...editing, challenge: e.target.value })} /></div>
                <div><label style={lbl}>Excerpt (shown on listing page)</label><textarea style={{ ...inp, resize: 'vertical' }} rows={2} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
                <div>
                  <label style={lbl}>Cover Image URL</label>
                  <input style={inp} type="text" placeholder="https://images.unsplash.com/..." value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} />
                  <p style={hint}>Get free images from unsplash.com → right-click → Copy image address</p>
                </div>
                <div>
                  <label style={lbl}>Cover Image Alt Text</label>
                  <input style={inp} type="text" placeholder="Analytics dashboard showing conversion improvement" value={editing.imageAlt} onChange={e => setEditing({ ...editing, imageAlt: e.target.value })} />
                  <p style={hint}>Describe the image — improves SEO and accessibility</p>
                </div>
                {editing.image && <img src={editing.image} alt={editing.imageAlt || 'Preview'} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>The Situation</p>
              <textarea style={{ ...inp, resize: 'vertical', minHeight: '100px' }} value={editing.situation} onChange={e => setEditing({ ...editing, situation: e.target.value })} placeholder="Describe the client's situation before working with Riverr360..." />
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>Our Approach</p>
                <button onClick={addApproachStep} style={{ fontSize: '0.8125rem', padding: '0.3rem 0.75rem', borderRadius: '6px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', cursor: 'pointer' }}>+ Add Step</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {editing.approach.map((step, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '8px', alignItems: 'start' }}>
                    <input style={inp} type="text" placeholder={`Step ${i + 1} title`} value={step.title} onChange={e => updateApproach(i, 'title', e.target.value)} />
                    <input style={inp} type="text" placeholder="What you did and why..." value={step.description} onChange={e => updateApproach(i, 'description', e.target.value)} />
                    <button onClick={() => removeApproachStep(i)} style={{ padding: '0.65rem 0.75rem', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', cursor: 'pointer', fontSize: '0.875rem' }}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 0.75rem' }}>The Results</p>
              <textarea style={{ ...inp, resize: 'vertical', minHeight: '80px' }} value={editing.results} onChange={e => setEditing({ ...editing, results: e.target.value })} placeholder="Describe the measurable outcomes..." />
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 0.75rem' }}>Testimonial</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <textarea style={{ ...inp, resize: 'vertical' }} rows={3} value={editing.testimonial} onChange={e => setEditing({ ...editing, testimonial: e.target.value })} placeholder="Client quote..." />
                <input style={inp} type="text" placeholder="Marketing Director" value={editing.testimonialAuthor} onChange={e => setEditing({ ...editing, testimonialAuthor: e.target.value })} />
              </div>
            </div>
          </div>
        )}

        {/* ── METRICS TAB ── */}
        {activeTab === 'metrics' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Key Metrics (Before & After)</p>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4px', marginBottom: '6px' }}>
              {['Metric', 'Before', 'After', 'Change'].map(h => (
                <span key={h} style={{ fontSize: '0.75rem', color: '#9ca3af', paddingLeft: '4px' }}>{h}</span>
              ))}
            </div>
            {editing.metrics.map((m, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '6px', marginBottom: '6px' }}>
                <input style={inp} type="text" placeholder="Conversion Rate" value={m.label} onChange={e => updateMetric(i, 'label', e.target.value)} />
                <input style={inp} type="text" placeholder="0.8%" value={m.before} onChange={e => updateMetric(i, 'before', e.target.value)} />
                <input style={inp} type="text" placeholder="2.7%" value={m.after} onChange={e => updateMetric(i, 'after', e.target.value)} />
                <input style={inp} type="text" placeholder="+240%" value={m.change} onChange={e => updateMetric(i, 'change', e.target.value)} />
              </div>
            ))}
            <button onClick={() => setEditing({ ...editing, metrics: [...editing.metrics, { label: '', before: '', after: '', change: '' }] })}
              style={{ marginTop: '0.5rem', fontSize: '0.8125rem', padding: '0.4rem 0.875rem', borderRadius: '6px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', cursor: 'pointer' }}>
              + Add Metric
            </button>
          </div>
        )}

        {/* ── SEO TAB ── */}
        {activeTab === 'seo' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>SEO Settings</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={lbl}>Meta Title</label>
                <input style={inp} type="text" placeholder="Leave empty to use case study title" value={editing.metaTitle} onChange={e => setEditing({ ...editing, metaTitle: e.target.value })} maxLength={70} />
                <p style={hint}>{(editing.metaTitle || editing.title).length}/70 characters</p>
                <div style={{ marginTop: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0 0 4px' }}>Google preview:</p>
                  <p style={{ fontSize: '1rem', color: '#1a0dab', margin: '0 0 2px', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {editing.metaTitle || editing.title || 'Your case study title'} | Riverr360
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#006621', margin: '0 0 2px', fontFamily: 'Arial, sans-serif' }}>
                    https://riverr360.com/case-studies/{editing.slug || 'your-slug'}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#545454', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                    {editing.metaDescription || editing.excerpt || 'Your meta description will appear here...'}
                  </p>
                </div>
              </div>
              <div>
                <label style={lbl}>Meta Description</label>
                <textarea style={{ ...inp, resize: 'vertical' }} rows={3} placeholder="Leave empty to use excerpt" value={editing.metaDescription} onChange={e => setEditing({ ...editing, metaDescription: e.target.value })} maxLength={160} />
                <p style={hint}>{(editing.metaDescription || editing.excerpt).length}/160 characters</p>
              </div>
            </div>
          </div>
        )}

        {/* ── SCHEMA TAB ── */}
        {activeTab === 'schema' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 0.5rem' }}>Schema Markup</p>
            <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0 0 1.25rem' }}>Tells Google what type of content this is.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SCHEMA_TYPES.map(type => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.875rem 1rem', border: `2px solid ${editing.schemaType === type ? '#2563eb' : '#e5e7eb'}`, borderRadius: '10px', cursor: 'pointer', background: editing.schemaType === type ? '#eff6ff' : 'white' }}>
                  <input type="radio" name="schema" value={type} checked={editing.schemaType === type} onChange={() => setEditing({ ...editing, schemaType: type })} style={{ width: '16px', height: '16px', flexShrink: 0, accentColor: '#2563eb' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{type}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '2px' }}>
                      {type === 'Article' && 'General article — recommended for case studies ✓'}
                      {type === 'CaseStudy' && 'Specific case study type — emerging standard'}
                      {type === 'None' && 'No schema — not recommended'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── LINKS & SLUG TAB ── */}
        {activeTab === 'links' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Slug & Internal Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={lbl}>URL Slug</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>riverr360.com/case-studies/</span>
                  <input style={{ ...inp, flex: 1 }} type="text" placeholder="ecommerce-conversion-optimization" value={editing.slug} onChange={e => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} />
                </div>
                <div style={{ marginTop: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8125rem', color: '#2563eb' }}>
                  🔗 {`https://riverr360.com/case-studies/${editing.slug || 'your-slug'}`}
                </div>
              </div>
              <div>
                <label style={lbl}>Internal Links (for reference)</label>
                <textarea style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem' }} rows={4}
                  placeholder={`/framework\n/contact\n/case-studies\n/book`}
                  value={editing.internalLinks}
                  onChange={e => setEditing({ ...editing, internalLinks: e.target.value })} />
                <p style={hint}>Keep notes on internal links used in this case study</p>
              </div>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#15803d', margin: '0 0 0.5rem' }}>📌 Suggested internal links</p>
                {[
                  { path: '/framework', use: 'Link when mentioning the R360 framework' },
                  { path: '/contact', use: 'CTA — free audit' },
                  { path: '/case-studies', use: 'Back to all case studies' },
                  { path: '/book', use: 'Book a strategy call CTA' },
                  { path: '/score', use: 'Revenue leakage score tool' },
                ].map(l => (
                  <div key={l.path} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <code style={{ fontSize: '0.8125rem', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', color: '#15803d', whiteSpace: 'nowrap' }}>{l.path}</code>
                    <span style={{ fontSize: '0.8125rem', color: '#374151' }}>{l.use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1rem', display: 'flex', gap: '8px' }}>
          <button onClick={saveLocal} style={{ flex: 1, padding: '0.875rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            {isNew ? '+ Add Case Study' : '✓ Update Case Study'}
          </button>
          <button onClick={() => setEditing(null)} style={{ padding: '0.875rem 1.25rem', borderRadius: '8px', background: 'white', color: '#374151', border: '1px solid #d1d5db', cursor: 'pointer' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
