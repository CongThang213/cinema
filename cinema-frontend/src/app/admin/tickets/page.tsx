"use client";

import { useEffect, useState, useCallback } from "react";
import { getTickets, deleteTicket } from "@/services/api";
import TicketForm from "./TicketForm";
import { Button, CircularProgress } from "@mui/material";

interface Ticket {
  id: number;
  price: number;
}

export default function TicketsAdmin() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getTickets();
      setTickets(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách vé:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleDelete = async (id: number) => {
    if (confirm("⚠ Bạn có chắc chắn muốn xóa vé này?")) {
      try {
        await deleteTicket(id);
        setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      } catch (error) {
        console.error("❌ Lỗi khi xóa vé:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý Vé</h1>

      <TicketForm editingTicket={editingTicket} onSaved={fetchTickets} />

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <CircularProgress />
        </div>
      ) : (
        <ul className="mt-4">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="flex justify-between p-2 border">
              {ticket.price.toLocaleString()} VNĐ
              <div>
                <Button variant="contained" color="primary" size="small" onClick={() => setEditingTicket(ticket)}>
                  ✏ Chỉnh sửa
                </Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleDelete(ticket.id)} className="ml-2">
                  ❌ Xóa
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
