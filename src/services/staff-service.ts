import { apiRequest } from "@/lib/api/client";
import type { Appointment,Paginated,ServiceItem } from "@/types/appointment";
import type { DayOff,WorkingHour } from "@/types/staff";
function query(values:object){const params=new URLSearchParams();for(const[key,value]of Object.entries(values))if(value!==undefined&&value!=="")params.set(key,String(value));const text=params.toString();return text?`?${text}`:"";}
export const staffService={
  appointments:(filters:object={})=>apiRequest<Paginated<Appointment>>(`/staff/me/appointments${query(filters)}`),
  appointment:(id:number)=>apiRequest<Appointment>(`/staff/me/appointments/${id}`),
  status:(id:number,status:"confirmed"|"completed"|"no_show")=>apiRequest<Appointment>(`/staff/me/appointments/${id}/status`,{method:"PATCH",body:{status}}),
  assignedServices:()=>apiRequest<ServiceItem[]>("/staff/me/services"),
  availableServices:()=>apiRequest<Paginated<ServiceItem>>("/services?per_page=100",{auth:false}),
  updateServices:(service_ids:number[])=>apiRequest<ServiceItem[]>("/staff/me/services",{method:"PUT",body:{service_ids}}),
  workingHours:()=>apiRequest<WorkingHour[]>("/staff/me/working-hours"),
  updateWorkingHours:(working_hours:Omit<WorkingHour,"id">[])=>apiRequest<WorkingHour[]>("/staff/me/working-hours",{method:"PUT",body:{working_hours}}),
  daysOff:(page=1)=>apiRequest<Paginated<DayOff>>(`/staff/me/days-off${query({page,per_page:12})}`),
  addDayOff:(body:{start_at:string;end_at:string;reason?:string})=>apiRequest<DayOff>("/staff/me/days-off",{method:"POST",body}),
  deleteDayOff:(id:number)=>apiRequest<{id:number}>(`/staff/me/days-off/${id}`,{method:"DELETE"}),
};
