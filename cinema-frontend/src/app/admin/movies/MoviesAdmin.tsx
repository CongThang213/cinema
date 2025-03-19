"use client";

import { useState, useEffect } from "react";
import api from "@/services/api";
import MovieForm from "./MovieForm"; // Import form

interface Movie {
  id: number;
  title: string;
}

export default function MoviesAdmin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Movie | undefined>(undefined);


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    api.get<Movie[]>("/movies").then((res) => setMovies(res.data));
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa phim này?")) {
      try {
        await api.delete(`/movies/${id}`);
        alert("Xóa phim thành công!");
        fetchMovies();
      } catch (error) {
        console.error("Lỗi khi xóa phim:", error);
        alert("Lỗi khi xóa phim! Vui lòng thử lại.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Quản lý Movies</h1>

      {/* Form thêm/sửa phim */}
      <MovieForm editingMovie={editingMovie} onMovieSaved={fetchMovies} />

      <table className="table-auto w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Tên phim</th>
            <th className="p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className="p-2">{movie.id}</td>
              <td className="p-2">{movie.title}</td>
              <td className="p-2">
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
