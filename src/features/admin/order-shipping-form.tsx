"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { commerceDate } from "@/features/commerce/commerce-format";
import { adminService } from "@/services/admin-service";
import { ApiError } from "@/types/api";
import type { Order } from "@/types/commerce";
import { Feedback } from "./admin-ui";

const companies = [
  "Yurtiçi Kargo",
  "Aras Kargo",
  "MNG Kargo",
  "Sürat Kargo",
  "PTT Kargo",
  "Hepsijet",
  "Kolay Gelsin",
] as const;

export function OrderShippingForm({order,onSaved}:{order:Order;onSaved:(order:Order)=>void}) {
  const knownCompany = companies.includes(order.shipping_company as typeof companies[number]);
  const [company, setCompany] = useState(order.shipping_company ? knownCompany ? order.shipping_company : "Diğer" : "");
  const [otherCompany, setOtherCompany] = useState(order.shipping_company && !knownCompany ? order.shipping_company : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const shippingCompany = company === "Diğer" ? otherCompany.trim() : company.trim();

    if (!shippingCompany) {
      setError("Kargo firması zorunludur.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      onSaved(await adminService.updateOrderShipping(order.id, {
        shipping_company: shippingCompany,
        tracking_number: String(data.get("tracking_number") || "").trim(),
        tracking_url: String(data.get("tracking_url") || "").trim(),
      }));
    } catch (reason) {
      setError(reason instanceof ApiError ? reason.message : "Kargo bilgileri kaydedilemedi.");
    } finally {
      setBusy(false);
    }
  }

  const trackingUrl = safeHttpUrl(order.tracking_url);

  return (
    <section className="mt-5 rounded-xl border p-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-bold">Kargo Bilgileri</h3>
          {order.shipping_company || order.tracking_number || order.shipped_at ? (
            <div className="mt-2 grid gap-1 text-sm text-muted">
              <p>Kargo firması: <strong className="text-foreground">{order.shipping_company || "—"}</strong></p>
              <p>Takip numarası: <strong className="text-foreground">{order.tracking_number || "—"}</strong></p>
              <p>Kargoya verilme: <strong className="text-foreground">{order.shipped_at ? commerceDate(order.shipped_at) : "—"}</strong></p>
            </div>
          ) : null}
        </div>
        {trackingUrl ? <a href={trackingUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary">Kargoyu Takip Et ↗</a> : null}
      </div>

      {error ? <div className="mt-4"><Feedback>{error}</Feedback></div> : null}

      <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="grid gap-2 text-sm font-semibold">
          Kargo Firması
          <select value={company} onChange={(event)=>setCompany(event.target.value)} required className="h-11 rounded-xl border bg-card px-3">
            <option value="">Kargo firması seçin</option>
            {companies.map((item)=><option key={item} value={item}>{item}</option>)}
            <option value="Diğer">Diğer</option>
          </select>
        </label>
        {company === "Diğer" ? <label className="grid gap-2 text-sm font-semibold">Diğer firma<input value={otherCompany} onChange={(event)=>setOtherCompany(event.target.value)} required className="h-11 rounded-xl border bg-card px-3" /></label> : null}
        <label className="grid gap-2 text-sm font-semibold">
          Kargo Takip Numarası
          <input name="tracking_number" defaultValue={order.tracking_number || ""} required className="h-11 rounded-xl border bg-card px-3" />
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Kargo Takip Linki
          <input name="tracking_url" type="url" defaultValue={order.tracking_url || ""} placeholder="https://..." className="h-11 rounded-xl border bg-card px-3" />
        </label>
        <div className="flex items-end">
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Kaydediliyor…" : "Kargo Bilgilerini Kaydet"}</Button>
        </div>
      </form>
      <p className="mt-3 text-xs text-muted">Kargo bilgilerini kaydetmek sipariş durumunu otomatik değiştirmez.</p>
    </section>
  );
}

function safeHttpUrl(value:string|null):string|null{if(!value)return null;try{const url=new URL(value);return url.protocol==="http:"||url.protocol==="https:"?url.toString():null;}catch{return null;}}
