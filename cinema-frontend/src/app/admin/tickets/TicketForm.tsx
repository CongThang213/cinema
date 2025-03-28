"use client";

import { useState, useEffect } from "react";
import { createTicket, updateTicket } from "@/services/api";

interface TicketFormProps {
  editingTicket?: { id: number; price: number } | null;
  onSaved: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ editingTicket, onSaved }) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setPrice(editingTicket?.price ?? 0); // Sử dụng giá trị mặc định là 0
  }, [editingTicket]);

  const handleSubmit = async () => {
    if (price <= 0) {
      alert("⛔ Giá vé phải lớn hơn 0!");
      return;
    }

    try {
      if (editingTicket?.id) {
        await updateTicket(editingTicket.id, { price });
      } else {
        await createTicket({ price });
      }
      onSaved(); // Cập nhật danh sách vé
    } catch (error) {
      console.error("❌ Lỗi khi lưu vé:", error);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">{editingTicket ? "Chỉnh sửa Vé" : "Thêm Vé"}</h2>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Nhập giá vé"
        className="w-full p-2 border rounded mb-2"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {editingTicket ? "Cập Nhật" : "Thêm Mới"}
      </button>
    </div>
  );
};

export default TicketForm;
