"use client";
import {useEffect, useState} from "react";
import {Book, User} from "@/types/data";
import Header from "@/components/Header";

let API_URL = "http://localhost:3000/api";

export default function Home() {
  const [user, setUser] = useState<User|null>(null)
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<Book[]>([]);
  const [newBookTitle, setnewbooktitle] = useState("");
  const [newBookPrice, setNewBookPrice] = useState<number|"">("");
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    fetch(API_URL + "/auth/me", {cache: 'no-store'})
        .then((res) => res.json())
        .then((data) => setUser(data));

    fetch(API_URL + "/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  useEffect(() => {
    if (!user?.authenticated) return;
    (async () => {
      const cartRes = await fetch("/api/cart", { cache: "no-store", credentials: "same-origin" });
      const data = await cartRes.json()
      setCart(data);
    })();

  }, [user?.authenticated]);

  function addToCart(book : Book) {

    fetch(API_URL + "/cart" , {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId:book.id,
        user:user?.name
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setCart([...cart, book]);
        alert("장바구니에 추가되었습니다!");
      });
  }

  function adminLogin() {
    var password = prompt("관리자 비밀번호를 입력하세요");
  }

  const addBook = () => {
    if (!newBookTitle || !newBookPrice) return;

    fetch(API_URL + "/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newBookTitle,
        price: newBookPrice,
        admin: user?.role == "admin" ? "true" : "false",
      }),
    })
      .then((res) => res.json())
      .then((newBook) => {
        setBooks([...books, newBook]);
        setnewbooktitle("");
        setNewBookPrice("");
      });
  };

  const FilteredBooks = SearchTerm
    ? books.filter((b) =>
        b.title.toLowerCase().includes(SearchTerm.toLowerCase())
      )
    : books;

  if (user === null) return <div>로딩중...</div>;

  return (
    <div className="bg-white min-h-screen">
      <Header/>
      <div className="p-5">
        <input
          placeholder="도서 검색..."
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-5 rounded"
          style={{ border: "1px solid #ddd", background: "#fafafa" }}
        />

        {user.authenticated && user.role == "admin" && (
          <div
            className="p-4 mb-5 rounded"
            style={{ background: "#fffef7", border: "1px solid #f0e68c" }}
          >
            <h3 className="mb-3 font-semibold" style={{ color: "#34495e" }}>
              📝 도서 추가 (관리자 전용)
            </h3>
            <input
              placeholder="제목"
              value={newBookTitle}
              onChange={(e) => setnewbooktitle(e.target.value)}
              className="px-3 py-2 mr-2 border border-gray-300 rounded"
              style={{ background: "#fff" }}
            />
            <input
              placeholder="가격"
              value={newBookPrice}
              inputMode="numeric"    // 모바일 키패드 숫자
              min={0}
              step={1}
              onChange={(e) => setNewBookPrice(Number(e.target.value))}
              className="px-3 py-2 mr-2 border border-gray-300 rounded"
              style={{ background: "#fff" }}
              type="text"
            />
            <button
              onClick={addBook}
              className="px-4 py-2 text-white rounded"
              style={{ background: "#27ae60" }}
            >
              추가
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-5">
          {FilteredBooks.map((book, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg shadow-sm"
              style={{ border: "1px solid #e0e0e0", background: "#fefefe" }}
            >
              <h3 className="mb-2 font-semibold" style={{ color: "#2980b9" }}>
                {book.title}
              </h3>
              <p
                className="text-lg font-bold mb-1"
                style={{ color: "#c0392b" }}
              >
                {book.price}원
              </p>
              <p className="text-sm mb-3" style={{ color: "#7f8c8d" }}>
                재고: {book.stock || "정보없음"}
              </p>
              <button
                onClick={() => addToCart(book)}
                className="w-full py-2 text-white rounded border-0 cursor-pointer"
                style={{ background: "#e74c3c" }}
              >
                장바구니 담기
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 p-5 rounded" style={{ background: "#f8f9fa" }}>
            <h2 className="mb-4 font-bold" style={{ color: "#2c3e50" }}>
              🛒 장바구니 ({cart.length})
            </h2>
            {cart.map((item, i) => (
              <div
                key={i}
                className="py-2 border-b"
                style={{ borderColor: "#dee2e6" }}
              >
                {item.title} - {item.price}원
              </div>
            ))}
            <div
              className="mt-4 text-xl font-bold"
              style={{ color: "#2c3e50" }}
            >
              총액: {cart.reduce((sum, item) => sum + item.price, 0)}
              원
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
