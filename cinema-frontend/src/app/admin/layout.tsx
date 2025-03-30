import Sidebar from "@/components/admin/Sidebar";
import "@/app/globals.css"; // Import CSS

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1 p-6 bg-white">
        {children}
      </div>
    </div>
  );
}
