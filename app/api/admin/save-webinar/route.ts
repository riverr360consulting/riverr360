import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const webinarsPath = path.join(process.cwd(), 'data', 'webinars.ts');

  let currentWebinarCode = '';
  if (body.mode === 'coming-soon') {
    currentWebinarCode = `export const currentWebinar: Webinar | null = null;`;
  } else {
    const { title, description, date, time, duration, registrationLink, topics } = body;
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const topicsStr = topics.map((t: string) => `    '${t}'`).join(',\n');
    currentWebinarCode = `export const currentWebinar: Webinar | null = {\n  id: '${id}',\n  title: '${title}',\n  description: '${description.replace(/'/g, "\\'")}',\n  date: '${date}',\n  time: '${time}',\n  duration: '${duration}',\n  registrationLink: '${registrationLink}',\n  status: 'upcoming',\n  topics: [\n${topicsStr},\n  ],\n  speaker: {\n    name: 'Bijeesh Kuttikrishnan',\n    title: 'Founder, Riverr360',\n  },\n};`;
  }

  const content = fs.readFileSync(webinarsPath, 'utf-8');
  const updated = content.replace(/export const currentWebinar: Webinar \| null =[\s\S]*?;(?=\n\n|\/\/)/, currentWebinarCode);
  fs.writeFileSync(webinarsPath, updated, 'utf-8');
  return NextResponse.json({ success: true });
}
