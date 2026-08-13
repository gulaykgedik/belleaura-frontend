export type UserRole = "super_admin" | "admin" | "staff" | "customer";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: "active" | "inactive" | "suspended";
  role_id: number;
  role_slug: UserRole;
  permissions: string[];
  created_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
  expires_in: number;
  user: AuthUser;
}

export interface LoginPayload { email: string; password: string }
export interface RegisterPayload { name: string; email: string; password: string; phone?: string }
