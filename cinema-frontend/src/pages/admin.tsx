import ProtectedRoute from "../components/ProtectedRoute";

const AdminPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div>
        <h1>Trang Admin</h1>
        <p>Chỉ Admin mới có thể thấy nội dung này.</p>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPage;
