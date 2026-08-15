import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

type InternalLinkCandidate = { title: string; slug: string };

async function getExistingBlogSlugs(): Promise<InternalLinkCandidate[]> {
  // Reads your GitHub repo's content/blog folder listing via the GitHub API
  // so the model can suggest real internal links instead of inventing URLs.
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

    const positionLine = position != null ? `Current Google position: ${position}` : '';
    const impressionsLine = impressions != null ? `Weekly impressions: ${impressions}` : '';

    const prompt = `You are writing a blog post draft for riverr360.com, a marketing solutions consultancy.

The target search query is: "${query}"
${positionLine}
${impressionsLine}

Write a blog post optimized to capture more clicks for this query.

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

    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(`Groq API error: ${errText}`);
    }

    const groqData = await groqRes.json();
    const rawContent = groqData.choices?.[0]?.message?.content || '';

    // Strip accidental markdown fences if the model adds them anyway
    const cleaned = rawContent.replace(/^```json\s*|\s*```$/g, '').trim();

    let draft;
    try {
      draft = JSON.parse(cleaned);
    } catch {
      throw new Error('Model returned invalid JSON — try regenerating');
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
