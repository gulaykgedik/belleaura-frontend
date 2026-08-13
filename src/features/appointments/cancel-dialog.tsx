"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CancelDialog({ open, busy, onClose, onConfirm }: { open: boolean; busy: boolean; onClose: () => void; onConfirm: (reason: string) => void }) {
  const [reason, setReason] = useState("");
  if (!open) return null;
  const valid = reason.trim().length >= 1 && reason.trim().length <= 500;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
    <div className="w-full max-w-md rounded-card border bg-card p-6 shadow-2xl">
      <h2 id="cancel-title" className="text-xl font-bold">Randevuyu iptal et</h2>
      <p className="mt-2 text-sm text-muted">Bu işlem geri alınamaz. Lütfen iptal nedeninizi belirtin.</p>
      <label className="mt-5 grid gap-2 text-sm font-semibold">İptal nedeni<textarea autoFocus rows={4} maxLength={500} value={reason} onChange={(event) => setReason(event.target.value)} className="rounded-xl border bg-card p-3 outline-none focus:border-primary focus:ring-3 focus:ring-primary/10" /></label>
      <p className="mt-1 text-right text-xs text-muted">{reason.length}/500</p>
      <div className="mt-6 flex justify-end gap-3"><Button variant="ghost" onClick={onClose} disabled={busy}>Vazgeç</Button><Button onClick={() => onConfirm(reason.trim())} disabled={busy || !valid} className="bg-danger text-white hover:opacity-90">{busy ? "İptal ediliyor…" : "İptali onayla"}</Button></div>
    </div>
  </div>;
}
