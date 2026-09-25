import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // Note: Since we're using localStorage for token storage (client-side),
  // we can't properly protect routes at the middleware level.
  // This is a simplified approach - proper protection should be done
  // client-side with useEffect checks in each protected route.
  
  // For now, we'll allow all routes and let client-side logic handle redirects
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};