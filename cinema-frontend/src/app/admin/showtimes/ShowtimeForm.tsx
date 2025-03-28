import { useState, useEffect } from "react";
import { createShowtime, updateShowtime } from "@/services/api";

interface ShowtimeFormProps {
  editingShowtime?: { id: number; startTime: string | Date } | null;
  onShowtimeSaved: () => void;
}

const ShowtimeForm: React.FC<ShowtimeFormProps> = ({
  editingShowtime,
  onShowtimeSaved,
}) => {
  const [startTime, setStartTime] = useState("");

  useEffect(() => {
    if (editingShowtime) {
      setStartTime(
        typeof editingShowtime.startTime === "string"
          ? new Date(editingShowtime.startTime).toISOString().slice(0, 16) // Chuyển string thành Date
          : editingShowtime.startTime.toISOString().slice(0, 16) // Nếu đã là Date thì giữ nguyên
      );
    } else {
      setStartTime("");
    }
  }, [editingShowtime]);
  

  const handleSubmit = async () => {
    if (!startTime) {
      alert("⛔ Vui lòng nhập thời gian chiếu!");
      return;
    }

    try {
      const data = { startTime: new Date(startTime) };

      if (editingShowtime) {
        await updateShowtime(editingShowtime.id, data);
        alert("✅ Cập nhật lịch chiếu thành công!");
      } else {
        await createShowtime(data);
        alert("✅ Thêm lịch chiếu thành công!");
      }

      onShowtimeSaved();
    } catch (error) {
      console.error("❌ Lỗi khi lưu lịch chiếu:", error);
      alert("Lỗi khi lưu lịch chiếu! Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">
        {editingShowtime ? "Chỉnh sửa Lịch Chiếu" : "Thêm Lịch Chiếu"}
      </h2>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingShowtime ? "Cập Nhật" : "Thêm Mới"}
      </button>
    </div>
  );
};

export default ShowtimeForm;
