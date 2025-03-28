"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { username, email, password });
      router.push("/auth/login"); // Chuyển hướng sau khi đăng ký thành công
    } catch (err: any) {
      setError("Email đã tồn tại hoặc dữ liệu không hợp lệ!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Đăng ký</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
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
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Đăng ký
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Đã có tài khoản?{" "}
        <a href="/auth/login" className="text-blue-500 hover:underline">
          Đăng nhập ngay
        </a>
      </p>
    </div>
  );
}
