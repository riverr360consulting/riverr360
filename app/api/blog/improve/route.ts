import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const { title, content, keywords } = await req.json();

    if (!content || !keywords?.length) {
      return NextResponse.json(
        { error: 'content and at least one keyword are required' },
        { status: 400 }
      );
    }

    const keywordLines = keywords
      .map((k: { query: string; position?: number; impressions?: number }) => {
        const stats =
          k.position != null
            ? ` (currently position ${k.position}, ${k.impressions ?? '?'} impressions/week)`
            : '';
        return `- "${k.query}"${stats}`;
      })
      .join('\n');

    const prompt = `You are improving an existing blog post on riverr360.com to rank better for specific target keywords.

Current title: "${title || 'Untitled'}"

Target keywords to strengthen coverage for:
${keywordLines}

Current post content (Markdown):
---
${content}
---

Rewrite and improve this post so it more directly and naturally addresses each target keyword above. You may:
- Add or expand sections that speak directly to these queries
- Improve headings (H2/H3) to include keyword phrasing naturally, without keyword-stuffing
- Keep the tone and structure consistent with the existing post
- Preserve any good existing content — don't remove value, only strengthen and expand

Return ONLY valid JSON, no markdown fences, no preamble, in this exact shape:
{
  "improvedContent": "Full revised blog post in Markdown",
  "summary": "2-3 sentence summary of what was changed and why, for the editor's review"
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
        temperature: 0.6,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      throw new Error(`Groq API error: ${errText}`);
    }

    const groqData = await groqRes.json();
    const rawContent = groqData.choices?.[0]?.message?.content || '';
    const cleaned = rawContent.replace(/^```json\s*|\s*```$/g, '').trim();

    let result;
    try {
      result = JSON.parse(cleaned);
    } catch {
      throw new Error('Model returned invalid JSON — try again');
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || 'Failed to improve content' },
      { status: 500 }
    );
  }
}
