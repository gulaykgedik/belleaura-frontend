"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { appointmentService } from "@/services/appointment-service";
import { ApiError } from "@/types/api";
import type { Appointment } from "@/types/appointment";
import { CancelDialog } from "./cancel-dialog";
import { Feedback, LoadingState } from "./feedback";
import { appointmentDate, appointmentTime, dateTime, money } from "./format";
import { StatusBadge } from "./status-badge";

export function AppointmentDetail({ id }: { id: number }) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { let active = true; appointmentService.detail(id).then((data) => { if (active) setAppointment(data); }).catch((reason) => { if (active) setError(reason instanceof ApiError ? reason.message : "Randevu yüklenemedi."); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [id]);
  async function cancel(reason: string) { setCancelling(true); setError(""); try { const updated = await appointmentService.cancel(id, reason); setAppointment(updated); setDialogOpen(false); setMessage("Randevunuz iptal edildi."); } catch (cause) { setError(cause instanceof ApiError ? cause.message : "Randevu iptal edilemedi."); setDialogOpen(false); } finally { setCancelling(false); } }
  if (loading) return <div className="mx-auto max-w-4xl px-4 py-10"><LoadingState label="Randevu detayı yükleniyor…" /></div>;
  if (!appointment) return <div className="mx-auto max-w-4xl px-4 py-10"><Feedback>{error || "Randevu bulunamadı."}</Feedback></div>;
  const editable = appointment.status === "pending" || appointment.status === "confirmed";
  return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6"><Link href="/appointments" className="text-sm font-semibold text-primary">← Randevularıma dön</Link><div className="mt-5 rounded-card border bg-card p-5 sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-sm text-muted">{appointment.reference_no}</p><h1 className="mt-1 text-3xl font-bold">{appointment.service_name_snapshot}</h1></div><StatusBadge status={appointment.status} /></div>{error ? <div className="mt-5"><Feedback>{error}</Feedback></div> : null}{message ? <div className="mt-5"><Feedback type="success">{message}</Feedback></div> : null}<dl className="mt-8 grid gap-5 sm:grid-cols-2"><Detail label="Personel" value={appointment.staff_name} /><Detail label="Tarih" value={appointmentDate(appointment.start_at)} /><Detail label="Başlangıç" value={appointmentTime(appointment.start_at)} /><Detail label="Bitiş" value={appointmentTime(appointment.end_at)} /><Detail label="Fiyat" value={money(appointment.price_snapshot)} /><Detail label="Oluşturulma" value={dateTime(appointment.created_at)} /><div className="sm:col-span-2"><Detail label="Müşteri notu" value={appointment.notes_customer || "Not eklenmemiş"} /></div>{appointment.cancellation_reason ? <div className="sm:col-span-2"><Detail label="İptal nedeni" value={appointment.cancellation_reason} /></div> : null}</dl>{editable ? <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row"><Link href={`/appointments/${id}/reschedule`} className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Yeniden planla</Link><Button variant="ghost" onClick={() => setDialogOpen(true)} className="border text-danger">İptal et</Button></div> : null}</div><CancelDialog open={dialogOpen} busy={cancelling} onClose={() => setDialogOpen(false)} onConfirm={cancel} /></div>;
}
function Detail({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>; }
