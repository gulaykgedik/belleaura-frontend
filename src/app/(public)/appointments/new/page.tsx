import type { Metadata } from "next";
import { InlineAppointmentForm } from "@/features/appointments/inline-appointment-form";

export const metadata: Metadata = {
  title: "Randevu Al",
};

export default function NewAppointmentPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">
          Belle Aura
        </p>

        <h1 className="mt-3 text-4xl sm:text-5xl">
          Randevunuzu Planlayın
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Şube, hizmet, uzman, tarih ve saati seçerek randevunuzu kolayca
          oluşturun.
        </p>
      </div>

      <InlineAppointmentForm />
    </main>
  );
}