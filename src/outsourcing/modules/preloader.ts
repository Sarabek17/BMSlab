/** Intro: counter 0 → 100 then a curtain reveal (≤ 1.2 s). Skipped with reduced motion. */

import { gsap } from 'gsap';
import { $, prefersReducedMotion } from '../../utils/dom';
import { setScrollLock } from '../../modules/smooth-scroll';

export function runPreloader(onReveal: () => void): void {
  const root = $('[data-preloader]');
  if (!root || prefersReducedMotion()) {
    root?.remove();
    onReveal();
    return;
  }

  const count = $('[data-preloader-count]', root);
  const bar = $('[data-preloader-bar]', root);
  const counter = { value: 0 };
  setScrollLock(true);

  const tl = gsap.timeline({
    onComplete: () => {
      root.remove();
    },
  });

  tl.to(counter, {
    value: 100,
    duration: 0.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (count) count.textContent = String(Math.round(counter.value));
      if (bar) gsap.set(bar, { scaleX: counter.value / 100 });
    },
  })
    .to('.preloader__inner', { opacity: 0, y: -16, duration: 0.25, ease: 'power2.in' }, '>-0.02')
    .to('.preloader__panel--top', { yPercent: -100, duration: 0.6, ease: 'expo.inOut' }, '<0.1')
    .to('.preloader__panel--bottom', { yPercent: 100, duration: 0.6, ease: 'expo.inOut' }, '<')
    .add(() => {
      setScrollLock(false);
      onReveal();
    }, '<0.15');
}
