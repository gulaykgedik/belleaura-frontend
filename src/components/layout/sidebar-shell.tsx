"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { settingsService } from "@/services/settings-service";
import type { AdminSettings } from "@/types/admin";

export interface SidebarItem { label: string; href: string }
type AdminTheme="light"|"dark";


export function SidebarShell({title,items,children,adminTheme=false}:{title:string;items:SidebarItem[];children:React.ReactNode;adminTheme?:boolean}){
  const pathname=usePathname();const router=useRouter();const{user,logout}=useAuth();const[drawerOpen,setDrawerOpen]=useState(false);const[theme,setTheme]=useState<AdminTheme>("light");const[themeReady,setThemeReady]=useState(false);const[settings,setSettings]=useState<AdminSettings|null>(null);const[logoFailed,setLogoFailed]=useState(false);
  useEffect(()=>{if(!adminTheme)return;const frame=requestAnimationFrame(()=>{const stored=localStorage.getItem("lotus-admin-theme");setTheme(stored==="dark"?"dark":"light");setThemeReady(true);});return()=>cancelAnimationFrame(frame);},[adminTheme]);
  useEffect(()=>{let active=true;settingsService.public().then((value)=>{if(active){setSettings(value);setLogoFailed(false);}}).catch(()=>{});return()=>{active=false;};},[]);
  async function signOut(){await logout();router.replace("/");}
  function toggleTheme(){const next=theme==="light"?"dark":"light";setTheme(next);localStorage.setItem("lotus-admin-theme",next);}
  
  const shellTheme=adminTheme?`admin-shell ${theme==="dark"?"admin-dark":"admin-light"}`:"";
    console.log("sidebar settings", settings);
  const businessName=settings?.business_name?.trim()||"Belle Aura Beauty";
  const logoUrl=validHttpUrl(settings?.logo_url)?settings!.logo_url.trim():"";
  const businessInitial=businessName.charAt(0).toLocaleUpperCase("tr-TR")||"B";

  return <div className={`${shellTheme} min-h-dvh bg-background lg:grid lg:grid-cols-[244px_1fr]`}>
    {drawerOpen?<button type="button" className="fixed inset-0 z-40 bg-[#2f211c]/45 backdrop-blur-[2px] lg:hidden" aria-label="Menüyü kapat" onClick={()=>setDrawerOpen(false)}/>:null}
    <aside className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[244px] flex-col overflow-hidden border-r bg-[var(--admin-sidebar)] p-5 shadow-xl transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 lg:shadow-none ${drawerOpen?"translate-x-0":"-translate-x-full"}`}>
      <div className="shrink-0">
        <div className="flex items-center gap-3"><span className="grid size-10 place-items-center overflow-hidden rounded-full border border-primary/35 bg-card font-serif text-xl text-primary">{logoUrl&&!logoFailed?<img src={logoUrl} alt={`${businessName} logosu`} className="size-full object-cover" onError={()=>setLogoFailed(true)}/>:businessInitial}</span><div><p className="font-serif text-lg leading-tight">{businessName}</p><p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.18em] text-muted">{title}</p></div></div>
        <Link href="/" onClick={()=>setDrawerOpen(false)} className="mt-5 flex rounded-xl border border-primary/15 bg-card/60 px-3 py-2 text-xs font-semibold text-primary hover:bg-muted-surface">← Siteye Dön</Link>
      </div>
      <nav className="admin-sidebar-nav mt-5 grid min-h-0 flex-1 content-start gap-1 overflow-y-auto" aria-label={title}>{items.map((item)=>{const active=pathname===item.href;return <Link key={item.href} href={item.href} onClick={()=>setDrawerOpen(false)} aria-current={active?"page":undefined} className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active?"bg-secondary font-semibold text-primary":"text-muted hover:bg-muted-surface hover:text-foreground"}`}><span aria-hidden="true" className={`grid size-7 place-items-center rounded-lg text-[11px] font-bold ${active?"bg-primary text-primary-foreground":"border bg-card text-muted group-hover:text-primary"}`}>{item.label.charAt(0)}</span>{item.label}{active?<span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary" aria-hidden="true"/>:null}</Link>;})}</nav>
      <div className="mt-4 shrink-0 border-t pt-4"><div className="mb-3 flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{(user?.name||"Y").charAt(0).toLocaleUpperCase("tr-TR")}</span><div className="min-w-0"><p className="truncate text-sm font-semibold">{user?.name||"Yönetici"}</p><p className="text-[11px] text-muted">{user?.role_slug}</p></div></div><Button variant="ghost" className="h-9 w-full justify-start px-3" onClick={signOut}>Çıkış yap</Button></div>
    </aside>
    <div className="min-w-0"><header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b bg-card/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8"><div className="flex items-center gap-3"><button type="button" onClick={()=>setDrawerOpen(true)} className="grid size-10 place-items-center rounded-xl border bg-card lg:hidden" aria-label="Yönetim menüsünü aç" aria-expanded={drawerOpen}><MenuIcon/></button><div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-muted">Yönetim / {currentLabel(items,pathname)}</p><p className="text-sm font-semibold sm:text-base">{currentLabel(items,pathname)}</p></div></div><div className="flex items-center gap-2">{adminTheme?<button type="button" onClick={toggleTheme} disabled={!themeReady} className="grid size-10 place-items-center rounded-full border bg-card text-primary transition-colors hover:border-primary hover:bg-muted-surface disabled:opacity-60" aria-label={theme==="dark"?"Gündüz Modu":"Gece Modu"} title={theme==="dark"?"Gündüz Modu":"Gece Modu"}>{theme==="dark"?<SunIcon/>:<MoonIcon/>}</button>:null}<span className="hidden rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground sm:inline">{user?.role_slug}</span></div></header><main className="p-4 sm:p-6 lg:p-8">{children}</main></div>
  </div>;
}

function currentLabel(items:SidebarItem[],pathname:string){return items.find((item)=>item.href===pathname)?.label??"Yönetim";}
function validHttpUrl(value:string|undefined){if(!value)return false;try{const url=new URL(value);return url.protocol==="http:"||url.protocol==="https:";}catch{return false;}}
function MenuIcon(){return <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>}
function MoonIcon(){return <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20.5 15.3A8.5 8.5 0 0 1 8.7 3.5 8.5 8.5 0 1 0 20.5 15.3Z"/></svg>}
function SunIcon(){return <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>}
