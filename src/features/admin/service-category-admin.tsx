"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/features/commerce/confirm-dialog";
import { adminService } from "@/services/admin-service";
import type { PaginationMeta } from "@/types/appointment";
import { ApiError } from "@/types/api";
import type { ServiceCategory } from "@/types/admin";
import { AdminHeader, AdminPanel, EmptyState, Feedback, LoadingState } from "./admin-ui";

type FormValues = {
  name: string;
  slug: string;
  description: string;
  sort_order: number;
  is_active: boolean;
};

const emptyForm: FormValues = {
  name: "",
  slug: "",
  description: "",
  sort_order: 0,
  is_active: true,
};

export function ServiceCategoryAdmin() {
  const [items, setItems] = useState<ServiceCategory[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState<ServiceCategory | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>( {} );
  const [removing, setRemoving] = useState<ServiceCategory | null>(null);

  const load = useCallback(() => adminService.serviceCategories({
    page,
    per_page: 15,
    search,
    is_active: activeFilter,
  }), [activeFilter, page, search]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    load()
      .then((result) => {
        if (!active) return;
        setItems(result.items);
        setMeta(result.meta);
      })
      .catch((cause) => {
        if (active) setError(errorMessage(cause, "Hizmet kategorileri yüklenemedi."));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [load]);

  function openNew() {
    setEditing(null);
    setValues(emptyForm);
    setFieldErrors({});
    setError("");
    setMessage("");
    setFormOpen(true);
  }

  async function openEdit(id: number) {
    setBusy(true);
    setError("");
    try {
      const category = await adminService.serviceCategory(id);
      setEditing(category);
      setValues({
        name: category.name,
        slug: category.slug ?? "",
        description: category.description ?? "",
        sort_order: Number(category.sort_order),
        is_active: Boolean(Number(category.is_active)),
      });
      setFieldErrors({});
      setMessage("");
      setFormOpen(true);
    } catch (cause) {
      setError(errorMessage(cause, "Kategori detayı yüklenemedi."));
    } finally {
      setBusy(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setFieldErrors({});
    const body = {
      ...values,
      slug: values.slug || null,
      description: values.description || null,
      image_media_id: editing?.image_media_id ?? null,
    };
    try {
      if (editing) await adminService.updateServiceCategory(editing.id, body);
      else await adminService.createServiceCategory(body);
      const result = await load();
      setItems(result.items);
      setMeta(result.meta);
      setFormOpen(false);
      setEditing(null);
      setMessage(editing ? "Hizmet kategorisi güncellendi." : "Hizmet kategorisi oluşturuldu.");
    } catch (cause) {
      if (cause instanceof ApiError) setFieldErrors(cause.errors);
      setError(errorMessage(cause, "Hizmet kategorisi kaydedilemedi."));
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!removing) return;
    setBusy(true);
    setError("");
    try {
      await adminService.deleteServiceCategory(removing.id);
      const result = await load();
      setItems(result.items);
      setMeta(result.meta);
      setRemoving(null);
      setMessage("Hizmet kategorisi silindi veya pasifleştirildi.");
    } catch (cause) {
      setError(errorMessage(cause, "Hizmet kategorisi silinemedi."));
      setRemoving(null);
    } finally {
      setBusy(false);
    }
  }

  return <div className="grid gap-6">
    <AdminHeader
      title="Hizmet Kategorileri"
      description="Hizmet kategorilerini, sıralamalarını ve yayın durumlarını yönetin."
      action={<Button onClick={openNew}>Yeni kategori</Button>}
    />
    {error ? <Feedback>{error}</Feedback> : null}
    {message ? <Feedback type="success">{message}</Feedback> : null}

    <AdminPanel>
      <form onSubmit={(event) => {
        event.preventDefault();
        setPage(1);
        setSearch(String(new FormData(event.currentTarget).get("search") ?? ""));
      }} className="flex flex-col gap-3 md:flex-row">
        <input name="search" defaultValue={search} placeholder="Kategori ara…" className="h-11 flex-1 rounded-xl border bg-card px-3" />
        <select value={activeFilter} onChange={(event) => { setPage(1); setActiveFilter(event.target.value); }} className="h-11 rounded-xl border bg-card px-3">
          <option value="">Aktiflik: Tümü</option>
          <option value="1">Aktif</option>
          <option value="0">Pasif</option>
        </select>
        <Button type="submit">Ara</Button>
      </form>
    </AdminPanel>

    {formOpen ? <AdminPanel>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">{editing ? "Kategoriyi düzenle" : "Yeni kategori"}</h2>
        <Button variant="ghost" onClick={() => setFormOpen(false)}>Kapat</Button>
      </div>
      <form onSubmit={submit} noValidate className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Kategori adı" value={values.name} onChange={(value) => setValues((current) => ({ ...current, name: value }))} error={fieldErrors.name} required />
        <Field label="Slug" value={values.slug} onChange={(value) => setValues((current) => ({ ...current, slug: value }))} error={fieldErrors.slug} placeholder="Boş bırakılırsa otomatik oluşturulur" />
        <Field label="Açıklama" value={values.description} onChange={(value) => setValues((current) => ({ ...current, description: value }))} error={fieldErrors.description} textarea />
        <Field label="Sıralama" value={String(values.sort_order)} onChange={(value) => setValues((current) => ({ ...current, sort_order: Number(value) }))} error={fieldErrors.sort_order} type="number" />
        <label className="flex items-center gap-2 self-end pb-3 text-sm font-semibold">
          <input type="checkbox" checked={values.is_active} onChange={(event) => setValues((current) => ({ ...current, is_active: event.target.checked }))} />
          Aktif
        </label>
        <p className="text-xs text-muted md:col-span-2">Görsel seçimi için projede mevcut bir medya yöneticisi bulunmadığından görsel alanı bu formda gösterilmez. Mevcut görsel ilişkisi düzenleme sırasında korunur.</p>
        <div className="flex justify-end md:col-span-2"><Button type="submit" disabled={busy}>{busy ? "Kaydediliyor…" : "Kaydet"}</Button></div>
      </form>
    </AdminPanel> : null}

    {loading ? <LoadingState /> : items.length ? <AdminPanel className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full min-w-4xl text-left text-sm">
          <thead className="bg-muted-surface text-xs uppercase text-muted"><tr>{["Kategori adı", "Slug", "Sıralama", "Durum", "Güncellenme", "İşlemler"].map((label) => <th key={label} className="px-4 py-3">{label}</th>)}</tr></thead>
          <tbody className="divide-y">{items.map((item) => <tr key={item.id}>
            <td className="px-4 py-3 font-semibold">{item.name}</td>
            <td className="px-4 py-3 text-muted">{item.slug || "—"}</td>
            <td className="px-4 py-3">{item.sort_order}</td>
            <td className="px-4 py-3">{Boolean(Number(item.is_active)) ? "Aktif" : "Pasif"}</td>
            <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.updated_at)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-right">
              <button disabled={busy} onClick={() => openEdit(item.id)} className="font-semibold text-primary disabled:opacity-50">Düzenle</button>
              <button disabled={busy} onClick={() => setRemoving(item)} className="ml-4 font-semibold text-danger disabled:opacity-50">Sil/Pasifleştir</button>
            </td>
          </tr>)}</tbody>
        </table>
      </div>
    </AdminPanel> : <EmptyState title="Hizmet kategorisi bulunamadı" description="Arama veya filtre kriterlerini değiştirin ya da yeni bir kategori ekleyin." />}

    {meta && meta.last_page > 1 ? <div className="flex justify-center gap-3">
      <Button variant="ghost" disabled={loading || page <= 1} onClick={() => setPage((current) => current - 1)}>← Önceki</Button>
      <span className="self-center text-sm text-muted">{meta.page} / {meta.last_page}</span>
      <Button variant="ghost" disabled={loading || page >= meta.last_page} onClick={() => setPage((current) => current + 1)}>Sonraki →</Button>
    </div> : null}

    <ConfirmDialog
      open={!!removing}
      title="Hizmet kategorisini sil"
      description={`${removing?.name ?? "Bu kategori"} silinecek veya backend kurallarına göre pasifleştirilecek. Devam edilsin mi?`}
      busy={busy}
      onClose={() => setRemoving(null)}
      onConfirm={confirmDelete}
    />
  </div>;
}

function Field({ label, value, onChange, error, required = false, textarea = false, type = "text", placeholder }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; textarea?: boolean; type?: string; placeholder?: string }) {
  const id = `service-category-${label.toLocaleLowerCase("tr-TR").replaceAll(" ", "-")}`;
  const controlClass = `rounded-xl border bg-card px-3 outline-none focus:ring-3 ${error ? "border-danger focus:ring-danger/10" : "focus:border-primary focus:ring-primary/10"}`;
  return <label htmlFor={id} className={`grid gap-1.5 text-sm font-semibold ${textarea ? "md:col-span-2" : ""}`}>
    {label}
    {textarea
      ? <textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} rows={4} className={`${controlClass} py-3`} aria-invalid={!!error} />
      : <input id={id} value={value} onChange={(event) => onChange(event.target.value)} type={type} required={required} placeholder={placeholder} className={`h-11 ${controlClass}`} aria-invalid={!!error} />}
    {error ? <span className="text-xs font-normal text-danger">{error}</span> : null}
  </label>;
}

function formatDate(value: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function errorMessage(cause: unknown, fallback: string) {
  return cause instanceof ApiError ? cause.message : fallback;
}
