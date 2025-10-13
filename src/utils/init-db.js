const Database = require('better-sqlite3')
const path = require('path')

const DB_PATH = path.join(process.cwd(), 'bookstore.db')
const db = new Database(DB_PATH)

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER DEFAULT 0
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS admin_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

const count = db.prepare('SELECT COUNT(*) as count FROM books').get()

if (count.count === 0) {
  const insert = db.prepare('INSERT INTO books (title, price, stock) VALUES (?, ?, ?)')

  insert.run('클린 코드', 33000, 15)
  insert.run('리팩터링', 35000, 8)
  insert.run('실용주의 프로그래머', 32000, 12)
  insert.run('오브젝트', 36000, 20)
  insert.run('HTTP 완벽 가이드', 40000, 5)
  insert.run('자바스크립트 Deep Dive', 45000, 10)

  console.log('초기 데이터 삽입 완료')
}

db.close()
console.log('DB 초기화 완료')
