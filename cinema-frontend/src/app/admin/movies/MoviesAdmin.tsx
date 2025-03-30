"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from "@mui/material";
import api from "@/services/api";
import MovieForm from "./MovieForm";
import { Movie } from "@/types/types";

export default function MoviesAdmin() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editingMovie, setEditingMovie] = useState<Partial<Movie> | undefined>(undefined);
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
      setMovies((prev) => prev.filter((movie) => movie.id !== id)); // Xóa trực tiếp trên state
      alert("Xóa phim thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
      alert("Lỗi khi xóa phim! Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quản lý Movies</h1>

      <MovieForm
        editingMovie={editingMovie}
        onMovieSaved={() => {
          fetchMovies();
          setEditingMovie(undefined);
        }}
      />

      {loading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên phim</TableCell>
                <TableCell>Đạo diễn</TableCell>
                <TableCell>Thể loại</TableCell>
                <TableCell>Thời lượng</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>{movie.id}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.director}</TableCell>
                  <TableCell>{movie.genre}</TableCell>
                  <TableCell>{movie.duration} phút</TableCell>
                  <TableCell>
                    <Button onClick={() => setEditingMovie(movie)} color="primary">Sửa</Button>
                    <Button onClick={() => handleDelete(movie.id)} color="error">Xóa</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
