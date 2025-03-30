import api from "./api";

// 🟢 Lấy danh sách Users
export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// 🟢 Thêm User mới
export const createUser = async (userData: any) => {
  const response = await api.post("/admin/users", userData);
  return response.data;
};

// 🟢 Cập nhật User
export const updateUser = async (id: number, userData: any) => {
  const response = await api.put(`/admin/users/${id}`, userData);
  return response.data;
};

// 🟢 Xóa User
export const deleteUser = async (id: number) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};
