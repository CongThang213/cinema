"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";

const Header = () => {
  const [user, setUser] = useState(null); // Giả lập trạng thái user
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        🎬 MyCinema
      </Link>

      {/* Menu */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/movies" className="hover:text-yellow-400">Phim</Link>
        <Link href="/showtimes" className="hover:text-yellow-400">Lịch chiếu</Link>
        <Link href="/promotions" className="hover:text-yellow-400">Khuyến mãi</Link>
        <Link href="/contact" className="hover:text-yellow-400">Liên hệ</Link>
      </nav>

      {/* Tài khoản */}
      <div>
        {user ? (
          <>
            <Avatar
              onClick={(e) => setMenuOpen(e.currentTarget)}
              className="cursor-pointer"
            />
            <Menu
              anchorEl={menuOpen}
              open={Boolean(menuOpen)}
              onClose={() => setMenuOpen(null)}
            >
              <MenuItem onClick={() => alert("Trang cá nhân")}>Trang cá nhân</MenuItem>
              <MenuItem onClick={() => setUser(null)}>Đăng xuất</MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/auth/login" className="bg-yellow-500 px-4 py-2 rounded-lg">
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
