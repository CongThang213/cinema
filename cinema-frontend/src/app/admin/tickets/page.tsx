import { useEffect, useState } from "react";
import { getTickets, deleteTicket } from "@/services/api";
import TicketForm from "./TicketForm";

interface Ticket {
  id: number;
  price: number;
}

export default function TicketsAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      if (Array.isArray(response.data)) {
        setTickets(response.data);
      } else {
        console.error("❌ Dữ liệu nhận được không hợp lệ:", response.data);
        setTickets([]);
      }
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách vé:", error);
      setTickets([]);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("⚠ Bạn có chắc chắn muốn xóa vé này?")) {
      try {
        await deleteTicket(id);
        setTickets((prev) => prev.filter(ticket => ticket.id !== id));
      } catch (error) {
        console.error("❌ Lỗi khi xóa vé:", error);
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Vé</h1>
      <TicketForm editingTicket={editingTicket ?? undefined} onSaved={fetchTickets} />

      <ul className="mt-4">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="flex justify-between p-2 border">
            {ticket.price} VNĐ
            <div>
              <button
                className="text-blue-500 mr-2"
                onClick={() => setEditingTicket(ticket)}
              >
                ✏ Chỉnh sửa
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(ticket.id)}
              >
                ❌ Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
