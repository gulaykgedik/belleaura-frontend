import type { AppointmentStatus } from "@/types/appointment";
export const statusLabels:Record<AppointmentStatus,string>={pending:"Bekliyor",confirmed:"Onaylandı",completed:"Tamamlandı",cancelled:"İptal edildi",no_show:"Gelmedi"};
export function money(value:string|number):string{return new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY"}).format(Number(value));}
export function appointmentDate(value:string):string{return new Intl.DateTimeFormat("tr-TR",{dateStyle:"long",timeZone:"Europe/Istanbul"}).format(new Date(value.replace(" ","T")));}
export function appointmentTime(value:string):string{return value.slice(11,16);}
export function dateTime(value:string):string{return `${appointmentDate(value)} · ${appointmentTime(value)}`;}
export function todayInIstanbul():string{return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Istanbul",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());}
