"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth"; // Hook lấy thông tin user

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/"); // Chuyển về trang Home nếu không phải Admin
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
