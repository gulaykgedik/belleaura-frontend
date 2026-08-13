import type { UserRole } from "@/types/auth";

export function destinationForRole(role: UserRole): string {
  if (role === "admin" || role === "super_admin") return "/admin";
  if (role === "staff") return "/staff";
  return "/";
}
