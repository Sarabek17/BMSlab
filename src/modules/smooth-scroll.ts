/** Lenis silliq scroll + anchor navigatsiya */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $$, prefersReducedMotion } from '../utils/dom';

let lenis: Lenis | null = null;

export function initSmoothScroll(): void {
  if (!prefersReducedMotion()) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  initAnchors();
}

/** Sahifa ichidagi havolalar — header balandligini hisobga olgan holda */
function initAnchors(): void {
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      scrollToElement(target as HTMLElement);
    });
  });
}

export function scrollToElement(target: HTMLElement): void {
  const header = document.querySelector('.header');
  const offset = -((header?.clientHeight ?? 72) + 12);

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.25 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Modal/menyu ochilganda scroll'ni to'xtatish */
export function setScrollLock(locked: boolean): void {
  document.documentElement.classList.toggle('is-locked', locked);
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}
