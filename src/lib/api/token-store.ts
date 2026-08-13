import type { AuthSession } from "@/types/auth";

const STORAGE_KEY = "appointment_ecommerce_auth";

export const tokenStore = {
  get(): AuthSession | null {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as AuthSession | null; }
    catch { window.localStorage.removeItem(STORAGE_KEY); return null; }
  },
  set(session: AuthSession): void {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clear(): void {
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  },
};
