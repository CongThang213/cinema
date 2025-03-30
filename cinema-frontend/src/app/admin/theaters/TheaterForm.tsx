"use client";

import { useState, useEffect } from "react";
import { createTheater, updateTheater } from "@/services/api";
import { Theater } from "@/types/types";
import { TextField, Button, CircularProgress } from "@mui/material";

interface Props {
  editingTheater?: Theater;
  onSaved: () => void;
  onCancel: () => void;
}

export default function TheaterForm({ editingTheater, onSaved, onCancel }: Props) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTheater) {
      setName(editingTheater.name);
      setCapacity(editingTheater.capacity);
    } else {
      setName("");
      setCapacity("");
    }
  }, [editingTheater]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return alert("⚠ Tên rạp không được để trống!");
    if (!capacity || capacity <= 0) return alert("⚠ Số ghế phải lớn hơn 0!");

    setLoading(true);
    try {
      const theaterData = { name, capacity: Number(capacity) };
      if (editingTheater) {
        await updateTheater(editingTheater.id, theaterData);
        alert("✅ Cập nhật rạp thành công!");
      } else {
        await createTheater(theaterData);
        alert("✅ Thêm rạp thành công!");
      }
      onSaved();
    } catch (error) {
      console.error("❌ Lỗi khi lưu rạp:", error);
      alert("Không thể lưu rạp! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-2">{editingTheater ? "✏ Chỉnh sửa Rạp" : "➕ Thêm Rạp"}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Tên rạp"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          className="mb-3"
        />
        <TextField
          label="Số ghế"
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value) || "")}
          fullWidth
          required
          className="mb-3"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Lưu"}
          </Button>
          <Button variant="contained" color="secondary" onClick={onCancel} disabled={loading}>
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}
