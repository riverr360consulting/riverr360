// ─────────────────────────────────────────────────────────────
// Edit this file to control your availability.
// 0 = Sunday, 1 = Monday, ..., 5 = Saturday, 6 = Sunday
// ─────────────────────────────────────────────────────────────

export const CALL_DURATION_MINUTES = 30;

// Available days of the week (0 = Sun, 6 = Sat)
export const AVAILABLE_DAYS = [0, 6]; // Sunday and Saturday

// Time slots shown to visitors (IST — adjust to your timezone)
export const TIME_SLOTS = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

// Block out specific dates (YYYY-MM-DD) — holidays, travel, etc.
export const BLOCKED_DATES: string[] = [
  // '2026-06-28',
];

// Your timezone for Google Calendar events
export const TIMEZONE = 'Asia/Kolkata';

// How many days ahead visitors can book
export const BOOKING_WINDOW_DAYS = 60;
