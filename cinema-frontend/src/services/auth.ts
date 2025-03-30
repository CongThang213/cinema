import apiClient from "./apiClient";

export const login = async (email: string, password: string) => {
  try {
    const { data } = await apiClient.post("/auth/login", { email, password });

    if (data?.access_token) {
      localStorage.setItem("access_token", data.access_token);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const { data } = await apiClient.post("/auth/register", { name, email, password });
    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const { data } = await apiClient.get("/auth/me"); // API lấy thông tin user
    return data;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
