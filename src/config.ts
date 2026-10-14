/**
 * Loyihaning barcha o'zgaruvchan qiymatlari shu yerda.
 * Kontaktlar, brend va Telegram bot — faqat shu fayldan tahrirlanadi.
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

