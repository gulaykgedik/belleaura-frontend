"use client";

import Link from "next/link";
import { RoleGuard } from "@/features/auth/role-guard";
import { useAuth } from "@/hooks/use-auth";

function ProfileContent() {
  const { user } = useAuth();
  if (!user) return null;
  const panel = user.role_slug === "admin" || user.role_slug === "super_admin"
    ? { href: "/admin", label: "Admin Panel" }
    : user.role_slug === "staff" ? { href: "/staff", label: "Personel Paneli" } : null;
  return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
    <div className="rounded-[2rem] border bg-card p-6 shadow-sm sm:p-10"><div className="flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-center"><span className="grid size-24 place-items-center rounded-full bg-secondary font-serif text-4xl text-secondary-foreground">{user.name.trim().charAt(0).toLocaleUpperCase("tr-TR")}</span><div><span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">{user.role_slug}</span><h1 className="mt-3 text-4xl">{user.name}</h1><p className="mt-2 text-sm text-muted">Hesap bilgileriniz ve hızlı erişim bağlantılarınız</p></div></div>
    <div className="mt-7">
      <dl className="grid gap-5 sm:grid-cols-2">
        <div><dt className="text-xs uppercase text-muted">Ad soyad</dt><dd className="mt-1 font-semibold">{user.name}</dd></div>
        <div><dt className="text-xs uppercase text-muted">E-posta</dt><dd className="mt-1 font-semibold">{user.email}</dd></div>
        <div><dt className="text-xs uppercase text-muted">Telefon</dt><dd className="mt-1 font-semibold">{user.phone || "—"}</dd></div>
        <div><dt className="text-xs uppercase text-muted">Hesap türü</dt><dd className="mt-1 font-semibold">{user.role_slug}</dd></div>
      </dl>
      <div className="mt-7 grid gap-3 border-t pt-6 sm:grid-cols-3">
        <Link href="/appointments" className="rounded-xl border px-4 py-2.5 text-sm font-semibold">Randevularım</Link>
        <Link href="/orders" className="rounded-xl border px-4 py-2.5 text-sm font-semibold">Siparişlerim</Link>
        {panel ? <Link href={panel.href} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">{panel.label}</Link> : null}
      </div>
    </div></div>
  </div>;
}

export default function ProfilePage() {
  return <RoleGuard allowed={["customer", "staff", "admin", "super_admin"]}><ProfileContent /></RoleGuard>;
}
