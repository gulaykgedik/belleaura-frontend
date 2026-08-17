import { apiRequest } from "@/lib/api/client";
import type {
  AdminPage,
  AdminRecord,
  AdminSettings,
  NotificationOverview,
  RevenueSummary,
} from "@/types/admin";
import type { Appointment } from "@/types/appointment";
import type { Order, Payment } from "@/types/commerce";

function query(values: object) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  }

  const text = params.toString();

  return text ? `?${text}` : "";
}

export const adminService = {
  list: <T = AdminRecord>(path: string, filters: object = {}) =>
    apiRequest<AdminPage<T>>(`${path}${query(filters)}`),

  detail: <T = AdminRecord>(path: string, id: number) =>
    apiRequest<T>(`${path}/${id}`),

  create: <T = AdminRecord>(path: string, body: object) =>
    apiRequest<T>(path, {
      method: "POST",
      body,
    }),

  update: <T = AdminRecord>(path: string, id: number, body: object) =>
    apiRequest<T>(`${path}/${id}`, {
      method: "PATCH",
      body,
    }),

  remove: (path: string, id: number) =>
    apiRequest<{ id: number }>(`${path}/${id}`, {
      method: "DELETE",
    }),

  appointments: (filters: object) =>
    apiRequest<AdminPage<Appointment>>(
      `/admin/appointments${query(filters)}`
    ),

  appointment: (id: number) =>
    apiRequest<Appointment>(`/admin/appointments/${id}`),

 appointmentStatus: (id: number, status: string) =>
  apiRequest<Appointment>(`/admin/appointments/${id}/status`, {
    method: "POST",
    body: { status },
  }),

  appointmentCancel: (id: number, reason: string) =>
    apiRequest<Appointment>(`/admin/appointments/${id}/cancel`, {
      method: "PATCH",
      body: { cancellation_reason: reason },
    }),

  appointmentReschedule: (id: number, body: object) =>
    apiRequest<Appointment>(`/admin/appointments/${id}/reschedule`, {
      method: "PATCH",
      body,
    }),

  orders: (filters: object) =>
    apiRequest<AdminPage<Order>>(`/admin/orders${query(filters)}`),

  order: (id: number) =>
    apiRequest<Order>(`/admin/orders/${id}`),

  orderStatus: (id: number, status: string) =>
    apiRequest<Order>(`/admin/orders/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),

  orderCancel: (id: number) =>
    apiRequest<Order>(`/admin/orders/${id}/cancel`, {
      method: "PATCH",
      body: {},
    }),

  confirmBankTransfer: (id: number) =>
    apiRequest<Order>(
      `/admin/orders/${id}/confirm-bank-transfer`,
      {
        method: "PATCH",
        body: {},
      }
    ),

  receiveCashOnDelivery: (id: number) =>
    apiRequest<Order>(
      `/admin/orders/${id}/receive-cash-on-delivery`,
      {
        method: "PATCH",
        body: {},
      }
    ),

  updateOrderShipping: (
    id: number,
    body: {
      shipping_company: string;
      tracking_number: string;
      tracking_url: string;
    }
  ) =>
    apiRequest<Order>(`/admin/orders/${id}/shipping`, {
      method: "POST",
      body,
    }),

  payments: (filters: object) =>
    apiRequest<AdminPage<Payment>>(
      `/admin/payments${query(filters)}`
    ),

  payment: (id: number) =>
    apiRequest<Payment>(`/admin/payments/${id}`),

  revenue: (filters: { date_from?: string; date_to?: string } = {}) =>
    apiRequest<RevenueSummary>(`/admin/revenue${query(filters)}`),

  settings: () =>
    apiRequest<AdminSettings>("/admin/settings"),

 updateSettings: (body: AdminSettings) =>
  apiRequest<AdminSettings>("/admin/settings", {
    method: "POST",
    body,
  }),

  notifications: (filters: object = {}) =>
    apiRequest<NotificationOverview>(
      `/admin/notifications${query(filters)}`
    ),

  updateNotificationSettings: (
    body: Record<string, boolean>
  ) =>
    apiRequest<Record<string, string>>(
      "/admin/notifications/settings",
      {
        method: "PATCH",
        body,
      }
    ),

  staffServices: (id: number) =>
    apiRequest<AdminRecord[]>(
      `/staff/${id}/services`
    ),

  setStaffServices: (
    id: number,
    service_ids: number[]
  ) =>
    apiRequest<AdminRecord[]>(
      `/staff/${id}/services`,
      {
        method: "POST",
        body: { service_ids },
      }
    ),

  workingHours: (id: number) =>
    apiRequest<AdminRecord[]>(
      `/staff/${id}/working-hours`
    ),

  setWorkingHours: (
    id: number,
    working_hours: object[]
  ) =>
    apiRequest<AdminRecord[]>(
      `/staff/${id}/working-hours`,
      {
        method: "POST",
        body: { working_hours },
      }
    ),

  daysOff: (id: number) =>
    apiRequest<AdminPage<AdminRecord>>(
      `/staff/${id}/days-off`
    ),

  addDayOff: (id: number, body: object) =>
    apiRequest<AdminRecord>(
      `/staff/${id}/days-off`,
      {
        method: "POST",
        body,
      }
    ),

  deleteDayOff: (
    staffId: number,
    id: number
  ) =>
    apiRequest<{ id: number }>(
      `/staff/${staffId}/days-off/${id}`,
      {
        method: "DELETE",
      }
    ),
};
