/**
 * Analitika. Yandex Metrika ID sozlangan bo'lsa skript yuklanadi,
 * bo'lmasa hodisalar shunchaki e'tiborsiz qoladi (dev'da konsolga chiqadi).
 */

import { YANDEX_METRIKA_ID } from '../config';

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export function initAnalytics(): void {
  if (!YANDEX_METRIKA_ID) return;

  const id = YANDEX_METRIKA_ID;

  /* eslint-disable */
  (function (m: any, e: Document, t: string, r: string, i: string) {
    m[i] =
      m[i] ||
      function (...args: unknown[]) {
        (m[i].a = m[i].a || []).push(args);
      };
    m[i].l = Number(new Date());
    const script = e.createElement(t) as HTMLScriptElement;
    script.async = true;
    script.src = r;
    e.head.appendChild(script);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  /* eslint-enable */

  window.ym?.(id, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });
}

/** Landing hodisasi: cta_bosildi, demo_ochildi, narx_korildi, ariza_yuborildi va h.k. */
export function track(event: string, params: Params = {}): void {
  if (YANDEX_METRIKA_ID && window.ym) {
    window.ym(YANDEX_METRIKA_ID, 'reachGoal', event, params);
    return;
  }

  if (import.meta.env.DEV) {
    console.info('[analitika]', event, params);
  }
}
