import { NextRequest, NextResponse } from 'next/server';

const areaLabels: Record<string, string> = {
  lead_response: 'Lead Response',
  landing_page: 'Landing Page',
  follow_up: 'Follow-up Automation',
  crm: 'CRM Usage',
  retargeting: 'Retargeting',
  reviews: 'Review Management',
  tracking: 'Conversion Tracking',
};

function getBand(score: number) {
  if (score <= 30) return 'Critical';
  if (score <= 70) return 'High Risk';
  if (score <= 70) return 'Moderate';
  if (score <= 85) return 'Good';
  return 'Excellent';
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, business, website, budget, scores, total } = body;
  const band = getBand(total);

  const scoreSummary = Object.entries(scores as Record<string, number>)
    .map(([id, score]) => `${areaLabels[id] || id}: ${score}/10`)
    .join('\n');

  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'bd8222f1-81ef-4ed7-9182-09c0c52ae333',
        subject: `New Revenue Leakage Score: ${name} — ${total}/70 (${band})`,
        from_name: name,
        Name: name,
        Email: email,
        Phone: phone,
        Business: business,
        Website: website,
        'Marketing Budget': budget,
        'Total Score': `${total}/70 — ${band}`,
        'Score Breakdown': scoreSummary,
        'Submission Date': new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error('Web3Forms error:', err);
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://riverr360.com';
    await fetch(`${baseUrl}/api/admin/zoho-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, email, phone,
        company: business,
        source: 'Revenue Leakage Score Tool',
        description: `Score: ${total}/70 — ${band}\n\n${scoreSummary}\n\nWebsite: ${website}\nBudget: ${budget}`,
      }),
    });
  } catch (err) {
    console.error('Zoho error:', err);
  }

  return NextResponse.json({ success: true, total, band });
}
