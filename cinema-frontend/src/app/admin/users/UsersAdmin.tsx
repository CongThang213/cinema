"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getUsers, deleteUser } from "@/services/api";
import UserForm from "./UserForm";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Skeleton,
  Typography,
  Box
} from "@mui/material";

interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5; // Hiển thị 5 user trên 1 trang

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null); // Reset lỗi trước khi fetch
    try {
      const response = await getUsers();
      if (!Array.isArray(response.data)) {
        throw new Error("Dữ liệu trả về không hợp lệ!");
      }
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách user:", error);
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    if (confirm("⚠ Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
        alert("❌ Xóa thất bại! Vui lòng thử lại.");
      }
    }
  }, []);

  // Cắt danh sách user theo trang
  const displayedUsers = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, page]);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Quản lý Người Dùng
      </Typography>

      {/* Form thêm/sửa người dùng */}
      <UserForm editingUser={editingUser} onSaved={fetchUsers} />

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {loading ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 1 }}
                      onClick={() => setEditingUser(user)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Phân trang */}
          <Pagination
            count={Math.ceil(users.length / itemsPerPage)}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            sx={{ mt: 4 }}
          />
        </>
      )}
    </Box>
  );
}
