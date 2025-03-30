"use client";

import { useState, useEffect } from "react";
import { createTicket, updateTicket } from "@/services/api";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface TicketFormProps {
  editingTicket?: { id: number; price: number } | null;
  onSaved: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ editingTicket, onSaved }) => {
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (editingTicket) {
      setPrice(editingTicket.price);
      setOpen(true);
    }
  }, [editingTicket]);

  const handleSubmit = async () => {
    if (price < 10000 || price > 500000) {
      setError("⚠ Giá vé phải từ 10,000 đến 500,000 VNĐ!");
      return;
    }

    try {
      if (editingTicket?.id) {
        await updateTicket(editingTicket.id, { price });
      } else {
        await createTicket({ price });
      }
      onSaved();
      setOpen(false);
    } catch (error) {
      console.error("❌ Lỗi khi lưu vé:", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        ➕ Thêm Vé
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingTicket ? "✏ Chỉnh sửa Vé" : "➕ Thêm Vé"}</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            label="Giá vé (VNĐ)"
            fullWidth
            error={!!error}
            helperText={error}
            className="mt-2"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">❌ Hủy</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {editingTicket ? "💾 Cập Nhật" : "✔ Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TicketForm;
