"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { appointmentService } from "@/services/appointment-service";
import { ApiError } from "@/types/api";
import type { Appointment, PaginationMeta } from "@/types/appointment";
import { AppointmentCard } from "./appointment-card";
import { EmptyState, Feedback, LoadingState } from "./feedback";

export function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    appointmentService.list(page)
      .then((result) => { if (active) { setAppointments(result.items); setMeta(result.meta); } })
      .catch((reason) => { if (active) setError(reason instanceof ApiError ? reason.message : "Randevular yüklenemedi."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [page]);

  function changePage(nextPage: number) { setLoading(true); setError(""); setPage(nextPage); }

  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-sm font-semibold text-primary">Hesabım</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Randevularım</h1><p className="mt-2 text-sm text-muted">Geçmiş ve yaklaşan randevularınızı görüntüleyin.</p></div>
      <Link href="/appointments/new" className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Yeni randevu al</Link>
    </div>
    <div className="mt-8">{error ? <Feedback>{error}</Feedback> : loading ? <LoadingState label="Randevular yükleniyor…" /> : appointments.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{appointments.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)}</div> : <EmptyState title="Henüz randevunuz yok" description="İlk randevunuzu birkaç adımda oluşturabilirsiniz." action={<Link href="/appointments/new" className="inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Randevu al</Link>} />}</div>
    {meta && meta.last_page > 1 ? <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Randevu sayfaları"><button type="button" onClick={() => changePage(Math.max(1, page - 1))} disabled={page <= 1 || loading} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-50">← Önceki</button><span className="text-sm text-muted">{meta.page} / {meta.last_page}</span><button type="button" onClick={() => changePage(Math.min(meta.last_page, page + 1))} disabled={page >= meta.last_page || loading} className="rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-50">Sonraki →</button></nav> : null}
  </div>;
}
