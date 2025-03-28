"use client";

import { useState, useEffect } from "react";
import { getShowtimes, deleteShowtime } from "@/services/api";
import ShowtimeForm from "./ShowtimeForm";
import { Showtime } from "@/types/types";

export default function ShowtimesAdmin() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShowtimes();
  }, []);

  const fetchShowtimes = async () => {
    setLoading(true);
    try {
      const res = await getShowtimes();
      if (res && res.data) {
        // Chuyển đổi startTime từ string => Date
        const formattedShowtimes = res.data.map((showtime: any) => ({
          ...showtime,
          startTime: new Date(showtime.startTime),
        }));
  
        setShowtimes(formattedShowtimes);
      } else {
        console.error("❌ API trả về dữ liệu không hợp lệ:", res);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy lịch chiếu:", error);
      alert("Không thể tải danh sách lịch chiếu!");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa lịch chiếu này?")) return;
    try {
      await deleteShowtime(id);
      alert("✅ Xóa lịch chiếu thành công!");
      fetchShowtimes();
    } catch (error) {
      console.error("❌ Lỗi khi xóa lịch chiếu:", error);
      alert("Lỗi khi xóa lịch chiếu! Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <ShowtimeForm
        editingShowtime={editingShowtime}
        onShowtimeSaved={fetchShowtimes}
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
                  {new Date(showtime.startTime).toLocaleString()}
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
