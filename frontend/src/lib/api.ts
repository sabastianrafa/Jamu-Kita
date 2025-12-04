const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/v1";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface User {
  id: number;
  nama: string;
  email: string;
  role: "anggota" | "admin";
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface RegisterData {
  nama: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

class ApiService {
  private getHeaders(includeAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  }

  private setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }

  private removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.data?.access_token) {
      this.setToken(result.data.access_token);
    }

    return result;
  }

  async login(data: LoginData): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok && result.data?.access_token) {
      this.setToken(result.data.access_token);
    }

    return result;
  }

  async logout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: this.getHeaders(true),
    });

    const result = await response.json();

    if (response.ok) {
      this.removeToken();
    }

    return result;
  }

  getStoredToken(): string | null {
    return this.getToken();
  }

  clearToken(): void {
    this.removeToken();
  }
}

export const apiService = new ApiService();
