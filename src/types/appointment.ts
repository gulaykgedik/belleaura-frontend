export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface ServiceItem {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  duration_minutes: number;
}

export interface StaffItem {
  id: number;
  name: string;
  bio: string | null;
  avatar_path: string | null;
  service_id: number;
  service_name: string;
  duration_minutes: number;
  price: string;
}

export interface Availability {
  date: string;
  service_id: number;
  staff_id: number;
  duration_minutes: number;
  slots: string[];
}

export interface Appointment {
  id: number;
  reference_no: string;
  customer_id: number;
  staff_profile_id: number;
  service_id: number;

  branch_id: number | null;
  branch_name?: string | null;

  start_at: string;
  end_at: string;
  status: AppointmentStatus;
  service_name_snapshot: string;

  service_duration_snapshot?: number;
  price_snapshot: string;
  notes_customer: string | null;

  staff_name: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string | null;

  cancelled_at?: string | null;
  cancellation_reason?: string | null;

  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface BookingPayload {
  branch_id: number;
  service_id: number;
  staff_id: number;
  date: string;
  start_time: string;
  customer_note?: string;
}
