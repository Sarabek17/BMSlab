/** Demo video modali (video hali tayyor emas — o'rniga CTA ko'rsatiladi) */

import { $, $$ } from '../utils/dom';
import { DEMO_VIDEO_SRC } from '../config';
import { setScrollLock } from './smooth-scroll';
import { track } from './analytics';

export function initModal(): void {
  const modal = $('[data-modal]');
  if (!modal) return;

  const body = $('[data-modal-body]', modal);
  let lastFocused: HTMLElement | null = null;

  const close = () => {
    if (!modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    setScrollLock(false);

    const video = $<HTMLVideoElement>('video', modal);
    video?.pause();

    window.setTimeout(() => {
      if (!modal.classList.contains('is-open')) modal.hidden = true;
    }, 350);

    lastFocused?.focus();
  };

  const open = () => {
    lastFocused = document.activeElement as HTMLElement;

    // Video fayli sozlangan bo'lsa — o'rniga qo'yamiz
    if (DEMO_VIDEO_SRC && body && !$('video', body)) {
      body.innerHTML = '';
      const video = document.createElement('video');
      video.src = DEMO_VIDEO_SRC;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      body.appendChild(video);
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('is-open'));
    setScrollLock(true);
    track('demo_ochildi');

    $<HTMLButtonElement>('.modal__x', modal)?.focus();
  };

  $$('[data-demo-open]').forEach((button) => button.addEventListener('click', open));
  $$('[data-modal-close]', modal).forEach((button) => button.addEventListener('click', close));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (event.key === 'Tab' && modal.classList.contains('is-open')) trapFocus(event, modal);
  });
}

/** Modal ochiq bo'lsa fokus undan chiqib ketmasin */
function trapFocus(event: KeyboardEvent, modal: HTMLElement): void {
  const focusable = $$<HTMLElement>(
    'a[href], button:not([disabled]), input, select, textarea, video, [tabindex]:not([tabindex="-1"])',
    modal,
  ).filter((el) => el.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
