"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MoviesAdmin from "./MoviesAdmin";
import api from "@/services/api";

export default function MoviesPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/auth/me");
        setIsAdmin(res.data.role === "admin");
      } catch (error) {
        console.error("Lỗi khi kiểm tra quyền:", error);
        setIsAdmin(false);
      }
    })();
  }, []);

  if (isAdmin === null) return <p>Đang kiểm tra quyền...</p>;
  if (!isAdmin) {
    router.replace("/login");
    return null;
  }

  return <MoviesAdmin />;
}
