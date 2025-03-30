"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFilm, FaClock, FaTheaterMasks, FaTicketAlt, FaUsers } from "react-icons/fa";

const adminLinks = [
  { name: "Movies", href: "/admin/movies", icon: <FaFilm /> },
  { name: "Showtimes", href: "/admin/showtimes", icon: <FaClock /> },
  { name: "Theaters", href: "/admin/theaters", icon: <FaTheaterMasks /> },
  { name: "Tickets", href: "/admin/tickets", icon: <FaTicketAlt /> },
  { name: "Users", href: "/admin/users", icon: <FaUsers /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col shadow-lg">
      {/* Tiêu đề Sidebar */}
      <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">🎬 Admin Panel</h2>

      {/* Danh sách menu */}
      <nav className="flex-1 mt-4">
        {adminLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <div
              className={`flex items-center space-x-3 p-3 rounded-md transition-all cursor-pointer 
                ${pathname === link.href ? "bg-blue-600" : "hover:bg-gray-700"}`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-lg">{link.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-700 pt-3">
        &copy; {new Date().getFullYear()} Cinema Admin
      </div>
    </aside>
  );
}
