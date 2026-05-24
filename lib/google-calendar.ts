import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { CALL_DURATION_MINUTES, TIMEZONE } from './availability';

function getOAuthClient() {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  return oAuth2Client;
}

export type BookingDetails = {
  name: string;
  email: string;
  phone: string;
  challenge: string;
  budget: string;
  date: string;   // YYYY-MM-DD
  time: string;   // e.g. "10:00 AM"
};

function parseDateTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [timePart, meridiem] = time.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  // Convert IST (UTC+5:30) to UTC
  const utcMs =
    Date.UTC(year, month - 1, day, hours, minutes) - 5.5 * 60 * 60 * 1000;
  return new Date(utcMs);
}

export async function createCalendarEvent(booking: BookingDetails): Promise<string> {
  const auth = getOAuthClient();
  const calendar = google.calendar({ version: 'v3', auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const start = parseDateTime(booking.date, booking.time);
  const end = new Date(start.getTime() + CALL_DURATION_MINUTES * 60 * 1000);

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Strategy Call — ${booking.name} (Riverr360)`,
      description: [
        `Name: ${booking.name}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone}`,
        `Challenge: ${booking.challenge}`,
        `Budget: ${booking.budget}`,
      ].join('\n'),
      start: { dateTime: start.toISOString(), timeZone: TIMEZONE },
      end:   { dateTime: end.toISOString(),   timeZone: TIMEZONE },
      attendees: [{ email: booking.email, displayName: booking.name }],
      conferenceData: {
        createRequest: {
          requestId: `riverr360-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    },
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });

  const meetLink =
    event.data.conferenceData?.entryPoints?.find(
      (e) => e.entryPointType === 'video'
    )?.uri ?? '';

  return meetLink;
}
