"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/api";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "user" });

  // 🚀 Lấy danh sách Users từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    if (data) setUsers(data);
    setLoading(false);
  };

  // ✅ Mở modal tạo mới User
  const openCreateModal = () => {
    setEditUser(null);
    setNewUser({ username: "", email: "", role: "user" });
    setModalOpen(true);
  };

  // ✅ Mở modal chỉnh sửa User
  const openEditModal = (user: User) => {
    setEditUser(user);
    setNewUser(user);
    setModalOpen(true);
  };

  // ✅ Xử lý lưu User (Tạo mới hoặc Cập nhật)
  const handleSave = async () => {
    if (editUser) {
      await updateUser(editUser.id, newUser);
    } else {
      await createUser(newUser);
    }
    setModalOpen(false);
    fetchUsers();
  };

  // ✅ Xóa User
  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa user này?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Quản lý Users</h1>

      {/* ✅ Nút Thêm User */}
      <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={openCreateModal}>
        + Thêm User
      </button>

      {/* ✅ Bảng Users */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => openEditModal(user)}
                    >
                      Sửa
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* ✅ Modal Thêm/Sửa User */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editUser ? "Chỉnh sửa User" : "Thêm User"}
            </h2>
            <input
              type="text"
              placeholder="Username"
              className="border p-2 w-full mb-2"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-2"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="border p-2 w-full mb-2"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setModalOpen(false)}>
                Hủy
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
