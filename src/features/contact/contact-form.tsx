"use client";

import { useState } from "react";

type Field = "name" | "email" | "phone" | "subject" | "message" | "consent";
type Errors = Partial<Record<Field, string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState("");
  const clear = (field: Field) => { setErrors((current) => ({ ...current, [field]: undefined })); setFeedback(""); };

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "").trim();
    if (!name) next.name = "Ad soyad zorunludur.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Geçerli bir e-posta adresi girin.";
    if (!subject) next.subject = "Lütfen bir konu seçin.";
    if (message.length < 10) next.message = "Mesaj en az 10 karakter olmalıdır.";
    if (data.get("consent") !== "on") next.consent = "Devam etmek için iletişim iznini onaylayın.";
    setErrors(next);
    if (Object.keys(next).length) { setFeedback(""); return; }
    setFeedback("Bilgiler doğrulandı. İletişim formumuz yakında aktif olacak; şu anda mesaj gönderilmedi.");
  }

  return <div className="rounded-[2rem] border bg-card p-6 shadow-[0_18px_55px_rgba(91,64,53,.06)] sm:p-9"><h2 className="text-3xl sm:text-4xl">Bize Bir Mesaj Bırakın</h2><p className="mt-3 text-sm leading-7 text-muted">Sorunuzu paylaşın; form alanları bu demo aşamasında yalnız tarayıcınızda doğrulanır.</p><form onSubmit={submit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
    <FieldWrap id="contact-name" label="Ad Soyad" required error={errors.name}><input id="contact-name" name="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} onChange={() => clear("name")} className="field" /></FieldWrap>
    <FieldWrap id="contact-email" label="E-posta" required error={errors.email}><input id="contact-email" name="email" type="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} onChange={() => clear("email")} className="field" /></FieldWrap>
    <FieldWrap id="contact-phone" label="Telefon" error={errors.phone}><input id="contact-phone" name="phone" type="tel" onChange={() => clear("phone")} className="field" /></FieldWrap>
    <FieldWrap id="contact-subject" label="Konu" required error={errors.subject}><select id="contact-subject" name="subject" required defaultValue="" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "contact-subject-error" : undefined} onChange={() => clear("subject")} className="field"><option value="" disabled>Konu seçin</option>{["Randevu","Hizmetler","Ürünler","Sipariş","Ödeme","Öneri / Görüş","Diğer"].map((item) => <option key={item}>{item}</option>)}</select></FieldWrap>
    <div className="sm:col-span-2"><FieldWrap id="contact-message" label="Mesaj" required error={errors.message}><textarea id="contact-message" name="message" required rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} onChange={() => clear("message")} className="field resize-y" /></FieldWrap></div>
    <div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm leading-6"><input name="consent" type="checkbox" onChange={() => clear("consent")} className="mt-1 size-4 accent-primary" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "contact-consent-error" : undefined}/><span>İletişim bilgilerimin bu talebe dönüş amacıyla kullanılmasını kabul ediyorum.</span></label>{errors.consent ? <p id="contact-consent-error" className="mt-2 text-xs text-danger">{errors.consent}</p> : null}</div>
    <div className="sm:col-span-2"><button type="submit" className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Mesaj Gönder</button><p className="mt-4 text-sm leading-6 text-primary" aria-live="polite">{feedback}</p></div>
  </form></div>;
}

function FieldWrap({ id, label, required = false, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) { return <div><label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}{required ? " *" : ""}</label>{children}{error ? <p id={`${id}-error`} className="mt-2 text-xs text-danger">{error}</p> : null}</div>; }
