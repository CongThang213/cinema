"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { getTheaters, deleteTheater } from "@/services/api";
import TheaterForm from "./TheaterForm";
import { Theater } from "@/types/types";

export default function TheaterAdmin() {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [editingTheater, setEditingTheater] = useState<Theater | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTheaters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTheaters();
      setTheaters(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách rạp:", error);
      alert("Không thể tải danh sách rạp!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTheaters();
  }, [fetchTheaters]);

  const handleDelete = async (id: number) => {
    if (!confirm("⚠ Bạn có chắc chắn muốn xóa rạp này?")) return;
    try {
      await deleteTheater(id);
      setTheaters((prev) => prev.filter((theater) => theater.id !== id));
      alert("✅ Xóa rạp thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa rạp:", error);
      alert("Không thể xóa rạp!");
    }
  };

  const theaterList = useMemo(() => {
    if (loading) return <p className="text-center">🔄 Đang tải danh sách rạp...</p>;
    if (theaters.length === 0) return <p className="text-center text-gray-500">📭 Không có rạp nào!</p>;

    return (
      <ul className="mt-4 space-y-2">
        {theaters.map((theater) => (
          <li key={theater.id} className="flex justify-between p-3 border rounded bg-white shadow">
            <span>{theater.name} - {theater.capacity} ghế</span>
            <div>
              <button className="text-blue-500 hover:underline mr-2" onClick={() => {
                setEditingTheater(theater);
                setIsFormOpen(true);
              }}>
                ✏ Chỉnh sửa
              </button>
              <button className="text-red-500 hover:underline" onClick={() => handleDelete(theater.id)}>
                ❌ Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }, [theaters, loading]);

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingTheater(null);
          setIsFormOpen(true);
        }}
      >
        ➕ Thêm Rạp
      </button>

      {isFormOpen && (
        <TheaterForm
          editingTheater={editingTheater ?? undefined}
          onSaved={() => {
            fetchTheaters();
            setIsFormOpen(false);
          }}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {theaterList}
    </div>
  );
}
