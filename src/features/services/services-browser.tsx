"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appointmentService } from "@/services/appointment-service";
import type { ServiceItem } from "@/types/appointment";
import { categoryFor, categoryFromSlug, SectionHeading, ServiceCard, serviceCategories, serviceCategorySlugs, type ServiceCategory, ServiceVisual } from "./service-ui";
import { money } from "@/features/appointments/format";
import { demoImages } from "@/lib/demo-images";
import { Reveal } from "@/components/ui/reveal";

export function ServicesBrowser({ initialCategorySlug }: { initialCategorySlug?: string }) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [category, setCategory] = useState<ServiceCategory>(() => categoryFromSlug(initialCategorySlug));
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => { let active = true; appointmentService.services().then((page) => { if (active) setServices(page.items); }).catch(() => { }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, []);
  const visible = category === "Tümü" ? services : services.filter((service) => categoryFor(service) === category);
  const countFor = (item: ServiceCategory) => item === "Tümü" ? services.length : services.filter((service) => categoryFor(service) === item).length;
  function selectCategory(item: ServiceCategory) { setCategory(item); const slug = serviceCategorySlugs[item]; router.replace(item === "Tümü" ? "/services" : `/services?category=${encodeURIComponent(slug)}`, { scroll: false }); }

  return <>
    <section className="bg-[#f7f2ed] px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24"><div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[2.25rem] border border-[#eadfd8] bg-card shadow-[0_24px_70px_rgba(91,64,53,.07)] lg:grid-cols-[1.05fr_.95fr]"><Reveal direction="left" className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16"><p className="text-xs font-bold uppercase tracking-[.28em] text-primary">Hizmetlerimiz</p><h1 className="mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-[3.5rem]">Kendiniz için en doğru bakımı keşfedin.</h1><p className="mt-6 max-w-xl text-sm leading-7 text-muted sm:text-base">Uzman dokunuşu, kişisel yaklaşım ve dingin bir deneyimle hazırlanan Lotus bakım ritüellerini inceleyin.</p><Link href="#all-services" className="mt-8 w-fit rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground">Hizmetleri Keşfet</Link></Reveal><Reveal direction="right" className="relative min-h-[400px] overflow-hidden border-t border-[#eadfd8] bg-[#ddbeb1] lg:min-h-[540px] lg:border-l lg:border-t-0"><Image src={demoImages.spa} alt="Sıcak gün ışığında premium Lotus bakım odası" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#4f342b]/25 via-transparent to-transparent" /></Reveal></div></section>

    <section id="all-services" className="scroll-mt-36"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"><SectionHeading eyebrow="Bakım alanları" title="Hizmet Kategorileri" text="Size uygun bakım alanını seçerek aktif Lotus hizmetlerini filtreleyin."/><div className="mt-8 flex flex-wrap gap-2" aria-label="Hizmet kategorileri">{serviceCategories.map((item)=><button key={item} type="button" onClick={()=>selectCategory(item)} aria-pressed={category===item} className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${category===item?"border-primary bg-primary text-primary-foreground":"border-primary/20 bg-card text-muted hover:border-primary hover:text-primary"}`}>{item} <span className="font-normal opacity-75">({countFor(item)})</span></button>)}</div><div className="mt-12" aria-live="polite">{loading?<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-label="Hizmetler yükleniyor">{[0,1,2].map((item)=><div key={item} className="h-[34rem] animate-pulse rounded-[2rem] bg-muted-surface"/>)}</div>:visible.length?<div className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{visible.map((service,index)=><Reveal key={service.id} direction="up" delay={Math.min(index,2)*80}><ServiceCard service={service} index={index}/></Reveal>)}</div>:<div className="rounded-[2rem] border bg-card px-6 py-12 text-center text-sm text-muted">Bu kategoride yayınlanan aktif hizmet bulunmuyor.</div>}</div></div></section>

    <section className="bg-card"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="popular-title"><SectionHeading eyebrow="Lotus seçkisi" title="En Çok Tercih Edilen Bakımlar" id="popular-title" text="Misafirlerimizin bakım rutinlerinde sıkça yer verdiği özenli uygulamalar." /><div className="mt-14 space-y-14">{services.slice(0, 3).map((service, index) => <article key={service.id} className="grid items-center gap-8 md:grid-cols-2"><Reveal direction={index % 2 ? "right" : "left"} className={index % 2 ? "md:order-2" : ""}><ServiceVisual service={service} index={index} compact /></Reveal><Reveal direction={index % 2 ? "left" : "right"} className={index % 2 ? "md:order-1" : ""}><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">{categoryFor(service)} · {service.duration_minutes} dakika</p><h3 className="mt-3 text-4xl sm:text-5xl">{service.name}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-muted">{service.description || "Size özel ihtiyaçlarınız gözetilerek planlanan sakin ve özenli bakım deneyimi."}</p><p className="mt-5 font-serif text-2xl text-primary">{money(service.price)}</p><div className="mt-6 flex gap-5"><Link href={`/services/${service.slug}`} className="border-b pb-1 text-sm font-semibold">İncele</Link><Link href="/appointments/new" className="border-b border-primary pb-1 text-sm font-semibold text-primary">Randevu Al</Link></div></Reveal></article>)}</div></div></section>

   

    <section className="bg-[#eadbd2]"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"><SectionHeading eyebrow="Lotus farkı" title="Neden Lotus?" /><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[["✦", "Uzman uygulama", "Deneyimli ekibimizin özenli yaklaşımı."], ["◇", "Hijyen", "Her uygulamada titizlikle korunan standartlar."], ["◌", "Kişiye özel yaklaşım", "İhtiyacınızı dinleyen bakım planlaması."], ["❋", "Kaliteli ürünler", "Bakım deneyimini tamamlayan seçkin ürünler."]].map(([icon, title, text]) => <article key={title} className="border-t border-primary/25 pt-6"><span className="font-serif text-3xl text-primary" aria-hidden="true">{icon}</span><h3 className="mt-5 text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{text}</p></article>)}</div></div></section>
  </>;
}
