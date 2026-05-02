import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { siteTitle, siteDesc, metaPixelId } = await request.json();

  // Update layout.tsx metadata
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  let content = fs.readFileSync(layoutPath, 'utf-8');
  content = content.replace(/default: '[^']*'/, `default: '${siteTitle}'`);
  content = content.replace(/description:\s*\n?\s*'[^']*'/, `description:\n    '${siteDesc}'`);
  fs.writeFileSync(layoutPath, content, 'utf-8');

  // Update Meta Pixel ID if changed
  if (metaPixelId) {
    const pixelPath = path.join(process.cwd(), 'components', 'MetaPixel.tsx');
    if (fs.existsSync(pixelPath)) {
      let pixelContent = fs.readFileSync(pixelPath, 'utf-8');
      pixelContent = pixelContent.replace(/const META_PIXEL_ID = '[^']*'/, `const META_PIXEL_ID = '${metaPixelId}'`);
      fs.writeFileSync(pixelPath, pixelContent, 'utf-8');
    }
  }

  return NextResponse.json({ success: true });
}
