// app/api/seo/route.ts
//
// Single endpoint for reading and saving SEO/site settings.
// GET  /api/seo  → returns current settings
// POST /api/seo  → saves new settings

import { NextRequest, NextResponse } from 'next/server';
import { saveSiteSettings, getSiteSettings, SiteSettings } from '@/lib/seo';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { siteTitle, siteDesc, metaPixelId, gtmId } = body;

    if (!siteTitle || typeof siteTitle !== 'string') {
      return NextResponse.json({ error: 'Invalid site title' }, { status: 400 });
    }
    if (siteDesc && siteDesc.length > 160) {
      return NextResponse.json({ error: 'Description must be under 160 characters' }, { status: 400 });
    }

    const settings: SiteSettings = {
      siteTitle: siteTitle.trim(),
      siteDesc: (siteDesc || '').trim(),
      metaPixelId: (metaPixelId || '').trim(),
      gtmId: (gtmId || '').trim(),
    };

    await saveSiteSettings(settings);

    revalidatePath('/');
    revalidatePath('/layout');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[api/seo] Error:', err);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
