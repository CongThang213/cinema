"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import api from "@/services/api";
import { User } from "@/types/types";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const authContext = useContext(UserContext);

  const [user, setUser] = useState<Partial<User>>(); // dùng Partial<User> để làm cho tất cả thuộc tính của User trở thành tùy chọn (optional)
  if (!authContext) return <p>Đang tải...</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem("token", data.access_token);
      
      // Giải mã token để lấy thông tin user
      setUser({ email: formData.email, role: "user" }); 
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data.message || "Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-700">Đăng Nhập</h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Đăng Nhập
        </button>
      </form>

      <p className="text-center mt-4 text-gray-500">
        Chưa có tài khoản?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/auth/register")}>
          Đăng ký ngay
        </span>
      </p>
    </div>
  );
}
