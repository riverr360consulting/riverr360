'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = ['Google Ads', 'SEO', 'PPC', 'Content Marketing', 'Email Marketing', 'Social Media', 'Analytics', 'Conversion', 'General'];

interface BlogPost {
  filename: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  coverImage: string;
  featured: boolean;
  tags: string;
  content: string;
}

function emptyPost(): BlogPost {
  return {
    filename: '',
    title: '',
    excerpt: '',
    category: 'General',
    author: 'Bijeesh Kuttikrishnan',
    publishedDate: new Date().toISOString().split('T')[0],
    coverImage: '',
    featured: false,
    tags: '',
    content: '## Introduction\n\nWrite your blog post here...\n\n## Main Section\n\nYour content here.\n\n## Conclusion\n\nWrap up your post here.\n\n**[Contact us for help](/contact)**',
  };
}

export default function AdminBlogPage() {
  const [view, setView] = useState<'list' | 'edit' | 'new'>('list');
  const [post, setPost] = useState<BlogPost>(emptyPost());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function startNew() {
    setPost(emptyPost());
    setView('new');
    setMessage('');
    setPreview(false);
  }

  async function handleSave() {
    if (!post.title) { setMessage('error-title'); return; }
    setSaving(true);
    setMessage('');

    const filename = post.filename || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const tagsArray = post.tags.split(',').map(t => t.trim()).filter(Boolean);

    const frontmatter = `---
title: "${post.title}"
excerpt: "${post.excerpt}"
category: "${post.category}"
author: "${post.author}"
publishedDate: "${post.publishedDate}"
coverImage: "${post.coverImage}"
featured: ${post.featured}
tags: [${tagsArray.map(t => `"${t}"`).join(', ')}]
---

${post.content}`;

    const res = await fetch('/api/admin/save-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, content: frontmatter }),
    });

    setMessage(res.ok ? 'success' : 'error');
    setSaving(false);
  }

  const inp = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box' as const, background: 'white', color: '#111827' };
  const lbl = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' } as React.CSSProperties;

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
              <button onClick={startNew} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>+ New Post</button>
              <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
            </div>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#1d4ed8', margin: 0 }}>
              Your existing blog posts are in <code>content/blog/</code> on GitHub. Click <strong>+ New Post</strong> to create a new one — it will be saved directly to GitHub.
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📝</div>
            <h3 style={{ fontWeight: 600, color: '#111827', margin: '0 0 0.5rem' }}>Your Existing Blog Posts</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 1.25rem' }}>
              cut-ppc-costs-in-half.md • email-marketing-that-converts.md • google-ads-landing-page-problem.md • seo-basics-every-business-owner-should-know.md
            </p>
            <p style={{ fontSize: '0.8125rem', color: '#9ca3af', margin: 0 }}>
              To edit existing posts, use <strong>+ New Post</strong>, enter the same filename, and it will overwrite the existing file on GitHub.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => { setView('list'); setMessage(''); }} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}>← Blog Posts</button>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>New Blog Post</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setPreview(!preview)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: preview ? '#f3f4f6' : 'white', color: '#374151', fontSize: '0.875rem', border: '1px solid #d1d5db', cursor: 'pointer' }}>
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleSave} disabled={saving} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving...' : '💾 Save to GitHub'}
            </button>
          </div>
        </div>

        {/* Metadata section */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: '0 0 1rem' }}>Post Details</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div>
              <label style={lbl}>Title *</label>
              <input style={inp} type="text" placeholder="5 Ways to Cut Your PPC Costs in Half" value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
            </div>
            <div>
              <label style={lbl}>Filename (leave empty to auto-generate)</label>
              <input style={inp} type="text" placeholder="cut-ppc-costs-in-half" value={post.filename} onChange={e => setPost({ ...post, filename: e.target.value })} />
              <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '3px' }}>Use same filename as existing post to overwrite it. Lowercase, dashes only.</p>
            </div>
            <div>
              <label style={lbl}>Excerpt / Summary *</label>
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
              <p style={{ fontSize: '0.8125rem', color: '#9ca3af', marginTop: '3px' }}>Get free images from unsplash.com — right-click image → Copy image address</p>
            </div>
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

        {/* Content editor */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', margin: 0 }}>Blog Content (Markdown)</p>
            <div style={{ fontSize: '0.8125rem', color: '#9ca3af' }}>## Heading &nbsp;|&nbsp; **bold** &nbsp;|&nbsp; *italic* &nbsp;|&nbsp; - list</div>
          </div>

          {preview ? (
            <div style={{ minHeight: '400px', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif', fontSize: '0.9375rem', color: '#374151', lineHeight: 1.7 }}>{post.content}</pre>
            </div>
          ) : (
            <textarea
              style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: 1.6, minHeight: '400px' }}
              value={post.content}
              onChange={e => setPost({ ...post, content: e.target.value })}
              placeholder="## Introduction&#10;&#10;Write your blog post here...&#10;&#10;## Main Section&#10;&#10;Your content here."
            />
          )}

          <div style={{ marginTop: '0.75rem', background: '#f9fafb', borderRadius: '8px', padding: '0.75rem', fontSize: '0.8125rem', color: '#6b7280' }}>
            <strong>Markdown tips:</strong> ## for headings &nbsp;|&nbsp; **bold** &nbsp;|&nbsp; *italic* &nbsp;|&nbsp; - bullet &nbsp;|&nbsp; 1. numbered &nbsp;|&nbsp; [link text](/contact) &nbsp;|&nbsp; &gt; quote
          </div>
        </div>

        {message === 'error-title' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626', marginBottom: '0.75rem' }}>Please enter a title before saving.</div>}
        {message === 'success' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d' }}>
            ✅ Blog post saved to GitHub! Vercel will deploy in ~60 seconds and your post will be live.
          </div>
        )}
        {message === 'error' && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>❌ Something went wrong. Please try again.</div>}
      </div>
    </div>
  );
}
