/**
 * Blok 6 — formatlar qatori.
 * Uzluksiz aylanishi uchun tarkib ikki marta takrorlanadi
 * (CSS animatsiyasi -50% ga suradi).
 */

import { $, prefersReducedMotion } from '../utils/dom';

export function initMarquee(): void {
  if (prefersReducedMotion()) return;

  const track = $('[data-marquee-track]');
  if (!track || track.dataset.cloned === 'true') return;

  const items = Array.from(track.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.dataset.cloned = 'true';
}
