import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authCookie = request.cookies.get('admin_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { siteTitle, siteDesc, metaPixelId, gtmId } = await request.json();
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  if (!token || !repo) {
    return NextResponse.json({ error: 'GitHub not configured' }, { status: 500 });
  }

  // Update layout.tsx
  const layoutPath = 'app/layout.tsx';
  const layoutRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${layoutPath}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  );

  if (!layoutRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch layout.tsx from GitHub' }, { status: 500 });
  }

  const layoutData = await layoutRes.json();
  let layoutContent = Buffer.from(layoutData.content, 'base64').toString('utf-8');

  // Update site title
  if (siteTitle) {
    layoutContent = layoutContent.replace(
      /default: '[^']*'/,
      `default: '${siteTitle}'`
    );
  }

  // Update meta description
  if (siteDesc) {
    layoutContent = layoutContent.replace(
      /description:\s*\n?\s*'[^']*'/,
      `description:\n    '${siteDesc}'`
    );
  }

  // Push layout.tsx update
  await fetch(
    `https://api.github.com/repos/${repo}/contents/${layoutPath}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'update: site title and description',
        content: Buffer.from(layoutContent).toString('base64'),
        sha: layoutData.sha,
      }),
    }
  );

  // Update MetaPixel.tsx if pixel ID changed
  if (metaPixelId) {
    const pixelPath = 'components/MetaPixel.tsx';
    const pixelRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${pixelPath}`,
      { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
    );

    if (pixelRes.ok) {
      const pixelData = await pixelRes.json();
      let pixelContent = Buffer.from(pixelData.content, 'base64').toString('utf-8');
      pixelContent = pixelContent.replace(
        /const META_PIXEL_ID = '[^']*'/,
        `const META_PIXEL_ID = '${metaPixelId}'`
      );

      await fetch(
        `https://api.github.com/repos/${repo}/contents/${pixelPath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'update: Meta Pixel ID',
            content: Buffer.from(pixelContent).toString('base64'),
            sha: pixelData.sha,
          }),
        }
      );
    }
  }

  // Update GTM if provided — add to layout.tsx head
  if (gtmId && gtmId.startsWith('GTM-')) {
    const gtmScript = `
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: \`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');\`,
        }}
      />`;

    // Only add if not already present
    if (!layoutContent.includes('gtm-script')) {
      const layoutRes2 = await fetch(
        `https://api.github.com/repos/${repo}/contents/${layoutPath}`,
        { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
      );
      const layoutData2 = await layoutRes2.json();
      let layoutContent2 = Buffer.from(layoutData2.content, 'base64').toString('utf-8');
      layoutContent2 = layoutContent2.replace(
        '<MetaPixel />',
        `<MetaPixel />${gtmScript}`
      );
      await fetch(
        `https://api.github.com/repos/${repo}/contents/${layoutPath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `update: add GTM ${gtmId}`,
            content: Buffer.from(layoutContent2).toString('base64'),
            sha: layoutData2.sha,
          }),
        }
      );
    }
  }

  return NextResponse.json({ success: true });
}
