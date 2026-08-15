import { NextRequest, NextResponse } from 'next/server';

const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';

type InternalLinkCandidate = { title: string; slug: string };

async function getExistingBlogSlugs(): Promise<InternalLinkCandidate[]> {
  // Reads your GitHub repo's content/blog folder listing via the GitHub API
  // so Grok can suggest real internal links instead of inventing URLs.
  const owner = 'riverr360consulting';
  const repo = 'riverr360';
  const path = 'content/blog';

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );
    if (!res.ok) return [];
    const files = await res.json();
    return (files as any[])
      .filter((f) => f.name.endsWith('.md') || f.name.endsWith('.mdx'))
      .map((f) => ({
        title: f.name.replace(/\.(md|mdx)$/, '').replace(/-/g, ' '),
        slug: f.name.replace(/\.(md|mdx)$/, ''),
      }));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { query, position, impressions } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'query is required' }, { status: 400 });
    }

    const existingPosts = await getExistingBlogSlugs();
    const existingPostsList = existingPosts
      .slice(0, 20)
      .map((p) => `- ${p.title} (slug: ${p.slug})`)
      .join('\n');

    const prompt = `You are writing a blog post draft for riverr360.com, a marketing solutions consultancy.

The target search query is: "${query}"
Current Google position: ${position}
Weekly impressions: ${impressions}

This query is trending upward in Search Console — write a blog post optimized to capture more clicks for it.

Existing blog posts on the site (for internal linking):
${existingPostsList || 'None available'}

Return ONLY valid JSON, no markdown fences, no preamble, in this exact shape:
{
  "title": "SEO-friendly title, under 60 characters",
  "metaDescription": "under 155 characters, compelling, includes the target query naturally",
  "slug": "url-friendly-slug",
  "body": "Full blog post in Markdown, 700-1000 words, with H2/H3 subheadings",
  "suggestedInternalLinks": ["slug-from-existing-list-1", "slug-from-existing-list-2"],
  "suggestedExternalLinks": [
    {"anchorText": "example anchor", "url": "https://example.com", "reason": "why this is a credible external source"}
  ]
}`;

    const grokRes = await fetch(XAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!grokRes.ok) {
      const errText = await grokRes.text();
      throw new Error(`Grok API error: ${errText}`);
    }

    const grokData = await grokRes.json();
    const rawContent = grokData.choices?.[0]?.message?.content || '';

    // Strip accidental markdown fences if the model adds them anyway
    const cleaned = rawContent.replace(/^```json\s*|\s*```$/g, '').trim();

    let draft;
    try {
      draft = JSON.parse(cleaned);
    } catch {
      throw new Error('Grok returned invalid JSON — try regenerating');
    }

    return NextResponse.json({ draft, sourceQuery: query, position, impressions });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate draft' },
      { status: 500 }
    );
  }
}
