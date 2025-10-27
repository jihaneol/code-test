import {NextRequest, NextResponse} from 'next/server'
import {SessionData, sessionOptions} from "@/lib/sessionOptions";
import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {Book} from "@/types/data";

const db = require('@/utils/db')

export async function GET(request: NextRequest) {

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if(session.user?.role!=="admin")return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const books : Book[] =  db.getCart(session.user.name)
    return NextResponse.json(books)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const user = body.user || 'anonymous'
    const bookId = body.bookId

    db.addToCart(bookId, user)

    return NextResponse.json({success: true})
}

export async function DELETE(request: NextRequest) {
    const {searchParams} = new URL(request.url)
    const user = searchParams.get('user')

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


    const role = session.user?.role
    const name = session.user?.name
    if (user == 'all') {
        if(role!=="admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        db.deleteAllCart()
        return NextResponse.json({message: '모든 장바구니 삭제됨'}, {status:200})
    }

    db.deleteCart(name)
    return NextResponse.json({success: true},{status:200})
}
