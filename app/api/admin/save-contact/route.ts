import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { email, phone, hours, calendarLink } = await request.json();

  // Update contact page
  const contactPath = path.join(process.cwd(), 'app', 'contact', 'page.tsx');
  let content = fs.readFileSync(contactPath, 'utf-8');
  content = content.replace(/href="mailto:[^"]*"/, `href="mailto:${email}"`);
  content = content.replace(/>([^<]*info@riverr360\.com[^<]*)</, `>${email}<`);
  content = content.replace(/href="tel:[^"]*"/, `href="tel:${phone.replace(/[^0-9+]/g, '')}"`);
  content = content.replace(/\(\+91\)-7411-129-188/, phone);
  fs.writeFileSync(contactPath, content, 'utf-8');

  // Update schedule route if calendar link changed
  if (calendarLink) {
    const schedulePath = path.join(process.cwd(), 'app', 'schedule', 'route.ts');
    if (fs.existsSync(schedulePath)) {
      let scheduleContent = fs.readFileSync(schedulePath, 'utf-8');
      scheduleContent = scheduleContent.replace(/const calendarURL = '[^']*'/, `const calendarURL = '${calendarLink}'`);
      fs.writeFileSync(schedulePath, scheduleContent, 'utf-8');
    }
  }

  return NextResponse.json({ success: true });
}
