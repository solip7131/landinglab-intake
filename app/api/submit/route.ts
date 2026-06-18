import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const scriptUrl = process.env.SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json({ error: 'SCRIPT_URL not configured' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Apps Script responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Submit error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
