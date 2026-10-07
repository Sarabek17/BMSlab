/** Flagship case mock: chat plays once on enter; the source waveform runs only while visible. */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../../utils/dom';

export function initMock(): void {
  const mock = $('[data-mock]');
  if (!mock || prefersReducedMotion()) return;
  const items = $$('[data-mock-item]', mock);

  gsap.set(items, { opacity: 0, y: 24 });
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 0.7 } });
  tl.to(items[0], { opacity: 1, y: 0 })
    .to(items[1], { opacity: 1, y: 0 }, '-=0.25')
    .to(items[2], { opacity: 1, y: 0 }, '-=0.3')
    .fromTo($$('.advisor', mock), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.12, duration: 0.7 }, '<0.1');

  ScrollTrigger.create({
    trigger: mock,
    start: 'top 85%',
    once: true,
    onEnter: () => tl.play(),
  });

  ScrollTrigger.create({
    trigger: mock,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => mock.classList.toggle('is-playing', self.isActive),
  });
}
