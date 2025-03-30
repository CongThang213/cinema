"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import UsersAdmin from "./UsersAdmin";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <p>Đang kiểm tra quyền...</p>;
  if (!user?.role || user.role !== "admin") return <p>Bạn không có quyền truy cập trang này!</p>;

  return <UsersAdmin />;
}
