/**
 * User Types
 */
export interface User {
  id: number;
  nama: string;
  email: string;
  role: "anggota" | "admin";
  createdAt?: string;
}

/**
 * Authentication Response
 */
export interface AuthResponse {
  user: User;
  access_token: string;
}

/**
 * Register Request Data
 */
export interface RegisterData {
  nama: string;
  email: string;
  password: string;
}

/**
 * Login Request Data
 */
export interface LoginData {
  email: string;
  password: string;
}
