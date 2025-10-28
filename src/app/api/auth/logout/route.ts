import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/sessionOptions';

export async function POST(req: NextRequest) {
    const res = NextResponse.json({ ok: true });
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    await session.destroy(); // 쿠키 제거
    return res;
}
