# Appointment E-Commerce Frontend

Next.js 16, TypeScript, App Router ve Tailwind CSS tabanlı müşteri, yönetici ve personel arayüzüdür.

## Kurulum

```bash
cd frontend
npm ci
cp .env.example .env.local
npm run dev
```

Tek frontend değişkeni backend API kök adresidir:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Frontend'e JWT imzalama anahtarı, ödeme, NetGSM veya SMTP credential'ı eklenmez.

## Uygulama alanları

- Müşteri: randevu, ürün, sepet, checkout, ödeme başlatma ve siparişler
- Yönetici: dashboard ile appointment/commerce/settings yönetimi
- Personel: atanmış randevular, hizmetler, çalışma saatleri ve izin günleri

Rol yönlendirmesi kullanıcı deneyimi sağlar; gerçek yetkilendirme backend tarafından yapılır.

## Kontrol

```bash
npm run lint
npm run build
```

Projede ayrı bir frontend test komutu tanımlı değildir.
