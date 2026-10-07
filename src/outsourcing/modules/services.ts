/**
 * Services: pinned horizontal-scroll track on desktop (≥ 1024 px, motion allowed);
 * a plain vertical grid everywhere else.
 */

import { gsap } from 'gsap';
import { $ } from '../../utils/dom';

export function initServices(): void {
  const section = $('[data-services]');
  const pin = $('[data-services-pin]');
  const track = $('[data-services-track]');
  const bar = $('[data-services-bar]');
  if (!section || !pin || !track) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    section.classList.add('is-horizontal');
    const distance = (): number => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress });
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { clearProps: 'transform' });
      section.classList.remove('is-horizontal');
    };
  });
}
