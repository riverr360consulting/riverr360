'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = ['Google Ads', 'SEO', 'PPC', 'Content Marketing', 'Email Marketing', 'Social Media', 'Analytics', 'Conversion', 'General'];

const SCHEMA_TYPES = ['None', 'Article', 'BlogPosting', 'HowTo', 'FAQPage'];

interface BlogPost {
  filename: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  coverImage: string;
  coverImageAlt: string;
  featured: boolean;
  tags: string;
  slug: string;
  schemaType: string;
  internalLinks: string;
  content: string;
}

function emptyPost(): BlogPost {
  return {
    filename: '',
    title: '',
    metaTitle: '',
    metaDescription: '',
    excerpt: '',
    category: 'General',
    author: 'Team Riverr360',
    publishedDate: new Date().toISOString().split('T')[0],
    coverImage: '',
    coverImageAlt: '',
    featured: false,
    tags: '',
    slug: '',
    schemaType: 'BlogPosting',
    internalLinks: '',
    content: '## Introduction\n\nWrite your blog post here...\n\n## Main Section\n\nYour content here.\n\n## Conclusion\n\nWrap up your post here.\n\n**[Contact us for help](/contact)**',
  };
}

// Parse frontmatter from a markdown string
function parseFrontmatter(raw: string): BlogPost {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { ...emptyPost(), content: raw };

  const fm = match[1];
  const content = match[2].trim();

  function get(key: string) {
    const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?`, 'm'));
    return m ? m[1].trim() : '';
  }
  function getBool(key: string) {
    const m = fm.match(new RegExp(`^${key}:\\s*(true|false)`, 'm'));
    return m ? m[1] === 'true' : false;
  }
  function getArray(key: string) {
    const m = fm.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, 'm'));
    if (!m) return '';
    return m[1].replace(/"/g, '').split(',').map((t: string) => t.trim()).filter(Boolean).join(', ');
  }

  return {
    filename: '',
    title: get('title'),
    metaTitle: get('metaTitle'),
    metaDescription: get('metaDescription'),
    excerpt: get('excerpt'),
    category: get('category') || 'General',
    author: get('author') || 'Team Riverr360',
    publishedDate: get('publishedDate'),
    updatedDate: get('updatedDate') || undefined,
    coverImage: get('coverImage'),
    coverImageAlt: get('coverImageAlt'),
    featured: getBool('featured'),
    tags: getArray('tags'),
    slug: get('slug'),
    schemaType: get('schemaType') || 'BlogPosting',
    internalLinks: get('internalLinks'),
    content,
  };
}

function buildFrontmatter(post: BlogPost): string {
  const tagsArray = post.tags.split(',').map(t => t.trim()).filter(Boolean);
  const metaTitle = post.metaTitle || post.title;
  const metaDesc = post.metaDescription || post.excerpt;
  const slug = post.slug || post.filename || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return `---
title: "${post.title}"
metaTitle: "${metaTitle}"
metaDescription: "${metaDesc}"
excerpt: "${post.excerpt}"
category: "${post.category}"
author: "${post.author}"
publishedDate: "${post.publishedDate}"
updatedDate: "${post.updatedDate || ''}"
coverImage: "${post.coverImage}"
coverImageAlt: "${post.coverImageAlt || post.title}"
featured: ${post.featured}
tags: [${tagsArray.map(t => `"${t}"`).join(', ')}]
slug: "${slug}"
schemaType: "${post.schemaType}"
internalLinks: "${post.internalLinks}"
---

${post.content}`;
}

const KNOWN_POSTS = [
  'cut-ppc-costs-in-half',
  'email-marketing-that-converts',
  'google-ads-landing-page-problem',
  'seo-basics-every-business-owner-should-know',
];

interface ExternalLinkSuggestion {
  anchorText: string;
  url: string;
  reason: string;
}

interface Draft {
  title: string;
  metaDescription: string;
  slug: string;
  body: string;
  suggestedInternalLinks: string[];
  suggestedExternalLinks: ExternalLinkSuggestion[];
}

export default function AdminBlogPage() {
  const [view, setView] = useState<'list' | 'edit' | 'opportunities'>('list');
  const [post, setPost] = useState<BlogPost>(emptyPost());
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'schema' | 'links'>('content');
  const [isEditingExisting, setIsEditingExisting] = useState(false);   // ← ADD HERE
  const router = useRouter();

  // --- Content Opportunities state (manual query entry — auto-detection
  // from GSC trends needs persistent storage, not set up yet) ---
  const [targetQuery, setTargetQuery] = useState('');
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);
  const [genError, setGenError] = useState('');
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftSource, setDraftSource] = useState<string | null>(null);
  const [selectedInternal, setSelectedInternal] = useState<Set<string>>(new Set());
  const [selectedExternal, setSelectedExternal] = useState<Set<number>>(new Set());

  function openOpportunities() {
    setView('opportunities');
    setDraft(null);
    setGenError('');
    setTargetQuery('');
  }

  async function handleGenerateDraft() {
    const q = targetQuery.trim();
    if (!q) return;
    setGeneratingFor(q);
    setGenError('');
    setDraft(null);
    try {
      const res = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, position: null, impressions: null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate draft');
      setDraft(data.draft);
      setDraftSource(q);
      setSelectedInternal(new Set(data.draft.suggestedInternalLinks || []));
      setSelectedExternal(
        new Set((data.draft.suggestedExternalLinks || []).map((_: any, i: number) => i))
      );
    } catch (err: any) {
      setGenError(err.message);
    } finally {
      setGeneratingFor(null);
    }
  }

  function toggleInternal(slug: string) {
    setSelectedInternal((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  function toggleExternal(i: number) {
    setSelectedExternal((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  // --- Strengthen with AI (for existing posts being edited) ---
  const [showStrengthen, setShowStrengthen] = useState(false);
  const [strengthenKeywords, setStrengthenKeywords] = useState('');
  const [strengthening, setStrengthening] = useState(false);
  const [strengthenError, setStrengthenError] = useState('');
  const [strengthenResult, setStrengthenResult] = useState<{ improvedContent: string; summary: string } | null>(null);

  async function handleStrengthen() {
    const kws = strengthenKeywords
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean)
      .map((line) => {
        // supports pasting either "keyword" or "keyword, position, impressions"
        const parts = line.split(',').map((p) => p.trim());
        return {
          query: parts[0],
          position: parts[1] ? parseFloat(parts[1]) : undefined,
          impressions: parts[2] ? parseInt(parts[2]) : undefined,
        };
      });

    if (!kws.length) return;
    setStrengthening(true);
    setStrengthenError('');
    setStrengthenResult(null);
    try {
      const res = await fetch('/api/blog/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: post.title, content: post.content, keywords: kws }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to improve content');
      setStrengthenResult(data);
    } catch (err: any) {
      setStrengthenError(err.message);
    } finally {
      setStrengthening(false);
    }
  }

  function applyStrengthenedContent() {
    if (!strengthenResult) return;
    setPost({ ...post, content: strengthenResult.improvedContent });
    setShowStrengthen(false);
    setStrengthenResult(null);
    setStrengthenKeywords('');
  }

  // Pulls the generated draft into the normal post editor so it uses your
  // existing Save-to-GitHub flow, SEO tab, schema tab, etc.
  function useThisDraft() {
    if (!draft) return;

    let content = draft.body;

    const internalLinksList = Array.from(selectedInternal);
    if (internalLinksList.length) {
      content += '\n\n## Related reading\n\n';
      content += internalLinksList
        .map((slug) => `- [${slug.replace(/-/g, ' ')}](/blog/${slug})`)
        .join('\n');
    }

    const externalLinksList = (draft.suggestedExternalLinks || []).filter((_, i) =>
      selectedExternal.has(i)
    );
    if (externalLinksList.length) {
      content += '\n\n## Sources\n\n';
      content += externalLinksList.map((l) => `- [${l.anchorText}](${l.url})`).join('\n');
    }

    setPost({
      ...emptyPost(),
      title: draft.title,
      metaTitle: draft.title,
      metaDescription: draft.metaDescription,
      excerpt: draft.metaDescription,
      slug: draft.slug,
      filename: draft.slug,
      content,
      category: 'SEO',
      tags: draftSource || '',
    });
    setView('edit');
    setActiveTab('content');
    setMessage('');
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  // Load existing post from GitHub
  async function loadPost(slug: string) {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/get-blog?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        const parsed = parseFrontmatter(data.content);
        setPost({ ...parsed, filename: slug });
        setIsEditingExisting(true);
        setView('edit');
        setActiveTab('content');
      } else {
        setMessage('load-error');
      }
    } catch {
      setMessage('load-error');
    } finally {
      setLoading(false);
    }
  }

  function startNew() {
    setPost(emptyPost());
    setIsEditingExisting(false);
    setView('edit');
    setMessage('');
    setActiveTab('content');
  }

  async function handleSave() {
  if (!post.title) { setMessage('error-title'); return; }
  setSaving(true);
  setMessage('');

  const filename = post.filename || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const postToSave = isEditingExisting
    ? { ...post, updatedDate: new Date().toISOString().split('T')[0] }
    : post;
  const frontmatter = buildFrontmatter({ ...postToSave, filename });

  const res = await fetch('/api/admin/save-blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content: frontmatter }),
  });

  setMessage(res.ok ? 'success' : 'error');
  if (res.ok) setPost(p => ({ ...p, filename, ...(isEditingExisting ? { updatedDate: postToSave.updatedDate } : {}) }));
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

  // ── LIST VIEW ────────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
              <span style={{ color: '#d1d5db' }}>|</span>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Blog Posts</h1>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={openOpportunities} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#f0fdf4', color: '#15803d', fontWeight: 600, fontSize: '0.875rem', border: '1px solid #bbf7d0', cursor: 'pointer' }}>🚀 AI Opportunities</button>
              <button onClick={startNew} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>+ New Post</button>
              <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>

          {message === 'load-error' && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626', marginBottom: '1rem' }}>
              ❌ Failed to load post. Check your GitHub token and repo settings.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {KNOWN_POSTS.map(slug => (
              <div key={slug} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{slug}</div>
                  <div style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '2px' }}>content/blog/{slug}.md</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={`/blog/${slug}`} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', background: '#f3f4f6', color: '#374151', fontSize: '0.8125rem', textDecoration: 'none', border: '1px solid #e5e7eb' }}>
                    View →
                  </a>
                  <button onClick={() => loadPost(slug)} disabled={loading}
                    style={{ padding: '0.4rem 0.875rem', borderRadius: '6px', background: '#eff6ff', color: '#2563eb', fontSize: '0.8125rem', border: '1px solid #bfdbfe', cursor: 'pointer', fontWeight: 600 }}>
                    {loading ? 'Loading...' : 'Edit'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── OPPORTUNITIES VIEW ──────────────────────────────────────────────────────
  if (view === 'opportunities') {
    const card: React.CSSProperties = { background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' };
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setView('list')} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>← Blog Posts</button>
              <span style={{ color: '#d1d5db' }}>|</span>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>AI Content Opportunities</h1>
            </div>
          </div>

          <div style={card}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 0.5rem' }}>Generate a blog draft for a target keyword</p>
            <p style={{ fontSize: '0.8125rem', color: '#9ca3af', margin: '0 0 1rem' }}>
              Auto-detecting improving queries from Search Console needs persistent storage, not set up yet — for now, enter any target keyword or phrase manually.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateDraft()}
                placeholder="e.g. how to reduce ppc costs"
                style={{ flex: 1, padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem' }}
              />
              <button
                onClick={handleGenerateDraft}
                disabled={!targetQuery.trim() || !!generatingFor}
                style={{ fontSize: '0.875rem', padding: '0.65rem 1.1rem', borderRadius: '8px', border: '1px solid #2563eb', background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                {generatingFor ? 'Generating…' : 'Generate Draft'}
              </button>
            </div>
            {genError && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.75rem' }}>{genError}</p>}
          </div>

          {draft && draftSource && (
            <div style={card}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Draft preview for "{draftSource}"</p>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>{draft.title}</p>
              <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0 0 1rem' }}>{draft.metaDescription}</p>
              <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', padding: '0.875rem', maxHeight: '260px', overflowY: 'auto', fontSize: '0.8125rem', color: '#374151', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                {draft.body}
              </div>

              {draft.suggestedInternalLinks?.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#374151', margin: '0 0 0.4rem' }}>Internal links to include</p>
                  {draft.suggestedInternalLinks.map((slug) => (
                    <label key={slug} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
                      <input type="checkbox" checked={selectedInternal.has(slug)} onChange={() => toggleInternal(slug)} />
                      {slug}
                    </label>
                  ))}
                </div>
              )}

              {draft.suggestedExternalLinks?.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#374151', margin: '0 0 0.4rem' }}>External links to include</p>
                  {draft.suggestedExternalLinks.map((link, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', marginBottom: '0.4rem' }}>
                      <input type="checkbox" checked={selectedExternal.has(i)} onChange={() => toggleExternal(i)} style={{ marginTop: '2px' }} />
                      <span><strong>{link.anchorText}</strong> — {link.url}<br /><span style={{ color: '#9ca3af' }}>{link.reason}</span></span>
                    </label>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={useThisDraft} style={{ padding: '0.6rem 1.1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>
                  Use this draft →
                </button>
                <button onClick={() => setDraft(null)} style={{ padding: '0.6rem 1.1rem', borderRadius: '8px', background: 'white', color: '#374151', fontWeight: 500, fontSize: '0.875rem', border: '1px solid #d1d5db', cursor: 'pointer' }}>
                  Discard
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                "Use this draft" loads it into the normal post editor — nothing is saved or published yet. Review it there, adjust SEO/schema/links, then hit Save.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── EDIT VIEW ────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, overflow: 'hidden', flex: '1 1 0%' }}>
            <button onClick={() => { setView('list'); setMessage(''); }} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', flexShrink: 0, whiteSpace: 'nowrap' }}>← Blog Posts</button>
            <span style={{ color: '#d1d5db', flexShrink: 0 }}>|</span>
            <h1
              title={post.filename || 'New Post'}
              style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
            >
              {post.filename || 'New Post'}{post.filename && ' ✏️'}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            {post.filename && (
              <a href={`/blog/${post.filename}`} target="_blank" rel="noopener noreferrer"
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'white', color: '#374151', fontSize: '0.875rem', border: '1px solid #d1d5db', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                View Live →
              </a>
            )}
            <button onClick={() => setShowStrengthen(true)}
              style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#f0fdf4', color: '#15803d', fontWeight: 600, fontSize: '0.875rem', border: '1px solid #bbf7d0', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              🚀 Strengthen with AI
            </button>
            <button onClick={handleSave} disabled={saving}
              style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, whiteSpace: 'nowrap' }}>
              {saving ? 'Saving...' : '💾 Save to GitHub'}
            </button>
          </div>
        </div>

        {/* ── STRENGTHEN WITH AI PANEL ── */}
        {showStrengthen && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #bbf7d0', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>🚀 Strengthen this post for target keywords</p>
              <button onClick={() => { setShowStrengthen(false); setStrengthenResult(null); }} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.875rem' }}>✕</button>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0 0 0.75rem' }}>
              Paste target keywords from your Search Console data, one per line. Optionally add current position and impressions, comma-separated:{' '}
              <code style={{ background: '#f3f4f6', padding: '1px 5px', borderRadius: '4px' }}>keyword, position, impressions</code>
            </p>
            <textarea
              value={strengthenKeywords}
              onChange={(e) => setStrengthenKeywords(e.target.value)}
              placeholder={'seo basics for business owners, 17.5, 2\nseo for business owners, 13.6, 16\nseo fundamentals every business owner should know, 4.3, 18'}
              rows={4}
              style={{ width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.8125rem', fontFamily: 'monospace', boxSizing: 'border-box', resize: 'vertical', marginBottom: '0.75rem' }}
            />
            <button
              onClick={handleStrengthen}
              disabled={strengthening || !strengthenKeywords.trim() || !post.content.trim()}
              style={{ padding: '0.6rem 1.1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}
            >
              {strengthening ? 'Analyzing & rewriting…' : 'Analyze & Improve'}
            </button>
            {strengthenError && <p style={{ color: '#dc2626', fontSize: '0.8125rem', marginTop: '0.75rem' }}>{strengthenError}</p>}

            {strengthenResult && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f3f4f6' }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#374151', margin: '0 0 0.5rem' }}>What changed:</p>
                <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0 0 1rem' }}>{strengthenResult.summary}</p>
                <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#374151', margin: '0 0 0.5rem' }}>Preview of improved content:</p>
                <div style={{ background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '8px', padding: '0.875rem', maxHeight: '280px', overflowY: 'auto', fontSize: '0.8125rem', color: '#374151', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                  {strengthenResult.improvedContent}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={applyStrengthenedContent} style={{ padding: '0.6rem 1.1rem', borderRadius: '8px', background: '#16a34a', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>
                    Apply to editor
                  </button>
                  <button onClick={() => setStrengthenResult(null)} style={{ padding: '0.6rem 1.1rem', borderRadius: '8px', background: 'white', color: '#374151', fontSize: '0.875rem', border: '1px solid #d1d5db', cursor: 'pointer' }}>
                    Discard
                  </button>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.75rem' }}>
                  Applying only updates the editor — nothing is saved until you click "Save to GitHub".
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {(['content', 'seo', 'schema', 'links'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={tabBtn(activeTab === tab)}>
              {tab === 'content' && '📝 Content'}
              {tab === 'seo' && '🔍 SEO'}
              {tab === 'schema' && '🏗 Schema'}
              {tab === 'links' && '🔗 Links & Slug'}
            </button>
          ))}
        </div>

        {/* ── CONTENT TAB ── */}
        {activeTab === 'content' && (
          <>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Post Details</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div>
                  <label style={lbl}>Title *</label>
                  <input style={inp} type="text" placeholder="5 Ways to Cut Your PPC Costs in Half" value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Excerpt / Summary</label>
                  <textarea style={{ ...inp, resize: 'vertical' }} rows={2} placeholder="Short description shown on blog listing page..." value={post.excerpt} onChange={e => setPost({ ...post, excerpt: e.target.value })} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={lbl}>Category</label>
                    <select style={inp} value={post.category} onChange={e => setPost({ ...post, category: e.target.value })}>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Published Date</label>
                    <input style={inp} type="date" value={post.publishedDate} onChange={e => setPost({ ...post, publishedDate: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label style={lbl}>Author</label>
                  <input style={inp} type="text" value={post.author} onChange={e => setPost({ ...post, author: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Cover Image URL</label>
                  <input style={inp} type="text" placeholder="https://images.unsplash.com/photo-...?w=1200&q=80" value={post.coverImage} onChange={e => setPost({ ...post, coverImage: e.target.value })} />
                  <p style={hint}>Get free images from unsplash.com → right-click image → Copy image address</p>
                </div>
                <div>
                  <label style={lbl}>Cover Image Alt Text</label>
                  <input style={inp} type="text" placeholder="Person reviewing PPC campaign analytics on laptop" value={post.coverImageAlt} onChange={e => setPost({ ...post, coverImageAlt: e.target.value })} />
                  <p style={hint}>Describe what's in the image — used by screen readers and improves SEO</p>
                </div>
                {post.coverImage && (
                  <div>
                    <p style={{ ...hint, marginBottom: '6px' }}>Image preview:</p>
                    <img src={post.coverImage} alt={post.coverImageAlt || 'Cover preview'} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  </div>
                )}
                <div>
                  <label style={lbl}>Tags (comma separated)</label>
                  <input style={inp} type="text" placeholder="ppc, google-ads, cost-reduction" value={post.tags} onChange={e => setPost({ ...post, tags: e.target.value })} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="featured" checked={post.featured} onChange={e => setPost({ ...post, featured: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                  <label htmlFor="featured" style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>Featured post (shown at top of blog page)</label>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>Blog Content (Markdown)</p>
                <span style={{ fontSize: '0.8125rem', color: '#9ca3af' }}>## H2 &nbsp;|&nbsp; ### H3 &nbsp;|&nbsp; **bold** &nbsp;|&nbsp; *italic* &nbsp;|&nbsp; - list &nbsp;|&nbsp; [text](/url)</span>
              </div>
              <textarea
                style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: 1.6, minHeight: '450px' }}
                value={post.content}
                onChange={e => setPost({ ...post, content: e.target.value })}
              />
              <div style={{ marginTop: '0.75rem', background: '#f9fafb', borderRadius: '8px', padding: '0.75rem', fontSize: '0.8125rem', color: '#6b7280' }}>
                <strong>Internal link example:</strong> [See our framework](/framework) &nbsp;|&nbsp; [Book a call](/book) &nbsp;|&nbsp; [Read case studies](/case-studies)
              </div>
            </div>
          </>
        )}

        {/* ── SEO TAB ── */}
        {activeTab === 'seo' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>SEO Settings</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={lbl}>Meta Title</label>
                <input style={inp} type="text" placeholder="Leave empty to use post title" value={post.metaTitle} onChange={e => setPost({ ...post, metaTitle: e.target.value })} maxLength={70} />
                <p style={hint}>{(post.metaTitle || post.title).length}/70 characters — shown in Google search results tab. Leave empty to use post title.</p>
                {/* Live preview */}
                <div style={{ marginTop: '8px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0 0 4px' }}>Google preview:</p>
                  <p style={{ fontSize: '1rem', color: '#1a0dab', margin: '0 0 2px', fontFamily: 'Arial, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {post.metaTitle || post.title || 'Your post title'} | Riverr360
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#006621', margin: '0 0 2px', fontFamily: 'Arial, sans-serif' }}>
                    https://riverr360.com/blog/{post.slug || post.filename || 'your-post-slug'}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: '#545454', margin: 0, fontFamily: 'Arial, sans-serif', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.metaDescription || post.excerpt || 'Your meta description will appear here...'}
                  </p>
                </div>
              </div>
              <div>
                <label style={lbl}>Meta Description</label>
                <textarea style={{ ...inp, resize: 'vertical' }} rows={3} placeholder="Leave empty to use excerpt" value={post.metaDescription} onChange={e => setPost({ ...post, metaDescription: e.target.value })} maxLength={160} />
                <p style={hint}>{(post.metaDescription || post.excerpt).length}/160 characters — shown under the title in Google. Leave empty to use excerpt.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── SCHEMA TAB ── */}
        {activeTab === 'schema' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 0.5rem' }}>Schema Markup</p>
            <p style={{ fontSize: '0.8125rem', color: '#6b7280', margin: '0 0 1.25rem' }}>
              Schema tells Google what type of content this is — helps it appear in rich results. <strong>BlogPosting</strong> is the right choice for most blog posts.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SCHEMA_TYPES.map(type => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.875rem 1rem', border: `2px solid ${post.schemaType === type ? '#2563eb' : '#e5e7eb'}`, borderRadius: '10px', cursor: 'pointer', background: post.schemaType === type ? '#eff6ff' : 'white' }}>
                  <input type="radio" name="schema" value={type} checked={post.schemaType === type} onChange={() => setPost({ ...post, schemaType: type })} style={{ width: '16px', height: '16px', flexShrink: 0, accentColor: '#2563eb' }} />
                  <div>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9375rem' }}>{type}</div>
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '2px' }}>
                      {type === 'None' && 'No schema — not recommended'}
                      {type === 'Article' && 'General article — good for news or editorial content'}
                      {type === 'BlogPosting' && 'Blog post — recommended for most posts ✓'}
                      {type === 'HowTo' && 'Step-by-step guide — shows steps in Google results'}
                      {type === 'FAQPage' && 'FAQ content — shows questions in Google results'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {post.schemaType !== 'None' && (
              <div style={{ marginTop: '1rem', background: '#f9fafb', borderRadius: '8px', padding: '1rem', fontSize: '0.8125rem', color: '#6b7280' }}>
                <strong>Auto-generated from your content:</strong> The schema will use your post title, meta description, author, published date, and cover image automatically — no extra input needed.
              </div>
            )}
          </div>
        )}

        {/* ── LINKS & SLUG TAB ── */}
        {activeTab === 'links' && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Slug & Internal Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={lbl}>URL Slug</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>riverr360.com/blog/</span>
                  <input style={{ ...inp, flex: 1 }} type="text"
                    placeholder="cut-ppc-costs-in-half"
                    value={post.filename}
                    onChange={e => setPost({ ...post, filename: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} />
                </div>
                <p style={hint}>Lowercase letters and dashes only. This is the URL of your post. Use the same slug as an existing post to overwrite it.</p>
                <div style={{ marginTop: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '8px 12px', fontSize: '0.8125rem', color: '#2563eb' }}>
                  🔗 {`https://riverr360.com/blog/${post.filename || 'your-post-slug'}`}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
                <label style={lbl}>Internal Links (for reference)</label>
                <textarea style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem' }} rows={4}
                  placeholder={`/framework — R360 Framework page\n/contact — Contact us\n/case-studies — See results\n/book — Book a strategy call`}
                  value={post.internalLinks}
                  onChange={e => setPost({ ...post, internalLinks: e.target.value })} />
                <p style={hint}>Keep notes on which internal pages you've linked to from this post. Use these in your content as: [anchor text](/page)</p>
              </div>

              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#15803d', margin: '0 0 0.5rem' }}>📌 Suggested internal links for this post</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { path: '/framework', label: 'R360 Revenue Leakage Framework', use: 'Link when mentioning the framework' },
                    { path: '/contact', label: 'Contact / Free Audit', use: 'CTA at the end of every post' },
                    { path: '/case-studies', label: 'Case Studies', use: 'Link when citing results' },
                    { path: '/book', label: 'Book a Strategy Call', use: 'Alternative CTA' },
                    { path: '/score', label: 'Revenue Leakage Score', use: 'Link when discussing diagnostics' },
                  ].map(link => (
                    <div key={link.path} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <code style={{ fontSize: '0.8125rem', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', color: '#15803d', whiteSpace: 'nowrap' }}>{link.path}</code>
                      <div style={{ fontSize: '0.8125rem', color: '#374151' }}><strong>{link.label}</strong> — {link.use}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {message === 'error-title' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626', marginBottom: '0.75rem' }}>Please enter a title before saving.</div>}
        {message === 'success' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d' }}>
            ✅ Saved to GitHub! Vercel will redeploy in ~60 seconds and your post will be live at{' '}
            <a href={`/blog/${post.filename}`} target="_blank" rel="noopener noreferrer" style={{ color: '#15803d', fontWeight: 600 }}>
              riverr360.com/blog/{post.filename}
            </a>
          </div>
        )}
        {message === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>❌ Something went wrong. Check your GitHub token and repo settings in Vercel env vars.</div>}
      </div>
    </div>
  );
}
