'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedDate: string;
  tags: string;
  featured: boolean;
  youtubeId: string;
}

const categories = ['Google Ads', 'SEO', 'PPC', 'Content Marketing', 'Email Marketing', 'Social Media', 'Analytics', 'Conversion', 'General'];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const emptyPost = (): BlogPost => ({
    id: Date.now().toString(),
    title: '',
    excerpt: '',
    category: 'General',
    author: 'Bijeesh Kuttikrishnan',
    publishedDate: new Date().toISOString().split('T')[0],
    tags: '',
    featured: false,
    youtubeId: '',
  });

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function startNew() {
    setEditing(emptyPost());
    setIsNew(true);
    setMessage('');
  }

  function startEdit(post: BlogPost) {
    setEditing({ ...post });
    setIsNew(false);
    setMessage('');
  }

  function deletePost(id: string) {
    if (confirm('Delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  }

  function saveEdit() {
    if (!editing) return;
    if (isNew) {
      setPosts([editing, ...posts]);
    } else {
      setPosts(posts.map(p => p.id === editing.id ? editing : p));
    }
    setEditing(null);
    setMessage('saved-local');
  }

  async function generateFiles() {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/save-blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ posts }),
    });
    setMessage(res.ok ? 'success' : 'error');
    setSaving(false);
  }

  const inp = { width: '100%', padding: '0.65rem 0.875rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.9375rem', boxSizing: 'border-box' as const, background: 'white', color: '#111827' };
  const lbl = { fontSize: '0.875rem', color: '#374151', fontWeight: 500, display: 'block', marginBottom: '4px' } as React.CSSProperties;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link href="/admin" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>← Dashboard</Link>
            <span style={{ color: '#d1d5db' }}>|</span>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0 }}>Blog Posts</h1>
          </div>
          <button onClick={handleLogout} style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
        </div>

        {/* Edit / New form */}
        {editing && (
          <div style={{ background: 'white', borderRadius: '12px', border: '2px solid #2563eb', padding: '1.5rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1d4ed8', margin: '0 0 1rem' }}>{isNew ? '+ New Blog Post' : 'Edit Blog Post'}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div><label style={lbl}>Title</label><input style={inp} type="text" placeholder="Your blog post title" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div><label style={lbl}>Excerpt / Summary</label><textarea style={{ ...inp, resize: 'vertical' }} rows={3} placeholder="Short summary shown on the blog listing page..." value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={lbl}>Category</label>
                  <select style={inp} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Published date</label><input style={inp} type="date" value={editing.publishedDate} onChange={e => setEditing({ ...editing, publishedDate: e.target.value })} /></div>
              </div>
              <div><label style={lbl}>Author</label><input style={inp} type="text" value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} /></div>
              <div><label style={lbl}>Tags (comma separated)</label><input style={inp} type="text" placeholder="seo, google, marketing" value={editing.tags} onChange={e => setEditing({ ...editing, tags: e.target.value })} /></div>
              <div><label style={lbl}>YouTube Video ID (optional)</label><input style={inp} type="text" placeholder="dQw4w9WgXcQ" value={editing.youtubeId} onChange={e => setEditing({ ...editing, youtubeId: e.target.value })} /></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="featured" checked={editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} style={{ width: '16px', height: '16px' }} />
                <label htmlFor="featured" style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>Featured post (shown at top of blog page)</label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1.25rem' }}>
              <button onClick={saveEdit} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                {isNew ? 'Add Post' : 'Update Post'}
              </button>
              <button onClick={() => setEditing(null)} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'white', color: '#374151', fontWeight: 500, border: '1px solid #d1d5db', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Post list */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
          <button onClick={startNew} style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: '#2563eb', color: 'white', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>+ New Post</button>
        </div>

        {posts.length === 0 && !editing && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '2.5rem', textAlign: 'center', color: '#9ca3af' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
            <p style={{ margin: 0 }}>No blog posts yet. Click <strong>+ New Post</strong> to add one.</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.25rem' }}>
          {posts.map(post => (
            <div key={post.id} style={{ background: 'white', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  {post.featured && <span style={{ fontSize: '0.75rem', background: '#fef3c7', color: '#92400e', padding: '1px 8px', borderRadius: '999px', fontWeight: 600 }}>Featured</span>}
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{post.publishedDate}</span>
                </div>
                <p style={{ fontWeight: 600, color: '#111827', margin: 0, fontSize: '0.9375rem' }}>{post.title || 'Untitled'}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => startEdit(post)} style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deletePost(post.id)} style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem', borderRadius: '6px', border: '1px solid #fecaca', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {posts.length > 0 && (
          <button onClick={generateFiles} disabled={saving}
            style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', background: '#059669', color: 'white', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, marginBottom: '0.75rem' }}>
            {saving ? 'Generating...' : '💾 Save All Posts to Website'}
          </button>
        )}

        {message === 'saved-local' && (
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', color: '#1d4ed8', fontSize: '0.9375rem' }}>
            ✏️ Post updated in editor. Click <strong>Save All Posts to Website</strong> when done.
          </div>
        )}
        {message === 'success' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', color: '#15803d', fontSize: '0.9375rem' }}>
            ✅ Saved! Now run in Command Prompt:
            <pre style={{ background: '#dcfce7', borderRadius: '6px', padding: '8px', marginTop: '8px', fontSize: '0.8125rem', color: '#166534' }}>{'git add .\ngit commit -m "update: blog posts"\ngit push origin main'}</pre>
          </div>
        )}
        {message === 'error' && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '1rem', color: '#dc2626' }}>❌ Something went wrong. Please try again.</div>
        )}
      </div>
    </div>
  );
}
