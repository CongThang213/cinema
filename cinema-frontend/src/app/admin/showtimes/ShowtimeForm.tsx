"use client";

import { useState, useEffect } from "react";
import { createShowtime, updateShowtime } from "@/services/api";
import { CircularProgress, TextField, Button } from "@mui/material";
import { Showtime } from "@/types/types";

interface ShowtimeFormProps {
  editingShowtime?: Showtime | null;
  onShowtimeSaved: (showtime: Showtime) => void;
}

export default function ShowtimeForm({ editingShowtime, onShowtimeSaved }: ShowtimeFormProps) {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStartTime(editingShowtime ? new Date(editingShowtime.startTime) : null);
  }, [editingShowtime]);

  const handleSubmit = async () => {
    if (!startTime) return alert("⛔ Vui lòng nhập thời gian chiếu!");

    setLoading(true);
    try {
      const data = { startTime: startTime.toISOString() }; // Gửi dạng ISO

      if (editingShowtime) {
        await updateShowtime(editingShowtime.id, data);
        alert("✅ Cập nhật lịch chiếu thành công!");
        onShowtimeSaved({ id: editingShowtime.id, startTime });
      } else {
        const res = await createShowtime(data);
        alert("✅ Thêm lịch chiếu thành công!");
        onShowtimeSaved({ id: res.data.id, startTime });
      }
    } catch (error) {
      console.error("❌ Lỗi khi lưu lịch chiếu:", error);
      alert("Lỗi khi lưu lịch chiếu! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">
        {editingShowtime ? "Chỉnh sửa Lịch Chiếu" : "Thêm Lịch Chiếu"}
      </h2>
      <TextField
        type="datetime-local"
        value={startTime ? startTime.toISOString().slice(0, 16) : ""}
        onChange={(e) => setStartTime(new Date(e.target.value))}
        fullWidth
        margin="dense"
        label="Thời gian chiếu"
        InputLabelProps={{ shrink: true }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
        className="mt-2"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : editingShowtime ? "Cập Nhật" : "Thêm Mới"}
      </Button>
    </div>
  );
}
