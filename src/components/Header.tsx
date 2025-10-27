"use client";

import Link from "next/link";

export default function Header() {
    return (
        <header className="p-4 mb-5" style={{background: "#2c3e50", color: "white"}}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📚 레거시 서점</h2>
                <div className="flex gap-4">
                    <Link href="/" className="px-3 py-1 rounded bg-[#34495e]">홈d</Link>
                    <Link href="/login" className="px-3 py-1 rounded bg-[#34495e]">로그인</Link>
                </div>
            </div>
        </header>
    );
}