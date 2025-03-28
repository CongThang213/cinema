import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Cập nhật URL đúng với Backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
