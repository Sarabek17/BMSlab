/** Blok 8 — auditoriya tablari */

import { $, $$ } from '../utils/dom';
import { onLangChange } from '../i18n';

export function initTabs(): void {
  const root = $('[data-tabs]');
  if (!root) return;

  const buttons = $$<HTMLButtonElement>('[data-tab]', root);
  const panels = $$('[data-panel]', root);
  const pill = $('[data-tabs-pill]', root);
  if (!buttons.length || !panels.length) return;

  const movePill = (button: HTMLButtonElement) => {
    if (!pill) return;
    pill.style.width = `${button.offsetWidth}px`;
    pill.style.transform = `translateX(${button.offsetLeft - 5}px)`;
  };

  const select = (id: string) => {
    buttons.forEach((button) => {
      const active = button.dataset.tab === id;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active) movePill(button);
    });

    panels.forEach((panel) => {
      const active = panel.dataset.panel === id;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => select(button.dataset.tab ?? '1'));

    // Klaviatura bilan boshqarish
    button.addEventListener('keydown', (event) => {
      const index = buttons.indexOf(button);
      let next = -1;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
      if (next < 0) return;

      event.preventDefault();
      buttons[next].focus();
      select(buttons[next].dataset.tab ?? '1');
    });
  });

  const reposition = () => {
    const active = buttons.find((button) => button.classList.contains('is-active'));
    if (active) movePill(active);
  };

  // Shrift yuklangach va o'lcham o'zgarganda pill joyida turishi kerak
  window.addEventListener('resize', reposition);
  window.addEventListener('load', reposition);
  onLangChange(() => requestAnimationFrame(reposition));

  requestAnimationFrame(reposition);
}
