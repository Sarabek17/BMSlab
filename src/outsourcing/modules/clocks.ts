/** Live time-zone strip in the hero (real time via Intl, refreshed every second). */

import { $ } from '../../utils/dom';
import { CLOCKS, WORK_HOURS } from '../config';
import { onLangChange, t } from '../i18n';

interface ClockView {
  time: HTMLElement;
  state: HTMLElement;
  label: HTMLElement;
  format: Intl.DateTimeFormat;
  hourFormat: Intl.DateTimeFormat;
}

function offsetLabel(timeZone: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'shortOffset' }).formatToParts(
      new Date(),
    );
    return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}

export function initClocks(): void {
  const list = $('[data-clocks]');
  if (!list) return;

  const views: ClockView[] = CLOCKS.map((clock) => {
    const item = document.createElement('li');
    item.className = clock.hub ? 'clock clock--hub' : 'clock';

    const city = document.createElement('span');
    city.className = 'clock__city';
    city.dataset.i18n = clock.labelKey;
    city.textContent = t(clock.labelKey);

    const time = document.createElement('span');
    time.className = 'clock__time';

    const meta = document.createElement('span');
    meta.className = 'clock__meta';
    const state = document.createElement('span');
    state.className = 'clock__dot';
    const label = document.createElement('span');
    label.className = 'clock__label';
    const offset = document.createElement('span');
    offset.className = 'clock__offset';
    offset.textContent = offsetLabel(clock.timeZone);
    meta.append(state, label, offset);

    item.append(city, time, meta);
    list.appendChild(item);

    return {
      time,
      state,
      label,
      format: new Intl.DateTimeFormat('en-GB', {
        timeZone: clock.timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      hourFormat: new Intl.DateTimeFormat('en-US', {
        timeZone: clock.timeZone,
        hour: 'numeric',
        hourCycle: 'h23',
        weekday: 'short',
      }),
    };
  });

  function update(): void {
    const now = new Date();
    views.forEach((view) => {
      view.time.textContent = view.format.format(now);
      const parts = view.hourFormat.formatToParts(now);
      const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
      const weekday = parts.find((part) => part.type === 'weekday')?.value ?? '';
      const weekend = weekday === 'Sat' || weekday === 'Sun';
      const working = !weekend && hour >= WORK_HOURS.start && hour < WORK_HOURS.end;
      view.state.classList.toggle('is-on', working);
      view.label.textContent = t(working ? 'clock.on' : 'clock.off');
    });
  }

  update();
  window.setInterval(() => {
    if (!document.hidden) update();
  }, 1000);
  onLangChange(update);
}
