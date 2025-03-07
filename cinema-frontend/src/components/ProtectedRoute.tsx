import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // Thêm prop allowedRoles
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userContext = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!userContext || !userContext.user) {
      router.push("/login");
    } else if (allowedRoles && !allowedRoles.includes(userContext.user.role)) {
      router.push("/unauthorized"); // Điều hướng nếu không có quyền
    }
  }, [userContext, router, allowedRoles]);

  if (!userContext || !userContext.user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
