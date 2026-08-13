import { tokenStore } from "./token-store";
import type { ApiFailure, ApiSuccess } from "@/types/api";
import { ApiError } from "@/types/api";
import type { AuthSession } from "@/types/auth";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api").replace(/\/$/, "");

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown; auth?: boolean; retry?: boolean };

async function parse<T>(response: Response): Promise<T> {
  let payload: ApiSuccess<T> | ApiFailure | null = null;
  try { payload = await response.json() as ApiSuccess<T> | ApiFailure; } catch { /* non-JSON backend/proxy error */ }
  if (!response.ok || !payload?.success) {
    const failure = payload && !payload.success ? payload : null;
    throw new ApiError(failure?.message ?? "İstek tamamlanamadı.", response.status, failure?.errors ?? {});
  }
  return payload.data;
}

let refreshPromise: Promise<AuthSession | null> | null = null;

async function performRefresh(): Promise<AuthSession | null> {
  const current = tokenStore.get();
  if (!current?.refresh_token) return null;
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ refresh_token: current.refresh_token }),
    });
    const session = await parse<AuthSession>(response);
    tokenStore.set(session);
    return session;
  } catch { tokenStore.clear(); return null; }
}

function refreshSession(): Promise<AuthSession | null> {
  if (!refreshPromise) refreshPromise = performRefresh().finally(() => { refreshPromise = null; });
  return refreshPromise;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true, retry = true, headers, ...init } = options;
  const session = tokenStore.get();
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  if (body !== undefined) requestHeaders.set("Content-Type", "application/json");
  if (auth && session?.access_token) requestHeaders.set("Authorization", `Bearer ${session.access_token}`);
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: requestHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (response.status === 401 && auth && retry && await refreshSession()) {
      return apiRequest<T>(path, { ...options, retry: false });
    }
    return await parse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Backend servisine ulaşılamadı.", 0);
  }
}
