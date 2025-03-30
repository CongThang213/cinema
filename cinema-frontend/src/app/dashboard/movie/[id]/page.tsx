"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Movie } from "@/types/types";


export default function MovieDetailPage() {
  const router = useRouter();
  const params = useParams();
  const movieId = params.id as string;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${movieId}`);
        if (!res.ok) throw new Error("Không thể tải phim");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu phim");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center text-red-500">Không tìm thấy phim</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-96 object-cover rounded-lg shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
      <p className="text-gray-600">🎬 Đạo diễn: {movie.director}</p>
      <p className="text-gray-600">🎭 Thể loại: {movie.genre}</p>
      <p className="text-gray-600">⏳ Thời lượng: {movie.duration} phút</p>
      <p className="mt-4 leading-relaxed">{movie.description}</p>

      <button
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        onClick={() => router.push(`/checkout?movieId=${movie.id}`)}
      >
        🎟 Mua vé ngay
      </button>
    </div>
  );
}
