/**
 * `config.ts` dagi qiymatlarni sahifaga joylaydi:
 * Telegram havolalari, tarif narxlari, aloqa ma'lumotlari, joriy yil.
 */

import { $$, $ } from '../utils/dom';
import { BRAND, CONTACT, PRICING, botStart } from '../config';
import { getLang, onLangChange } from '../i18n';
import { track } from './analytics';

export function initContent(): void {
  fillBotLinks();
  fillPricing();
  fillContacts();
  fillYear();
  trackPricingView();

  onLangChange(() => {
    fillPricing();
    fillContacts();
  });
}

/** Har bir CTA o'z `start` parametri bilan botga olib boradi */
function fillBotLinks(): void {
  $$<HTMLAnchorElement>('[data-bot-link]').forEach((link) => {
    const source = link.dataset.botLink ?? 'landing';
    link.href = botStart(source);
    link.target = '_blank';
    link.rel = 'noopener';

    link.addEventListener('click', () => track('cta_bosildi', { manba: source }));
  });
}

/**
 * Narxlar `config.PRICING` dan olinadi. Qiymat `null` bo'lsa — HTML'dagi
 * (tarjima qilingan) matn qoladi: soxta raqam chiqmasligi uchun.
 */
function fillPricing(): void {
  $$('[data-price]').forEach((el) => {
    const key = el.dataset.price as keyof typeof PRICING | undefined;
    if (!key) return;

    const value = PRICING[key];
    if (!value) return;

    el.textContent = value;
    // Narx qo'yilgach kichik/kulrang uslub emas, katta gradient ko'rinish kerak
    el.classList.remove('plan__price--text');
  });
}

function fillContacts(): void {
  const address = getLang() === 'ru' ? CONTACT.addressRu : CONTACT.address;

  $$('[data-contact="address"]').forEach((el) => {
    el.textContent = address;
  });

  $$<HTMLAnchorElement>('[data-contact="phone"]').forEach((el) => {
    el.href = CONTACT.phoneHref;
  });

  $$<HTMLAnchorElement>('[data-contact="email"]').forEach((el) => {
    el.href = CONTACT.emailHref;
  });
}

function fillYear(): void {
  const el = $('[data-year]');
  if (el) el.textContent = String(Math.max(BRAND.year, new Date().getFullYear()));
}

/** Narx blokigacha yetib borish — muhim konversiya ko'rsatkichi */
function trackPricingView(): void {
  const pricing = $('#pricing');
  if (!pricing || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        track('narx_korildi');
        observer.disconnect();
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(pricing);
}
