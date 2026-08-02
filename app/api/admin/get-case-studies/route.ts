// app/api/admin/get-case-studies/route.ts
// Fetches data/case-studies.json from GitHub for the admin panel.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/data/case-studies.json`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );

  if (!res.ok) return NextResponse.json({ error: 'File not found' }, { status: 404 });

  const data = await res.json();
  const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
  return NextResponse.json(content);
}
