import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { createCalendarEvent } from '@/lib/google-calendar';

function getGmailClient() {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return google.gmail({ version: 'v1', auth: oAuth2Client });
}

// Email headers (like Subject) can't contain raw non-ASCII bytes — they must
// use RFC 2047 "encoded-word" syntax, or special characters like em dashes
// get garbled (mojibake) by mail clients. This wraps the subject accordingly.
function encodeSubject(subject: string): string {
  const base64 = Buffer.from(subject, 'utf-8').toString('base64');
  return `=?UTF-8?B?${base64}?=`;
}

function makeEmailRaw(to: string, from: string, subject: string, html: string): string {
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${encodeSubject(subject)}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    html,
  ].join('\n');
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function sendEmail(to: string, subject: string, html: string) {
  const gmail = getGmailClient();
  const from = `Riverr360 <${process.env.GOOGLE_SENDER_EMAIL}>`;
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: makeEmailRaw(to, from, subject, html) },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, challenge, budget, date, time } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Create Google Calendar event + Meet link
    const meetLink = await createCalendarEvent({ name, email, phone, challenge, budget, date, time });

    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // 2. Confirmation email to visitor
    await sendEmail(
      email,
      `Your strategy call is confirmed - ${formattedDate} at ${time}`,
      `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
        <h2 style="color:#1d4ed8;">Your call is confirmed, ${name.split(' ')[0]}!</h2>
        <p>Here are your booking details:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:8px 0;color:#64748b;width:120px;">Date</td><td style="padding:8px 0;font-weight:500;">${formattedDate}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Time</td><td style="padding:8px 0;font-weight:500;">${time} IST</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Duration</td><td style="padding:8px 0;font-weight:500;">30 minutes</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Format</td><td style="padding:8px 0;font-weight:500;">Google Meet</td></tr>
        </table>
        ${meetLink ? `
        <a href="${meetLink}" style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin:8px 0;">
          Join Google Meet
        </a>
        <p style="font-size:13px;color:#64748b;margin-top:8px;">Or copy: <a href="${meetLink}" style="color:#1d4ed8;">${meetLink}</a></p>
        ` : ''}
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
        <p style="font-size:13px;color:#64748b;">
          Need to reschedule? Reply to this email.<br><br>
          <strong>Team Riverr360</strong><br>
          <a href="https://riverr360.com" style="color:#1d4ed8;">riverr360.com</a>
        </p>
      </div>
      `
    );

    // 3. Notification email to you
    await sendEmail(
      process.env.GOOGLE_SENDER_EMAIL!,
      `New booking: ${name} — ${formattedDate} at ${time}`,
      `
      <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
        <h2 style="color:#1d4ed8;">New strategy call booked</h2>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:8px 0;color:#64748b;width:140px;">Name</td><td style="padding:8px 0;font-weight:500;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Date & Time</td><td style="padding:8px 0;font-weight:500;">${formattedDate} at ${time} IST</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Challenge</td><td style="padding:8px 0;">${challenge || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Budget</td><td style="padding:8px 0;">${budget || '—'}</td></tr>
        </table>
        ${meetLink ? `
        <a href="${meetLink}" style="display:inline-block;background:#1d4ed8;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
          Join Google Meet
        </a>` : ''}
      </div>
      `
    );

    return NextResponse.json({ success: true, meetLink });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Booking failed. Please try again.' }, { status: 500 });
  }
}
