import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = process.env.ZOHO_API_TOKEN;
  const accountOwner = process.env.ZOHO_ACCOUNT_OWNER;

  if (!token || !accountOwner) {
    // Zoho not configured yet — silently succeed so forms still work
    return NextResponse.json({ success: true, note: 'Zoho not configured' });
  }

  const leadData = {
    data: [
      {
        Last_Name: body.name || 'Unknown',
        First_Name: '',
        Email: body.email || '',
        Phone: body.phone || '',
        Company: body.company || 'Not provided',
        Lead_Source: body.source || 'Website',
        Description: body.description || '',
        Lead_Status: 'New',
        Owner: { email: accountOwner },
      },
    ],
  };

  try {
    const res = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Zoho error:', err);
      return NextResponse.json({ success: false, error: err }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Zoho fetch error:', err);
    return NextResponse.json({ success: false, error: 'Network error' }, { status: 500 });
  }
}
