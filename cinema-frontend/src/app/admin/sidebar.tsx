import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <nav className="mt-4">
        <Link href="/admin/movies" className="block p-2 hover:bg-gray-700">🎬 Movies</Link>
        <Link href="/admin/showtimes" className="block p-2 hover:bg-gray-700">📅 Showtimes</Link>
        <Link href="/admin/theaters" className="block p-2 hover:bg-gray-700">🏛 Theaters</Link>
        <Link href="/admin/tickets" className="block p-2 hover:bg-gray-700">🎟 Tickets</Link>
        <Link href="/admin/users" className="block p-2 hover:bg-gray-700">👥 Users</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
