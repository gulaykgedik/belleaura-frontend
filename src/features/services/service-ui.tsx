import Link from "next/link";
import Image from "next/image";
import type { ServiceItem } from "@/types/appointment";
import { money } from "@/features/appointments/format";
import { demoImages } from "@/lib/demo-images";

export const serviceCategories = ["Tümü", "Saç Bakımı", "Cilt Bakımı", "Kaş & Kirpik", "El & Ayak Bakımı", "Özel Bakımlar"] as const;
export type ServiceCategory = (typeof serviceCategories)[number];
export const serviceCategorySlugs:Record<ServiceCategory,string>={"Tümü":"all","Saç Bakımı":"sac-bakimi","Cilt Bakımı":"cilt-bakimi","Kaş & Kirpik":"kas-kirpik","El & Ayak Bakımı":"el-ayak-bakimi","Özel Bakımlar":"ozel-bakimlar"};
export function categoryFromSlug(slug?:string):ServiceCategory{return serviceCategories.find((item)=>serviceCategorySlugs[item]===slug)??"Tümü";}
export const serviceTones = ["bg-[#e4c4b7]", "bg-[#d9d2c5]", "bg-[#ead5ca]", "bg-[#d8b9ae]", "bg-[#ded6ca]"];

export function categoryFor(service: ServiceItem): Exclude<ServiceCategory, "Tümü"> {
  const value = `${service.name} ${service.description || ""}`.toLocaleLowerCase("tr-TR");
  if (/saç|fön|kesim|boya/.test(value)) return "Saç Bakımı";
  if (/cilt|yüz|peeling/.test(value)) return "Cilt Bakımı";
  if (/kaş|kirpik/.test(value)) return "Kaş & Kirpik";
  if (/el|ayak|manikür|pedikür|tırnak/.test(value)) return "El & Ayak Bakımı";
  return "Özel Bakımlar";
}

export function ServiceVisual({service,index,compact=false,priority=false}:{service:ServiceItem;index:number;compact?:boolean;priority?:boolean}){const category=categoryFor(service);const src=category==="Saç Bakımı"?demoImages.hair:category==="Cilt Bakımı"?demoImages.skincare:index%3===0?demoImages.spa:demoImages.products;return <div className={`group/image relative overflow-hidden ${compact?"aspect-[16/10] rounded-[2rem]":"aspect-[4/5] rounded-[7rem_7rem_1.75rem_1.75rem]"} ${serviceTones[index%serviceTones.length]}`}><Image src={src} alt={`${service.name} hizmetini temsil eden bakım fotoğrafı`} fill priority={priority} sizes={compact?"(max-width: 768px) 100vw, 50vw":"(max-width: 768px) 100vw, 33vw"} className="object-cover transition-transform duration-300 ease-out group-hover/image:scale-[1.04] motion-reduce:transition-none"/><div className="absolute inset-0 bg-gradient-to-t from-[#4a3028]/45 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover/image:opacity-90"/><span className="absolute bottom-5 left-6 font-serif text-5xl text-white/75">{String(index+1).padStart(2,"0")}</span><span className="absolute bottom-6 right-6 translate-y-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100 motion-reduce:transform-none">Keşfet →</span></div>}

export function ServiceCard({ service, index }: { service: ServiceItem; index: number }) { return <article className="group min-w-0 transition-transform duration-300 hover:-translate-y-1"><ServiceVisual service={service} index={index}/><p className="mt-6 text-xs font-bold uppercase tracking-[.17em] text-primary">{categoryFor(service)}</p><h3 className="mt-2 text-3xl">{service.name}</h3><p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">{service.description || "Size özel ihtiyaçlarınız gözetilerek özenle planlanan profesyonel bakım deneyimi."}</p><div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"><strong>{service.duration_minutes} dakika</strong><span className="text-primary">{money(service.price)}</span></div><div className="mt-6 flex flex-wrap gap-5"><Link href={`/services/${service.slug}`} className="border-b pb-1 text-sm font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Detayları İncele</Link><Link href="/appointments/new" className="border-b border-primary pb-1 text-sm font-semibold text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Randevu Al →</Link></div></article>; }

export function SectionHeading({ eyebrow, title, text, id }: { eyebrow: string; title: string; text?: string; id?: string }) { return <div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">{eyebrow}</p><h2 id={id} className="mt-3 text-4xl sm:text-5xl">{title}</h2>{text ? <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{text}</p> : null}</div>; }
