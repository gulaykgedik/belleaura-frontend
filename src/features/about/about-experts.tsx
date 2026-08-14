"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { appointmentService } from "@/services/appointment-service";
import { mediaUrl } from "@/services/commerce-service";
import type { StaffItem } from "@/types/appointment";

export function AboutExperts() {
  const [experts, setExperts] = useState<StaffItem[]>([]);

  useEffect(() => {
    let active = true;

    appointmentService
      .services()
      .then(async (page) => {
        const results = await Promise.allSettled(
          page.items
            .slice(0, 10)
            .map((service) => appointmentService.staff(service.id))
        );

        if (!active) return;

        const unique = new Map<number, StaffItem>();

        for (const result of results) {
          if (result.status !== "fulfilled") continue;

          for (const expert of result.value) {
            unique.set(expert.id, expert);
          }
        }

        setExperts([...unique.values()].slice(0, 4));
      })
      .catch(() => {
        if (active) setExperts([]);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="experts-title"
    >
      <SectionHeading
        eyebrow="Belle Aura ekibi"
        title="Uzmanlarımızla Tanışın"
        id="experts-title"
        text="Bilgisini, deneyimini ve kişisel yaklaşımını her randevuya taşıyan ekibimiz."
      />

      {experts.length ? (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {experts.map((expert, index) => (
            <article key={expert.id}>
              <div
                className={`grid aspect-[4/5] place-items-center overflow-hidden rounded-[7rem_7rem_1.5rem_1.5rem] ${
                  [
                    "bg-[#e5c4bd]",
                    "bg-[#ddd6c9]",
                    "bg-[#ead2c5]",
                    "bg-[#d8c9c1]",
                  ][index % 4]
                }`}
              >
                {expert.avatar_path ? (
                  <img
                    src={mediaUrl(expert.avatar_path) || undefined}
                    alt={`${expert.name} portresi`}
                    className="size-full object-cover"
                  />
                ) : (
                  <span
                    className="grid size-24 place-items-center rounded-full bg-card/50 font-serif text-4xl text-primary/60"
                    aria-hidden="true"
                  >
                    {expert.name.charAt(0)}
                  </span>
                )}
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-primary">
                {expert.service_name || "Belle Aura Uzmanı"}
              </p>

              <h3 className="mt-2 text-2xl">{expert.name}</h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                {expert.bio ||
                  "Size özel bakım deneyimini özenle planlayan Belle Aura uzmanı."}
              </p>

              <Link
                href="/appointments/new"
                className="mt-5 inline-flex border-b border-primary pb-1 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Randevu Al →
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-sm text-muted">
          Aktif uzmanlarımız yakında burada listelenecek.
        </p>
      )}
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  id,
}: {
  eyebrow: string;
  title: string;
  text: string;
  id: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">
        {eyebrow}
      </p>

      <h2 id={id} className="mt-3 text-4xl sm:text-5xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        {text}
      </p>
    </div>
  );
}