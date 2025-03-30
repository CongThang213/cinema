"use client";

import { useState, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import api from "@/services/api";
import { Movie } from "@/types/types";

interface MovieFormProps {
  editingMovie?: Partial<Movie>;
  onMovieSaved: () => void;
}

export default function MovieForm({ editingMovie, onMovieSaved }: MovieFormProps) {
  const [movie, setMovie] = useState<Partial<Movie>>({
    title: "",
    director: "",
    genre: "",
    description: "",
    posterUrl: "",
    duration: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovie(editingMovie ?? { title: "", director: "", genre: "", description: "", posterUrl: "", duration: 0 });
  }, [editingMovie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!movie.title?.trim()) return alert("Vui lòng nhập tên phim!");

    setLoading(true);
    try {
      if (editingMovie?.id) {
        await api.put(`/movies/${editingMovie.id}`, movie);
        alert("Cập nhật phim thành công!");
      } else {
        await api.post("/movies", movie);
        alert("Thêm phim thành công!");
      }
      onMovieSaved();
    } catch (error) {
      console.error("Lỗi khi lưu phim:", error);
      alert("Lỗi khi lưu phim! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TextField label="Tên phim" name="title" value={movie.title} onChange={handleChange} required />
      <TextField label="Đạo diễn" name="director" value={movie.director} onChange={handleChange} required />
      <TextField label="Thể loại" name="genre" value={movie.genre} onChange={handleChange} required />
      <TextField label="Link poster" name="posterUrl" value={movie.posterUrl} onChange={handleChange} />
      <TextField label="Thời lượng (phút)" type="number" name="duration" value={movie.duration} onChange={handleChange} required />
      <TextField label="Mô tả phim" name="description" value={movie.description} onChange={handleChange} multiline rows={3} required className="col-span-2" />

      <Button type="submit" variant="contained" color="primary" className="col-span-2" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : editingMovie?.id ? "Cập nhật phim" : "Thêm phim"}
      </Button>
    </form>
  );
}
