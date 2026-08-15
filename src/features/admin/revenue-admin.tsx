"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { commerceMoney } from "@/features/commerce/commerce-format";
import { adminService } from "@/services/admin-service";
import { ApiError } from "@/types/api";
import type { RevenueChartItem, RevenueRange, RevenueSummary } from "@/types/admin";
import { AdminHeader, AdminPanel, Feedback, LoadingState } from "./admin-ui";

type RevenueFilters = {
  date_from?: string;
  date_to?: string;
};

const defaultRange: RevenueRange = {
  date_from: "",
  date_to: "",
  products: 0,
  appointments: 0,
  total: 0,
};

export function RevenueAdmin() {
  const [summary, setSummary] = useState<RevenueSummary | null>(null);
  const [filters, setFilters] = useState<RevenueFilters>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (next: RevenueFilters) => {
    setLoading(true);
    setError("");

    try {
      setSummary(normalizeSummary(await adminService.revenue(next), next));
    } catch (reason) {
      setError(
        reason instanceof ApiError
          ? reason.message
          : "Ciro özeti yüklenemedi."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load({});
  }, [load]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {
      date_from: String(data.get("date_from") || "") || undefined,
      date_to: String(data.get("date_to") || "") || undefined,
    };
    setFilters(next);
    void load(next);
  }

  function clear() {
    setFilters({});
    void load({});
  }

  const cards = summary ? [
    ["Bugünkü Toplam Gelir", summary.totals.today],
    ["Bu Ayki Toplam Gelir", summary.totals.month],
    ["Toplam Gelir", summary.totals.total],
    ["Bugünkü Ürün Tahsilatı", summary.products.today],
    ["Bu Ayki Ürün Tahsilatı", summary.products.month],
    ["Toplam Ürün Tahsilatı", summary.products.total],
    ["Bugünkü Randevu Geliri", summary.appointments.today],
    ["Bu Ayki Randevu Geliri", summary.appointments.month],
    ["Toplam Randevu Geliri", summary.appointments.total],
    ["Bekleyen Ödeme Tutarı", summary.pending_payment_amount],
  ] as const : [];

  const filtered = Boolean(filters.date_from || filters.date_to);
  const range = summary?.range ?? defaultRange;
  const chart = Array.isArray(summary?.chart) ? summary.chart : [];

  return (
    <div className="grid min-w-0 max-w-full gap-6 overflow-x-hidden">
      <AdminHeader title="Ciro" description="Ürün tahsilatları ve tamamlanan hizmet gelirlerinin güncel özeti." />

      <AdminPanel>
        <form key={JSON.stringify(filters)} onSubmit={submit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-semibold">
            Başlangıç tarihi
            <input name="date_from" type="date" defaultValue={filters.date_from || ""} className="h-11 rounded-xl border bg-card px-3" />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Bitiş tarihi
            <input name="date_to" type="date" defaultValue={filters.date_to || ""} className="h-11 rounded-xl border bg-card px-3" />
          </label>
          <Button type="submit" disabled={loading}>Filtrele</Button>
          <Button type="button" variant="ghost" onClick={clear} disabled={loading || !filtered}>Temizle</Button>
        </form>
      </AdminPanel>

      {error ? <Feedback>{error}</Feedback> : null}
      {loading ? <LoadingState label="Ciro özeti yükleniyor…" /> : null}

      {!loading && summary ? (
        <>
          {filtered ? (
            <AdminPanel className="border-primary/25">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Seçilen Tarih Aralığı Geliri</p>
              <p className="mt-2 text-xs text-muted">{formatDate(range.date_from)} – {formatDate(range.date_to)}</p>
              <p className="mt-3 text-3xl font-bold text-primary">{commerceMoney(range.total)}</p>
              <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2">
                <RevenueLine label="Ürün tahsilatı" value={range.products} />
                <RevenueLine label="Randevu geliri" value={range.appointments} />
              </div>
            </AdminPanel>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(([label, value], index) => (
              <AdminPanel key={label} className={index < 3 ? "border-primary/25" : ""}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
                <p className="mt-3 text-2xl font-bold text-primary">{commerceMoney(value)}</p>
              </AdminPanel>
            ))}
          </div>

          <RevenueChart items={chart} dateFrom={range.date_from} dateTo={range.date_to} />

          <AdminPanel>
            <div className="grid gap-3 text-sm leading-6 text-muted">
              <p><strong className="text-foreground">Ürün tahsilatı:</strong> Payments tablosundaki paid ödemelerden gelir.</p>
              <p><strong className="text-foreground">Randevu geliri:</strong> Status=completed olan randevuların price_snapshot toplamıdır.</p>
              <p>Bu nedenle randevu tarafı şu aşamada muhasebesel tahsilat değil, tamamlanan hizmet geliri olarak değerlendirilir.</p>
            </div>
          </AdminPanel>
        </>
      ) : null}
    </div>
  );
}

function RevenueChart({items,dateFrom,dateTo}:{items:RevenueChartItem[];dateFrom:string;dateTo:string}) {
  const maximum = Math.max(0, ...items.map((item) => item.total));
  const hasRevenue = items.some((item) => item.total > 0);
  const labelStep = Math.max(1, Math.ceil(items.length / 12));
  const chartWidth = Math.max(560, items.length * 30);
  const height = (value:number) => value > 0 && maximum > 0 ? `${Math.max(5, value / maximum * 100)}%` : "0%";

  return (
    <AdminPanel className="min-w-0 max-w-full overflow-hidden">
      <div className="flex min-w-0 flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <h2 className="text-lg font-bold">Gelir Grafiği</h2>
          <p className="mt-1 text-xs text-muted">{formatDate(dateFrom)} – {formatDate(dateTo)}</p>
        </div>
        <div className="flex min-w-0 flex-wrap gap-4 text-xs text-muted" aria-label="Grafik açıklaması">
          <Legend color="bg-[#b98270]" label="Ürün Geliri" />
          <Legend color="bg-[#8f6657]" label="Randevu Geliri" />
          <Legend color="bg-primary" label="Toplam Gelir" />
        </div>
      </div>
      {hasRevenue ? <div className="mt-5 block w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-2">
        <div className="grid h-44 w-full max-w-none items-end border-b border-primary/15 px-1" style={{minWidth:`${chartWidth}px`,gridTemplateColumns:`repeat(${items.length}, minmax(20px, 1fr))`}} role="img" aria-label={`${formatDate(dateFrom)} ile ${formatDate(dateTo)} arasındaki günlük ürün, randevu ve toplam gelir grafiği`}>
          {items.map((item,index) => {
            const showLabel=index%labelStep===0||index===items.length-1||item.total>0;
            return <div key={item.date} className={`flex h-full min-w-0 flex-col justify-end rounded-t-md px-0.5 ${item.total>0?"bg-primary/[.045] ring-1 ring-inset ring-primary/10":""}`} title={`${formatDate(item.date)} — Ürün: ${commerceMoney(item.products)}, Randevu: ${commerceMoney(item.appointments)}, Toplam: ${commerceMoney(item.total)}`}>
              <div className="flex h-28 items-end justify-center gap-0.5" aria-hidden="true">
                <span className="w-1.5 rounded-t bg-[#b98270]" style={{height:height(item.products)}} />
                <span className="w-1.5 rounded-t bg-[#8f6657]" style={{height:height(item.appointments)}} />
                <span className="w-1.5 rounded-t bg-primary shadow-sm" style={{height:height(item.total)}} />
              </div>
              <span className={`mt-2 h-7 text-center text-[9px] leading-3 ${item.total>0?"font-semibold text-foreground":"text-muted"}`}>{showLabel?shortDate(item.date):""}</span>
              <span className="sr-only">{formatDate(item.date)}: Ürün {commerceMoney(item.products)}, randevu {commerceMoney(item.appointments)}, toplam {commerceMoney(item.total)}</span>
            </div>;
          })}
        </div>
      </div>:<p className="mt-5 rounded-xl bg-muted-surface p-6 text-center text-sm text-muted">Bu tarih aralığında gelir verisi yok.</p>}
    </AdminPanel>
  );
}

function Legend({color,label}:{color:string;label:string}){return <span className="flex items-center gap-1.5"><span className={`size-2.5 rounded-sm ${color}`} aria-hidden="true"/>{label}</span>}
function RevenueLine({label,value}:{label:string;value:number}){return <div className="flex justify-between gap-4 text-sm"><span className="text-muted">{label}</span><strong>{commerceMoney(value)}</strong></div>}
function normalizeSummary(data:RevenueSummary,filters:RevenueFilters):RevenueSummary{return{...data,range:data.range??{...defaultRange,date_from:filters.date_from??"",date_to:filters.date_to??""},chart:Array.isArray(data.chart)?data.chart:[]}}
function formatDate(value:string){if(!value)return"—";const date=new Date(`${value}T12:00:00`);return Number.isNaN(date.getTime())?"—":new Intl.DateTimeFormat("tr-TR",{dateStyle:"medium"}).format(date)}
function shortDate(value:string){const date=new Date(`${value}T12:00:00`);return Number.isNaN(date.getTime())?"":new Intl.DateTimeFormat("tr-TR",{day:"numeric",month:"short"}).format(date)}
