import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

let isFetching = false;

export async function middleware(request: NextRequest) {
    const rfToken = request.cookies.get('rfToken')?.value;
    if (!rfToken) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const data = await fetch('http://localhost:3003/api/v1/auth/verifyRF', {
        headers: {
            cookie: `rfToken=${rfToken}`,
        },
        credentials: 'include',
    });

    if (data.status !== 200) {
        const resp = NextResponse.redirect(new URL('/', request.url));
        resp.cookies.set('rfToken', '');
        return resp;
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/user/:path*',
};
