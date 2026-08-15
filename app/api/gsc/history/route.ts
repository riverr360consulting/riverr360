import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const HISTORY_INDEX_KEY = 'gsc:fetch:index';

export async function GET() {
  try {
    const index = ((await kv.get(HISTORY_INDEX_KEY)) as string[]) || [];

    // Return lightweight metadata only (not full row data) for a fast list view
    const entries = await Promise.all(
      index.slice(0, 30).map(async (id) => {
        const entry = (await kv.get(`gsc:fetch:${id}`)) as any;
        if (!entry) return null;
        return {
          id,
          startDate: entry.startDate,
          endDate: entry.endDate,
          fetchedAt: entry.fetchedAt,
          rowCount: entry.rowCount,
        };
      })
    );

    return NextResponse.json({ entries: entries.filter(Boolean) });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Failed to load history' },
      { status: 500 }
    );
  }
}
