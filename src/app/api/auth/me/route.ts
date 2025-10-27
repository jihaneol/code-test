// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/sessionOptions';

export async function GET(req: NextRequest) {
    const res = NextResponse.next(); // dummy res
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (!session.user) return NextResponse.json({ authenticated: false });

    return NextResponse.json({
        authenticated: true,
        name: session.user.name,
        role: session.user.role,
    });
}
