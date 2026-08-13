"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState, Feedback, LoadingState } from "@/features/appointments/feedback";
import { money } from "@/features/appointments/format";
import { staffService } from "@/services/staff-service";
import { ApiError } from "@/types/api";
import type { ServiceItem } from "@/types/appointment";
import { StaffHeader, StaffPanel } from "./staff-ui";

export function StaffServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([staffService.availableServices(), staffService.assignedServices()])
      .then(([available, assigned]) => {
        if (active) { setServices(available.items); setSelected(assigned.map((item) => item.id)); }
      })
      .catch((reason) => { if (active) setError(reason instanceof ApiError ? reason.message : "Hizmetler yüklenemedi."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  function toggle(id: number) { setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); }
  async function save() {
    setBusy(true); setError("");
    try { const result = await staffService.updateServices(selected); setSelected(result.map((item) => item.id)); setMessage("Hizmet seçimleriniz güncellendi."); }
    catch (cause) { setError(cause instanceof ApiError ? cause.message : "Hizmetler güncellenemedi."); }
    finally { setBusy(false); }
  }

  if (loading) return <LoadingState label="Hizmetler yükleniyor…" />;
  return <div className="grid gap-6">
    <StaffHeader title="Hizmetlerim" description="Backend’in izin verdiği aktif hizmetlerden sunduklarınızı seçin." />
    {error ? <Feedback>{error}</Feedback> : null}
    {message ? <Feedback type="success">{message}</Feedback> : null}
    {services.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => <button key={service.id} type="button" onClick={() => toggle(service.id)} className={`rounded-card border bg-card p-5 text-left transition ${selected.includes(service.id) ? "border-primary ring-2 ring-primary/15" : "hover:border-primary/40"}`}>
        <div className="flex items-start justify-between gap-4"><h2 className="font-bold">{service.name}</h2><input type="checkbox" checked={selected.includes(service.id)} onChange={() => toggle(service.id)} onClick={(event) => event.stopPropagation()} /></div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{service.description || "Açıklama bulunmuyor."}</p>
        <p className="mt-4 text-sm font-semibold text-primary">{service.duration_minutes} dk · {money(service.price)}</p>
      </button>)}
    </div> : <EmptyState title="Aktif hizmet bulunamadı" description="Şu anda seçilebilecek aktif hizmet yok." />}
    <StaffPanel><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><p className="text-sm text-muted">{selected.length} hizmet seçildi.</p><Button onClick={save} disabled={busy}>{busy ? "Kaydediliyor…" : "Hizmetleri kaydet"}</Button></div></StaffPanel>
  </div>;
}
