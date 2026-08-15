"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminService } from "@/services/admin-service";
import { ApiError } from "@/types/api";
import type { DashboardStats } from "@/types/admin";
import { commerceMoney } from "@/features/commerce/commerce-format";
import { AdminHeader, AdminPanel, Feedback, LoadingState } from "./admin-ui";

const initial: DashboardStats = {
  customers: 0,
  staff: 0,
  active_services: 0,
  today_appointments: 0,
  pending_appointments: 0,
  orders: 0,
  paid_orders: 0,
  today_revenue: 0,
};

export function AdminDashboard() {
  const [stats, setStats] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Istanbul",
    }).format(new Date());

    Promise.all([
      adminService.list("/users", { role: "customer", per_page: 1 }),
      adminService.list("/staff", { per_page: 1 }),
      adminService.list("/admin/services", { is_active: 1, per_page: 1 }),
      adminService.appointments({ date: today, per_page: 1 }),
      adminService.appointments({ status: "pending", per_page: 1 }),
      adminService.orders({ per_page: 1 }),
      adminService.orders({ payment_status: "paid", per_page: 1 }),
      adminService.revenue(),
    ])
      .then((values) => {
        if (!active) return;

        setStats({
          customers: values[0].meta.total,
          staff: values[1].meta.total,
          active_services: values[2].meta.total,
          today_appointments: values[3].meta.total,
          pending_appointments: values[4].meta.total,
          orders: values[5].meta.total,
          paid_orders: values[6].meta.total,
          today_revenue: values[7].totals.today,
        });
      })
      .catch((reason) => {
        if (active) {
          setError(
            reason instanceof ApiError
              ? reason.message
              : "Dashboard verileri yüklenemedi."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <LoadingState label="Dashboard yükleniyor…" />;

  const cards = [
    { icon: "M", label: "Toplam müşteri", value: stats.customers, help: "Kayıtlı müşteriler" },
    { icon: "P", label: "Toplam personel", value: stats.staff, help: "Aktif ekip görünümü" },
    { icon: "H", label: "Aktif hizmet", value: stats.active_services, help: "Yayındaki hizmetler" },
    { icon: "R", label: "Bugünkü randevu", value: stats.today_appointments, help: "Bugünün programı" },
    { icon: "B", label: "Bekleyen randevu", value: stats.pending_appointments, help: "Onay bekleyenler" },
    { icon: "S", label: "Toplam sipariş", value: stats.orders, help: "Tüm siparişler" },
    { icon: "Ö", label: "Ödenmiş sipariş", value: stats.paid_orders, help: "Ödemesi tamamlanan" },
    { icon: "₺", label: "Bugünkü Gelir", value: commerceMoney(stats.today_revenue), help: "Ciro detaylarını görüntüle", href: "/admin/revenue" },
  ];

  return (
    <div className="grid gap-6">
      <AdminHeader title="Dashboard" description="Operasyonun temel göstergelerine hızlı bakış." />
      {error ? <Feedback>{error}</Feedback> : null}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const panel = (
            <AdminPanel className="relative h-full overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold">{card.value}</p>
                  <p className="mt-1 text-xs text-muted">{card.help}</p>
                </div>
                <span className="grid size-9 place-items-center rounded-xl bg-secondary text-sm font-bold text-secondary-foreground" aria-hidden="true">{card.icon}</span>
              </div>
            </AdminPanel>
          );

          return card.href ? <Link key={card.label} href={card.href}>{panel}</Link> : <div key={card.label}>{panel}</div>;
        })}
      </div>
    </div>
  );
}
