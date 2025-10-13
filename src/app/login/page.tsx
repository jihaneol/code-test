"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

var ADMIN_PASSWORD = "admin123";

export default function Login() {
  const router = useRouter();
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (password == ADMIN_PASSWORD) {
      alert("로그인 성공!");
      router.push("/?admin=true&user=" + user_name);
    } else {
      alert("비밀번호가 틀렸습니다");
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <nav
        className="p-4 mb-5"
        style={{ background: "#2c3e50", color: "white" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">📚 레거시 서점</h2>
          <div className="flex gap-4">
            <a
              href="/"
              className="px-3 py-1 rounded"
              style={{ background: "#34495e" }}
            >
              홈
            </a>
            <a
              href="/login"
              className="px-3 py-1 rounded"
              style={{ background: "#34495e" }}
            >
              로그인
            </a>
          </div>
        </div>
      </nav>

      <div className="p-5">
        <h1
          style={{ color: "#2c3e50", fontSize: "32px" }}
          className="mb-6 font-bold"
        >
          🔐 관리자 로그인
        </h1>

        <div className="max-w-md">
          <div className="mb-4">
            <label className="block mb-2" style={{ color: "#34495e" }}>
              사용자 이름
            </label>
            <input
              placeholder="사용자 이름"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              style={{ background: "#fafafa" }}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2" style={{ color: "#34495e" }}>
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              style={{ background: "#fafafa" }}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-white rounded"
            style={{ background: "#27ae60" }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
