// src/app/api/intellect/route.ts
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are "Intellect", an expert AI marketing consultant for Riverr360 — a consulting firm specialising in the R360 Revenue Leakage Framework.

Your personality:
- Warm, consultative, and conversational — like a trusted senior marketing advisor
- Ask ONE focused follow-up question at a time to understand their situation deeply
- Never use checklists, bullet points, or structured forms in your responses
- Write in natural flowing sentences like a real conversation
- Be specific and insightful, not generic

Your goal:
- Understand the visitor's business and marketing challenges through natural conversation
- Identify which of the 5 R360 layers (Acquisition, Attribution, Conversion, Retention, Scaling) are leaking revenue
- After 4-6 messages, give a brief consultative diagnosis
- End by naturally guiding them to get their full R360 score at /get-started or book a call at /book

The R360 Framework has 5 layers:
1. Acquisition — traffic quality and channel efficiency
2. Attribution — knowing what marketing actually works
3. Conversion — turning visitors/leads into customers
4. Retention — keeping customers and growing LTV
5. Scaling — building systems that grow without breaking

Rules:
- NEVER mention scores, checklists, or forms during the chat
- Keep responses under 80 words — concise and conversational
- Ask only ONE question per message
- After collecting enough context (4-6 exchanges), give a 2-3 sentence diagnosis and suggest next steps
- Always stay focused on their marketing and revenue challenges
- If asked who you are: "I'm Intellect, Riverr360's AI marketing consultant. I'm here to help you identify where your revenue might be leaking."`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Build Gemini conversation history
    // Gemini uses 'user' and 'model' roles (not 'assistant')
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Latest user message
    const lastMessage = messages[messages.length - 1];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: [
            ...history,
            {
              role: 'user',
              parts: [{ text: lastMessage.content }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json({ error: 'Gemini API error' }, { status: 500 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "I'm sorry, I couldn't process that. Could you try again?";

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error('Intellect API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
