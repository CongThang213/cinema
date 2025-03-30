import { useState, useCallback, useEffect } from "react";
import { getTickets, deleteTicket } from "@/services/api";

interface Ticket {
  id: number;
  price: number;
}

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
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
    if (!confirm("⚠ Bạn có chắc chắn muốn xóa vé này?")) return;
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("❌ Lỗi khi xóa vé:", error);
    }
  };

  return { tickets, isLoading, fetchTickets, handleDelete };
}
