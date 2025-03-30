"use client";

import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  id: string;
  email: string;
  role: string;
  exp: number;
}

interface UserContextType {
  user: DecodedUser | null;
  setUser: React.Dispatch<React.SetStateAction<DecodedUser | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedUser>(token); // ✅ Cung cấp kiểu rõ ràng
        
        // Kiểm tra token có hết hạn chưa
        if (decodedUser.exp * 1000 < Date.now()) {
          console.warn("Token has expired");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decodedUser);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
