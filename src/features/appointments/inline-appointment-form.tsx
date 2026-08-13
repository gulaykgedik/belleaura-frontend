"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { appointmentService } from "@/services/appointment-service";
import { ApiError } from "@/types/api";
import type { Appointment, ServiceItem, StaffItem } from "@/types/appointment";
import { money, todayInIstanbul } from "./format";

const categories = ["Tümü", "Saç Bakımı", "Cilt Bakımı", "Kaş & Kirpik", "El & Ayak Bakımı", "Özel Bakımlar"] as const;
const draftKey = "home-appointment-draft";

export function InlineAppointmentForm() {
  const { user, isLoading:authLoading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]), [staff, setStaff] = useState<StaffItem[]>([]), [slots, setSlots] = useState<string[]>([]);
  const [category, setCategory] = useState<(typeof categories)[number]>("Tümü"), [serviceId, setServiceId] = useState(""), [staffId, setStaffId] = useState(""), [date, setDate] = useState(""), [time, setTime] = useState(""), [timeOpen, setTimeOpen] = useState(false);
  const [loadingServices, setLoadingServices] = useState(true), [loadingStaff, setLoadingStaff] = useState(false), [loadingSlots, setLoadingSlots] = useState(false), [creating, setCreating] = useState(false);
  const [error, setError] = useState(""), [dateError, setDateError] = useState(""), [created, setCreated] = useState<Appointment | null>(null);
  const service = services.find(item => item.id === Number(serviceId)) ?? null;
  const staffMember = staff.find(item => item.id === Number(staffId)) ?? null;
  const visibleServices = category === "Tümü" ? services : services.filter(item => categoryFor(item) === category);

  useEffect(() => { try { const saved = sessionStorage.getItem(draftKey); if (!saved) return; const draft = JSON.parse(saved) as Partial<{category:(typeof categories)[number]; serviceId:string; staffId:string; date:string; time:string}>; if (draft.category && categories.includes(draft.category)) setCategory(draft.category); if (draft.serviceId) setServiceId(draft.serviceId); if (draft.staffId) setStaffId(draft.staffId); if (draft.date) setDate(draft.date); if (draft.time) setTime(draft.time); } catch { sessionStorage.removeItem(draftKey); } }, []);
  useEffect(() => { let active = true; appointmentService.services().then(result => active && setServices(result.items)).catch(reason => active && setError(message(reason, "Hizmetler yüklenemedi."))).finally(() => active && setLoadingServices(false)); return () => { active = false; }; }, []);
  useEffect(() => { if (!serviceId) return; let active = true; setLoadingStaff(true); appointmentService.staff(Number(serviceId)).then(items => active && setStaff(items)).catch(reason => active && setError(message(reason, "Uzmanlar yüklenemedi."))).finally(() => active && setLoadingStaff(false)); return () => { active = false; }; }, [serviceId]);
  useEffect(() => { if (!serviceId || !staffId || !date || dateError) return; let active = true; setLoadingSlots(true); appointmentService.availability(Number(serviceId), Number(staffId), date).then(result => active && setSlots(result.slots)).catch(reason => active && setError(message(reason, "Uygun saatler yüklenemedi."))).finally(() => active && setLoadingSlots(false)); return () => { active = false; }; }, [serviceId, staffId, date, dateError]);

  function resetTime() { setTime(""); setSlots([]); setTimeOpen(false); setLoadingSlots(false); }
  function chooseCategory(value:(typeof categories)[number]) { setCategory(value); chooseService(""); }
  function chooseService(value:string) { setServiceId(value); setStaffId(""); setStaff([]); resetTime(); setError(""); }
  function chooseStaff(value:string) { setStaffId(value); resetTime(); setError(""); }
  function chooseDate(value:string) { setDate(value); resetTime(); setError(""); setDateError(value && isPastLocalDate(value) ? "Geçmiş tarihler seçilemez." : ""); }
  function chooseTime(value:string) { setTime(value); setTimeOpen(false); }
  async function create() { if (date && isPastLocalDate(date)) { setDateError("Geçmiş tarihler seçilemez."); return; } if (!service || !staffMember || !date || !time) return; if (!user) { sessionStorage.setItem(draftKey, JSON.stringify({ category, serviceId, staffId, date, time })); router.push("/login?next=%2F"); return; } setCreating(true); setError(""); try { setCreated(await appointmentService.create({ service_id:service.id, staff_id:staffMember.id, date, start_time:time })); sessionStorage.removeItem(draftKey); } catch (reason) { setError(message(reason, "Randevu oluşturulamadı.")); } finally { setCreating(false); } }

  if (created) return <div className="py-8 text-center"><span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-600 text-2xl text-white">✓</span><h3 className="mt-4 text-2xl">Randevunuz oluşturuldu</h3><p className="mt-2 text-sm text-muted">Referans numaranız <strong>{created.reference_no}</strong>.</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><Link href={`/appointments/${created.id}`} className="rounded-full border px-5 py-3 text-sm font-semibold">Randevu detayı</Link><Link href="/appointments" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Randevularım</Link></div></div>;

  const complete = !!service && !!staffMember && !!date && !dateError && !!time;
  return <div className="grid min-w-0 gap-5 py-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(250px,.75fr)] lg:gap-6">
    <div className="grid min-w-0 content-start gap-x-4 gap-y-3 sm:grid-cols-2">
      <Field label="Şube"><select value="merkez" disabled className={control}><option value="merkez">Lotus Merkez</option></select></Field>
      <Field label="Kategori"><select value={category} disabled={loadingServices} onChange={event => chooseCategory(event.target.value as (typeof categories)[number])} className={control}>{categories.map(item => <option value={item} key={item}>{item}</option>)}</select></Field>
      <Field label="Hizmet"><select value={serviceId} disabled={loadingServices} onChange={event => chooseService(event.target.value)} className={control}><option value="">{loadingServices ? "Hizmetler yükleniyor..." : "Hizmet seçin"}</option>{visibleServices.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select></Field>
      <Field label="Uzman"><select value={staffId} disabled={!service || loadingStaff} onChange={event => chooseStaff(event.target.value)} className={control}><option value="">{loadingStaff ? "Uzmanlar yükleniyor..." : service ? "Uzman seçin" : "Önce hizmet seçin"}</option>{staff.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}</select>{service && !loadingStaff && !staff.length ? <Meta>Bu hizmet için uygun uzman bulunamadı.</Meta> : null}</Field>
      <Field label="Süre"><input readOnly value={service ? `${service.duration_minutes} dakika` : "—"} className={readOnlyControl}/></Field>
      <Field label="Fiyat"><input readOnly value={service ? money(service.price) : "—"} className={readOnlyControl}/></Field>
      <Field label="Tarih"><input type="date" min={todayInIstanbul()} value={date} onChange={event => chooseDate(event.target.value)} aria-invalid={!!dateError} aria-describedby={dateError ? "inline-date-error" : undefined} className={control}/>{dateError ? <span id="inline-date-error" role="alert" className="text-xs font-normal text-red-700">{dateError}</span> : null}</Field>
      <Field label="Saat"><TimePicker ready={!!serviceId && !!staffId && !!date && !dateError} loading={loadingSlots} slots={slots} value={time} open={timeOpen} toggle={() => setTimeOpen(value => !value)} select={chooseTime}/></Field>
      {error ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 sm:col-span-2">{error}</div> : null}
    </div>
    <aside className="min-w-0 rounded-[1.4rem] border border-primary/15 bg-card/80 p-5 lg:sticky lg:top-32 lg:self-start"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Randevu Özeti</p><dl className="mt-4 grid gap-3 text-sm"><Summary label="Şube" value="Lotus Merkez"/><Summary label="Hizmet" value={service?.name}/><Summary label="Uzman" value={staffMember?.name}/><Summary label="Tarih" value={date ? new Intl.DateTimeFormat("tr-TR", { dateStyle:"long" }).format(new Date(`${date}T12:00:00`)) : undefined}/><Summary label="Saat" value={time}/><Summary label="Süre" value={service ? `${service.duration_minutes} dakika` : "—"}/><Summary label="Tutar" value={service ? money(service.price) : "—"}/></dl><Button type="button" onClick={create} disabled={!complete || creating || authLoading} className="mt-5 w-full">{creating ? "Randevu oluşturuluyor..." : "Randevuyu Onayla"}</Button></aside>
  </div>;
}

function TimePicker({ ready, loading, slots, value, open, toggle, select }:{ready:boolean; loading:boolean; slots:string[]; value:string; open:boolean; toggle:()=>void; select:(value:string)=>void}) { return <div className="relative"><button type="button" disabled={!ready || loading} aria-expanded={open} onClick={toggle} className={`${control} flex items-center justify-between text-left`}><span className="min-w-0 truncate">{loading ? "Uygun saatler yükleniyor..." : value ? <><strong>{value}</strong> <span className="ml-1 text-emerald-700">✓</span></> : ready ? "Saat seçin" : "Hizmet, uzman ve tarih seçin"}</span><span className="ml-2 shrink-0 text-xs text-primary">{value && !open ? "Değiştir" : open ? "▲" : "▼"}</span></button>{open ? <div className="mt-2 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-primary/15 bg-card p-3 shadow-[0_14px_35px_rgba(91,64,53,.12)]">{slots.length ? <div className="grid grid-cols-3 gap-2 min-[430px]:grid-cols-4">{slots.map(slot => <button type="button" key={slot} onClick={() => select(slot)} className={`rounded-lg border px-2 py-2 text-sm font-semibold ${value === slot ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{slot}</button>)}</div> : <p className="py-4 text-center text-sm text-muted">Bu tarih için uygun saat bulunamadı.</p>}</div> : null}</div>; }
const control = "h-11 w-full min-w-0 rounded-xl border border-primary/15 bg-white/70 px-3 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";
const readOnlyControl = `${control} bg-primary/[.035] text-muted`;
function Field({ label, children }:{label:string; children:React.ReactNode}) { return <fieldset className="grid min-w-0 content-start gap-1.5"><legend className="mb-0 text-sm font-semibold">{label}</legend>{children}</fieldset>; }
function Meta({ children }:{children:React.ReactNode}) { return <span className="text-xs font-normal text-muted">{children}</span>; }
function Summary({ label, value }:{label:string; value?:string}) { return <div className="flex justify-between gap-3 border-b border-primary/10 pb-2"><dt className="text-muted">{label}</dt><dd className="max-w-[60%] break-words text-right font-semibold">{value || "Henüz seçilmedi"}</dd></div>; }
function categoryFor(service:ServiceItem):(typeof categories)[number] { const value = `${service.name} ${service.description || ""}`.toLocaleLowerCase("tr-TR"); if (/saç|fön|kesim|boya/.test(value)) return "Saç Bakımı"; if (/cilt|yüz|peeling/.test(value)) return "Cilt Bakımı"; if (/kaş|kirpik/.test(value)) return "Kaş & Kirpik"; if (/el|ayak|manikür|pedikür|tırnak/.test(value)) return "El & Ayak Bakımı"; return "Özel Bakımlar"; }
function message(reason:unknown, fallback:string) { return reason instanceof ApiError ? reason.message : fallback; }
function isPastLocalDate(value:string):boolean { const parts = value.split("-").map(Number); if (parts.length !== 3 || parts.some(Number.isNaN)) return false; const [selectedYear, selectedMonth, selectedDay] = parts; const selected = new Date(selectedYear, selectedMonth - 1, selectedDay); const [todayYear, todayMonth, todayDay] = todayInIstanbul().split("-").map(Number); const today = new Date(todayYear, todayMonth - 1, todayDay); selected.setHours(0, 0, 0, 0); today.setHours(0, 0, 0, 0); return selected < today; }
