import type { Paginated,Appointment,ServiceItem } from "./appointment";
export interface WorkingHour{id:number;weekday:number;start_time:string;end_time:string}
export interface WorkingDay{weekday:number;enabled:boolean;start_time:string;end_time:string}
export interface DayOff{id:number;staff_profile_id:number;start_at:string;end_at:string;reason:string|null;created_at:string}
export type StaffAppointments=Paginated<Appointment>;
export type StaffServices=ServiceItem[];
