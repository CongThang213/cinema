"use client";

import { useState, useEffect } from "react";
import { createTheater, updateTheater } from "@/services/api";
import { Theater } from "@/types/types";

interface Props {
  editingTheater?: Theater;
  onSaved: () => void;
  onCancel: () => void;
}

export default function TheaterForm({ editingTheater, onSaved, onCancel }: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(editingTheater?.name || "");
  }, [editingTheater]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTheater) {
        await updateTheater(editingTheater.id, { name });
      } else {
        await createTheater({ name });
      }
      onSaved();
    } catch (error) {
      console.error("❌ Lỗi khi lưu rạp:", error);
      alert("Không thể lưu rạp! Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-4 border mb-4">
      <h2 className="text-xl font-bold">
        {editingTheater ? "✏ Chỉnh sửa Rạp" : "➕ Thêm Rạp"}
      </h2>
      <form onSubmit={handleSubmit} className="mt-2">
        <input
          type="text"
          placeholder="Nhập tên rạp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <div className="mt-3 flex">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
            ✅ Lưu
          </button>
          <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onCancel}>
            ❌ Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
