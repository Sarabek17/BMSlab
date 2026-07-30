/**
 * Hamkorlar bo'limi.
 *
 * Ro'yxat `public/partners.json` dan ishga tushganda o'qiladi — ya'ni hamkor
 * qo'shish uchun saytni qayta build qilish shart emas, faylni tahrirlash kifoya.
 * Ro'yxat bo'sh yoki fayl yo'q bo'lsa — bo'lim sahifadan butunlay olib tashlanadi
 * (bo'sh skelet ko'rsatilmaydi).
 *
 * Logotip ko'p bo'lsa ikki qatorga bo'linadi, ikkinchisi teskari yo'nalishda suriladi.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, prefersReducedMotion } from '../utils/dom';

export interface Partner {
  name: string;
  logo?: string;
  url?: string;
}

const SOURCE = '/partners.json';
/** Shundan ko'p logotip bo'lsa ikkinchi qator ochiladi */
const TWO_ROW_THRESHOLD = 8;
/** Uzluksiz aylanish uchun qatorda kamida shuncha element kerak */
const MIN_FOR_SCROLL = 3;

export async function initPartners(): Promise<void> {
  const section = $('#partners');
  if (!section) return;

  const partners = await loadPartners();

  if (!partners.length) {
    section.remove();
    ScrollTrigger.refresh();
    return;
  }

  const track1 = $('[data-partners-track="1"]', section);
  const track2 = $('[data-partners-track="2"]', section);
  const row2 = $('[data-partners-row2]', section);
  if (!track1 || !track2 || !row2) return;

  const [first, second] = splitRows(partners);

  fillTrack(track1, first.map(buildPartner));

  row2.hidden = second.length === 0;
  if (second.length) fillTrack(track2, second.map(buildPartner));

  section.hidden = false;
  ScrollTrigger.refresh();
}

async function loadPartners(): Promise<Partner[]> {
  try {
    const response = await fetch(SOURCE, { cache: 'no-cache' });
    if (!response.ok) return [];

    const data: unknown = await response.json();
    const list = (data as { partners?: unknown })?.partners;
    if (!Array.isArray(list)) return [];

    // Faqat nomi bor yozuvlarni olamiz — bo'sh karta chiqib qolmasin
    return list.filter(
      (item): item is Partner =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Partner).name === 'string' &&
        (item as Partner).name.trim().length > 0,
    );
  } catch {
    return [];
  }
}

/** Logotiplarni ikki qatorga taqsimlash */
function splitRows(list: Partner[]): [Partner[], Partner[]] {
  if (list.length < TWO_ROW_THRESHOLD) return [list, []];
  const half = Math.ceil(list.length / 2);
  return [list.slice(0, half), list.slice(half)];
}

function fillTrack(track: HTMLElement, items: HTMLElement[]): void {
  track.innerHTML = '';
  items.forEach((item) => track.appendChild(item));

  // Uzluksiz aylanish uchun tarkib ikki marta takrorlanadi (CSS -50% ga suradi)
  if (prefersReducedMotion() || items.length < MIN_FOR_SCROLL) return;

  items.forEach((item) => {
    const clone = item.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  track.dataset.animated = 'true';
}

function buildPartner(partner: Partner): HTMLElement {
  const wrap = document.createElement(partner.url ? 'a' : 'div');
  wrap.className = 'partner';

  if (partner.url && wrap instanceof HTMLAnchorElement) {
    wrap.href = partner.url;
    wrap.target = '_blank';
    wrap.rel = 'noopener';
  }

  if (partner.logo) {
    const img = document.createElement('img');
    img.src = partner.logo;
    img.alt = partner.name;
    img.loading = 'lazy';
    img.decoding = 'async';
    wrap.appendChild(img);
  } else {
    // Logo fayli yo'q bo'lsa — nomi toza matn ko'rinishida
    const text = document.createElement('span');
    text.className = 'partner__name';
    text.textContent = partner.name;
    wrap.appendChild(text);
  }

  return wrap;
}
