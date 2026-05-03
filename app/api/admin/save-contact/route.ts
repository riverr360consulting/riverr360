import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, phone, hours, calendarLink } = await request.json();
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });
  }

  const filePath = 'app/contact/page.tsx';

  // Get current file from GitHub
  const fileRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );

  if (!fileRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch contact page from GitHub' }, { status: 500 });
  }

  const fileData = await fileRes.json();
  let content = Buffer.from(fileData.content, 'base64').toString('utf-8');

  // Update email
  content = content.replace(
    /href="mailto:[^"]*"/g,
    `href="mailto:${email}"`
  );
  content = content.replace(
    />([^<]*@[^<]*\.[^<]*)</g,
    `>${email}<`
  );

  // Update phone
  content = content.replace(
    /href="tel:[^"]*"/g,
    `href="tel:${phone.replace(/[^0-9+]/g, '')}"`
  );
  content = content.replace(
    /(\(\+91\)[-\s]?\d{4}[-\s]?\d{3}[-\s]?\d{3}|\+91[-\s]?\d{10}|[\d]{10})/g,
    phone
  );

  // Update office hours
  if (hours) {
    content = content.replace(
      /Monday - Friday:[^<]*/g,
      hours
    );
  }

  // Push updated file to GitHub
  const updateRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${filePath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'update: contact information',
        content: Buffer.from(content).toString('base64'),
        sha: fileData.sha,
      }),
    }
  );

  // Also update schedule route if calendar link changed
  if (calendarLink) {
    const scheduleRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/app/schedule/route.ts`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
    );
    if (scheduleRes.ok) {
      const scheduleData = await scheduleRes.json();
      let scheduleContent = Buffer.from(scheduleData.content, 'base64').toString('utf-8');
      scheduleContent = scheduleContent.replace(
        /const calendarURL = '[^']*'/,
        `const calendarURL = '${calendarLink}'`
      );
      await fetch(
        `https://api.github.com/repos/${repo}/contents/app/schedule/route.ts`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'update: calendar link',
            content: Buffer.from(scheduleContent).toString('base64'),
            sha: scheduleData.sha,
          }),
        }
      );
    }
  }

  if (!updateRes.ok) {
    const err = await updateRes.json();
    return NextResponse.json({ error: 'Failed to update GitHub', details: err }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
