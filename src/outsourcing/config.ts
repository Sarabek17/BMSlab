/**
 * /outsourcing/ page configuration.
 *
 * Contacts, brand and the Telegram bot are NOT duplicated here — they come from `src/config.ts`.
 * Everything below that is a business fact or a business commitment must be confirmed by the
 * business before launch (marked `TODO confirm with business`).
 */

import type { Key } from './i18n';

export const SITE_URL = 'https://bmslab.uz/outsourcing/';
export const IT_PARK_URL = 'https://outsource.gov.uz';
export const PRODUCT_URL = '/';
export const LANG_STORAGE_KEY = 'bmslab:outsourcing:lang';

export interface StatItem {
  value: number;
  /** Rendered before the animated number, e.g. "4–" for a "4–5 h" range. */
  prefix?: string;
  unitKey?: Key;
  labelKey: Key;
}

/**
 * Commitment-style numbers (what we promise), not historic claims.
 * TODO confirm with business: 48 h proposal, 14 days to a team, 4–5 h EU overlap, 30-day AI pilot.
 */
export const STATS: StatItem[] = [
  { value: 48, unitKey: 'unit.h', labelKey: 'stats.s1' },
  { value: 14, unitKey: 'unit.days', labelKey: 'stats.s2' },
  { value: 5, prefix: '4–', unitKey: 'unit.h', labelKey: 'stats.s3' },
  { value: 30, unitKey: 'unit.days', labelKey: 'stats.s4' },
  { value: 3, labelKey: 'stats.s5' },
];

/**
 * Historic business facts. `null` = not shown on the page (no fabricated numbers).
 * TODO confirm with business — fill in only verified figures.
 */
export const COMPANY_FACTS: Record<'engineers' | 'projects', number | null> = {
  engineers: null,
  projects: null,
};

export const FACT_LABELS: Record<keyof typeof COMPANY_FACTS, Key> = {
  engineers: 'stats.engineers',
  projects: 'stats.projects',
};

export interface City {
  id: string;
  lat: number;
  lon: number;
}

export const HUB: City = { id: 'tashkent', lat: 41.3, lon: 69.24 };

export const ARC_CITIES: City[] = [
  { id: 'london', lat: 51.51, lon: -0.13 },
  { id: 'berlin', lat: 52.52, lon: 13.4 },
  { id: 'newyork', lat: 40.71, lon: -74.0 },
  { id: 'dubai', lat: 25.2, lon: 55.27 },
  { id: 'seoul', lat: 37.57, lon: 126.98 },
  { id: 'riyadh', lat: 24.71, lon: 46.68 },
];

export interface Clock {
  labelKey: Key;
  timeZone: string;
  hub?: boolean;
}

export const CLOCKS: Clock[] = [
  { labelKey: 'city.tashkent', timeZone: 'Asia/Tashkent', hub: true },
  { labelKey: 'city.london', timeZone: 'Europe/London' },
  { labelKey: 'city.berlin', timeZone: 'Europe/Berlin' },
  { labelKey: 'city.newyork', timeZone: 'America/New_York' },
  { labelKey: 'city.dubai', timeZone: 'Asia/Dubai' },
];

/** Working hours used for the "online" dot in the clock strip (local time of each city). */
export const WORK_HOURS = { start: 9, end: 18 } as const;

/** Tech marquee rows — proper names, not translated. */
export const TECH_ROWS: string[][] = [
  ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Go', 'Java', '.NET', 'Vue', 'NestJS', 'Django', 'GraphQL'],
  ['Flutter', 'Kotlin', 'Swift', 'PostgreSQL', 'AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'OpenAI', 'LLMs', 'RAG'],
];
