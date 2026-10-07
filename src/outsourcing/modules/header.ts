/** Header: glass on scroll, hide on scroll down / show on up, active link, burger menu. */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from '../../utils/dom';
import { setScrollLock } from '../../modules/smooth-scroll';
import { onLangChange, t } from '../i18n';

export function initHeader(): void {
  const header = $('[data-header]');
  const burger = $<HTMLButtonElement>('[data-burger]');
  const nav = $('[data-nav]');
  if (!header || !burger || !nav) return;

  let open = false;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      header.classList.toggle('is-scrolled', y > 24);
      header.classList.toggle('is-hidden', !open && self.direction === 1 && y > 320);
    },
  });

  // Active section highlight
  $$<HTMLAnchorElement>('.nav__link').forEach((link) => {
    const id = link.getAttribute('href');
    const section = id ? document.querySelector<HTMLElement>(id) : null;
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => link.classList.toggle('is-active', self.isActive),
    });
  });

  const labelKey = (): 'nav.open' | 'nav.close' => (open ? 'nav.close' : 'nav.open');

  function setOpen(next: boolean): void {
    if (open === next) return;
    open = next;
    header!.classList.toggle('is-open', open);
    burger!.setAttribute('aria-expanded', String(open));
    burger!.dataset.i18nAttr = `aria-label:${labelKey()}`;
    burger!.setAttribute('aria-label', t(labelKey()));
    setScrollLock(open);
    if (open) {
      header!.classList.remove('is-hidden');
      $('a', nav!)?.focus();
    }
  }

  burger.addEventListener('click', () => setOpen(!open));
  $$('a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      burger.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
  onLangChange(() => burger.setAttribute('aria-label', t(labelKey())));
}
