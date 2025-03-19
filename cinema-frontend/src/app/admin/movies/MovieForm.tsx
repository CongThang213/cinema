"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";

interface Movie {
  id: number;
  title: string;
}

interface MovieFormProps {
  editingMovie?: Movie; // Phim đang được chỉnh sửa (nếu có)
  onMovieSaved: () => void; // Callback sau khi lưu phim
}

export default function MovieForm({ editingMovie, onMovieSaved }: MovieFormProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingMovie) {
      setTitle(editingMovie.title); // Load dữ liệu vào form khi chỉnh sửa
    }
  }, [editingMovie]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return alert("Vui lòng nhập tên phim!");

    try {
      if (editingMovie) {
        // Nếu có `editingMovie`, thực hiện cập nhật
        await api.put(`/movies/${editingMovie.id}`, { title });
        alert("Cập nhật phim thành công!");
      } else {
        // Nếu không có `editingMovie`, thực hiện thêm mới
        await api.post("/movies", { title });
        alert("Thêm phim thành công!");
      }
      setTitle("");
      onMovieSaved(); // Gọi callback để cập nhật danh sách phim
    } catch (error) {
      console.error("Lỗi khi lưu phim:", error);
      alert("Lỗi khi lưu phim! Vui lòng thử lại.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập tên phim"
        className="border p-2 mr-2"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded">
        {editingMovie ? "Cập nhật phim" : "Thêm phim"}
      </button>
    </form>
  );
}
