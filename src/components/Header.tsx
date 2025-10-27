
import Link from "next/link";
import {useEffect, useState} from "react";
import {User} from "@/types/data";
import {useRouter} from "next/navigation";

export default function Header() {
    const route = useRouter()
    const [user, setUser] = useState<User|null>(null)

    useEffect(() => {
        (async () => {
            const res = await fetch('/api/auth/me', { cache: 'no-store' });
            const data = await res.json();
            setUser(data);
        })();
    }, []);

    async function onLogout() {
        const res = await fetch('/api/auth/logout', {method: 'POST'})
        const data  = await res.json()
        route.push("/login")
        route.refresh()
    }

    return (
        <header className="p-4 mb-5" style={{background: "#2c3e50", color: "white"}}>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📚 레거시 서점</h2>
                <div className="flex gap-4">

                    <Link href="/" className="px-3 py-1 rounded bg-[#34495e]">홈</Link>
                    {!user?.authenticated ? (
                        <Link href="/login" className="px-3 py-1 rounded bg-[#34495e]">로그인</Link>
                    ) : (
                        <button onClick={onLogout} className="px-3 py-1 rounded bg-[#34495e]">
                            로그아웃
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}