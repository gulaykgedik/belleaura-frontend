import Link from "next/link";
import { HeroSlider } from "@/features/home/hero-slider";
import { AppointmentCta } from "@/features/home/appointment-cta";
import { Newsletter } from "@/features/home/newsletter";
import { HomeShowcase } from "@/features/commerce/home-showcase";
import { Reveal } from "@/components/ui/reveal";

const trust=[["⌁","Kolay Online Randevu","Birkaç dakikada planlayın"],["◇","Güvenli Ödeme","Korunan ödeme altyapısı"],["✦","Uzman Personel","Özenli profesyonel ekip"],["○","Hızlı Bildirim","Anlık randevu bilgileri"]];
const testimonials=[{name:"Elif A.",text:"Randevu süreci çok kolaydı; kendimi ilk andan itibaren gerçekten özel hissettim."},{name:"Derya K.",text:"Uzman önerileri ve bakım ürünleri günlük rutinimi baştan aşağı değiştirdi."},{name:"Selin M.",text:"Sakin atmosfer, özenli hizmet ve tam zamanında başlayan harika bir deneyim."}];

export default function HomePage(){return <>
  <HeroSlider/>
  <TrustBar/>
  <AppointmentCta/>
  <HomeShowcase/>
  <Testimonials/>
  <Reveal><Newsletter/></Reveal>
  <Reveal><section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="flex flex-col items-center justify-between gap-5 border-y py-8 text-center sm:flex-row sm:text-left"><div><h2 className="text-3xl">Kendinize bugün zaman ayırın.</h2><p className="mt-2 text-sm text-muted">Size uygun hizmet ve uzmanı birlikte seçelim.</p></div><Link href="/appointments/new" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Randevu Al</Link></div></section></Reveal>
</>}

function TrustBar(){return <Reveal><section aria-label="Lotus avantajları" className="border-y bg-card"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">{trust.map(([icon,title,text])=><div key={title} className="flex min-w-0 items-center gap-3"><span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-muted-surface text-primary">{icon}</span><div className="min-w-0"><h2 className="font-sans text-sm font-semibold">{title}</h2><p className="mt-0.5 text-xs text-muted">{text}</p></div></div>)}</div></section></Reveal>}
function Testimonials(){return <Reveal><section className="bg-[#f4ede6]"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"><div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Deneyimler</p><h2 className="mt-3 text-4xl lg:text-[2.75rem]">Lotus&apos;u Sevenlerden</h2></div><div className="mt-9 grid gap-5 md:grid-cols-3">{testimonials.map((item,index)=><Reveal key={item.name} delay={index*80}><blockquote className="rounded-[1.5rem] border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-sm"><div aria-label="5 yıldız" className="text-sm tracking-[.25em] text-primary">★★★★★</div><p className="mt-5 font-serif text-lg leading-7">“{item.text}”</p><footer className="mt-5 text-sm font-semibold text-muted">— {item.name}</footer></blockquote></Reveal>)}</div></div></section></Reveal>}
