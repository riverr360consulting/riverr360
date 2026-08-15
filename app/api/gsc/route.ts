import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { kv } from '@vercel/kv';

const SITE_URL = 'sc-domain:riverr360.com';
const HISTORY_INDEX_KEY = 'gsc:fetch:index';
const MAX_HISTORY_ENTRIES = 100; // keep the index from growing forever

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    const credentials = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_KEY as string);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 100,
      },
    });

    const data = response.data;

    // --- Persist this fetch to KV for history ---
    try {
      const fetchedAt = new Date().toISOString();
      const rangeKey = `${startDate}_${endDate}`;
      const entry = {
        startDate,
        endDate,
        fetchedAt,
        rowCount: data.rows?.length || 0,
        rows: data.rows || [],
      };

      // Save this specific fetch (overwrites if same range fetched again same day)
      await kv.set(`gsc:fetch:${rangeKey}:${fetchedAt}`, entry);

      // Maintain a lightweight index of recent fetches (for listing history later)
      const index = ((await kv.get(HISTORY_INDEX_KEY)) as string[]) || [];
      index.unshift(`${rangeKey}:${fetchedAt}`);
      await kv.set(HISTORY_INDEX_KEY, index.slice(0, MAX_HISTORY_ENTRIES));
    } catch (kvError) {
      // Don't fail the whole request if KV saving has an issue —
      // the dashboard should still show live data even if history saving hiccups
      console.error('KV history save failed:', kvError);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch GSC data' },
      { status: 500 }
    );
  }
}
