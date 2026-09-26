# DRAGON SERVICE - Discord Multi-Account Voice Client & Soundpad Web

Discord ses kanallarına çoklu hesap sokma, 8D ses, 5-Bant EQ, Pitch Shifter (+6 Nightcore) ve Bass Boost (+50 dB) kontrol paneli web vitrini.

## 🚀 Proje Yapısı

- `index.html` - Ana sayfa, şık Hero başlığı (2. görsel estetiğinde `DRAGON SERVICE`) ve interaktif canlı Discord kontrol paneli mockup'ı (1. görsel arayüzü).
- `style.css` - 3. görseldeki Dragon teması, koyu kırmızı neon efektler, cam efektleri (glassmorphism) ve responsive tasarım.
- `app.js` - Parçacık animasyonu, ses görselleştirici (visualizer), efekt kontrol butonları, slider etkileşimi ve akordeon SSS.
- `vercel.json` - Vercel için sıfır yapılandırmalı yayınlama dosyası.
- `assets/` - Arka plan dragon görseli ve referans medya dosyaları.

## 🌐 Vercel'e Yükleme (Deployment)

### Yöntem 1: Vercel Dashboard (En Kolay)
1. Bu klasörü (`dragon-service`) bir GitHub repository'sine yükleyin (`git init`, `git add .`, `git commit -m "dragon service"`, `git push`).
2. [Vercel Dashboard](https://vercel.com/dashboard) adresine gidin.
3. **"Add New Project"** butonuna basın ve GitHub reposunu seçin.
4. **"Deploy"** butonuna basın. Birkaç saniye içinde siteniz canlıya alınacaktır!

### Yöntem 2: Vercel CLI
Terminalde bu klasördeyken:
```bash
npx vercel
```
komutunu çalıştırmanız yeterlidir.
