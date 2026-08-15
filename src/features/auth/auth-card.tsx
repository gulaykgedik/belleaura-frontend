"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { settingsService } from "@/services/settings-service";
import type { AdminSettings } from "@/types/admin";

export function AuthCard({ title, description, alternate, children }: { title: string; description: string; alternate: { text: string; label: string; href: string }; children: React.ReactNode }) {
  const [settings,setSettings]=useState<AdminSettings|null>(null);const [logoFailed,setLogoFailed]=useState(false);
  useEffect(()=>{let active=true;settingsService.public().then((value)=>{if(active){setSettings(value);setLogoFailed(false);}}).catch(()=>{});return()=>{active=false;};},[]);
  const businessName=settings?.business_name?.trim()||"Belle Aura Beauty";const logoUrl=validHttpUrl(settings?.logo_url)?settings!.logo_url.trim():"";const businessInitial=businessName.charAt(0).toLocaleUpperCase("tr-TR")||"B";
  return <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border bg-card shadow-2xl shadow-primary/5 lg:grid-cols-[.9fr_1.1fr]">
    <div className="relative hidden overflow-hidden bg-muted-surface p-10 text-foreground lg:flex lg:flex-col lg:justify-between"><div className="absolute -right-20 -top-20 size-72 rounded-full bg-secondary/70"/><div className="absolute bottom-[-20%] left-[10%] size-80 rounded-full bg-[#d7aa98]/45"/><Link href="/" className="relative flex items-center gap-3 font-serif text-xl"><span className="grid size-10 place-items-center overflow-hidden rounded-full border border-primary text-primary">{logoUrl&&!logoFailed?<img src={logoUrl} alt={`${businessName} logosu`} className="size-full object-cover" onError={()=>setLogoFailed(true)}/>:businessInitial}</span>{businessName}</Link><div className="relative"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Kendinize zaman ayırın</p><h2 className="mt-4 text-4xl leading-tight">Bakım yolculuğunuzu sakin ve kolay bir deneyime dönüştürün.</h2><ul className="mt-7 grid gap-3 text-sm text-muted"><li>— Birkaç adımda online randevu</li><li>— Özenle seçilmiş bakım ürünleri</li><li>— Sipariş ve randevu takibi</li></ul></div></div>
    <div className="p-6 sm:p-10 lg:p-12"><Link href="/" className="mb-8 inline-flex items-center gap-2 font-bold lg:hidden"><span className="grid size-9 place-items-center overflow-hidden rounded-xl bg-primary text-primary-foreground">{logoUrl&&!logoFailed?<img src={logoUrl} alt={`${businessName} logosu`} className="size-full object-cover" onError={()=>setLogoFailed(true)}/>:businessInitial}</span>{businessName}</Link><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Hesabınız</p><h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm leading-6 text-muted">{description}</p></div>{children}<p className="mt-7 text-center text-sm text-muted">{alternate.text} <Link href={alternate.href} className="font-semibold text-primary hover:underline">{alternate.label}</Link></p></div>
  </section>;
}

function validHttpUrl(value:string|undefined){if(!value)return false;try{const url=new URL(value);return url.protocol==="http:"||url.protocol==="https:";}catch{return false;}}
