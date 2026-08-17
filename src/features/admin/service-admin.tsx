"use client";

import { useEffect, useMemo, useState } from "react";
import { adminService } from "@/services/admin-service";
import { ApiError } from "@/types/api";
import type { ServiceCategory } from "@/types/admin";
import { Feedback, LoadingState } from "./admin-ui";
import { ResourceManager, type ResourceConfig } from "./resource-manager";

export function ServiceAdmin() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    adminService.serviceCategories({ is_active: 1, per_page: 100 })
      .then((result) => {
        if (active) setCategories(result.items);
      })
      .catch((cause) => {
        if (active) setError(cause instanceof ApiError ? cause.message : "Hizmet kategorileri yüklenemedi.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const config = useMemo<ResourceConfig>(() => ({
    title: "Hizmetler",
    description: "Randevu hizmetlerini, kategorilerini, sürelerini ve fiyatlarını yönetin.",
    listPath: "/admin/services",
    mutatePath: "/services",
    canCreate: true,
    canEdit: true,
    canDelete: true,
    defaults: { category_id: "", is_active: true, duration_minutes: 30, price: 0, sort_order: 0 },
    fields: [
      { key: "name", label: "Hizmet adı", required: true },
      { key: "slug", label: "Slug" },
      {
        key: "category_id",
        label: "Kategori",
        type: "select",
        options: [
          { label: "Kategori seçin", value: "" },
          ...categories.map((category) => ({ label: category.name, value: category.id })),
        ],
      },
      { key: "price", label: "Fiyat", type: "number", step: "0.01", required: true },
      { key: "duration_minutes", label: "Süre (dakika)", type: "number", required: true },
      { key: "sort_order", label: "Sıralama", type: "number" },
      { key: "short_description", label: "Kısa açıklama", type: "textarea" },
      { key: "description", label: "Açıklama", type: "textarea" },
      { key: "video_url", label: "Video URL", type: "url" },
      { key: "is_active", label: "Aktif", type: "checkbox" },
    ],
    columns: [
      { key: "name", label: "Hizmet" },
      { key: "category_name", label: "Kategori", render: (row) => String(row.category_name ?? "—") },
      { key: "price", label: "Fiyat" },
      { key: "duration_minutes", label: "Süre" },
      { key: "sort_order", label: "Sıralama" },
      { key: "is_active", label: "Aktif" },
    ],
    filters: [{ key: "is_active", label: "Aktiflik", options: [{ label: "Aktif", value: "1" }, { label: "Pasif", value: "0" }] }],
    normalize: (values) => ({
      ...values,
      category_id: values.category_id === "" ? null : Number(values.category_id),
      short_description: values.short_description === "" ? null : values.short_description,
      video_url: values.video_url === "" ? null : values.video_url,
    }),
  }), [categories]);

  if (loading) return <LoadingState label="Hizmet kategorileri yükleniyor…" />;
  if (error) return <Feedback>{error}</Feedback>;
  return <ResourceManager config={config} />;
}
