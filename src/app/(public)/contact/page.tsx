import type { Metadata } from "next";
import { ContactForm } from "@/features/contact/contact-form";
import { contactInfo } from "@/features/contact/contact-data";
import { BranchSection, ContactCTA, ContactFAQ, ContactHero, ContactQuickLinks, FastContact, MapSection, WorkingHours } from "@/features/contact/contact-sections";

export const metadata: Metadata = { title: "İletişim", description: "Belle Aura Beauty iletişim bilgileri, şubeler ve çalışma saatleri" };

export default function ContactPage() { return <>
  <ContactHero />
  <ContactQuickLinks />
  <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-28"><ContactForm/><aside className="rounded-[2rem] bg-[#f1e7df] p-7 sm:p-9"><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Belle Aura Beauty</p><h2 className="mt-3 text-4xl">Bize Ulaşın</h2><address className="mt-8 space-y-6 text-sm not-italic"><div><p className="text-xs uppercase tracking-wider text-muted">Telefon</p><a href={contactInfo.phoneHref} className="mt-1 block text-lg font-semibold">{contactInfo.phone}</a></div><div><p className="text-xs uppercase tracking-wider text-muted">E-posta</p><a href={contactInfo.emailHref} className="mt-1 block text-lg font-semibold break-all">{contactInfo.email}</a></div><div><p className="text-xs uppercase tracking-wider text-muted">Merkez</p><p className="mt-1 leading-6">{contactInfo.address}</p></div><div><p className="text-xs uppercase tracking-wider text-muted">Çalışma saatleri</p><p className="mt-1">Pazartesi–Cuma 09.00–19.00</p></div></address><div className="mt-8 border-t border-primary/15 pt-7"><p className="text-xs uppercase tracking-wider text-muted">Sosyal medya</p><div className="mt-3 flex gap-4 text-sm font-semibold"><span>Instagram</span><span>Pinterest</span></div></div><p className="mt-8 text-sm leading-7 text-muted">Acil olmayan sorularınız için iletişim formunu kullanabilirsiniz.</p></aside></section>
  <WorkingHours />
  <BranchSection />
  <MapSection />
  <FastContact />
  <ContactFAQ />
  <ContactCTA />
  </>; }
