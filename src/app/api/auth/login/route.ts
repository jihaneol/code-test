import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/sessionOptions';

export async function POST(req: NextRequest) {
    const { user_name, password } = await req.json();
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (!user_name || !password) {
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }
    const res = NextResponse.json({ ok: true });
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (password === ADMIN_PASSWORD) {
        session.user = {authenticated:true, name: user_name, role: 'admin' };
    } else {
        return NextResponse.json({ error: 'fail password' }, { status: 401 });
    }
    await session.save(); // 여기서 쿠키에 암호화/서명되어 저장됨
    return res;
}
