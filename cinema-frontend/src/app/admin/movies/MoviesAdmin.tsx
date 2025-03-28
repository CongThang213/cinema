"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import MovieForm from "./MovieForm";
import { Movie } from "@/types/types";

export default function MoviesAdmin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await api.get<Movie[]>("/movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phim:", error);
      alert("Không thể tải danh sách phim!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa phim này?")) return;
    try {
      await api.delete(`/movies/${id}`);
      alert("Xóa phim thành công!");
      fetchMovies();
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      alert("Lỗi khi xóa phim! Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý Movies</h1>

      <MovieForm
        editingMovie={editingMovie}
        onMovieSaved={() => {
          fetchMovies();
          setEditingMovie(undefined); // Reset form
        }}
      />

      {loading ? (
        <p>Đang tải danh sách phim...</p>
      ) : (
        <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên phim</th>
              <th className="p-2 border">Đạo diễn</th>
              <th className="p-2 border">Thể loại</th>
              <th className="p-2 border">Thời lượng</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border">
                <td className="p-2 border">{movie.id}</td>
                <td className="p-2 border">{movie.title}</td>
                <td className="p-2 border">{movie.director}</td>
                <td className="p-2 border">{movie.genre}</td>
                <td className="p-2 border">{movie.duration} phút</td>
                <td className="p-2 border flex gap-2">
                  <button onClick={() => setEditingMovie(movie)} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(movie.id)} className="bg-red-500 text-white px-2 py-1 rounded">
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
