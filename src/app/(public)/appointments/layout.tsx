"use client";

import { usePathname } from "next/navigation";
import { RoleGuard } from "@/features/auth/role-guard";

export default function CustomerAppointmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Yeni randevu sayfası public:
  // Kullanıcı formu giriş yapmadan doldurabilir.
  // Giriş kontrolü "Randevuyu Onayla" aşamasında yapılır.
  if (pathname === "/appointments/new") {
    return children;
  }

  // Diğer appointment sayfaları kullanıcı hesabı gerektirir.
  return (
    <RoleGuard
      allowed={[
        "customer",
        "staff",
        "admin",
        "super_admin",
      ]}
    >
      {children}
    </RoleGuard>
  );
}