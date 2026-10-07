/**
 * Global motion layer: hero intro, scroll reveals, progress bar, magnetic buttons,
 * cursor-follow glow, 3D tilt and the custom cursor. Everything is transform/opacity only.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../../utils/dom';

const finePointer = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function heroIntro(): void {
  if (prefersReducedMotion()) return;
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  tl.fromTo('.hero__globe', { opacity: 0, scale: 0.86 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
    .fromTo('.hero [data-hero-item]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.09 }, 0.15)
    .fromTo(
      '.hero .split__char',
      { yPercent: 115, rotate: 6 },
      { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.016 },
      0.05,
    )
    .fromTo('.hero .split__line', { yPercent: 110 }, { yPercent: 0, duration: 1.2 }, 0.45);
}

/** Before the preloader lifts: hide hero parts that the intro animates in. */
export function prepareHero(): void {
  if (prefersReducedMotion()) return;
  gsap.set('.hero .split__char', { yPercent: 115 });
  gsap.set('.hero .split__line', { yPercent: 110 });
  gsap.set('.hero__globe', { opacity: 0 });
}

function reveals(): void {
  $$('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
  });

  $$('[data-reveal-group]').forEach((group) => {
    const children = Array.from(group.children);
    if (!children.length) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 46 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.07,
        scrollTrigger: { trigger: group, start: 'top 88%', once: true },
      },
    );
  });
}

function progressBar(): void {
  const bar = $('[data-progress]');
  if (!bar) return;
  const setScale = gsap.quickSetter(bar, 'scaleX');
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => setScale(self.progress),
  });
}

function magnetic(): void {
  $$('[data-magnetic]').forEach((el) => {
    const toX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const toY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      toX((event.clientX - rect.left - rect.width / 2) * 0.28);
      toY((event.clientY - rect.top - rect.height / 2) * 0.38);
    });
    el.addEventListener('pointerleave', () => {
      toX(0);
      toY(0);
    });
  });
}

/** Cursor-follow glow on cards: sets --mx / --my (used by a radial gradient pseudo-element). */
function spotlight(): void {
  $$('[data-spot], [data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function tilt(): void {
  $$('[data-tilt]').forEach((card) => {
    gsap.set(card, { transformPerspective: 900 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rx(py * -9);
      ry(px * 11);
    });
    card.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

function cursor(): void {
  const dot = $('[data-cursor-dot]');
  const ring = $('[data-cursor-ring]');
  if (!dot || !ring) return;
  document.documentElement.classList.add('has-cursor');

  const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.42, ease: 'power3.out' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.42, ease: 'power3.out' });
  const root = document.documentElement;

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    root.classList.add('cursor-on');
    dotX(event.clientX);
    dotY(event.clientY);
    ringX(event.clientX);
    ringY(event.clientY);
    const target = event.target instanceof Element ? event.target : null;
    root.classList.toggle('cursor-link', Boolean(target?.closest('a, button, select, [role="tab"]')));
    root.classList.toggle('cursor-card', Boolean(target?.closest('[data-tilt]')));
  });
  document.addEventListener('pointerleave', () => root.classList.remove('cursor-on'));
}

export function initMotion(): void {
  if (prefersReducedMotion()) {
    $('.cursor')?.remove();
    return;
  }

  reveals();
  progressBar();

  if (finePointer()) {
    magnetic();
    spotlight();
    tilt();
    cursor();
  } else {
    $('.cursor')?.remove();
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
}
