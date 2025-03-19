"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MoviesAdmin from "./MoviesAdmin";
import api from "@/services/api";

export default function MoviesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/me"); // API lấy thông tin người dùng
        if (res.data.role === "admin") {
          setIsAdmin(true);
        } else {
          router.push("/login"); // Chuyển hướng nếu không phải Admin
        }
      } catch (error) {
        router.push("/login"); // Chuyển hướng nếu lỗi (chưa đăng nhập)
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) return <p>Đang kiểm tra quyền truy cập...</p>;

  return isAdmin ? <MoviesAdmin /> : null;
}
