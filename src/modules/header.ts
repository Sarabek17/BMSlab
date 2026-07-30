/** Header: yopishqoq holat, mobil menyu, faol bo'lim belgisi */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$ } from '../utils/dom';
import { setScrollLock } from './smooth-scroll';

export function initHeader(): void {
  initStickyState();
  initMobileMenu();
  initActiveLink();
}

function initStickyState(): void {
  const header = $('[data-header]');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-stuck', window.scrollY > 24);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMobileMenu(): void {
  const burger = $<HTMLButtonElement>('[data-burger]');
  const menu = $('[data-mobile-menu]');
  if (!burger || !menu) return;

  // Ochilish animatsiyasi uchun har havolaga navbat raqami
  $$('.mobile-menu__link', menu).forEach((link, index) => {
    link.style.setProperty('--d', String(index));
  });

  const close = () => {
    if (!menu.classList.contains('is-open')) return;
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    setScrollLock(false);
    window.setTimeout(() => {
      if (!menu.classList.contains('is-open')) menu.hidden = true;
    }, 350);
  };

  const open = () => {
    menu.hidden = false;
    // hidden olib tashlangandan keyin animatsiya boshlanishi uchun bir kadr kutamiz
    requestAnimationFrame(() => menu.classList.add('is-open'));
    burger.setAttribute('aria-expanded', 'true');
    setScrollLock(true);
  };

  burger.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) close();
    else open();
  });

  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  // Desktopga o'tganda menyu ochiq qolmasin
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) close();
  });
}

/** Scroll paytida menyuda joriy bo'lim ajratiladi */
function initActiveLink(): void {
  const links = $$<HTMLAnchorElement>('.nav__link');
  if (!links.length) return;

  links.forEach((link) => {
    const id = link.getAttribute('href');
    if (!id || id.length < 2) return;

    const section = document.querySelector(id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        link.classList.toggle('is-active', self.isActive);
      },
    });
  });
}
