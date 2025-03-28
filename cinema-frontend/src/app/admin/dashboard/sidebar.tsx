"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin/movies", label: "🎬 Movies" },
  { href: "/admin/showtimes", label: "📅 Showtimes" },
  { href: "/admin/theaters", label: "🏛 Theaters" },
  { href: "/admin/tickets", label: "🎟 Tickets" },
  { href: "/admin/users", label: "👥 Users" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <nav className="mt-4">
        {menuItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`block p-2 rounded transition ${
              pathname === href ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
