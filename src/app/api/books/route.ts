import { NextRequest, NextResponse } from 'next/server'
import {Book} from "@/types/data";
import {getIronSession} from "iron-session";
import {SessionData, sessionOptions} from "@/lib/sessionOptions";
import {cookies} from "next/headers";
const db = require('@/utils/db')

export async function GET(request: NextRequest) {
  const books:Book = db.getBooks()
  return NextResponse.json(books)
}
export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (session.user?.role !== "user") NextResponse.json({ error: "Forbidden" }, { status: 403});

    const body = await request.json()

    const stock = Math.floor(Math.random() * 20) + 1
    const bookId = db.addBook(body.title, body.price, stock)

    const newBook = {
      id: bookId,
      title: body.title,
      price: body.price,
      stock: stock
    }

    return NextResponse.json(newBook)
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  // id 검증

  db.deleteBook(id)
  return NextResponse.json({ success: true })
}
