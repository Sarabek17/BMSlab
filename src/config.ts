/**
 * Loyihaning barcha o'zgaruvchan qiymatlari shu yerda.
 * Narx, bot manzili, analitika ID — faqat shu fayldan tahrirlanadi.
 */

export const BRAND = {
  name: 'BMS Lab',
  legalName: 'BMS Lab',
  year: 2026,
} as const;

export const CONTACT = {
  phone: '+998 97 400 70 90',
  phoneHref: 'tel:+998974007090',
  email: 'bmslabgroup@gmail.com',
  emailHref: 'mailto:bmslabgroup@gmail.com',
  address: "Toshkent shahar, Mirzo Ulug'bek tumani, Olmachi MFY, Parkent ko'chasi, 199a-uy",
  addressRu: 'г. Ташкент, Мирзо-Улугбекский район, МФЙ Олмачи, ул. Паркент, 199а',
  mapUrl: 'https://yandex.uz/maps/?text=Toshkent%20Parkent%20ko%CA%BBchasi%20199a',
} as const;

/**
 * Telegram bot username hali yakunlanmagan — tasdiqlangach shu yerni almashtiring.
 * `botStart()` har CTA uchun alohida `start` parametri beradi: qaysi blok
 * sotayotganini botda ko'rish uchun.
 */
export const TELEGRAM_BOT = 'bmslab_bot';

export function botStart(source: string): string {
  return `https://t.me/${TELEGRAM_BOT}?start=${encodeURIComponent(source)}`;
}

/**
 * Tarif narxlari biznes tomonidan tasdiqlanmagan.
 * `null` bo'lsa — HTML'dagi tarjima qilingan matn qoladi ("—", "Aloqaga chiqing"),
 * ya'ni soxta raqam chiqmaydi. Tasdiqlangach: personal: "149 000 so'm / oy" kabi yozing.
 * Bepul tarif narxi HTML'da (`pricing.free`) turadi — o'zgarmaydi.
 */
export const PRICING: Record<'personal' | 'pro' | 'company', string | null> = {
  personal: null,
  pro: null,
  company: null,
};

/**
 * Ariza formasi uchun backend endpoint. Loyiha hozircha faqat frontend —
 * `null` bo'lsa forma jo'natilmaydi, foydalanuvchiga Telegram orqali yozish taklif qilinadi.
 */
export const FORM_ENDPOINT: string | null = null;

/**
 * Hamkorlar ro'yxati shu faylda emas — `public/partners.json` da turadi.
 * Sabab: uni tahrirlash uchun saytni qayta build qilish shart emas.
 * Batafsil yo'riqnoma o'sha faylning ichida yozilgan.
 */

/** Yandex Metrika hisob raqami. Olingach shu yerga qo'ying. */
export const YANDEX_METRIKA_ID: number | null = null;

/** Demo video fayli tayyor bo'lgach shu yerga yo'lni yozing (masalan '/demo.mp4'). */
export const DEMO_VIDEO_SRC: string | null = null;
