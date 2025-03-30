export enum UserRole {
    USER = "user",
    ADMIN = "admin",
  }
  
 // 🎬 Movie - Thông tin phim
  export interface Movie {
    id: number;
    title: string;
    director: string;
    genre: string;
    description: string;
    posterUrl: string; // Link ảnh poster phim
    duration: number; // Thời lượng phim (phút)
  }
  
  // 🎟 Showtime - Suất chiếu phim
  export interface Showtime {
    id: number;
    startTime: Date; // Giờ chiếu (ISO format)
  }
  
  // 🏢 Theater - Rạp chiếu phim
  export interface Theater {
    id: number;
    name: string;
    capacity: number; // Số ghế trong rạp
  }
  
  // 🎫 Ticket - Vé xem phim
  export interface Ticket {
    id: number;
    seatNumber: string;
    price: number;
  }
  
  // 👤 User - Người dùng
  export interface User {
    id: number;
    username: string;
    email: string;
    password: string; // 🔒 Cần mã hóa khi gửi lên server
    role: "admin" | "user"; // Quyền của user
  }
  