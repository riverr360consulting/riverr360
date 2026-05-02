import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });
  }

  // Build the new currentWebinar code
  let currentWebinarCode = '';
  if (body.mode === 'coming-soon') {
    currentWebinarCode = `export const currentWebinar: Webinar | null = null;`;
  } else {
    const { title, description, date, time, duration, registrationLink, topics } = body;
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const topicsStr = topics.map((t: string) => `    '${t}'`).join(',\n');
    currentWebinarCode = `export const currentWebinar: Webinar | null = {
  id: '${id}',
  title: '${title}',
  description: '${description.replace(/'/g, "\\'")}',
  date: '${date}',
  time: '${time}',
  duration: '${duration}',
  registrationLink: '${registrationLink}',
  status: 'upcoming',
  topics: [
${topicsStr},
  ],
  speaker: {
    name: 'Bijeesh Kuttikrishnan',
    title: 'Founder, Riverr360',
  },
};`;
  }

  // Get current file from GitHub
  const fileRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/data/webinars.ts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!fileRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch file from GitHub' }, { status: 500 });
  }

  const fileData = await fileRes.json();
  const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');

  // Replace currentWebinar section
  const updated = currentContent.replace(
    /export const currentWebinar: Webinar \| null =[\s\S]*?;(\s*\n\/\/|\s*\n\n)/,
    (match: string) => {
      const suffix = match.slice(match.indexOf(';') + 1);
      return currentWebinarCode + ';' + suffix;
    }
  );

  // Fallback replace if above doesn't match
  const finalContent = updated === currentContent
    ? currentContent.replace(
        /export const currentWebinar: Webinar \| null = null;/,
        currentWebinarCode
      )
    : updated;

  // Push updated file to GitHub
  const updateRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/data/webinars.ts`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.mode === 'coming-soon'
          ? 'update: webinar set to coming soon'
          : `update: new webinar "${body.title}"`,
        content: Buffer.from(finalContent).toString('base64'),
        sha: fileData.sha,
      }),
    }
  );

  if (!updateRes.ok) {
    const err = await updateRes.json();
    return NextResponse.json({ error: 'Failed to update GitHub', details: err }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
