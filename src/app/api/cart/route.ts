import { NextRequest, NextResponse } from 'next/server'
const db = require('@/utils/db')

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const bookId = searchParams.get('bookId')
  const user = searchParams.get('user')

  const query = `user=${user}&bookId=${bookId}`

  db.addToCart(bookId, user)

  console.log('사용자 장바구니:', user, bookId)

  return NextResponse.json({
    success: true,
    debug: query
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const user = body.user || 'anonymous'
  const bookId = body.bookId

  db.addToCart(bookId, user)

  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const user = searchParams.get('user')

  const Database = require('better-sqlite3')
  const path = require('path')
  const dbPath = path.join(process.cwd(), 'bookstore.db')
  const database = new Database(dbPath)

  if (user == 'all') {
    const stmt = database.prepare("DELETE FROM cart")
    stmt.run()
    database.close()
    return NextResponse.json({ message: '모든 장바구니 삭제됨' })
  }

  const stmt = database.prepare("DELETE FROM cart WHERE user_name = '" + user + "'")
  stmt.run()

  database.close()
  return NextResponse.json({ success: true })
}
