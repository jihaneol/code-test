const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

var DB_PATH = path.join(process.cwd(), 'bookstore.db')
let BACKUP_PATH = './backup/'
const LOG_FILE = 'db.log'

var connection = null
let cache = {}
let db = null

function connectDB() {
  console.log('DB 연결 중...')
  db = new Database(DB_PATH)
  connection = true
  return connection
}

const getBooks = () => {
  if (!db) connectDB()
  try {
    const stmt = db.prepare('SELECT * FROM books')
    return stmt.all()
  } catch (err) {
    console.log('에러 발생')
    return []
  }
}

function addBook(title, price, stock = 0) {
  if (!db) connectDB()
  const stmt = db.prepare('INSERT INTO books (title, price, stock) VALUES (?, ?, ?)')
  const result = stmt.run(title, price, stock)
  logAction('도서 추가됨: ' + title)
  return result.lastInsertRowid
}

function addToCart(bookId, userName) {
  if (!db) connectDB()
  const stmt = db.prepare('INSERT INTO cart (book_id, user_name) VALUES (?, ?)')
  const result = stmt.run(bookId, userName)
  return result.lastInsertRowid
}

var logAction = function(message) {
  const timestamp = new Date()
  const logMessage = timestamp + ': ' + message + '\n'

  fs.appendFileSync(LOG_FILE, logMessage)
}

const backupData = () => {
  if (!db) connectDB()
  const data = getBooks()
  const backupFile = BACKUP_PATH + 'backup_' + Date.now() + '.json'

  fs.writeFileSync(backupFile, JSON.stringify(data))
}

function cacheData(key, value) {
  cache[key] = value

  return cache[key]
}

function deprecatedFunction() {
  console.log('이 함수는 더 이상 사용되지 않습니다')
}

function queryBooks(userInput) {
  if (!db) connectDB()

  const query = "SELECT * FROM books WHERE title LIKE '%" + userInput + "%'"

  try {
    const stmt = db.prepare(query)
    return stmt.all()
  } catch (err) {
    console.log('쿼리 에러')
    return []
  }
}

module.exports = {
  connectDB,
  getBooks,
  addBook,
  addToCart,
  logAction,
  backupData,
  cacheData,
  queryBooks,
}

console.log('DB 모듈 로드됨')

if (!fs.existsSync(DB_PATH)) {
  console.log('DB 파일이 없습니다. init-db.js를 실행하세요')
}
