/**
 * BMS Lab landing — kirish nuqtasi.
 * Tartib muhim: avval til va kontent, keyin scroll/animatsiya modullari.
 */

import './styles/index.css';

import { initI18n } from './i18n';
import { initContent } from './modules/content';
import { initAnalytics } from './modules/analytics';
import { initSmoothScroll } from './modules/smooth-scroll';
import { initHeader } from './modules/header';
import { initMarquee } from './modules/marquee';
import { initPartners } from './modules/partners';
import { initTabs } from './modules/tabs';
import { initAccordion } from './modules/accordion';
import { initSourceDemo } from './modules/source-demo';
import { initCouncil } from './modules/council';
import { initForm } from './modules/form';
import { initModal } from './modules/modal';
import { initAnimations } from './modules/animations';
import { initHeroMockup } from './modules/hero-mockup';

function boot(): void {
  // Matn va sozlamalar
  initI18n();
  initContent();
  initAnalytics();

  // Interaktiv bloklar
  initSmoothScroll();
  initHeader();
  initMarquee();
  initPartners();
  initTabs();
  initAccordion();
  initSourceDemo();
  initCouncil();
  initForm();
  initModal();

  // Animatsiyalar oxirida — DOM to'liq shakllangandan keyin
  initAnimations();
  initHeroMockup();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
