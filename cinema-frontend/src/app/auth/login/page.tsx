"use client"; // Dùng hooks trong Next.js 13+

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api"; // Import API

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Lưu token
      router.push("/dashboard"); // Chuyển hướng sau khi đăng nhập
    } catch (err: any) {
      setError("Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Đăng nhập
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Chưa có tài khoản?{" "}
        <a href="/auth/register" className="text-blue-500 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}
