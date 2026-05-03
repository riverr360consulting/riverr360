// FILE: app/schedule/route.ts
// Secure redirect to Google Calendar
// This hides your Google Calendar URL and adds security

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Your Google Calendar appointment link
  const calendarURL = 'https://calendar.app.google/JMgapqTEJMGsDCzu7';
  
  // Optional: Track appointments (log to analytics, database, etc.)
  const referrer = request.headers.get('referer') || 'direct';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Log appointment click (optional)
  console.log('Appointment scheduled:', {
    timestamp: new Date().toISOString(),
    referrer,
    userAgent: userAgent.substring(0, 100),
  });
  
  // Optional: Send to analytics
  // await trackEvent('appointment_clicked', { referrer });
  
  // Redirect to Google Calendar with security headers
  return NextResponse.redirect(calendarURL, {
    status: 302, // Temporary redirect
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow', // Don't index this redirect
    },
  });
}
