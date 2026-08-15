import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

type GscRow = {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

const SITE_URL = 'sc-domain:riverr360.com';
const OPPORTUNITY_MIN = 11;
const OPPORTUNITY_MAX = 20;

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

function buildReportHtml(currentRows: GscRow[], rangeLabel: string, opportunities: GscRow[]) {
  const totals = currentRows.reduce(
    (acc, r) => ({ clicks: acc.clicks + r.clicks, impressions: acc.impressions + r.impressions }),
    { clicks: 0, impressions: 0 }
  );

  const oppRows = opportunities
    .slice(0, 15)
    .map(
      (r) =>
        `<tr><td>${r.keys[0]}</td><td align="center">${r.position.toFixed(
          1
        )}</td><td align="center">${r.impressions}</td></tr>`
    )
    .join('');

  return `
    <h2>Weekly SEO Report — riverr360.com</h2>
    <p><strong>Range:</strong> ${rangeLabel}</p>
    <p><strong>Total clicks:</strong> ${totals.clicks} &nbsp;|&nbsp; <strong>Total impressions:</strong> ${totals.impressions}</p>

    <h3>🎯 Opportunity Queries (position 11–20, closest to page 1)</h3>
    ${
      oppRows
        ? `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
            <tr><th>Query</th><th>Position</th><th>Impressions</th></tr>
            ${oppRows}
          </table>`
        : '<p>No queries currently in this range.</p>'
    }

    <p style="color:#9ca3af; font-size:13px; margin-top:16px;">
      Week-over-week trend comparison is not active yet (needs persistent storage — coming later).
    </p>
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

    const opportunities = currentRows
      .filter((r) => r.position >= OPPORTUNITY_MIN && r.position <= OPPORTUNITY_MAX)
      .sort((a, b) => a.position - b.position);

    const html = buildReportHtml(currentRows, rangeLabel, opportunities);
    const emailed = await sendEmail(html);

    return NextResponse.json({
      success: true,
      emailed,
      rowCount: currentRows.length,
      range: rangeLabel,
      opportunityCount: opportunities.length,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Cron job failed' }, { status: 500 });
  }
}
