"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import { Movie } from "@/types/types";

interface MovieFormProps {
  editingMovie?: Movie; // Phim đang được chỉnh sửa (nếu có)
  onMovieSaved: () => void; // Callback sau khi lưu phim
}

export default function MovieForm({ editingMovie, onMovieSaved }: MovieFormProps) {
  const [movie, setMovie] = useState<Movie>({
    id: 0,
    title: "",
    director: "",
    genre: "",
    description: "",
    posterUrl: "",
    duration: 0,
  });
  const [loading, setLoading] = useState(false); // Trạng thái loading khi submit form

  useEffect(() => {
    if (editingMovie) {
      setMovie(editingMovie); // Load dữ liệu vào form khi chỉnh sửa
    }
  }, [editingMovie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!movie.title.trim()) return alert("Vui lòng nhập tên phim!");
    setLoading(true);

    try {
      if (editingMovie) {
        await api.put(`/movies/${editingMovie.id}`, movie);
        alert("Cập nhật phim thành công!");
      } else {
        await api.post("/movies", movie);
        alert("Thêm phim thành công!");
      }
      setMovie({ id: 0, title: "", director: "", genre: "", description: "", posterUrl: "", duration: 0 });
      onMovieSaved();
    } catch (error) {
      console.error("Lỗi khi lưu phim:", error);
      alert("Lỗi khi lưu phim! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Tên phim" className="border p-2" required />
      <input type="text" name="director" value={movie.director} onChange={handleChange} placeholder="Đạo diễn" className="border p-2" required />
      <input type="text" name="genre" value={movie.genre} onChange={handleChange} placeholder="Thể loại" className="border p-2" required />
      <input type="text" name="posterUrl" value={movie.posterUrl} onChange={handleChange} placeholder="Link poster" className="border p-2" />
      <input type="number" name="duration" value={movie.duration} onChange={handleChange} placeholder="Thời lượng (phút)" className="border p-2" required />
      <textarea name="description" value={movie.description} onChange={handleChange} placeholder="Mô tả phim" className="border p-2 col-span-2" required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50 col-span-2" disabled={loading}>
        {loading ? "Đang xử lý..." : editingMovie ? "Cập nhật phim" : "Thêm phim"}
      </button>
    </form>
  );
}
