# BMS Lab — landing page

Raqamli egizak platformasi uchun bir sahifali landing. Faqat frontend: Vite + TypeScript,
animatsiyalar GSAP/ScrollTrigger va Lenis orqali. Ikki tilli (UZ / RU), dark tema.

Kontent rejasi: [`docs/LANDING_PAGE.md`](docs/LANDING_PAGE.md).

---

## Tez ishga tushirish

### Docker orqali (production, tavsiya etiladi)

```bash
docker compose up -d --build
```

Sahifa ochiladi: <http://localhost:8090>

To'xtatish:

```bash
docker compose down
```

### Lokal ishlab chiqish

```bash
npm install
npm run dev        # http://localhost:5173
```

Boshqa buyruqlar:

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Ishlab chiqish serveri (hot reload) |
| `npm run build` | `dist/` ga production build (avval tip tekshiruvi) |
| `npm run preview` | Tayyor build'ni lokalda ko'rish |

---

## Chiqishdan oldin to'ldirilishi kerak

Barcha o'zgaruvchan qiymatlar bitta faylda: **`src/config.ts`**.

| Nima | Qayerda | Holat |
|---|---|---|
| Telegram bot username | `TELEGRAM_BOT` | ⬜ hozircha `bmslab_bot` |
| Tarif narxlari | `PRICING.personal`, `.pro`, `.company` | ⬜ `null` — kartada "—" ko'rinadi |
| Yandex Metrika ID | `YANDEX_METRIKA_ID` | ⬜ `null` — analitika o'chiq |
| Demo video fayli | `DEMO_VIDEO_SRC` | ⬜ `null` — modalda CTA ko'rsatiladi |
| Ariza formasi endpoint | `FORM_ENDPOINT` | ⬜ `null` — foydalanuvchi Telegramga yo'naltiriladi |
| Hamkorlar | `PARTNERS` | ⬜ bo'sh — bo'lim bo'sh o'rinlar bilan ko'rinadi |
| Ommaviy oferta / maxfiylik matni | `index.html` footer, `data-legal` havolalari | ⬜ `#` |

> Narxlar `null` bo'lganda soxta raqam chiqmaydi — bu ataylab shunday
> (`docs/LANDING_PAGE.md` §6 talabi).

### Hamkorlar bo'limi

Bu bo'lim **qayta build qilishni talab qilmaydi**. Ro'yxat `public/partners.json`
da turadi va u konteynerga to'g'ridan-to'g'ri ulangan (`docker-compose.yml`
dagi `volumes`).

1. Logotiplarni `public/partners/` ga qo'ying (SVG yoki shaffof fonli PNG).
2. `public/partners.json` ni tahrirlang:

```json
{
  "partners": [
    { "name": "Alfa Group", "logo": "/partners/alfa.svg", "url": "https://alfa.uz" },
    { "name": "Logotipsiz hamkor" }
  ]
}
```

3. Sahifani yangilang — tamom.

- Logotip bo'lmasa kompaniya nomi toza matn ko'rinishida chiqadi.
- 8 tadan ko'p bo'lsa avtomatik ikki qatorga bo'linadi (ikkinchisi teskari suriladi).
- **Ro'yxat bo'sh bo'lsa bo'lim saytda umuman ko'rinmaydi** — bo'sh joy qolmaydi.

> Bu yerga faqat haqiqatan hamkor bo'lgan kompaniyalarni yozing. Boshqa saytdan
> olingan mijoz logotiplari — yolg'on da'vo va o'sha firmalarning belgisini
> ruxsatsiz ishlatish bo'ladi (`docs/LANDING_PAGE.md` §6).

Domen `bmslab.uz` dan boshqa bo'lsa, `index.html` dagi `canonical`, `og:url`,
`hreflang` va JSON-LD manzillarini ham almashtiring.

---

## Tuzilma

```
index.html              barcha bloklar (semantic markup, UZ matn)
src/
  main.ts               kirish nuqtasi
  config.ts             o'zgaruvchan qiymatlar (yuqoridagi jadval)
  i18n/                 til almashtirish + ru.json
  modules/              interaktiv bloklar va animatsiyalar
  styles/               tokens/base/components + har blok uchun alohida fayl
public/                 favicon, og-image, shriftlar, oq logolar
nginx/nginx.conf        gzip, kesh, xavfsizlik sarlavhalari
```

### Tillar qanday ishlaydi

O'zbekcha matn HTML ichida turadi — JS o'chirilgan bo'lsa ham sahifa to'liq
o'qiladi va qidiruv tizimlari uni ko'radi. Ishga tushganda shu matn lug'at
sifatida xotiraga olinadi, ruscha `src/i18n/ru.json` dan keladi.

Yangi matn qo'shganda: elementga `data-i18n="kalit"` bering va `ru.json` ga
o'sha kalitni yozing. Kalit `ru.json` da bo'lmasa — o'zbekcha matn qoladi.

Tilni tanlash tartibi: `?lang=ru` → `localStorage` → `uz`.

### `/outsourcing/` — IT autsorsing sahifasi

Ikkinchi sahifa (multi-page Vite, `vite.config.ts` dagi `input`): `outsourcing/index.html`
→ `https://bmslab.uz/outsourcing/`. Kodi `src/outsourcing/` ichida (`main.ts`, `config.ts`,
`i18n.ts`, `modules/`, `styles/`). Kontaktlar `src/config.ts` dan olinadi.

- Tillar: EN (asosiy), UZ, RU — lug'at `src/outsourcing/i18n.ts` da, uchala til bitta
  kalitlar to'plami bilan tiplangan (kalit yetishmasa — build xato beradi).
  Tartib: `?lang=` → `localStorage` (`bmslab:outsourcing:lang`) → `en`.
- Biznes raqamlari va va'dalar `src/outsourcing/config.ts` da (`TODO confirm with business`).
  `COMPANY_FACTS` `null` bo'lsa sahifada ko'rinmaydi.
- `prefers-reduced-motion` yoqilganda: preloader, globus aylanishi, gorizontal scroll va
  maxsus kursor o'chadi, butun kontent darrov ko'rinadi.

---

## Serverga yuklash

1. Kodni serverga ko'chiring (`git clone` yoki `rsync`).
2. `src/config.ts` dagi qiymatlarni to'ldiring.
3. `docker compose up -d --build`.
4. Oldiga reverse-proxy qo'ying (HTTPS uchun). Traefik/nginx bilan `8090` portini
   domenga ulang. Port band bo'lsa `.env` faylida `LANDING_PORT=8091` kabi
   o'zgartiring — `docker-compose.yml` ni tahrirlash shart emas.

Konteyner ichida statik fayllardan boshqa hech narsa yo'q — ma'lumotlar bazasi,
holat (state) va tashqi so'rov yo'q. Yangilash uchun qayta build qilish kifoya.

### Tekshirish

```bash
curl -I http://localhost:8090/                  # 200, no-cache
curl -sI -H 'Accept-Encoding: gzip' http://localhost:8090/assets/<fayl>.js | grep -i -E 'content-encoding|cache-control'
docker compose ps                               # healthy
```

---

## Yodda tutish kerak

- **Animatsiyalar** `prefers-reduced-motion` sozlamasini hurmat qiladi — bunday
  holatda kontent darrov ko'rinadi.
- **Manba isboti bloki** (`#proof`) va hero'dagi telefon — sahifa ichidagi
  namuna. Audio haqiqiy fayl emas, kartada shu haqda yozuv bor.
- **Asosiy trafik Telegramdan** keladi, ya'ni telefondan. O'zgarish kiritganda
  avval mobil ko'rinishni va Telegram ichki brauzerini tekshiring.
- OG-rasm (`public/og-image.png`) Telegramda havola ko'rinishi uchun muhim.
  Uni qayta yasash kerak bo'lsa — o'lchami 1200×630 bo'lsin.
