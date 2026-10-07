/** Two-row infinite tech marquee; speeds up with scroll velocity, pauses off-screen. */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../../utils/dom';
import { TECH_ROWS } from '../config';

function buildList(items: string[], hidden: boolean): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = 'marquee__list';
  if (hidden) list.setAttribute('aria-hidden', 'true');
  items.forEach((name) => {
    const pill = document.createElement('li');
    pill.className = 'pill';
    pill.textContent = name;
    list.appendChild(pill);
  });
  return list;
}

export function initMarquee(): void {
  const rows = $$('[data-marquee]');
  if (!rows.length) return;
  const reduced = prefersReducedMotion();
  const tweens: gsap.core.Tween[] = [];

  rows.forEach((row, index) => {
    const items = TECH_ROWS[index % TECH_ROWS.length];
    const track = document.createElement('div');
    track.className = 'marquee__track';

    if (reduced) {
      track.appendChild(buildList(items, false));
      row.appendChild(track);
      return;
    }

    const doubled = [...items, ...items];
    track.append(buildList(doubled, false), buildList(doubled, true));
    row.appendChild(track);

    const reverse = Number(row.dataset.marquee ?? 1) < 0;
    tweens.push(
      gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: 70, ease: 'none', repeat: -1 },
      ),
    );
  });

  if (reduced) return;

  ScrollTrigger.create({
    trigger: $('.marquee'),
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => tweens.forEach((tween) => (self.isActive ? tween.resume() : tween.pause())),
    onUpdate: (self) => {
      const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
      if (speed < 1.5) return;
      tweens.forEach((tween) => {
        gsap.killTweensOf(tween);
        gsap
          .timeline()
          .to(tween, { timeScale: speed, duration: 0.25, ease: 'power2.out' })
          .to(tween, { timeScale: 1, duration: 1.4, ease: 'power2.out' });
      });
    },
  });
}
