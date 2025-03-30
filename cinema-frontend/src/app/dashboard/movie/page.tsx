"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  status: string;
  poster: string;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phim:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies;
    if (genre) filtered = filtered.filter((movie) => movie.genre === genre);
    if (date) filtered = filtered.filter((movie) => movie.releaseDate === date);
    if (status) filtered = filtered.filter((movie) => movie.status === status);
    setFilteredMovies(filtered);
  }, [genre, date, status, movies]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">DANH SÁCH PHIM</h1>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          className="border p-2 rounded"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Tất cả thể loại</option>
          <option value="Hành động">Hành động</option>
          <option value="Hài">Hài</option>
          <option value="Tình cảm">Tình cảm</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đang chiếu">Đang chiếu</option>
          <option value="Sắp chiếu">Sắp chiếu</option>
        </select>
      </div>

      {/* Hiển thị danh sách phim */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p className="text-gray-600">Thể loại: {movie.genre}</p>
              <p className="text-gray-600">Ngày chiếu: {movie.releaseDate}</p>
            </div>
            <div className="flex justify-between p-4">
              <button
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
                onClick={() => router.push(`/dashboard/movies/${movie.id}`)}
              >
                Xem chi tiết
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => router.push(`/checkout?movieId=${movie.id}`)}
              >
                Mua vé
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
