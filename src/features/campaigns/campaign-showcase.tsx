"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { appointmentService } from "@/services/appointment-service";
import { commerceService } from "@/services/commerce-service";
import type { ServiceItem } from "@/types/appointment";
import type { Product } from "@/types/commerce";
import { money } from "@/features/appointments/format";
import { ProductCard } from "@/features/commerce/product-card";

type CampaignCategory = "Hizmet" | "Ürün" | "Randevu" | "Yeni Müşteri";
type Campaign = { title: string; category: CampaignCategory; description: string; duration: string; benefit: string; cta: string; href: string; tone: string };

const campaignFilters = ["Tümü", "Hizmet", "Ürün", "Randevu", "Yeni Müşteri"] as const;
const campaignCards: Campaign[] = [
  { title: "İlk Randevuna Özel", category: "Yeni Müşteri", description: "Lotus deneyimiyle ilk kez tanışan misafirlerimize özel karşılama fırsatı.", duration: "Ay sonuna kadar", benefit: "%15 avantaj", cta: "Randevu Al", href: "/appointments/new", tone: "bg-[#e7c7b9]" },
  { title: "Cilt Bakımı Haftası", category: "Hizmet", description: "Seçili profesyonel cilt bakımı ritüellerinde sınırlı süreli fırsat.", duration: "Bu hafta geçerli", benefit: "%20 avantaj", cta: "Hizmeti Seç", href: "/appointments/new", tone: "bg-[#d9d2c6]" },
  { title: "Saç Bakım Paketi", category: "Hizmet", description: "Birbirini tamamlayan üç saç bakım hizmetini avantajlı paketle planlayın.", duration: "30 Eylül'e kadar", benefit: "3'lü bakım paketi", cta: "Randevu Al", href: "/appointments/new", tone: "bg-[#e6d5ca]" },
  { title: "Ürün + Hizmet Avantajı", category: "Ürün", description: "Belirli hizmetlerin ardından bakım rutininizi seçili ürünlerle tamamlayın.", duration: "Stoklarla sınırlı", benefit: "Seçili üründe fırsat", cta: "Ürünleri İncele", href: "/products", tone: "bg-[#d9b6a9]" },
  { title: "Hafta İçi Fırsatı", category: "Randevu", description: "Pazartesi–Perşembe belirli saatlerde bakımınıza sakin bir zaman ayırın.", duration: "Hafta içi geçerli", benefit: "Özel saat avantajı", cta: "Saatini Seç", href: "/appointments/new", tone: "bg-[#ddd7ca]" },
  { title: "Arkadaşınla Gel", category: "Randevu", description: "Bakım zamanınızı paylaşın; iki kişilik randevularda özel fırsatı keşfedin.", duration: "Sınırlı süre", benefit: "İki kişiye özel", cta: "Randevu Al", href: "/appointments/new", tone: "bg-[#e9cbc2]" },
];

export function CampaignShowcase() {
  const [filter, setFilter] = useState<(typeof campaignFilters)[number]>("Tümü");
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const { user, hydrated } = useAuth();

  useEffect(() => {
    let active = true;
    Promise.all([commerceService.products({ per_page: 4, in_stock: true, sort: "newest" }), appointmentService.services()])
      .then(([productPage, servicePage]) => { if (active) { setProducts(productPage.items.slice(0, 4)); setServices(servicePage.items.slice(0, 3)); } })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const visible = filter === "Tümü" ? campaignCards : campaignCards.filter((campaign) => campaign.category === filter);

  return <>
    <section id="current-campaigns" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="campaign-grid-title">
      <SectionHeading eyebrow="Sizin için seçtik" title="Güncel Kampanyalar" id="campaign-grid-title" text="Bakım planınıza ve ihtiyaçlarınıza uygun dönemsel fırsatları keşfedin." />
      <div className="mt-8 flex flex-wrap gap-2" aria-label="Kampanya kategorileri">{campaignFilters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${filter === item ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{item}</button>)}</div>
      <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{visible.map((campaign, index) => <CampaignCard key={campaign.title} campaign={campaign} index={index} />)}</div>
    </section>

    <section className="bg-[#eadbd2]"><div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8 lg:py-24"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Lotus üyeliği</p><h2 className="mt-4 text-4xl sm:text-5xl">Üyelerimize Özel Avantajlar</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted">Lotus hesabınızla bakım yolculuğunuzu tek yerde planlayın ve size özel duyuruları kolayca takip edin.</p><Link href={user ? "/profile" : "/register"} className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{hydrated ? user ? "Profilime Git" : "Kayıt Ol" : "Hesabım"}</Link></div><div className="grid gap-5 sm:grid-cols-2">{[["✦","İlk fırsatlardan haberdar ol"],["◇","Özel kuponlar"],["⌁","Randevu hatırlatmaları"],["❋","Ürün fırsatları"]].map(([icon,title]) => <article key={title} className="border-t border-primary/25 pt-5"><span className="font-serif text-2xl text-primary" aria-hidden="true">{icon}</span><h3 className="mt-4 text-xl">{title}</h3></article>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="grid overflow-hidden rounded-[2.5rem] bg-[#3f332e] text-[#f8eee8] lg:grid-cols-[1fr_.9fr]"><div className="px-7 py-12 sm:px-12 lg:px-16 lg:py-16"><p className="text-xs font-bold uppercase tracking-[.24em] text-[#d8ad9d]">Bu haftanın fırsatı</p><h2 className="mt-5 text-4xl sm:text-5xl">Saç Kesimi + Bakım Paketi</h2><p className="mt-5 max-w-lg text-sm leading-7 text-[#d8c9c1]">Saçınıza yeni bir form kazandırırken profesyonel bakım ritüeliyle tamamlayın.</p><div className="mt-8 flex items-end gap-4"><span className="text-lg text-[#bfaea5] line-through">₺1.250</span><strong className="font-serif text-4xl">₺990</strong><span className="rounded-full bg-[#e8c2b3] px-3 py-1 text-xs font-bold text-[#3f332e]">₺260 tasarruf</span></div><p className="mt-4 text-xs uppercase tracking-[.18em] text-[#d8c9c1]">Bu hafta geçerli</p><Link href="/appointments/new" className="mt-8 inline-flex rounded-full bg-[#f8eee8] px-7 py-3.5 text-sm font-semibold text-[#3f332e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Randevu Al</Link></div><div className="relative min-h-80 overflow-hidden bg-[#b98270]" role="img" aria-label="Saç bakımı kampanyası için pastel editorial kompozisyon"><div className="absolute -bottom-24 left-[8%] size-[90%] rounded-full border border-white/25 bg-white/10"/><div className="absolute left-[18%] top-[15%] h-[67%] w-[30%] rounded-[6rem_6rem_1rem_1rem] bg-[#e8d4ca]/65"/><div className="absolute bottom-[14%] right-[15%] size-40 rounded-full bg-[#785247]/35"/></div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="products-title"><SectionHeading eyebrow="Bakım seçkisi" title="Ürün Fırsatları" id="products-title" text="Güncel fiyat ve stok bilgileriyle özenle seçilmiş bakım ürünleri."/><div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div>{!products.length ? <EmptyState text="Ürünler şu anda görüntülenemiyor."/> : null}</section>

    <section className="bg-card"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="services-title"><SectionHeading eyebrow="Bakım ritüelleri" title="Hizmet Kampanyaları" id="services-title" text="Gerçek hizmet fiyatlarını koruyarak dönemsel kampanya seçeneklerini keşfedin."/><div className="mt-12 grid gap-7 md:grid-cols-3">{services.map((service, index) => <article key={service.id} className="overflow-hidden rounded-[2rem] border bg-background"><div className={`relative aspect-[16/10] ${["bg-[#e4c4b7]","bg-[#d9d2c5]","bg-[#ead5ca]"][index]}`} role="img" aria-label={`${service.name} hizmeti için pastel kampanya görseli`}><span className="absolute bottom-5 right-6 font-serif text-5xl text-white/55">0{index + 1}</span></div><div className="p-7"><p className="text-xs font-bold uppercase tracking-[.16em] text-primary">{service.duration_minutes} dakika · {money(service.price)}</p><h3 className="mt-3 text-3xl">{service.name}</h3><p className="mt-4 text-sm leading-7 text-muted">Seçili tarihlerde bu bakım ritüeli için sunulan dönemsel avantajları randevu adımında keşfedin.</p><Link href="/appointments/new" className="mt-6 inline-flex border-b border-primary pb-1 text-sm font-semibold text-primary">Randevu Al →</Link></div></article>)}</div>{!services.length ? <EmptyState text="Hizmetler şu anda görüntülenemiyor."/> : null}</div></section>
  </>;
}

function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) { return <article className="group overflow-hidden rounded-[2rem] border bg-card"><div className={`relative aspect-[16/10] overflow-hidden ${campaign.tone}`} role="img" aria-label={`${campaign.title} kampanyası için pastel görsel`}><div className="absolute -bottom-16 -right-10 size-64 rounded-full border border-white/50 bg-white/20 transition-transform group-hover:scale-110 motion-reduce:transition-none"/><div className="absolute left-[13%] top-[18%] h-[57%] w-[26%] rounded-[4rem_4rem_1rem_1rem] bg-white/35"/><span className="absolute bottom-5 right-6 font-serif text-5xl text-white/60">0{index + 1}</span></div><div className="p-7"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[.17em] text-primary">{campaign.category}</span><span className="text-xs text-muted">{campaign.duration}</span></div><h3 className="mt-4 text-3xl">{campaign.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{campaign.description}</p><p className="mt-5 font-serif text-2xl text-primary">{campaign.benefit}</p><Link href={campaign.href} className="mt-6 inline-flex border-b border-primary pb-1 text-sm font-semibold">{campaign.cta} →</Link></div></article>; }
function SectionHeading({ eyebrow, title, text, id }: { eyebrow: string; title: string; text: string; id: string }) { return <div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">{eyebrow}</p><h2 id={id} className="mt-3 text-4xl sm:text-5xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{text}</p></div>; }
function EmptyState({ text }: { text: string }) { return <p className="mt-10 rounded-2xl border bg-background p-6 text-sm text-muted">{text}</p>; }
