/** Engagement-model tabs (WAI-ARIA tabs pattern) with an animated indicator. */

import { gsap } from 'gsap';
import { $, $$, prefersReducedMotion } from '../../utils/dom';
import { onLangChange } from '../i18n';

export function initTabs(): void {
  const root = $('[data-tabs]');
  if (!root) return;
  const tabs = $$<HTMLButtonElement>('[role="tab"]', root);
  const indicator = $('[data-tabs-indicator]', root);
  const reduced = prefersReducedMotion();
  let active = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true'),
  );

  function moveIndicator(animate: boolean): void {
    const tab = tabs[active];
    if (!indicator || !tab) return;
    const props = { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight };
    if (animate && !reduced) gsap.to(indicator, { ...props, duration: 0.5, ease: 'power3.out' });
    else gsap.set(indicator, props);
  }

  function select(index: number, focus: boolean): void {
    if (index === active) return;
    active = index;
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls') ?? '');
      if (!panel) return;
      panel.hidden = !selected;
      if (selected && !reduced) {
        gsap.fromTo(
          panel.querySelectorAll('.model__main > *, .model__side > *'),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' },
        );
      }
    });
    if (focus) tabs[index].focus();
    moveIndicator(true);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index, false));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      let next = -1;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = active === last ? 0 : active + 1;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = active === 0 ? last : active - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = last;
      if (next < 0) return;
      event.preventDefault();
      select(next, true);
    });
  });

  // Model CTA preselects the model in the contact form
  $$<HTMLAnchorElement>('[data-model-cta]').forEach((link) => {
    link.addEventListener('click', () => {
      const select = $<HTMLSelectElement>('#f-model');
      if (select) select.value = link.dataset.modelCta ?? '';
    });
  });

  moveIndicator(false);
  new ResizeObserver(() => moveIndicator(false)).observe(root);
  onLangChange(() => requestAnimationFrame(() => moveIndicator(false)));
  document.fonts?.ready.then(() => moveIndicator(false)).catch(() => undefined);
}
