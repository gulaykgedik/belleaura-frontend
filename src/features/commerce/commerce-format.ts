export function commerceMoney(value:string|number,currency="TRY"):string{return new Intl.NumberFormat("tr-TR",{style:"currency",currency}).format(Number(value));}
export function commerceDate(value:string):string{return new Intl.DateTimeFormat("tr-TR",{dateStyle:"medium",timeStyle:"short"}).format(new Date(value.replace(" ","T")));}
export const orderLabels:Record<string,string>={pending:"Bekliyor",confirmed:"Onaylandı",preparing:"Hazırlanıyor",shipped:"Kargoya verildi",delivered:"Teslim edildi",cancelled:"İptal edildi"};
export const paymentLabels:Record<string,string>={unpaid:"Ödenmedi",awaiting_transfer:"Havale bekleniyor",pending:"Ödeme bekleniyor",paid:"Ödendi",failed:"Başarısız",cancelled:"İptal edildi",refunded:"İade edildi"};
export const paymentMethodLabels:Record<string,string>={iyzico:"Kredi/Banka Kartı",bank_transfer:"Havale / EFT",cash_on_delivery:"Kapıda Ödeme"};
