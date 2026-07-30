/**
 * Ikki tilli tizim (UZ / RU).
 *
 * O'zbekcha matn HTML ichida turadi — JS o'chgan bo'lsa ham sahifa to'liq o'qiladi
 * va qidiruv tizimlari uni ko'radi. Ishga tushganda shu matn "lug'at" sifatida
 * xotiraga olinadi, ruscha esa `ru.json` dan keladi.
 */

import ru from './ru.json';
import { $$ } from '../utils/dom';

export type Lang = 'uz' | 'ru';

const STORAGE_KEY = 'bmslab:lang';
const SUPPORTED: Lang[] = ['uz', 'ru'];

const dictionaries: Record<Lang, Record<string, string>> = {
  uz: {},
  ru: ru as Record<string, string>,
};

let current: Lang = 'uz';
const listeners = new Set<() => void>();

export function getLang(): Lang {
  return current;
}

export function onLangChange(callback: () => void): void {
  listeners.add(callback);
}

export function initI18n(): void {
  snapshotUz();
  wireButtons();
  setLang(detectLang(), false);
}

/** Sahifadagi o'zbekcha matnni lug'atga olish */
function snapshotUz(): void {
  const uz = dictionaries.uz;

  $$('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key && !(key in uz)) uz[key] = (el.textContent ?? '').trim();
  });

  $$<HTMLInputElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key && !(key in uz)) uz[key] = el.placeholder;
  });

  uz['meta.title'] = document.title;
  uz['meta.description'] =
    document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
}

function detectLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (isLang(fromUrl)) return fromUrl;

  const stored = safeStorageGet();
  if (isLang(stored)) return stored;

  return 'uz';
}

function isLang(value: string | null): value is Lang {
  return value !== null && SUPPORTED.includes(value as Lang);
}

export function setLang(lang: Lang, persist = true): void {
  current = lang;
  apply(lang);

  document.documentElement.lang = lang;
  if (persist) safeStorageSet(lang);

  $$<HTMLButtonElement>('[data-lang-btn]').forEach((button) => {
    const active = button.dataset.langBtn === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  listeners.forEach((callback) => callback());
}

function apply(lang: Lang): void {
  const dict = dictionaries[lang];
  const fallback = dictionaries.uz;

  $$('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = dict[key] ?? fallback[key];
    if (value !== undefined) el.textContent = value;
  });

  $$<HTMLInputElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (!key) return;
    const value = dict[key] ?? fallback[key];
    if (value !== undefined) el.placeholder = value;
  });

  const title = dict['meta.title'] ?? fallback['meta.title'];
  if (title) document.title = title;

  const description = dict['meta.description'] ?? fallback['meta.description'];
  const metaDescription = document.querySelector('meta[name="description"]');
  if (description && metaDescription) metaDescription.setAttribute('content', description);
}

function wireButtons(): void {
  $$<HTMLButtonElement>('[data-lang-btn]').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.langBtn;
      if (isLang(lang ?? null) && lang !== current) setLang(lang as Lang);
    });
  });
}

/* Telegram ichki brauzerida localStorage bloklangan bo'lishi mumkin */
function safeStorageGet(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeStorageSet(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* e'tiborsiz qoldiramiz */
  }
}
