/**
 * Blok 3 — manba isboti demosi.
 * Javobdagi raqam bosilganda o'ng tomonda tegishli manba kartasi ochiladi.
 * Audio — haqiqiy fayl emas, sahifa ichidagi namuna (kartada shu haqda yozuv bor).
 */

import { $, $$, prefersReducedMotion } from '../utils/dom';
import { track } from './analytics';

const WAVE_BARS = 42;
/** Kartada ko'rsatiladigan parcha uzunligi (12:35–14:02 ≈ 87 soniya) */
const FRAGMENT_SECONDS = 87;
/** Namuna shuncha vaqtda oxiriga yetadi — kutib o'tirmaslik uchun tezlashtirilgan */
const PLAYBACK_MS = 11000;
const TICK_MS = 125;

export function initSourceDemo(): void {
  initCitations();
  initPlayer();
}

function initCitations(): void {
  const cites = $$<HTMLButtonElement>('[data-cite]');
  const cards = $$('[data-cite-card]');
  if (!cites.length || !cards.length) return;

  const activate = (id: string) => {
    cites.forEach((cite) => cite.classList.toggle('is-active', cite.dataset.cite === id));
    cards.forEach((card) => card.classList.toggle('is-active', card.dataset.citeCard === id));
    track('manba_ochildi', { manba: id });
  };

  cites.forEach((cite) => {
    cite.addEventListener('click', () => activate(cite.dataset.cite ?? '1'));
  });

  cites[0]?.classList.add('is-active');
}

/** Namuna audio pleyer — to'lqin chizig'i va vaqt hisoblagichi */
function initPlayer(): void {
  const player = $('[data-player]');
  const button = $<HTMLButtonElement>('[data-player-btn]');
  const wave = $('[data-player-wave]');
  const time = $('[data-player-time]');
  if (!player || !button || !wave || !time) return;

  // To'lqin chiziqlarini yasash — har biri turli balandlikda
  const bars: HTMLElement[] = [];
  for (let i = 0; i < WAVE_BARS; i += 1) {
    const bar = document.createElement('i');
    const height = 24 + Math.abs(Math.sin(i * 0.7)) * 52 + Math.abs(Math.cos(i * 1.9)) * 22;
    bar.style.height = `${Math.min(100, height)}%`;
    wave.appendChild(bar);
    bars.push(bar);
  }

  let playing = false;
  let progress = 0;
  let timer = 0;

  const render = () => {
    const played = Math.round(progress * WAVE_BARS);
    bars.forEach((bar, index) => bar.classList.toggle('is-played', index < played));

    const seconds = Math.round(progress * FRAGMENT_SECONDS);
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    time.textContent = `${mm}:${ss}`;
  };

  const stop = () => {
    playing = false;
    player.classList.remove('is-playing');
    window.clearInterval(timer);
  };

  const start = () => {
    playing = true;
    player.classList.add('is-playing');
    track('namuna_eshitildi');

    if (prefersReducedMotion()) {
      progress = 1;
      render();
      stop();
      return;
    }

    timer = window.setInterval(() => {
      progress += TICK_MS / PLAYBACK_MS;
      if (progress >= 1) {
        progress = 1;
        render();
        stop();
        window.setTimeout(() => {
          progress = 0;
          render();
        }, 900);
        return;
      }
      render();
    }, TICK_MS);
  };

  button.addEventListener('click', () => {
    if (playing) stop();
    else start();
  });

  // Boshqa kartaga o'tilsa pleyer to'xtasin
  $$<HTMLButtonElement>('[data-cite]').forEach((cite) => {
    cite.addEventListener('click', () => {
      if (playing) stop();
    });
  });

  render();
}
