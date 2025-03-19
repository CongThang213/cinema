// src/app/movies/page.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "@/services/api"; // Đảm bảo đường dẫn đúng

// Định nghĩa kiểu dữ liệu của movie
type Movie = {
  id: number;
  title: string;
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]); // Thêm kiểu dữ liệu Movie[]

  useEffect(() => {
    async function getMovies() {
      try {
        const data: Movie[] = await fetchMovies(); // Đảm bảo API trả về đúng kiểu dữ liệu
        console.log("Dữ liệu phim:", data);
        setMovies(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phim:", error);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      <h1>Danh Sách Phim</h1>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))
        ) : (
          <p>Không có phim nào.</p>
        )}
      </ul>
    </div>
  );
}
