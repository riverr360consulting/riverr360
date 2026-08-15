import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    const data = (await kv.get('gsc:improving_queries')) as {
      updatedAt: string;
      queries: {
        query: string;
        from: number;
        to: number;
        delta: number;
        impressions: number;
      }[];
    } | null;

    return NextResponse.json(data || { updatedAt: null, queries: [] });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Failed to load improving queries' },
      { status: 500 }
    );
  }
}
