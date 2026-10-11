# 🎮 EğitimKozmosu 5 – 5. Sınıf Oyunlaştırılmış Öğrenme ve Etüt Motoru

**MEB Müfredatına Birebir Uyumlu • 20 Dk Etüt & 10 Dk Zorunlu Ekran Kilidi Molası • 6 İnteraktif Oyun Arenası**

Bu proje, 5. sınıf öğrencileri için geliştirilmiş, MEB kazanımlarını derinlemesine kavratan ve oyunlaştırma (gamification) mekanikleriyle ders çalışmayı eğlenceli hale getiren **Next.js (App Router) + TypeScript + Tailwind CSS** tabanlı tam teşekküllü bir web uygulamasıdır.

---

## 🌟 Öne Çıkan Özellikler ve Kurallar

### 1. Zaman Planlaması ve Ekran Kilidi Sistemi
- **16:00'dan Sonra Başlangıç:** Öğrencinin okulu 15:00'da biter; zihinsel ve fiziksel dinlenmenin ardından etütler 16:00 itibarıyla başlar.
- **🔒 20 Dk Etüt / 10 Dk Zorunlu Mola:** Uygulama kuralı gereği her etüt tam 20 dakikadır. 20 dakikanın sonunda ekran otomatik olarak kilitlenir ve 10 dakikalık dinlenme sayacı (20-20-20 göz kuralı, su içme, esneme tavsiyeleri) başlar.
- **🚫 Hafta Sonu Rutini (Yeni Konu Yok!):** Cumartesi ve Pazar günleri yeni konu kilitlidir; sadece hafta içi işlenen 5 dersin pekiştirme turnuvaları ve tekrar oyunları oynanır.
- **📚 5 Odak Ders:** Türkçe (Ağırlıklı), Matematik, Fen Bilimleri, Sosyal Bilgiler ve İngilizce.

### 2. 6 Farklı İnteraktif Oyun & Etkinlik Modu
Her ders ve hafta için 10 ile 20 arası veri içeren 6 oyun motoru mevcuttur:
1. **Etkinlik 1 (Oyunlaştırılmış Özet):** Konuyu seçimli bir uzay/kurtarma macerasına dönüştüren metin tabanlı interaktif özet.
2. **Etkinlik 2 (Doğruyu Bul):** 4 şıklı kazanım testi motoru (Anlık sesli/görsel geri bildirim ve öğrenme notu).
3. **Etkinlik 3 (Kategori Panosu):** Sürükle-bırak / tıklama mantığıyla kartları 2-3 üst kategoriye ayırma oyunu.
4. **Etkinlik 4 (Yukarıdan Düşen Kartlar):** *"Sadece doğru bilgilere tıkla, yanlışlara dokunma! 3 canın var."* refleks ve dikkat oyunu.
5. **Etkinlik 5 (İkili Karşılaştırma - Puanlı):** Ekrana gelen cümlenin A mı B mi olduğunu seçtiren (+10 doğru, -5 yanlış, Combo çarpanlı) düello oyunu.
6. **Etkinlik 6 (10 Saniyelik Süreli Yarışma):** 10 saniyelik tik-tak zaman barı altında hızlı düşünme refleksi.

### 3. İçerik ve Programlama Motoru
- Öğretmenler veya veliler için MEB kazanım denetimi.
- Tüm oyunların JSON veri setlerini tek tıkla kopyalama / dışa aktarma (Export).
- Yeni haftaların veya derslerin JSON içeriklerini uygulamaya anında yükleme (Dynamic Import).

---

## 🚀 Yerel Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin (önceden yapıldıysa atlayabilirsiniz)
npm install

# Geliştirici sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

---

## 📦 GitHub'a Aktarma Adımları

Projeyi kendi GitHub hesabınıza yüklemek için şu adımları izleyin:

1. [GitHub](https://github.com) üzerinde oturum açın ve **New repository** (Yeni Depo) butonuna tıklayın.
2. Depo adını girin (Örn: `egitim-kozmosu-5` veya `calismaprogrami`).
3. Depoyu **Public** veya **Private** olarak seçin ve **Create repository** deyin.
4. Terminalinizde (bu proje dizinindeyken) aşağıdaki komutları çalıştırın:

```bash
git init
git add .
git commit -m "feat: 5. sinif egitim ve oyun motoru hazirlandi"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/DEPO_ADINIZ.git
git push -u origin main
```

*(Not: `KULLANICI_ADINIZ` ve `DEPO_ADINIZ` kısımlarını kendi GitHub bilgilerinizle değiştirin.)*

---

## ⚡ Vercel'de Yayınlama (Deployment)

Proje Next.js ile geliştirildiği için Vercel üzerinde **sıfır ayar (Zero Config)** ile 1 dakikada yayına alınabilir:

1. [Vercel](https://vercel.com) sitesine gidip GitHub hesabınızla giriş yapın.
2. Sağ üstteki **Add New...** -> **Project** butonuna tıklayın.
3. GitHub deponuzu (`egitim-kozmosu-5`) listeden seçip **Import** butonuna tıklayın.
4. Vercel projeyi otomatik olarak **Next.js** olarak tanıyacaktır. Hiçbir ayarı değiştirmeden doğrudan **Deploy** butonuna tıklayın.
5. Yaklaşık 45 saniye içinde uygulamanız `https://proje-adiniz.vercel.app` şeklinde dünya çapında canlıya geçecektir! 🎉

---

## 🛠️ Kullanılan Teknolojiler
- **Framework:** Next.js 15 (App Router)
- **Dil:** TypeScript
- **Stil & Tasarım:** Tailwind CSS
- **İkonlar:** Lucide React
- **Ses Efektleri:** Web Audio API (Harici dosya indirmeden saf tarayıcı sentezleyicisi)
- **Kutlama Efektleri:** Canvas Confetti
- **Veri Kalıcılığı:** LocalStorage API

---

## 📝 Lisans
Bu proje eğitim amaçlı geliştirilmiş olup MEB 5. Sınıf müfredat standartlarıyla uyumludur.
