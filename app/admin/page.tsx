'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const sections = [
  { href: '/admin/webinars', icon: '🎤', title: 'Webinars', desc: 'Switch Coming Soon / Active, manage webinar details' },
  { href: '/admin/blog', icon: '📝', title: 'Blog Posts', desc: 'Add, edit, and manage blog posts' },
  { href: '/admin/case-studies', icon: '💼', title: 'Case Studies', desc: 'Update case study metrics and content' },
  { href: '/admin/contact', icon: '📞', title: 'Contact Info', desc: 'Update email, phone, and office hours' },
  { href: '/admin/settings', icon: '⚙️', title: 'Site Settings', desc: 'SEO, meta tags, and general settings' },
];

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Riverr360 Admin</h1>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0' }}>Manage your website content</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href="https://riverr360.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none', padding: '0.4rem 0.875rem', border: '1px solid #bfdbfe', borderRadius: '8px', background: '#eff6ff' }}>
              View Site
            </a>
            <button onClick={handleLogout}
              style={{ fontSize: '0.875rem', color: '#6b7280', background: 'none', border: '1px solid #d1d5db', padding: '0.4rem 0.875rem', borderRadius: '8px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {sections.map(s => (
            <Link key={s.href} href={s.href}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem 1.5rem', textDecoration: 'none', transition: 'box-shadow 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div style={{ fontSize: '1.75rem', width: '44px', textAlign: 'center' }}>{s.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#111827', fontSize: '1rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '2px' }}>{s.desc}</div>
              </div>
              <div style={{ color: '#9ca3af', fontSize: '1.25rem' }}>›</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '1rem 1.25rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
            <strong>After any change:</strong> Open Command Prompt and run:
            <code style={{ display: 'block', marginTop: '6px', background: '#fef3c7', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8125rem' }}>
              git add . && git commit -m "update: content" && git push origin main
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
