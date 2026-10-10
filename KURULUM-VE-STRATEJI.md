# MelkoSoft / DevicePilot — Strateji ve yayınlama rehberi

## 1. Bu sitenin durumu
- Marka: **MelkoSoft** (`melkosoft.net`)
- Ürün fikri: **DevicePilot** — IoT ve gömülü sistem geliştiricileri için hata loglarını açıklayan tanılama aracı
- Aşama: **bağımsız, erken aşama girişim / prototipleme**. Resmî şirket kuruluşu, yatırım, müşteri ve bitmiş ürün varmış gibi gösterilmedi.
- Sitedeki **Analyze log** denemesi tarayıcıda çalışan, yalnızca bazı hata kalıplarını tanıyan **kural tabanlı bir mini prototip**. **Claude API bağlı değil; ücretli servis kullanılmıyor.**
- Site İngilizce başlar; sağ üstteki `TR` düğmesinden Türkçeye geçilebilir.
- `info@melkosoft.net` bağlantıları mail uygulamasını açar. Çalışan sunucu tabanlı iletişim formu yoktur.

## 2. Yerelde çalıştırma
`index.html` dosyasına çift tıkla veya VS Code Live Server ile aç. İnternet bağlantısı yokken de çalışır; uzaktaki Google Fonts yüklenmezse sistem yazı tipleri kullanılır.

## 3. Ücretsiz GitHub Pages yayını — METUnic DNS'i taşımadan
GitHub Pages, **ücretsiz herkese açık depo** üzerinden statik site ve kendi domainini destekler.

1. GitHub hesabına giriş yap, örneğin `melkosoft-website` adlı **Public** depo oluştur.
2. Bu klasördeki sitenin yayın dosyalarını (`index.html`, `styles.css`, `script.js`, `favicon.svg`, `CNAME`, `robots.txt`, `sitemap.xml`) deponun köküne yükle. `KURULUM-VE-STRATEJI.md` isteğe bağlı.
3. GitHub deposu → **Settings → Pages → Build and deployment → Deploy from a branch** → `main` / `/ (root)` → Save.
4. Aynı Pages ayarlarında **Custom domain**: `melkosoft.net` → Save. Doğru domainin doğrulanması için GitHub'ın talimatlarını izle.
5. METUnic → `melkosoft.net` → **DNS Kayıtları**. Web için mevcut `@` A/AAAA kayıtları varsa kontrol et (çakışan kayıtları kaldırmak gerekebilir). **Dört ayrı A kaydı oluştur:**

   | Kayıt türü | Sunucu adı | Değer |
   | --- | --- | --- |
   | A | @ | `185.199.108.153` |
   | A | @ | `185.199.109.153` |
   | A | @ | `185.199.110.153` |
   | A | @ | `185.199.111.153` |

6. İstersen `www` için `CNAME` ekle: Sunucu adı `www`, hedef `GITHUB_KULLANICI_ADIN.github.io` (buradaki kullanıcı adını kendi GitHub kullanıcı adınla değiştir). `www` özel domain yönlendirme ayrıntılarını GitHub Pages panelinde kontrol et.
7. DNS yayımlandıktan ve sertifika üretildikten sonra **Enforce HTTPS** ayarını aç. 24 saate kadar sürebilir.
8. `https://melkosoft.net` adresini ziyaret ederek test et.

**ÇOK ÖNEMLİ: Lark e-postalarını bozma.** METUnic'in `ns1.metunic.com.tr` ve `ns2.metunic.com.tr` alan adı sunucularını **değiştirme**. Aşağıdaki üç MX, Lark TXT/SPF, doğrulama TXT ve gelecekteki DKIM/DMARC kayıtlarını **silme veya değiştirme**:
- `mx1.larksuite.com` (öncelik 1)
- `mx2.larksuite.com` (öncelik 5)
- `mx3.larksuite.com` (öncelik 10)
- `v=spf1 +include:spf.onlarksuite.com -all`

DNS'deki `A` kayıtları web sitesini, `MX` kayıtları ise posta alımını yönetir. Web yayını için e-posta MX/TXT kayıtlarına dokunmak gerekmez.

Resmî kaynak: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 4. Alan adı ve hosting maliyeti
- Site dosyaları: sıfır lisans bedeli.
- GitHub Pages: ücretsiz Public depo ile barındırma.
- METUnic domain yenilemesi: mevcut yıllık ücreti devam eder.
- Claude API: siteye bağlı değil; API eklenirse ayrıca kullanım bedeli ve güvenli bir backend gerekir. API anahtarı kesinlikle `script.js` veya diğer tarayıcı dosyalarına konmamalıdır.

## 5. Ürün için önerilen sıradaki işler
1. **Problemi doğrula:** 5 gömülü sistem geliştiricisine bugün nasıl hata ayıkladıklarını sor, 10 gerçek (gizli verileri temizlenmiş) log örneği topla.
2. **Prototipi güçlendir:** Log yükleme, hata kategorileri, basit kural motoru, farklı kart/modüller için test adımları.
3. **Claude API entegrasyonu:** Gizli anahtarların yalnızca backend'de olduğu, bütçe limitli ve güvenlik kontrolleri olan bir servis geliştir.
4. **Değerlendirme:** 10-20 bilinen arızalı logda önerilerin doğruluğunu deneyimli geliştiriciyle ölç; belirsiz sonuçlarda kesin teşhis iddia etme.
5. **Pilot:** Gönüllü bir geliştirici ekibiyle sınırlı pilot test.

## 6. Claude Startups başvuru notları
- Startup fikrinin adı: MelkoSoft / DevicePilot.
- Tanım: "We are exploring an early-stage AI-assisted diagnostics workspace for embedded and IoT developers, initially focusing on ESP32, LoRaWAN, connectivity and sensor errors. Our current in-browser prototype is rule-based; Claude API integration is planned for contextual explanations and actionable troubleshooting guidance."
- **Resmî şirket kuruluş tarihi** ve **yatırım bilgileri** gerçeğe uygun verilmelidir. Domainin alınması veya bu sitenin kurulması şirketin resmen kurulduğu anlamına gelmez.
- Anthropic kampanyasında onay garantisi yoktur; uygulama süreci ve hediyeler değişebilir.

## 7. Dosyaların görevi
- `index.html`: Tüm sayfaların içeriği ve SEO üst bilgileri.
- `styles.css`: Tasarım ve mobil uyumluluk.
- `script.js`: Dil değişimi, örnek loglar, güvenli kural tabanlı analiz, mobil menü.
- `favicon.svg`: Basit MelkoSoft sembolü.
- `CNAME`: GitHub Pages özel domain dosyası.
- `robots.txt`, `sitemap.xml`: Arama motoru keşfi.

**Gerçek şirket kaydı yoksa hukuken kayıtlı şirketmiş gibi açıklama yazma.**
