"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { destinationForRole } from "./role-routing";
import type { UserRole } from "@/types/auth";

export function RoleGuard({ allowed, children, compact=false }: { allowed: UserRole[]; children: React.ReactNode; compact?:boolean }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    else if (!allowed.includes(user.role_slug)) router.replace(destinationForRole(user.role_slug));
  }, [allowed, isLoading, pathname, router, user]);
  if (isLoading || !user || !allowed.includes(user.role_slug)) return <div className={`grid place-items-center text-sm text-muted ${compact?"min-h-40":"min-h-screen"}`}>Oturum kontrol ediliyor…</div>;
  return children;
}
