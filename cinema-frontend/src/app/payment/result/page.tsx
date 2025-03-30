"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("Đang xử lý thanh toán...");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setStatus(searchParams.get("status") || "error");
    setMessage(searchParams.get("message") || "Không có thông tin thanh toán.");
    setOrderId(searchParams.get("orderId"));
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <h2
          className={`text-2xl font-bold ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </h2>

        <div className="flex flex-col gap-4 mt-4">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
          >
            Quay lại trang chủ
          </button>

          {status === "success" && orderId && (
            <button
              onClick={() => router.push(`/tickets/${orderId}`)}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
            >
              Xem vé của bạn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
