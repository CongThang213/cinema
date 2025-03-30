"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShowtimesAdmin from "./ShowtimesAdmin";
import api from "@/services/api";
import { CircularProgress } from "@mui/material";

export default function ShowtimesPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        if (res.data.role === "admin") {
          setIsAdmin(true);
        } else {
          router.replace("/login");
        }
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (isAdmin === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return <ShowtimesAdmin />;
}
