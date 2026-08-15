import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { kv } from '@vercel/kv';

type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type Snapshot = {
  date: string;
  rows: GscRow[];
};

const SITE_URL = 'sc-domain:riverr360.com';
const OPPORTUNITY_MIN = 11;
const OPPORTUNITY_MAX = 20;
const TREND_DROP_THRESHOLD = 5; // positions worsened to trigger a drop alert
const IMPROVE_THRESHOLD = 5; // positions improved to trigger an "improving" flag

function formatDate(d: Date) {
  return d.toISOString().split('T')[0];
}

async function fetchGscData(startDate: string, endDate: string): Promise<GscRow[]> {
  const credentials = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY as string);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const response = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 250 },
  });

  return (response.data.rows as GscRow[]) || [];
}

type ImprovingQuery = {
  query: string;
  from: number;
  to: number;
  delta: number; // positive = improved (moved up)
  impressions: number;
};

type TrendAlert = { query: string; from: number; to: number; delta: number };

function analyzeQueries(currentRows: GscRow[], previousRows: GscRow[] | null) {
  const opportunities = currentRows
    .filter((r) => r.position >= OPPORTUNITY_MIN && r.position <= OPPORTUNITY_MAX)
    .sort((a, b) => a.position - b.position);

  const trendAlerts: TrendAlert[] = [];
  const improvingQueries: ImprovingQuery[] = [];

  if (previousRows) {
    const prevMap = new Map(previousRows.map((r) => [r.keys[0], r.position]));
    for (const row of currentRows) {
      const prevPos = prevMap.get(row.keys[0]);
      if (prevPos === undefined) continue;
      const delta = prevPos - row.position; // positive = improved (position number went down)

      if (delta <= -TREND_DROP_THRESHOLD) {
        trendAlerts.push({ query: row.keys[0], from: prevPos, to: row.position, delta: -delta });
      } else if (delta >= IMPROVE_THRESHOLD) {
        improvingQueries.push({
          query: row.keys[0],
          from: prevPos,
          to: row.position,
          delta,
          impressions: row.impressions,
        });
      }
    }
    trendAlerts.sort((a, b) => b.delta - a.delta);
    improvingQueries.sort((a, b) => b.delta - a.delta);
  }

  return { opportunities, trendAlerts, improvingQueries };
}

function buildReportHtml(
  currentRows: GscRow[],
  previousRows: GscRow[] | null,
  rangeLabel: string,
  opportunities: GscRow[],
  trendAlerts: TrendAlert[],
  improvingQueries: ImprovingQuery[]
) {
  const totals = currentRows.reduce(
    (acc, r) => ({ clicks: acc.clicks + r.clicks, impressions: acc.impressions + r.impressions }),
    { clicks: 0, impressions: 0 }
  );

  const row = (cells: (string | number)[]) =>
    `<tr>${cells.map((c) => `<td align="center">${c}</td>`).join('')}</tr>`;

  const oppRows = opportunities
    .slice(0, 15)
    .map((r) => row([r.keys[0], r.position.toFixed(1), r.impressions]))
    .join('');

  const trendRows = trendAlerts
    .slice(0, 15)
    .map((t) =>
      row([t.query, `${t.from.toFixed(1)} → ${t.to.toFixed(1)}`, `-${t.delta.toFixed(1)}`])
    )
    .join('');

  const improvingRows = improvingQueries
    .slice(0, 15)
    .map((q) =>
      row([
        q.query,
        `${q.from.toFixed(1)} → ${q.to.toFixed(1)}`,
        `+${q.delta.toFixed(1)}`,
        q.impressions,
      ])
    )
    .join('');

  return `
    <h2>Weekly SEO Report — riverr360.com</h2>
    <p><strong>Range:</strong> ${rangeLabel}</p>
    <p><strong>Total clicks:</strong> ${totals.clicks} &nbsp;|&nbsp; <strong>Total impressions:</strong> ${totals.impressions}</p>

    <h3>🚀 Improving Queries (moved up ${IMPROVE_THRESHOLD}+ positions)</h3>
    ${
      previousRows
        ? improvingRows
          ? `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
              <tr><th>Query</th><th>Position change</th><th>Gain</th><th>Impressions</th></tr>
              ${improvingRows}
            </table>
            <p>These are candidates for a content boost — see the Content Opportunities panel in the dashboard to generate a draft.</p>`
          : '<p>No queries improved significantly this week.</p>'
        : '<p>No previous snapshot yet — this is the first run, trends appear next week.</p>'
    }

    <h3>🎯 Opportunity Queries (position 11–20, closest to page 1)</h3>
    ${
      oppRows
        ? `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
            <tr><th>Query</th><th>Position</th><th>Impressions</th></tr>
            ${oppRows}
          </table>`
        : '<p>No queries currently in this range.</p>'
    }

    <h3>⚠️ Trend Alerts (dropped ${TREND_DROP_THRESHOLD}+ positions)</h3>
    ${
      previousRows
        ? trendRows
          ? `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
              <tr><th>Query</th><th>Position change</th><th>Drop</th></tr>
              ${trendRows}
            </table>`
          : '<p>No significant drops since last snapshot.</p>'
        : ''
    }
  `;
}

async function sendEmail(html: string) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: 'Weekly SEO Report — riverr360.com',
      email: process.env.REPORT_EMAIL_TO,
      message: html,
      html: true,
    }),
  });
  return res.ok;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    const startDate = formatDate(start);
    const endDate = formatDate(end);
    const rangeLabel = `${startDate} to ${endDate}`;

    const currentRows = await fetchGscData(startDate, endDate);

    const previousSnapshot = (await kv.get('gsc:last_snapshot')) as Snapshot | null;
    const previousRows = previousSnapshot ? previousSnapshot.rows : null;

    const { opportunities, trendAlerts, improvingQueries } = analyzeQueries(
      currentRows,
      previousRows
    );

    const html = buildReportHtml(
      currentRows,
      previousRows,
      rangeLabel,
      opportunities,
      trendAlerts,
      improvingQueries
    );
    const emailed = await sendEmail(html);

    const newSnapshot: Snapshot = { date: endDate, rows: currentRows };
    await kv.set('gsc:last_snapshot', newSnapshot);
    await kv.set(`gsc:history:${endDate}`, newSnapshot);

    // Save improving queries separately so the dashboard's "Content Opportunities"
    // panel can read them without recomputing
    await kv.set('gsc:improving_queries', {
      updatedAt: new Date().toISOString(),
      queries: improvingQueries,
    });

    return NextResponse.json({
      success: true,
      emailed,
      rowCount: currentRows.length,
      range: rangeLabel,
      improvingCount: improvingQueries.length,
      opportunityCount: opportunities.length,
      trendAlertCount: trendAlerts.length,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Cron job failed' }, { status: 500 });
  }
}
