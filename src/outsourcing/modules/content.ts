/** Contacts and brand values come from the shared `src/config.ts` — never duplicated by hand. */

import { $$ } from '../../utils/dom';
import { BRAND, CONTACT, botStart } from '../../config';
import { getLang, onLangChange } from '../i18n';

export function initContent(): void {
  $$<HTMLAnchorElement>('[data-contact="phone"]').forEach((link) => {
    link.href = CONTACT.phoneHref;
    link.textContent = CONTACT.phone;
  });
  $$<HTMLAnchorElement>('[data-contact="email"]').forEach((link) => {
    link.href = CONTACT.emailHref;
    link.textContent = CONTACT.email;
  });
  $$<HTMLAnchorElement>('[data-contact="telegram"]').forEach((link) => {
    link.href = botStart('outsourcing');
  });
  $$('[data-year]').forEach((el) => {
    el.textContent = String(BRAND.year);
  });
  $$('[data-brand]').forEach((el) => {
    el.textContent = BRAND.name;
  });

  const address = $$<HTMLAnchorElement>('[data-contact="address"]');
  const renderAddress = (): void => {
    address.forEach((link) => {
      link.href = CONTACT.mapUrl;
      link.textContent = getLang() === 'ru' ? CONTACT.addressRu : CONTACT.address;
    });
  };
  renderAddress();
  onLangChange(renderAddress);
}
