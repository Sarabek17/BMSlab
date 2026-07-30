/** Hero telefon ichidagi jonli chat namunasi (takrorlanuvchi) */

import { gsap } from 'gsap';
import { $, prefersReducedMotion } from '../utils/dom';

export function initHeroMockup(): void {
  const body = $('[data-chat-body]');
  if (!body) return;

  const question = $('.msg--out', body);
  const typing = $('[data-typing]', body);
  const answer = $('.msg--in', body);
  const source = $('.msg--source', body);

  if (!question || !typing || !answer || !source) return;

  if (prefersReducedMotion()) {
    gsap.set([question, answer, source], { opacity: 1, y: 0, scale: 1 });
    typing.style.display = 'none';
    return;
  }

  const appear = { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)' };
  const hidden = { opacity: 0, y: 14, scale: 0.96 };

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8 });

  tl.set([question, answer, source], hidden)
    .set(typing, { display: 'flex', opacity: 0, y: 14, scale: 0.96 })
    .to(question, appear, 0.5)
    .to(typing, { opacity: 1, y: 0, scale: 1, duration: 0.35 }, 1.4)
    .to(typing, { opacity: 0, duration: 0.25 }, 3.1)
    .set(typing, { display: 'none' }, 3.35)
    .to(answer, appear, 3.4)
    .to(source, appear, 4.2)
    .to([question, answer, source], { opacity: 0, y: -12, duration: 0.45, stagger: 0.07 }, 9.2);

  // Sahifa ko'rinmayotganda animatsiya batareyani yemasin
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) tl.pause();
    else tl.resume();
  });
}
