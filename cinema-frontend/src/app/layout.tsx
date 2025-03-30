import "./globals.css";
import React from "react";
import { UserProvider } from "@/context/UserContext"; // Import AuthProvider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {/* <UserProvider> Bọc AuthProvider */}
          <main className="container mx-auto mt-4">{children}</main>
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
