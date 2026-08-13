import { apiRequest } from "@/lib/api/client";
import type { Appointment, Availability, BookingPayload, Paginated, ServiceItem, StaffItem } from "@/types/appointment";

function query(params:Record<string,string|number|undefined>):string{const search=new URLSearchParams();for(const[key,value]of Object.entries(params))if(value!==undefined&&value!=="")search.set(key,String(value));const suffix=search.toString();return suffix?`?${suffix}`:"";}
export const appointmentService={
  services:(search?:string)=>apiRequest<Paginated<ServiceItem>>(`/services${query({search,per_page:100})}`,{auth:false}),
  staff:(serviceId:number)=>apiRequest<StaffItem[]>(`/services/${serviceId}/staff`,{auth:false}),
  availability:(serviceId:number,staffId:number,date:string)=>apiRequest<Availability>(`/availability${query({service_id:serviceId,staff_id:staffId,date})}`,{auth:false}),
  list:(page=1)=>apiRequest<Paginated<Appointment>>(`/appointments${query({page,per_page:12})}`),
  detail:(id:number)=>apiRequest<Appointment>(`/appointments/${id}`),
  create:(payload:BookingPayload)=>apiRequest<Appointment>("/appointments",{method:"POST",body:payload}),
  reschedule:(id:number,payload:Omit<BookingPayload,"customer_note">)=>apiRequest<Appointment>(`/appointments/${id}/reschedule`,{method:"PATCH",body:payload}),
  cancel:(id:number,reason:string)=>apiRequest<Appointment>(`/appointments/${id}/cancel`,{method:"PATCH",body:{cancellation_reason:reason}}),
};
