import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    "Content-Type": "application/json",
  },
});

// services/api.ts
export async function fetchMovies() {
  try {
    const response = await fetch("http://localhost:3000/api/movies");
    if (!response.ok) {
      throw new Error("Lỗi khi lấy danh sách phim");
    }
    return response.json();
  } catch (error) {
    console.error("Lỗi API:", error);
    return [];
  }
}

export default api;

