"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { authService } from "@/services/auth-service";
import { tokenStore } from "@/lib/api/token-store";
import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";
import { ApiError } from "@/types/api";

interface AuthContextValue {
  user: AuthUser | null;
  hydrated: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  login(payload: LoginPayload): Promise<AuthUser>;
  register(payload: RegisterPayload): Promise<AuthUser>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function hydrate() {
      const session = tokenStore.get();
      if (active) {
        setUser(session?.user ?? null);
        setHydrated(true);
      }
      if (!session) { if (active) setIsLoading(false); return; }
      try {
        const freshUser = await authService.me();
        const refreshed = tokenStore.get();
        if (refreshed) tokenStore.set({ ...refreshed, user: freshUser });
        if (active) setUser(freshUser);
      } catch (error) {
        if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
          tokenStore.clear();
          if (active) setUser(null);
        }
      }
      finally { if (active) setIsLoading(false); }
    }
    void hydrate();
    return () => { active = false; };
  }, []);

  const save = useCallback((session: AuthSession) => { tokenStore.set(session); setUser(session.user); return session.user; }, []);
  const login = useCallback(async (payload: LoginPayload) => save(await authService.login(payload)), [save]);
  const register = useCallback(async (payload: RegisterPayload) => save(await authService.register(payload)), [save]);
  const logout = useCallback(async () => {
    try {
      if (tokenStore.get()) await authService.logout();
    } catch (error) {
      // Remote token revocation is best-effort. Local logout must still complete
      // when the API is temporarily unreachable.
      if (process.env.NODE_ENV === "development") {
        console.warn("Logout endpointine ulaşılamadı; yerel oturum temizlendi.", error);
      }
    } finally {
      tokenStore.clear();
      setUser(null);
    }
  }, []);
  const value = useMemo(() => ({ user, hydrated, isLoading, isAuthenticated: !!user, login, register, logout }), [user, hydrated, isLoading, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
