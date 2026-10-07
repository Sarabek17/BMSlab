/** Config-driven stats with counters that run once when scrolled into view. */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../../utils/dom';
import { COMPANY_FACTS, FACT_LABELS, STATS, type StatItem } from '../config';
import { t } from '../i18n';

function allStats(): StatItem[] {
  const facts: StatItem[] = [];
  (Object.keys(COMPANY_FACTS) as (keyof typeof COMPANY_FACTS)[]).forEach((key) => {
    const value = COMPANY_FACTS[key];
    if (value !== null) facts.push({ value, labelKey: FACT_LABELS[key] });
  });
  return [...facts, ...STATS];
}

export function initStats(): void {
  const list = $('[data-stats]');
  if (!list) return;
  const reduced = prefersReducedMotion();

  allStats().forEach((stat) => {
    const item = document.createElement('li');
    item.className = 'stat';

    const value = document.createElement('p');
    value.className = 'stat__value';
    if (stat.prefix) {
      const prefix = document.createElement('span');
      prefix.textContent = stat.prefix;
      value.appendChild(prefix);
    }
    const number = document.createElement('span');
    number.className = 'stat__num';
    number.dataset.count = String(stat.value);
    number.textContent = reduced ? String(stat.value) : '0';
    value.appendChild(number);
    if (stat.unitKey) {
      const unit = document.createElement('span');
      unit.className = 'stat__unit';
      unit.dataset.i18n = stat.unitKey;
      unit.textContent = t(stat.unitKey);
      value.appendChild(unit);
    }

    const label = document.createElement('p');
    label.className = 'stat__label';
    label.dataset.i18n = stat.labelKey;
    label.textContent = t(stat.labelKey);

    item.append(value, label);
    list.appendChild(item);
  });

  if (reduced) return;

  ScrollTrigger.create({
    trigger: list,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      $$('[data-count]', list).forEach((el, index) => {
        const target = Number(el.dataset.count ?? 0);
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          delay: 0.2 + index * 0.08,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    },
  });
}
