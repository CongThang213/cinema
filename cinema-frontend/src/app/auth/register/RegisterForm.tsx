"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", formData);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data.message || "Email đã tồn tại hoặc dữ liệu không hợp lệ!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">Đăng Ký</h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 focus:border-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 focus:border-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Đăng Ký
        </button>
      </form>

      <p className="text-center mt-4 text-gray-500">
        Đã có tài khoản?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/auth/login")}>
          Đăng nhập ngay
        </span>
      </p>
    </div>
  );
}
