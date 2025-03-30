"use client";

import { useAuth } from "@/app/hooks/useAuth";
import TheaterAdmin from "./TheaterAdmin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.replace("/"); // Điều hướng nhanh hơn với replace
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-center">🔄 Đang kiểm tra quyền...</p>;
  if (!user?.isAdmin) return <p className="text-center text-red-500">🚫 Bạn không có quyền truy cập!</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎬 Quản lý Rạp Chiếu</h1>
      <TheaterAdmin />
    </div>
  );
}
