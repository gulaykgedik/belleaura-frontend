import { apiRequest } from "@/lib/api/client";
import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

export const authService = {
  login: (payload: LoginPayload) => apiRequest<AuthSession>("/auth/login", { method: "POST", body: payload, auth: false }),
  register: (payload: RegisterPayload) => apiRequest<AuthSession>("/auth/register", { method: "POST", body: payload, auth: false }),
  me: () => apiRequest<AuthUser>("/auth/me"),
  logout: () => apiRequest<{ logged_out: boolean }>("/auth/logout", { method: "POST" }),
};
