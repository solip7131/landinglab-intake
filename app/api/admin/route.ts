import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password');
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const scriptUrl = process.env.SCRIPT_URL;
  if (!scriptUrl) {
    return NextResponse.json({ error: 'SCRIPT_URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${scriptUrl}?action=list`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Apps Script responded with ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Admin fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
