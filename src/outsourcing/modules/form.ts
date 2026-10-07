/**
 * Contact form without a backend: validates name / email / message inline, then opens a
 * pre-filled `mailto:` to CONTACT.email. Error texts are i18n keys, so they re-translate live.
 */

import { $ } from '../../utils/dom';
import { CONTACT } from '../../config';
import { t, translate, type Key } from '../i18n';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Field = HTMLInputElement | HTMLTextAreaElement;

function setError(field: Field, key: Key | null): void {
  const error = document.getElementById(`${field.id}-err`);
  field.setAttribute('aria-invalid', String(Boolean(key)));
  field.closest('.field')?.classList.toggle('has-error', Boolean(key));
  if (!error) return;
  if (key) {
    error.dataset.i18n = key;
    error.textContent = t(key);
  } else {
    delete error.dataset.i18n;
    error.textContent = '';
  }
}

function validate(field: Field): boolean {
  const value = field.value.trim();
  if (field.required && !value) {
    setError(field, 'form.err.required');
    return false;
  }
  if (field.type === 'email' && value && !EMAIL_RE.test(value)) {
    setError(field, 'form.err.email');
    return false;
  }
  setError(field, null);
  return true;
}

export function initForm(): void {
  const form = $<HTMLFormElement>('[data-form]');
  const status = $('[data-form-status]');
  if (!form) return;

  const fields = ['#f-name', '#f-email', '#f-message']
    .map((selector) => $<Field>(selector, form))
    .filter((field): field is Field => field !== null);

  fields.forEach((field) => {
    field.addEventListener('blur', () => {
      if (field.value.trim()) validate(field);
    });
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validate(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !validate(field));

    if (status) {
      status.replaceChildren();
      status.classList.toggle('is-error', invalid.length > 0);
    }

    if (invalid.length) {
      invalid[0].focus();
      if (status) {
        status.dataset.i18n = 'form.err.summary';
        status.textContent = t('form.err.summary');
      }
      return;
    }

    const data = new FormData(form);
    const get = (name: string): string => String(data.get(name) ?? '').trim();
    const modelSelect = $<HTMLSelectElement>('#f-model', form);
    const model = modelSelect?.selectedOptions[0]?.textContent?.trim() ?? '';

    const body = [
      `${t('form.name')}: ${get('name')}`,
      `${t('form.email')}: ${get('email')}`,
      get('company') ? `${t('form.company')}: ${get('company')}` : '',
      `${t('form.model')}: ${model}`,
      '',
      get('message'),
    ]
      .filter((line, index) => line !== '' || index === 4)
      .join('\n');

    const subject = `${t('form.subject')} — ${get('company') || get('name')}`;
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (status) {
      delete status.dataset.i18n;
      const text = document.createElement('span');
      text.dataset.i18n = 'form.ok';
      const link = document.createElement('a');
      // Same pre-filled mailto — a second chance if the mail app did not open
      link.href = href;
      link.dataset.mailto = '';
      link.textContent = CONTACT.email;
      status.append(text, ' ', link);
      translate(status);
    }

    window.location.href = href;
  });
}
