/**
 * /outsourcing/ — entry point.
 * Order matters: language + content first, then layout-affecting modules, then motion.
 */

import './styles/index.css';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/dom';
import { initSmoothScroll } from '../modules/smooth-scroll';
import { initI18n, onLangChange } from './i18n';
import { initContent } from './modules/content';
import { initClocks } from './modules/clocks';
import { initStats } from './modules/stats';
import { initMarquee } from './modules/marquee';
import { initHeader } from './modules/header';
import { initTabs } from './modules/tabs';
import { initAccordion } from './modules/accordion';
import { initForm } from './modules/form';
import { initGlobe } from './modules/globe';
import { initServices } from './modules/services';
import { initFactory } from './modules/factory';
import { initMock } from './modules/mock';
import { splitHeadlines } from './modules/split';
import { heroIntro, initMotion, prepareHero } from './modules/motion';
import { runPreloader } from './modules/preloader';

gsap.registerPlugin(ScrollTrigger);

function boot(): void {
  document.documentElement.classList.add(prefersReducedMotion() ? 'reduced' : 'motion');

  initI18n();
  initContent();
  splitHeadlines();
  onLangChange(() => {
    splitHeadlines();
    ScrollTrigger.refresh();
  });

  initClocks();
  initStats();
  initMarquee();

  initSmoothScroll();
  initHeader();
  initTabs();
  initAccordion();
  initForm();

  initGlobe();
  initServices();
  initFactory();
  initMock();
  initMotion();

  prepareHero();
  runPreloader(heroIntro);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
