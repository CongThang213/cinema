"use client"

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Movie } from "@/types/types";

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // ✅ Thêm kiểu dữ liệu

  useEffect(() => {
    api
      .get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Lỗi khi lấy danh sách phim:", err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">🎬 Phim Đang Chiếu</h2>

      {/* Kiểm tra nếu không có phim */}
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Hiện chưa có phim nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="border p-2 shadow-md rounded-lg">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
              <p className="text-sm text-gray-600">{movie.genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
