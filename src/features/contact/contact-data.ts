export const contactInfo = {
  phone: "+90 (212) 000 00 00",
  phoneHref: "tel:+902120000000",
  email: "info@lotusguzellik.com",
  emailHref: "mailto:info@lotusguzellik.com",
  address: "Lotus Mahallesi, No: 12, Şişli / İstanbul",
} as const;

export const workingHours = [
  ["Pazartesi", "09:00 – 19:00"], ["Salı", "09:00 – 19:00"], ["Çarşamba", "09:00 – 19:00"],
  ["Perşembe", "09:00 – 19:00"], ["Cuma", "09:00 – 19:00"], ["Cumartesi", "10:00 – 18:00"], ["Pazar", "Kapalı"],
] as const;

export const contactBranches = [
  { name: "Belle Aura Merkez", address: "Lotus Mahallesi, No: 12, Şişli / İstanbul", phone: "+90 (212) 000 00 01", hours: "Pzt–Cmt 09.00–20.00", tone: "bg-[#e4c5b8]" },
  { name: "Belle Aura Nişantaşı", address: "Teşvikiye Mahallesi, No: 24, Şişli / İstanbul", phone: "+90 (212) 000 00 02", hours: "Pzt–Cmt 09.00–20.00", tone: "bg-[#d9d1c4]" },
  { name: "Belle Aura Kadıköy", address: "Caferağa Mahallesi, No: 18, Kadıköy / İstanbul", phone: "+90 (216) 000 00 03", hours: "Pzt–Paz 10.00–20.00", tone: "bg-[#ead5ca]" },
] as const;
