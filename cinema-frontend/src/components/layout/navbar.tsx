"use client";

import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <AppBar position="static" className="bg-red-600 shadow-lg">
      <Toolbar className="flex justify-between">
        <Typography variant="h6">
          <Link href="/" className="text-white font-bold">🎬 CineStar</Link>
        </Typography>
        <div>
          <Button color="inherit">
            <Link href="/movies">Phim</Link>
          </Button>
          <Button color="inherit">
            <Link href="/showtimes">Lịch Chiếu</Link>
          </Button>
          <Button color="inherit">
            <Link href="/auth/login">Đăng Nhập</Link>
          </Button>
        </div>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
