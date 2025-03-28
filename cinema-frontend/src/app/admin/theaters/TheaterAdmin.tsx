"use client";

import { useEffect, useState, useCallback } from "react";
import { getTheaters, deleteTheater } from "@/services/api";
import TheaterForm from "./TheaterForm";
import { Theater } from "@/types/types";

export default function TheaterAdmin() {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [editingTheater, setEditingTheater] = useState<Theater | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Dùng useCallback để tránh render lại không cần thiết
  const fetchTheaters = useCallback(async () => {
    try {
      const response = await getTheaters();
      setTheaters(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách rạp:", error);
      alert("Không thể tải danh sách rạp!");
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
    } catch (error) {
      console.error("❌ Lỗi khi xóa rạp:", error);
      alert("Không thể xóa rạp!");
    }
  };

  return (
    <div>
      {/* Nút thêm rạp */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setEditingTheater(null);
          setIsFormOpen(true);
        }}
      >
        ➕ Thêm Rạp
      </button>

      {/* Hiển thị form khi cần */}
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

      {/* Danh sách rạp */}
      <ul className="mt-4">
        {theaters.map((theater) => (
          <li key={theater.id} className="flex justify-between p-2 border">
            {theater.name}
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => {
                  setEditingTheater(theater);
                  setIsFormOpen(true);
                }}
              >
                ✏ Chỉnh sửa
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(theater.id)}
              >
                ❌ Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
