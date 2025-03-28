import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Hàm lấy token từ localStorage và gắn vào request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Hàm xử lý lỗi API chung (trả về lỗi rõ ràng hơn)
const handleRequest = async (request: Promise<any>) => {
  try {
    const response = await request;
    return response.data;
  } catch (error: any) {
    console.error("Lỗi API:", error?.response?.data || error.message);
    throw error?.response?.data || error.message;
  }
};

// ✅ API Authentication (Auth)
export const loginUser = (email: string, password: string) =>
  handleRequest(api.post("/auth/login", { email, password }));

export const registerUser = (data: { username: string; email: string; password: string }) =>
  handleRequest(api.post("/users/register", data));

export const getProfile = () => handleRequest(api.get("/users/profile"));

// ✅ API Movies
export const getMovies = () => handleRequest(api.get("/movies"));
export const createMovie = (data: any) => handleRequest(api.post("/movies", data));
export const updateMovie = (id: number, data: any) => handleRequest(api.put(`/movies/${id}`, data));
export const deleteMovie = (id: number) => handleRequest(api.delete(`/movies/${id}`));

// ✅ API Showtimes
export const getShowtimes = (params = {}) => handleRequest(api.get("/showtimes", { params }));
export const createShowtime = (data: any) => handleRequest(api.post("/showtimes", data));
export const updateShowtime = (id: number, data: any) => handleRequest(api.put(`/showtimes/${id}`, data));
export const deleteShowtime = (id: number) => handleRequest(api.delete(`/showtimes/${id}`));

// ✅ API Theaters
export const getTheaters = (params = {}) => handleRequest(api.get("/theaters", { params }));
export const createTheater = (data: any) => handleRequest(api.post("/theaters", data));
export const updateTheater = (id: number, data: any) => handleRequest(api.put(`/theaters/${id}`, data));
export const deleteTheater = (id: number) => handleRequest(api.delete(`/theaters/${id}`));

// ✅ API Users
export const getUsers = (page = 1, limit = 10, search = "") => api.get(`/users?page=${page}&limit=${limit}&search=${search}`); // ✅ Lấy danh sách Users có hỗ trợ phân trang & tìm kiếm
export const createUser = (data: any) => handleRequest(api.post("/users", data));
export const updateUser = (id: number, data: any) => handleRequest(api.put(`/users/${id}`, data));
export const deleteUser = (id: number) => handleRequest(api.delete(`/users/${id}`));

// ✅ API Tickets
export const getTickets = (params = {}) => handleRequest(api.get("/tickets", { params }));
export const createTicket = (data: any) => handleRequest(api.post("/tickets", data));
export const updateTicket = (id: number, data: any) => handleRequest(api.put(`/tickets/${id}`, data));
export const deleteTicket = (id: number) => handleRequest(api.delete(`/tickets/${id}`));

export default api;
