# BMS Lab — IT outsorsing sayti

**https://bmslab.uz** — BMS Lab'ni xalqaro IT outsorsing / outstaffing / AI engineering
kompaniyasi sifatida taqdim etadigan bir sahifali sayt. Faqat frontend: Vite + TypeScript,
animatsiyalar GSAP/ScrollTrigger, silliq scroll Lenis, globus — canvas 2D. Uch tilli (EN / UZ / RU),
dark tema.

Talablar va bo'limlar: [`docs/phases/PHASE-2-outsourcing-site.md`](docs/phases/PHASE-2-outsourcing-site.md).
Joriy holat va deploy: [`docs/STATE.md`](docs/STATE.md).

> Avvalgi Digital Twin landing bu repodan olib tashlangan — u keyinchalik alohida domenda
> chiqadi. Kodi git'da saqlangan: `git checkout digital-twin-landing-v1`.

---

## Tez ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
```

| Buyruq | Vazifasi |
|---|---|
| `npm run dev` | Ishlab chiqish serveri (hot reload) |
| `npm run build` | `dist/` ga production build (avval tip tekshiruvi) |
| `npm run preview` | Tayyor build'ni lokalda ko'rish (`:4173`) |
| `docker compose up -d --build` | nginx konteynerida production (`LANDING_PORT`, standart `8090`) |

---

## Nimani qayerda o'zgartirish kerak

| Nima | Qayerda |
|---|---|
| Telefon, email, manzil, Telegram bot | `src/config.ts` |
| Raqamlar (stats), kompaniya faktlari, texnologiyalar | `src/outsourcing/config.ts` (`TODO confirm with business`) |
| Digital Twin havolasi | `src/outsourcing/config.ts` → `PRODUCT_URL` (`null` — havolalar yashiriladi) |
| Matnlar (EN/UZ/RU) | `src/outsourcing/i18n.ts` + `index.html` dagi inglizcha nusxa |
| SEO (title, canonical, OG, JSON-LD) | `index.html` `<head>` |
| OG rasm | `public/og-image.png` (1200×630) |

`COMPANY_FACTS` `null` bo'lsa sahifada ko'rinmaydi — soxta raqam chiqmaydi.

---

## Tuzilma

```
index.html                  barcha bo'limlar (semantic markup, EN matn — SEO va JS'siz holat uchun)
src/
  config.ts                 kontaktlar, brend, Telegram bot
  utils/dom.ts              DOM yordamchilari
  modules/smooth-scroll.ts  Lenis + GSAP ulanishi
  outsourcing/
    main.ts                 kirish nuqtasi
    config.ts               raqamlar, havolalar, texnologiyalar
    i18n.ts                 EN/UZ/RU lug'ati (tiplangan — kalit yetishmasa build xato beradi)
    modules/                globus, soatlar, animatsiyalar, forma va h.k.
    styles/                 tokens/base/components/hero/sections
public/                     favicon, og-image, shriftlar, logolar
nginx/                      nginx.conf (gzip, kesh, xavfsizlik), caddy-bmslab.caddy (TLS bloki)
```

### Tillar

Tartib: `?lang=` → `localStorage` (`bmslab:outsourcing:lang`) → `en`.
Yangi matn: elementga `data-i18n="kalit"` bering va kalitni `i18n.ts` dagi uchala tilga yozing.

### Qulaylik

`prefers-reduced-motion` yoqilganda preloader, globus aylanishi, gorizontal scroll va maxsus
kursor o'chadi, butun kontent darrov ko'rinadi.

---

## Serverga yuklash

Batafsil (server, port, Caddy, rollback): [`docs/STATE.md`](docs/STATE.md) → *Deployment*.
Qisqasi: `main` arxivini `/opt/bmslab` ga yoying va `docker compose -p bmslab up -d --build`.
Eski `/outsourcing/` havolalari nginx'da `301` bilan `/` ga yo'naltiriladi.
