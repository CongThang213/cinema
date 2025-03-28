"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MoviesAdmin from "./MoviesAdmin";
import api from "@/services/api";

export default function MoviesPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await api.get("/auth/me");
        setIsAdmin(res.data.role === "admin");
        if (res.data.role !== "admin") {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền:", error);
        router.replace("/login");
      }
    };

    checkAdmin();
  }, [router]);

  if (isAdmin === null) return <p className="text-center mt-4">Đang kiểm tra quyền truy cập...</p>;

  return isAdmin ? <MoviesAdmin /> : null;
}
