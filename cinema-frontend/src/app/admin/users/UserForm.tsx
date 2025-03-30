"use client";

import { useState, useEffect } from "react";
import { createUser, updateUser } from "@/services/api";
import { Button, TextField, MenuItem, CircularProgress } from "@mui/material";

interface UserFormProps {
  editingUser?: { id: number; username: string; email: string; role: "admin" | "user" } | null;
  onSaved: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ editingUser, onSaved }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername(editingUser?.username ?? "");
    setEmail(editingUser?.email ?? "");
    setRole(editingUser?.role ?? "user");
  }, [editingUser]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (username.length < 4 || username.length > 20) {
      setError("⛔ Username phải từ 4-20 ký tự!");
      return;
    }

    if (!validateEmail(email)) {
      setError("⛔ Email không hợp lệ!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (editingUser?.id) {
        await updateUser(editingUser.id, { username, email, role });
      } else {
        await createUser({ username, email, role });
      }
      onSaved();
    } catch (error) {
      console.error("❌ Lỗi khi lưu user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md max-w-md">
      <h2 className="text-lg font-bold mb-2">{editingUser ? "Chỉnh sửa Người Dùng" : "Thêm Người Dùng"}</h2>

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <TextField select label="Vai trò" value={role} onChange={(e) => setRole(e.target.value as "admin" | "user")} fullWidth margin="normal">
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>

      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} className="mt-2">
        {loading ? <CircularProgress size={24} /> : editingUser ? "Cập Nhật" : "Thêm Mới"}
      </Button>
    </div>
  );
};

export default UserForm;
