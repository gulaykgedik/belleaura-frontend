"use client";
import { Reveal } from "@/components/ui/reveal";
import { InlineAppointmentForm } from "@/features/appointments/inline-appointment-form";
import { RoleGuard } from "@/features/auth/role-guard";

export function AppointmentCta() {
  return <section aria-labelledby="appointment-cta-title" className="mx-auto max-w-[1240px] px-4 pb-8 pt-6 sm:px-6 sm:pb-10 lg:px-8">
    <div className="overflow-hidden rounded-[1.75rem] border border-[#dfc4b8] bg-[#efd8cc] shadow-[0_16px_45px_rgba(91,64,53,.09)]">
      <Reveal direction="left" className="px-5 pb-5 pt-7 sm:px-8 sm:pt-8 lg:px-10">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Size uygun zaman</p>
        <h2 id="appointment-cta-title" className="mt-2 text-3xl leading-tight sm:text-4xl">Randevunuzu Hemen Planlayın</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Hizmet, uzman, tarih ve saati tek ekranda seçerek randevunuzu kolayca oluşturun.</p>
      </Reveal>
      <div id="home-appointment-form" className="mx-3 border-t border-primary/20 bg-[#fffaf4] px-3 sm:mx-6 sm:px-5 lg:mx-8 lg:px-6">
        <RoleGuard allowed={["customer", "staff", "admin", "super_admin"]}>
          <InlineAppointmentForm/>
        </RoleGuard>
      </div>
    </div>
  </section>;
}
