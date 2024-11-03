import { NextRequest, NextResponse } from 'next/server';

let locales = ['en'];

/**
 * Middleware to perform logic on all incoming requests.
 * @param {NextRequest} request - The incoming request.
 * @returns {any} Anything.
 */
export function middleware(request: NextRequest): any {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }
    const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
    if (pathnameHasLocale) {
        return;
    }
    // Redirect if there is no locale. For now, only `en` is supported.
    const locale = 'en';
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ['/((?!favicon.ico|robots.txt|_next).*)'],
};
