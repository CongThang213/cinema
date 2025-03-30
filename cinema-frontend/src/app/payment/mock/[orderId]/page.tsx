"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MockPayment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(() => ({
    orderId: searchParams.get("orderId") ?? "",
    amount: searchParams.get("amount") ?? "",
    method: searchParams.get("method") ?? "",
  }), [searchParams]);

  const [message, setMessage] = useState("Đang xử lý thanh toán...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.orderId || !params.amount || !params.method) {
      setMessage("Lỗi: Thiếu thông tin thanh toán!");
      setLoading(false);
      return;
    }

    const processPayment = async () => {
      try {
        const res = await fetch(`/api/payment/mock/${params.orderId}?amount=${params.amount}&method=${params.method}`);
        if (!res.ok) throw new Error("Lỗi kết nối với server");

        const data = await res.json();
        setMessage(data.message);

        setTimeout(() => {
          router.push(`/payment/result?status=${data.status}&message=${encodeURIComponent(data.message)}&orderId=${params.orderId}`);
        }, 3000);
      } catch (error) {
        setMessage("Lỗi khi xử lý thanh toán. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [params, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold">{message}</h2>
        {loading && <p className="text-gray-500">Vui lòng chờ...</p>}
      </div>
    </div>
  );
}
