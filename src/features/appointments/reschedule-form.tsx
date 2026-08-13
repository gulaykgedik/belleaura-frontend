"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { appointmentService } from "@/services/appointment-service";
import { ApiError } from "@/types/api";
import type { Appointment } from "@/types/appointment";
import { EmptyState, Feedback, LoadingState } from "./feedback";
import { appointmentDate, money, todayInIstanbul } from "./format";

export function RescheduleForm({ id }: { id: number }) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => { let active = true; appointmentService.detail(id).then((data) => { if (active) setAppointment(data); }).catch((reason) => { if (active) setError(reason instanceof ApiError ? reason.message : "Randevu yüklenemedi."); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [id]);
  async function checkAvailability() { if (!appointment || !date) { setError("Önce yeni bir tarih seçin."); return; } setChecking(true); setError(""); setTime(""); try { const result = await appointmentService.availability(appointment.service_id, appointment.staff_profile_id, date); setSlots(result.slots); setChecked(true); } catch (cause) { setError(cause instanceof ApiError ? cause.message : "Uygun saatler yüklenemedi."); } finally { setChecking(false); } }
  async function save() { if (!appointment || !date || !time) return; setSaving(true); setError(""); try { const updated = await appointmentService.reschedule(id, { service_id: appointment.service_id, staff_id: appointment.staff_profile_id, date, start_time: time }); setAppointment(updated); setSuccess(true); } catch (cause) { setError(cause instanceof ApiError ? cause.message : "Randevu yeniden planlanamadı."); } finally { setSaving(false); } }
  if (loading) return <div className="mx-auto max-w-3xl px-4 py-10"><LoadingState label="Randevu yükleniyor…" /></div>;
  if (!appointment) return <div className="mx-auto max-w-3xl px-4 py-10"><Feedback>{error || "Randevu bulunamadı."}</Feedback></div>;
  if (success) return <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6"><div className="rounded-card border bg-card p-8 text-center"><span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500 text-3xl text-white">✓</span><h1 className="mt-6 text-3xl font-bold">Randevunuz güncellendi</h1><p className="mt-3 text-muted">Yeni randevu zamanınız {appointmentDate(appointment.start_at)}, saat {appointment.start_at.slice(11, 16)}.</p><Link href={`/appointments/${id}`} className="mt-7 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Randevu detayına dön</Link></div></div>;
  const editable = appointment.status === "pending" || appointment.status === "confirmed";
  return <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><Link href={`/appointments/${id}`} className="text-sm font-semibold text-primary">← Randevu detayına dön</Link><div className="mt-5 rounded-card border bg-card p-5 sm:p-8"><p className="text-sm font-semibold text-primary">Yeniden planla</p><h1 className="mt-1 text-3xl font-bold">Yeni tarih ve saat seçin</h1><div className="mt-6 rounded-xl bg-muted-surface p-5"><p className="font-bold">{appointment.service_name_snapshot}</p><p className="mt-1 text-sm text-muted">{appointment.staff_name} · {money(appointment.price_snapshot)}</p><p className="mt-2 text-sm">Mevcut zaman: {appointmentDate(appointment.start_at)} · {appointment.start_at.slice(11, 16)}</p></div>{error ? <div className="mt-5"><Feedback>{error}</Feedback></div> : null}{!editable ? <div className="mt-5"><Feedback>Bu randevunun durumu yeniden planlamaya uygun değil.</Feedback></div> : <><div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end"><label className="grid flex-1 gap-2 text-sm font-semibold">Yeni tarih<input type="date" min={todayInIstanbul()} value={date} onChange={(event) => { setDate(event.target.value); setSlots([]); setTime(""); setChecked(false); }} className="h-12 rounded-xl border bg-card px-4 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" /></label><Button onClick={checkAvailability} disabled={!date || checking}>{checking ? "Kontrol ediliyor…" : "Uygun saatleri getir"}</Button></div>{checked ? slots.length ? <div className="mt-7"><h2 className="font-bold">Uygun saatler</h2><p className="mt-1 text-sm text-muted">Saatler backend uygunluk sorgusundan alınır.</p><div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-7">{slots.map((slot) => <button type="button" key={slot} onClick={() => setTime(slot)} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${time === slot ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{slot}</button>)}</div></div> : <div className="mt-7"><EmptyState title="Uygun saat yok" description="Bu tarihte uygun saat bulunamadı. Başka bir tarih seçebilirsiniz." /></div> : null}{time ? <div className="mt-7 flex flex-col justify-between gap-4 rounded-xl border p-5 sm:flex-row sm:items-center"><div><p className="text-sm text-muted">Yeni randevu zamanı</p><p className="mt-1 font-bold">{new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(`${date}T12:00:00`))} · {time}</p></div><Button onClick={save} disabled={saving}>{saving ? "Kaydediliyor…" : "Değişikliği kaydet"}</Button></div> : null}</>}</div></div>;
}
