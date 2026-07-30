/**
 * Blok 9 — ekspert arizasi.
 * Loyiha faqat frontenddan iborat: `config.FORM_ENDPOINT` sozlanmagan bo'lsa,
 * ma'lumot jo'natilmaydi — foydalanuvchiga Telegram orqali yozish taklif qilinadi.
 */

import { $, $$ } from '../utils/dom';
import { CONTACT, FORM_ENDPOINT, botStart } from '../config';
import { getLang, type Lang } from '../i18n';
import { track } from './analytics';

const MESSAGES: Record<Lang, Record<string, string>> = {
  uz: {
    required: "Bu maydon to'ldirilishi kerak",
    contact: "Telegram username yoki telefon raqamini kiriting",
    sending: 'Yuborilmoqda…',
    ok: "Arizangiz qabul qilindi. 24 soat ichida bog'lanamiz.",
    fallbackTitle: "Ariza qabul qilindi.",
    fallbackText: "Tezroq bog'lanish uchun Telegramda yozing yoki qo'ng'iroq qiling:",
    error: "Yuborishda xatolik. Iltimos, Telegram yoki telefon orqali bog'laning.",
  },
  ru: {
    required: 'Заполните это поле',
    contact: 'Укажите Telegram-username или номер телефона',
    sending: 'Отправляем…',
    ok: 'Заявка принята. Свяжемся с вами в течение 24 часов.',
    fallbackTitle: 'Заявка принята.',
    fallbackText: 'Чтобы связаться быстрее, напишите в Telegram или позвоните:',
    error: 'Ошибка отправки. Пожалуйста, свяжитесь через Telegram или по телефону.',
  },
};

export function initForm(): void {
  const form = $<HTMLFormElement>('[data-form]');
  if (!form) return;

  const status = $('[data-form-status]', form);
  const submit = $<HTMLButtonElement>('[data-form-submit]', form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validate(form)) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const t = MESSAGES[getLang()];

    const label = submit ? $('span', submit) : null;
    const labelText = label?.textContent ?? '';

    if (submit) {
      submit.disabled = true;
      if (label) label.textContent = t.sending;
    }

    let ok = true;
    if (FORM_ENDPOINT) {
      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        ok = response.ok;
      } catch {
        ok = false;
      }
    }

    track('ariza_yuborildi', { natija: ok ? 'ok' : 'xato' });
    showResult(status, ok);

    if (ok) {
      form.reset();
      $$('.field', form).forEach((field) => field.classList.remove('has-error'));
    }

    if (submit) {
      submit.disabled = false;
      if (label) label.textContent = labelText;
    }
  });

  // Yozishni boshlagach xato yozuvi yo'qolsin
  $$<HTMLInputElement>('input, select', form).forEach((input) => {
    input.addEventListener('input', () => {
      input.closest('.field')?.classList.remove('has-error');
      const error = $(`[data-err-for="${input.name}"]`, form);
      if (error) error.textContent = '';
    });
  });
}

function validate(form: HTMLFormElement): boolean {
  const t = MESSAGES[getLang()];
  let valid = true;

  $$<HTMLInputElement>('input[required]', form).forEach((input) => {
    const field = input.closest('.field');
    const error = $(`[data-err-for="${input.name}"]`, form);
    const value = input.value.trim();

    let message = '';
    if (!value) {
      message = t.required;
    } else if (input.name === 'contact' && !isValidContact(value)) {
      message = t.contact;
    }

    field?.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message;

    if (message && valid) {
      input.focus();
      valid = false;
    }
  });

  return valid;
}

/** Telegram username (@ bilan) yoki kamida 7 raqamli telefon */
function isValidContact(value: string): boolean {
  if (/^@?[a-zA-Z0-9_]{4,}$/.test(value)) return true;
  return (value.match(/\d/g) ?? []).length >= 7;
}

function showResult(status: HTMLElement | null, ok: boolean): void {
  if (!status) return;

  const t = MESSAGES[getLang()];
  status.hidden = false;

  if (!ok) {
    status.textContent = t.error;
    return;
  }

  // Backend yo'q — foydalanuvchini to'g'ridan-to'g'ri aloqaga yo'naltiramiz
  if (!FORM_ENDPOINT) {
    status.innerHTML = '';

    const title = document.createElement('b');
    title.textContent = `${t.fallbackTitle} `;

    const text = document.createTextNode(`${t.fallbackText} `);

    const telegram = document.createElement('a');
    telegram.href = botStart('ariza_forma');
    telegram.target = '_blank';
    telegram.rel = 'noopener';
    telegram.textContent = 'Telegram';

    const phone = document.createElement('a');
    phone.href = CONTACT.phoneHref;
    phone.textContent = CONTACT.phone;

    status.append(title, text, telegram, document.createTextNode(' · '), phone);
    return;
  }

  status.textContent = t.ok;
}
