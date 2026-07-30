/** Barcha scroll-animatsiyalar shu yerda markazlashgan */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion, isTouch } from '../utils/dom';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(): void {
  if (prefersReducedMotion()) {
    showEverything();
    return;
  }

  splitHeroTitle();
  heroIntro();
  revealOnScroll();
  animateHowLine();
  animateCouncil();
  animateProgressBar();
  initMagnetic();
  initCardSpotlight();

  // Rasm/shrift yuklangach o'lchamlar o'zgarishi mumkin
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/** Animatsiya o'chirilgan rejimda hamma narsa darrov ko'rinsin */
function showEverything(): void {
  gsap.set('[data-reveal], [data-reveal-group] > *, .hero__content > *, .msg', {
    opacity: 1,
    y: 0,
    scale: 1,
  });
  const typing = $('[data-typing]');
  if (typing) typing.style.display = 'none';
}

/** Sarlavhani so'zlarga bo'lib, pastdan ko'tarish uchun tayyorlash */
function splitHeroTitle(): void {
  const title = $('[data-split]');
  if (!title) return;

  const words = (title.textContent ?? '').trim().split(/\s+/);
  title.textContent = '';

  words.forEach((word, index) => {
    const mask = document.createElement('span');
    mask.className = 'split-w';

    const inner = document.createElement('span');
    inner.className = 'split-word';
    inner.textContent = word;

    mask.appendChild(inner);
    title.appendChild(mask);

    if (index < words.length - 1) {
      title.appendChild(document.createTextNode(' '));
    }
  });
}

function heroIntro(): void {
  const content = $('.hero__content');
  if (!content) return;

  const words = $$('.hero__title .split-word');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    '[data-hero-eyebrow]',
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.7 },
    0.15,
  );

  if (words.length) {
    gsap.set('.hero__title', { opacity: 1 });
    tl.fromTo(
      words,
      { yPercent: 115 },
      { yPercent: 0, duration: 1.05, stagger: 0.045 },
      0.28,
    );
  } else {
    tl.fromTo('.hero__title', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0.28);
  }

  tl.fromTo('[data-hero-lead]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.62)
    .fromTo('[data-hero-actions]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.74)
    .fromTo('[data-hero-note]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.86)
    .fromTo(
      '[data-hero-visual]',
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.15 },
      0.4,
    );

  // Suzuvchi chiplar
  $$('[data-float]').forEach((chip, index) => {
    gsap.to(chip, {
      y: index % 2 === 0 ? -14 : 14,
      duration: 3.2 + index * 0.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });

  // Hero fon parallaks
  gsap.to('.hero__bg', {
    yPercent: 14,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

/** Har bir blok scroll'da chiqib keladi */
function revealOnScroll(): void {
  $$('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
  });

  $$('[data-reveal-group]').forEach((group) => {
    const items = Array.from(group.children) as HTMLElement[];
    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      },
    );
  });
}

/** "Qanday ishlaydi" — qadamlarni bog'lovchi chiziq scroll bilan chiziladi */
function animateHowLine(): void {
  const line = $('[data-how-line]');
  const steps = $('[data-how]');
  if (!line || !steps) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 900px)', () => {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: steps, start: 'top 72%', end: 'bottom 72%', scrub: 0.6 },
      },
    );
  });

  mm.add('(max-width: 899px)', () => {
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: steps, start: 'top 70%', end: 'bottom 80%', scrub: 0.6 },
      },
    );
  });
}

/** Kengash: markaz va rollar navbat bilan paydo bo'ladi */
function animateCouncil(): void {
  const orbit = $('[data-orbit]');
  if (!orbit) return;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: orbit, start: 'top 78%', once: true },
    defaults: { ease: 'back.out(1.6)' },
  });

  tl.fromTo(
    '[data-orbit-center]',
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.8 },
  )
    .fromTo(
      '.orbit__node',
      { opacity: 0, scale: 0.35 },
      { opacity: 1, scale: 1, duration: 0.7, stagger: 0.08 },
      '-=0.45',
    )
    .fromTo(
      '.orbit__spokes line',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
      '-=0.6',
    );
}

/** Yuqoridagi scroll indikatori */
function animateProgressBar(): void {
  const bar = $('[data-progress-bar]');
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.25,
    },
  });
}

/** Asosiy tugmalar sichqonchaga bir oz tortiladi */
function initMagnetic(): void {
  if (isTouch()) return;

  $$('[data-magnetic]').forEach((el) => {
    const strength = 0.28;
    let raf = 0;

    const move = (event: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
      });
    };

    const reset = () => {
      cancelAnimationFrame(raf);
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', reset);
  });
}

/** Kartada sichqoncha ortidan yuruvchi yorug'lik */
function initCardSpotlight(): void {
  if (isTouch()) return;

  $$('.card--spot').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}
