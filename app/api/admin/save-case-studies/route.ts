// app/api/admin/save-case-studies/route.ts
// Saves updated case studies to data/case-studies.json on GitHub.

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { studies } = await request.json();
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  if (!token || !repo) return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });

  const filePath = 'data/case-studies.json';

  // Get current SHA
  let sha: string | undefined;
  try {
    const checkRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (checkRes.ok) sha = (await checkRes.json()).sha;
  } catch {}

  const body: Record<string, string> = {
    message: 'update: case studies content',
    content: Buffer.from(JSON.stringify(studies, null, 2)).toString('base64'),
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) return NextResponse.json({ error: 'GitHub error', details: await res.json() }, { status: 500 });
  return NextResponse.json({ success: true });
}
