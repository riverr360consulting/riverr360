// app/api/admin/get-blog/route.ts
// Fetches a single blog post's raw markdown from GitHub for editing.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });
  }

  const filePath = `content/blog/${slug}.md`;
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  const data = await res.json();
  // GitHub returns content as base64
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return NextResponse.json({ content, sha: data.sha });
}
