'use client';

import { useState, useMemo } from 'react';
import {
  AVAILABLE_DAYS,
  BLOCKED_DATES,
  BOOKING_WINDOW_DAYS,
  TIME_SLOTS,
} from '@/lib/availability';

type Props = {
  onSelect: (date: string, time: string) => void;
  selectedDate: string;
  selectedTime: string;
};

function formatDate(d: Date) {
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

export default function BookingCalendar({ onSelect, selectedDate, selectedTime }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Earliest bookable date = tomorrow (today's slots are considered gone)
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + BOOKING_WINDOW_DAYS);

  function isAvailable(d: Date) {
    // Must be strictly in the future (tomorrow or later)
    if (d < tomorrow) return false;
    // Must be within booking window
    if (d > maxDate) return false;
    // Must be an available day of week
    if (!AVAILABLE_DAYS.includes(d.getDay())) return false;
    // Must not be a blocked date
    if (BLOCKED_DATES.includes(formatDate(d))) return false;
    return true;
  }

  const isPast = (d: Date) => d < tomorrow;

  const days = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const last = new Date(viewYear, viewMonth + 1, 0);
    const cells: (Date | null)[] = Array(first.getDay()).fill(null);
    for (let i = 1; i <= last.getDate(); i++) {
      cells.push(new Date(viewYear, viewMonth, i));
    }
    return cells;
  }, [viewYear, viewMonth]);

  // Prevent navigating to months before the current one
  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  function prevMonth() {
    if (!canGoPrev) return;
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-US', {
    month: 'long', year: 'numeric',
  });

  return (
    <div>
      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button
          onClick={prevMonth}
          aria-label="Previous month"
          disabled={!canGoPrev}
          style={{
            background: 'none',
            border: '0.5px solid #e2e8f0',
            borderRadius: 6,
            width: 30, height: 30,
            cursor: canGoPrev ? 'pointer' : 'default',
            fontSize: 16,
            color: canGoPrev ? '#64748b' : '#cbd5e1',
          }}
        >‹</button>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{monthLabel}</span>
        <button onClick={nextMonth} aria-label="Next month" style={{ background: 'none', border: '0.5px solid #e2e8f0', borderRadius: 6, width: 30, height: 30, cursor: 'pointer', fontSize: 16, color: '#64748b' }}>›</button>
      </div>

      {/* Day of week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {days.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const dateStr = formatDate(day);
          const available = isAvailable(day);
          const past = isPast(day);
          const isSelected = dateStr === selectedDate;
          const isToday = formatDate(day) === formatDate(today);

          return (
            <button
              key={dateStr}
              disabled={!available}
              onClick={() => available && onSelect(dateStr, selectedTime)}
              style={{
                fontSize: 13,
                textAlign: 'center',
                padding: '7px 2px',
                borderRadius: 6,
                // Today gets a subtle ring but is NOT bookable
                border: isToday && !isSelected ? '0.5px solid #94a3b8' : 'none',
                cursor: available ? 'pointer' : 'default',
                background: isSelected ? '#1d4ed8' : 'none',
                color: isSelected
                  ? '#fff'
                  : past
                  ? '#e2e8f0'        // very faded — clearly unavailable
                  : available
                  ? '#0f172a'        // normal dark text
                  : '#cbd5e1',       // non-available future days (weekends etc.)
                textDecoration: past ? 'line-through' : 'none',
                opacity: past ? 0.5 : !available ? 0.4 : 1,
                fontWeight: isSelected ? 500 : 400,
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#64748b', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Available times
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                onClick={() => onSelect(selectedDate, slot)}
                style={{
                  fontSize: 13,
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: selectedTime === slot ? '1.5px solid #1d4ed8' : '0.5px solid #e2e8f0',
                  background: selectedTime === slot ? '#eff6ff' : '#fff',
                  color: selectedTime === slot ? '#1e40af' : '#0f172a',
                  fontWeight: selectedTime === slot ? 500 : 400,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
