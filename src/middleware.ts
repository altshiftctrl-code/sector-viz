import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const authorization = req.headers.get('authorization');

  if (authorization) {
    const base64 = authorization.replace(/^Basic\s+/i, '');
    try {
      const decoded = atob(base64);
      const [user, pass] = decoded.split(':');
      if (user === 'nihei' && pass === 'nihei') {
        return NextResponse.next();
      }
    } catch {
      // invalid base64, fall through to 401
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sector Nexus"',
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
