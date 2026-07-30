/** Blok 12 — FAQ akkordeoni (bir vaqtda bittasi ochiq) */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../utils/dom';

export function initAccordion(): void {
  const root = $('[data-accordion]');
  if (!root) return;

  const items = $$('.acc__item', root);
  if (!items.length) return;

  const closeItem = (item: HTMLElement, animate: boolean) => {
    const button = $<HTMLButtonElement>('.acc__btn', item);
    const panel = $('.acc__panel', item);
    if (!button || !panel) return;

    button.setAttribute('aria-expanded', 'false');
    item.classList.remove('is-open');

    if (animate && !prefersReducedMotion()) {
      gsap.to(panel, {
        height: 0,
        duration: 0.42,
        ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      gsap.set(panel, { height: 0 });
    }
  };

  const openItem = (item: HTMLElement) => {
    const button = $<HTMLButtonElement>('.acc__btn', item);
    const panel = $('.acc__panel', item);
    if (!button || !panel) return;

    button.setAttribute('aria-expanded', 'true');
    item.classList.add('is-open');

    if (prefersReducedMotion()) {
      gsap.set(panel, { height: 'auto' });
      return;
    }

    gsap.to(panel, {
      height: 'auto',
      duration: 0.48,
      ease: 'power3.out',
      onComplete: () => ScrollTrigger.refresh(),
    });
  };

  items.forEach((item) => {
    const button = $<HTMLButtonElement>('.acc__btn', item);
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        if (other !== item) closeItem(other, true);
      });

      if (isOpen) closeItem(item, true);
      else openItem(item);
    });
  });
}
