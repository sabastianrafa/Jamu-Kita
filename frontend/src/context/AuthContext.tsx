"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiService, User, RegisterData, LoginData } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = apiService.getStoredToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 > Date.now()) {
          setUser(payload.user || null);
        } else {
          apiService.clearToken();
        }
      } catch (error) {
        apiService.clearToken();
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiService.register(data);

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return { success: true, message: response.message };
      }

      return {
        success: false,
        message: response.message || "Registrasi gagal",
      };
    } catch (error) {
      return {
        success: false,
        message: "Terjadi kesalahan saat registrasi",
      };
    }
  };

  const login = async (
    data: LoginData
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiService.login(data);

      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return { success: true, message: response.message };
      }

      return {
        success: false,
        message: response.message || "Login gagal",
      };
    } catch (error) {
      return {
        success: false,
        message: "Terjadi kesalahan saat login",
      };
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      apiService.clearToken();
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
