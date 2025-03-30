"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api"; // 🔥 Gọi API từ backend

interface Seat {
  id: string;
  number: string;
  price: number;
  isBooked: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    // 🛠 Lấy danh sách ghế từ Backend
    api.get(`/seats?movieId=${movieId}`)
      .then((res) => setSeats(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh sách ghế:", err))
      .finally(() => setLoading(false));
  }, [movieId]);

  const handleSelectSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    return seat ? sum + seat.price : sum;
  }, 0);

  if (loading) return <p className="text-center">Đang tải...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Chọn ghế</h1>

      {/* 🎭 Sơ đồ ghế (Chỉ 8 ghế) */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {seats.slice(0, 8).map((seat) => (
          <button
            key={seat.id}
            className={`p-3 border rounded transition-all ${
              seat.isBooked
                ? "bg-gray-400 cursor-not-allowed"
                : selectedSeats.includes(seat.id)
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white hover:bg-gray-200"
            }`}
            disabled={seat.isBooked}
            onClick={() => handleSelectSeat(seat.id)}
          >
            {seat.number}
          </button>
        ))}
      </div>

      <p className="text-lg font-semibold">🧾 Tổng tiền: {totalPrice.toLocaleString()} VND</p>

      <button
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400"
        onClick={() => router.push(`/payment?amount=${totalPrice}&movieId=${movieId}&seats=${selectedSeats.join(",")}`)}
        disabled={selectedSeats.length === 0}
      >
        💳 Thanh toán
      </button>
    </div>
  );
}
