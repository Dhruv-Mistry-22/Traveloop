import { useState } from "react";
import { useAuthStore } from "@/lib/store/auth";

export const useAuth = () => {
  const { token, user, setToken, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    token,
    user,
    loading,
    error,
    setToken,
    setUser,
    logout,
    setLoading,
    setError,
  };
};
