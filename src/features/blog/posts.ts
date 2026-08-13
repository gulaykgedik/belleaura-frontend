export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  content: readonly string[];
  tone: string;
}

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "gunluk-cilt-bakim-ritueli",
    category: "Cilt Bakımı",
    title: "Günlük cilt bakım ritüelinizi sadeleştirin",
    excerpt: "Cildinizi dinleyen, sürdürülebilir ve sakin bir günlük bakım düzeni için temel adımlar.",
    publishedAt: "12 Ağustos 2026",
    readingTime: "4 dakika",
    tone: "bg-[#e5c5b8]",
    content: [
      "İyi bir bakım rutini çok sayıda üründen değil, cildinizin ihtiyaçlarını düzenli biçimde gözlemlemekten başlar. Nazik temizlik, dengeli nemlendirme ve gündüz güneş koruması çoğu rutin için güçlü bir temel oluşturur.",
      "Yeni ürünleri tek tek eklemek, cildinizin verdiği tepkiyi daha kolay anlamanıza yardımcı olur. Mevsim, yaşam temposu ve çevresel koşullar değiştikçe bakım adımlarınızı da sade biçimde güncelleyebilirsiniz.",
      "Profesyonel destek gerektiğini düşündüğünüzde uzmanınızla görüşerek size uygun hizmet ve evde bakım önerilerini birlikte planlayabilirsiniz.",
    ],
  },
  {
    slug: "bakim-randevusuna-hazirlik",
    category: "Lotus Rehberi",
    title: "Bakım randevunuzdan önce bilmeniz gerekenler",
    excerpt: "Randevunuzdan en iyi deneyimi almanız için küçük ama etkili hazırlık önerileri.",
    publishedAt: "8 Ağustos 2026",
    readingTime: "3 dakika",
    tone: "bg-[#d9d2c6]",
    content: [
      "Randevunuzdan önce kullandığınız ürünleri, hassasiyetlerinizi ve beklentilerinizi not etmek uzmanınızla daha açık bir iletişim kurmanızı sağlar.",
      "İşlem türüne göre özel hazırlık gerekebilir. Randevu açıklamasını inceleyin ve emin olmadığınız noktaları ekibimize önceden iletin.",
      "Bakım sonrasında önerilen adımları takip etmek, uygulamanın etkisini korumaya ve cildinizin ya da saçınızın konforunu desteklemeye yardımcı olur.",
    ],
  },
  {
    slug: "evde-sac-bakimi",
    category: "Saç Bakımı",
    title: "Evde saç bakımını profesyonel dokunuşlarla tamamlayın",
    excerpt: "Saç tipinize uygun ürün seçimi ve düzenli bakım için pratik bir başlangıç rehberi.",
    publishedAt: "2 Ağustos 2026",
    readingTime: "5 dakika",
    tone: "bg-[#ead8ce]",
    content: [
      "Saç bakımında ilk adım saç derinizin ve saç tellerinizin ihtiyaçlarını ayrı ayrı değerlendirmektir. Temizleme sıklığı ve ürün yoğunluğu bu iki ihtiyaca göre dengelenebilir.",
      "Isıl işlem öncesinde koruyucu kullanmak, saç uçlarına düzenli bakım uygulamak ve saçı gereksiz sürtünmeden korumak günlük rutinde fark yaratır.",
      "Düzenli profesyonel bakım ise evdeki rutininizi destekleyerek saçınızın canlılığını ve kolay şekil almasını korumanıza yardımcı olabilir.",
    ],
  },
];

export function findBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
