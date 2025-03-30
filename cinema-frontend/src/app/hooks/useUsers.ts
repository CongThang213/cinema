import { useState, useEffect, useCallback, useMemo } from "react";
import { getUsers, deleteUser } from "@/services/api";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "user";
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = useCallback(async (id: number) => {
    if (confirm("⚠ Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (error) {
        console.error("❌ Lỗi khi xóa user:", error);
      }
    }
  }, []);

  const displayedUsers = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, page]);

  return { users, displayedUsers, loading, page, setPage, fetchUsers, handleDelete };
}
