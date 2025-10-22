import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('mettaway_auth');
  const { searchParams } = new URL(request.url);
  const guest = searchParams.get('guest');

  // Allow access if either authenticated via cookie OR guest=true
  const authenticated = authCookie?.value === 'true' || guest === 'true';

  return NextResponse.json({
    authenticated,
    guest: guest === 'true'
  });
}

