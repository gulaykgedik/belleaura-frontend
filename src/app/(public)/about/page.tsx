import Image from "next/image";
import Link from "next/link";
import { AboutExperts } from "@/features/about/about-experts";
import { demoImages } from "@/lib/demo-images";

const strengths = [
  ["✦", "Uzman Ekip", "Alanında deneyimli ekibimiz her uygulamayı özen ve dikkatle gerçekleştirir."],
  ["◌", "Kişiye Özel Bakım", "İhtiyaçlarınızı dinler, bakım yolculuğunuzu size özel şekillendiririz."],
  ["⌁", "Kolay Randevu", "Hizmetinizi, uzmanınızı ve zamanınızı birkaç adımda seçebilirsiniz."],
  ["◇", "Güvenli Ödeme", "Ödeme deneyiminizi güvenilir ve anlaşılır bir akışla tamamlarız."],
  ["❋", "Kaliteli Ürünler", "Bakım rutininizi tamamlayan nitelikli ürünleri bir araya getiririz."],
  ["↗", "Hızlı İletişim", "Randevu öncesi ve sonrasında ihtiyaç duyduğunuz anda yanınızdayız."],
] as const;

const stats = [["10+", "Uzman"], ["5.000+", "Mutlu Müşteri"], ["20+", "Hizmet"], ["4.9/5", "Memnuniyet"]] as const;

const branches = [
  { name: "Belle Aura Merkez", address: "Lotus Mahallesi, No: 12, Şişli / İstanbul", phone: "+90 212 000 00 01", hours: "Pzt–Cmt 09.00–20.00", tone: "bg-[#e4c5b8]" },
  { name: "Belle Aura Nişantaşı", address: "Teşvikiye Mahallesi, No: 24, Şişli / İstanbul", phone: "+90 212 000 00 02", hours: "Pzt–Cmt 09.00–20.00", tone: "bg-[#d9d1c4]" },
  { name: "Belle Aura Kadıköy", address: "Caferağa Mahallesi, No: 18, Kadıköy / İstanbul", phone: "+90 216 000 00 03", hours: "Pzt–Paz 10.00–20.00", tone: "bg-[#ead5ca]" },
] as const;

const values = [
  ["01", "Güven", "Her temasımızda şeffaf, tutarlı ve özenli bir ilişki kurarız."],
  ["02", "Hijyen", "Tüm alan ve uygulamalarımızda yüksek hijyen standartlarını koruruz."],
  ["03", "Kalite", "Hizmetten ürüne her ayrıntıda nitelikli seçimler yaparız."],
  ["04", "Sürekli Gelişim", "Yeni teknikleri ve çağdaş bakım yaklaşımlarını yakından takip ederiz."],
  ["05", "Müşteri Memnuniyeti", "Sizi dinler, deneyimin her aşamasını ihtiyaçlarınıza göre iyileştiririz."],
] as const;

const testimonials = [
  ["Zeynep A.", "Belle Aura’da her randevu sakin, özenli ve gerçekten bana ayrılmış bir zaman gibi hissettiriyor."],
  ["Melis K.", "Uzmanım ihtiyaçlarımı dikkatle dinledi. Hem sonuçtan hem de tüm deneyimden çok memnun kaldım."],
  ["Ece T.", "Online randevu çok kolay, ortam tertemiz ve ekip her zaman ilgili. Gönül rahatlığıyla geliyorum."],
] as const;

const faqs = [
  ["Randevu nasıl oluşturabilirim?", "Randevu sayfasından hizmetinizi, uzmanınızı ve size uygun zamanı seçerek birkaç adımda randevunuzu oluşturabilirsiniz."],
  ["Randevumu değiştirebilir miyim?", "Hesabınızdaki Randevularım alanından uygun koşullardaki randevularınızı yönetebilir veya bizimle iletişime geçebilirsiniz."],
  ["Hangi ödeme yöntemlerini kullanabilirim?", "Kullanılabilir ödeme seçenekleri ödeme adımında güvenli biçimde gösterilir."],
  ["Çalışma saatleriniz nedir?", "Çalışma saatleri şubeye göre değişebilir. Güncel bilgileri şube kartlarımızdan inceleyebilirsiniz."],
  ["Ürünleri online satın alabilir miyim?", "Evet. Ürünler sayfasındaki bakım seçkimizi inceleyebilir ve sepetinize ekleyebilirsiniz."],
] as const;

export default function AboutPage() {
  return <>
    <div className="bg-[#f7f2ed] px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28">
      <header className="mx-auto mb-10 max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.3em] text-primary">Hakkımızda</p><h1 className="mt-4 text-4xl sm:text-5xl">Belle Aura Beauty Hakkında</h1><div className="mx-auto mt-5 flex w-24 items-center gap-2 text-primary/60" aria-hidden="true"><span className="h-px flex-1 bg-current"/><span className="font-serif text-xl">✦</span><span className="h-px flex-1 bg-current"/></div></header>

      <section className="mx-auto grid max-w-[1200px] overflow-hidden rounded-[2rem] border border-[#eadfd8] bg-card shadow-[0_24px_70px_rgba(91,64,53,.08)] lg:grid-cols-[1.03fr_.97fr]" aria-labelledby="about-hero-title">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 lg:px-14 lg:py-16"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Belle Aura Beauty</p><h2 id="about-hero-title" className="mt-5 max-w-xl text-[2.25rem] leading-[1.12] sm:text-5xl lg:text-[3.35rem]">Güzelliği yalnızca bir görünüm değil, iyi hissetmenin bir parçası olarak görüyoruz.</h2><div className="mt-6 h-px w-16 bg-primary/35"/><div className="mt-6 max-w-xl space-y-4 text-sm leading-7 text-muted sm:text-[15px]"><p>Belle Aura, bakımın telaştan uzaklaşmak ve kendinizle yeniden bağ kurmak için değerli bir alan olduğuna inanır.</p><p>Uzman yaklaşımımızı kişisel ihtiyaçlarınızla buluşturur, her hizmeti güvenli ve incelikli bir deneyime dönüştürürüz.</p></div><div className="mt-8 flex flex-wrap gap-3"><PrimaryLink href="/appointments/new">Randevu Al</PrimaryLink><SecondaryLink href="/services">Hizmetleri İncele</SecondaryLink></div></div>
        <SpaStillLife />
      </section>

      <section className="mx-auto mt-7 max-w-[1200px] overflow-hidden rounded-[1.75rem] border border-[#eadfd8] bg-card" aria-labelledby="why-title"><h2 id="why-title" className="sr-only">Neden Belle Aura?</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{strengths.map(([icon,title,text],index)=><article key={title} className={`px-6 py-7 ${index ? "border-t sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""} ${index === 3 ? "lg:border-l-0 xl:border-l" : ""}`}><span className="font-serif text-2xl text-primary" aria-hidden="true">{icon}</span><h3 className="mt-4 text-base font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted">{text}</p></article>)}</div></section>
    </div>

    <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-8 lg:py-32" aria-labelledby="story-title"><div><SectionHeading eyebrow="Hikâyemiz" title="Biz Kimiz?" id="story-title"/><div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-muted"><p>Belle Aura Beauty, kişisel bakımın herkese aynı biçimde sunulan bir hizmet olmadığı düşüncesiyle doğdu. Her misafirimizin ritmini, ihtiyacını ve beklentisini dinleyerek ona özel bir bakım deneyimi tasarlıyoruz.</p><p>Uzman ekibimiz, kaliteli hizmeti güven ve hijyenle bir araya getiriyor. Modern teknikleri dikkatli uygulamalarla buluştururken, kolay dijital randevu deneyimimizle bakımınıza ayırdığınız zamanı sade ve zahmetsiz hâle getiriyoruz.</p></div></div><EditorialPair/></section>

    <section className="bg-[#eadbd2]" aria-label="Belle Aura istatistikleri"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-20">{stats.map(([value,label])=><div key={label} className="text-center"><p className="font-serif text-4xl text-primary sm:text-5xl">{value}</p><p className="mt-2 text-xs font-bold uppercase tracking-[.16em] text-muted">{label}</p></div>)}</div></section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="branches-title"><SectionHeading eyebrow="Şubelerimiz" title="Size En Yakın Belle Aura" id="branches-title"/><div className="mt-12 grid gap-7 lg:grid-cols-3">{branches.map((branch,index)=><article key={branch.name} className="overflow-hidden rounded-[2rem] border bg-card"><div className={`relative aspect-[16/10] overflow-hidden ${branch.tone}`} role="img" aria-label={`${branch.name} şubesi için pastel editorial görsel`}><div className="absolute -bottom-16 -right-8 size-64 rounded-full border border-white/50 bg-white/20"/><div className="absolute left-[14%] top-[18%] h-[64%] w-[34%] rounded-[5rem_5rem_1rem_1rem] bg-card/40"/><span className="absolute bottom-5 right-6 font-serif text-5xl text-white/55">0{index+1}</span></div><div className="p-7"><h3 className="text-3xl">{branch.name}</h3><div className="mt-5 space-y-2 text-sm leading-6 text-muted"><p>{branch.address}</p><p><a href={`tel:${branch.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{branch.phone}</a></p><p>{branch.hours}</p></div><div className="mt-7 flex flex-wrap gap-3"><button type="button" title="Harita entegrasyonu yakında aktif olacak" className="rounded-full border px-5 py-2.5 text-sm font-semibold hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Haritada Gör</button><Link href="/appointments/new" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Randevu Al</Link></div></div></article>)}</div></section>

    <AboutExperts />

    <section className="bg-[#f4ede6]"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="values-title"><SectionHeading eyebrow="Yaklaşımımız" title="Bizi Biz Yapan Değerler" id="values-title"/><div className="mt-14">{values.map(([no,title,text],index)=><article key={title} className={`grid gap-4 border-t border-primary/20 py-8 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-start ${index % 2 ? "sm:pl-12" : ""}`}><span className="font-serif text-3xl text-primary/55">{no}</span><h3 className="text-2xl">{title}</h3><p className="max-w-xl text-sm leading-7 text-muted">{text}</p></article>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="steps-title"><SectionHeading eyebrow="Beş kolay adım" title="Randevunuzu Kolayca Planlayın" id="steps-title"/><div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">{[["01","Hizmetinizi seçin"],["02","Uzmanınızı belirleyin"],["03","Tarih ve saati seçin"],["04","Randevunuzu onaylayın"],["05","Bildiriminizi alın"]].map(([no,title])=><article key={no} className="border-t border-primary/30 pt-6"><span className="font-serif text-4xl text-primary/55">{no}</span><h3 className="mt-5 text-xl">{title}</h3></article>)}</div><div className="mt-12"><PrimaryLink href="/appointments/new">Randevu Oluştur</PrimaryLink></div></section>

    <section id="journal" className="scroll-mt-28 bg-card"><div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28" aria-labelledby="reviews-title"><SectionHeading eyebrow="Deneyimler" title="Misafirlerimiz Ne Diyor?" id="reviews-title"/><div className="mt-12 grid gap-6 md:grid-cols-3">{testimonials.map(([name,quote])=><figure key={name} className="rounded-[2rem] bg-[#f3ebe5] p-8"><div className="text-sm tracking-[.2em] text-primary" aria-label="5 üzerinden 5 yıldız">★★★★★</div><blockquote className="mt-6 font-serif text-2xl leading-9">“{quote}”</blockquote><figcaption className="mt-7 text-sm font-bold">{name}</figcaption></figure>)}</div></div></section>

    <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-28" aria-labelledby="faq-title"><SectionHeading eyebrow="Sık sorulanlar" title="Merak Ettikleriniz" id="faq-title"/><div className="divide-y border-y">{faqs.map(([question,answer])=><details key={question} className="group py-1"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{question}<span className="text-2xl font-light text-primary transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true">+</span></summary><p className="max-w-2xl pb-6 pr-8 text-sm leading-7 text-muted">{answer}</p></details>)}</div></section>

    <section id="contact" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-8 sm:px-6 lg:px-8"><div className="overflow-hidden rounded-[2.5rem] bg-[#e5c5b7] px-7 py-16 text-center sm:px-12 lg:py-20"><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Sizin zamanınız</p><h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight sm:text-5xl">Kendinize ayıracağınız zamanı ertelemeyin.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted">Size uygun hizmeti ve uzmanı seçin, randevunuzu birkaç dakikada planlayın.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><PrimaryLink href="/appointments/new">Randevu Al</PrimaryLink><SecondaryLink href="/services">Hizmetleri Keşfet</SecondaryLink></div></div></section>
  </>;
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) { return <div><p className="text-xs font-bold uppercase tracking-[.22em] text-primary">{eyebrow}</p><h2 id={id} className="mt-3 text-4xl sm:text-5xl">{title}</h2></div>; }
function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-[#765246] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{children}</Link>; }
function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="inline-flex rounded-full border border-primary px-7 py-3.5 text-sm font-semibold text-primary hover:bg-card/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{children}</Link>; }
function EditorialPair(){return <div className="relative min-h-[520px]"><div className="absolute left-0 top-0 h-[76%] w-[70%] overflow-hidden rounded-[8rem_8rem_2rem_2rem]"><Image src={demoImages.spa} alt="Belle Aura bakım yaklaşımını yansıtan sıcak spa odası" fill sizes="(max-width: 1024px) 70vw, 35vw" className="object-cover"/></div><div className="absolute bottom-0 right-0 h-[58%] w-[55%] overflow-hidden rounded-[2rem_7rem_7rem_2rem] border-[10px] border-background"><Image src={demoImages.products} alt="Özenle seçilmiş bakım ürünleri" fill sizes="(max-width: 1024px) 55vw, 28vw" className="object-cover"/></div></div>}
function SpaStillLife(){return <div className="relative min-h-[420px] overflow-hidden border-t border-[#eadfd8] bg-[#ddc2b6] sm:min-h-[520px] lg:min-h-full lg:border-l lg:border-t-0"><Image src={demoImages.spa} alt="Sıcak gün ışığında premium beauty ve wellness odası" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#55382e]/20 via-transparent to-transparent"/></div>}
