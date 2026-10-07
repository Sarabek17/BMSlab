/**
 * Splits hero headline lines for the intro animation.
 * The visual copy is `aria-hidden`; a visually hidden copy keeps the heading readable.
 * Re-runs after a language switch (the i18n pass overwrites the element's text).
 */

import { $$ } from '../../utils/dom';

export function splitHeadlines(): void {
  $$('[data-split]').forEach((el) => {
    const text = (el.textContent ?? '').trim();
    el.textContent = '';

    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;

    const visual = document.createElement('span');
    visual.className = 'split';
    visual.setAttribute('aria-hidden', 'true');

    if (el.dataset.split === 'chars') {
      text.split(/\s+/).forEach((word, index, words) => {
        const wordEl = document.createElement('span');
        wordEl.className = 'split__word';
        Array.from(word).forEach((char) => {
          const charEl = document.createElement('span');
          charEl.className = 'split__char';
          charEl.textContent = char;
          wordEl.appendChild(charEl);
        });
        visual.appendChild(wordEl);
        if (index < words.length - 1) visual.appendChild(document.createTextNode(' '));
      });
    } else {
      const inner = document.createElement('span');
      inner.className = 'split__line';
      inner.textContent = text;
      visual.appendChild(inner);
    }

    el.append(sr, visual);
  });
}
