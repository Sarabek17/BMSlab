/** FAQ accordion: one open item at a time, height animated in CSS (grid rows). */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from '../../utils/dom';

export function initAccordion(): void {
  const root = $('[data-accordion]');
  if (!root) return;
  const items = $$('.acc', root);

  items.forEach((item) => {
    const button = $<HTMLButtonElement>('.acc__btn', item);
    if (!button) return;
    button.addEventListener('click', () => {
      const willOpen = button.getAttribute('aria-expanded') !== 'true';
      items.forEach((other) => {
        other.classList.remove('is-open');
        $('.acc__btn', other)?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
      // Page height changed — keep pinned sections / triggers below in sync
      window.setTimeout(() => ScrollTrigger.refresh(), 500);
    });
  });
}
