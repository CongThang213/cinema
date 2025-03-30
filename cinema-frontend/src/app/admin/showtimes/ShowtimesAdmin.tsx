"use client";

import { useState, useEffect, useCallback } from "react";
import { getShowtimes, deleteShowtime } from "@/services/api";
import ShowtimeForm from "./ShowtimeForm";
import { Showtime } from "@/types/types";

export default function ShowtimesAdmin() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch danh sách suất chiếu
  const fetchShowtimes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getShowtimes();
      if (res?.data) {
        setShowtimes(
          res.data.map((s: any) => ({
            id: s.id,
            startTime: new Date(s.startTime), // Chuyển string → Date ngay từ đầu
          }))
        );
      }
    } catch (error) {
      console.error("❌ Lỗi lấy lịch chiếu:", error);
      alert("Không thể tải danh sách lịch chiếu!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShowtimes();
  }, [fetchShowtimes]);

  // 🗑 Xóa suất chiếu
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa lịch chiếu này?")) return;
    try {
      await deleteShowtime(id);
      setShowtimes((prev) => prev.filter((s) => s.id !== id));
      alert("✅ Xóa lịch chiếu thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa lịch chiếu:", error);
      alert("Lỗi khi xóa lịch chiếu! Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <ShowtimeForm
        editingShowtime={editingShowtime}
        onShowtimeSaved={(newShowtime) => {
          setShowtimes((prev) =>
            prev.some((s) => s.id === newShowtime.id)
              ? prev.map((s) =>
                  s.id === newShowtime.id ? { ...newShowtime } : s
                )
              : [...prev, newShowtime]
          );
          setEditingShowtime(null);
        }}
      />

      {loading ? (
        <p className="text-center mt-4">Đang tải danh sách lịch chiếu...</p>
      ) : (
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Thời gian</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime) => (
              <tr key={showtime.id} className="border">
                <td className="p-2 border">{showtime.id}</td>
                <td className="p-2 border">
                  {showtime.startTime.toLocaleString()} {/* Hiển thị đúng format */}
                </td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => setEditingShowtime(showtime)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(showtime.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
