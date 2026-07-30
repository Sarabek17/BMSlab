/** Blok 5 — direktorlar kengashi: rol tanlanganda tavsif almashadi */

import { $, $$ } from '../utils/dom';
import { getLang, onLangChange, type Lang } from '../i18n';

/** Rol tavsiflari — nomlar HTML'dagi `data-i18n` orqali tarjima qilinadi */
const ROLE_DESC: Record<string, Record<Lang, string>> = {
  strategy: {
    uz: "Uzoq muddatli maqsad va yo'nalishni baholaydi.",
    ru: 'Оценивает долгосрочную цель и направление.',
  },
  finance: {
    uz: 'Xarajat, daromad va qoplash nuqtasini hisoblab beradi.',
    ru: 'Считает расходы, доходы и точку окупаемости.',
  },
  legal: {
    uz: 'Shartnoma va qoidalarga mos kelishini tekshiradi.',
    ru: 'Проверяет соответствие договорам и правилам.',
  },
  ops: {
    uz: "Amalda qanday bajarilishini bosqichlarga bo'lib beradi.",
    ru: 'Разбивает исполнение на конкретные этапы.',
  },
  marketing: {
    uz: 'Mijoz va bozor nuqtai nazaridan qarab chiqadi.',
    ru: 'Смотрит со стороны клиента и рынка.',
  },
  tech: {
    uz: 'Qanday vosita va tizim bilan yechilishini aytadi.',
    ru: 'Подсказывает, какими инструментами это решается.',
  },
};

const CHAIR: Record<Lang, { name: string; desc: string }> = {
  uz: {
    name: 'Rais',
    desc: "Direktorlar fikrini solishtiradi, ziddiyatni ochiq aytadi va yakuniy tavsiyani beradi.",
  },
  ru: {
    name: 'Председатель',
    desc: 'Сравнивает мнения директоров, открыто называет противоречия и даёт итоговую рекомендацию.',
  },
};

export function initCouncil(): void {
  const nodes = $$<HTMLButtonElement>('.orbit__node');
  const roleEl = $('[data-council-role]');
  const descEl = $('[data-council-desc]');
  if (!nodes.length || !roleEl || !descEl) return;

  const showChair = () => {
    nodes.forEach((node) => node.classList.remove('is-active'));
    const chair = CHAIR[getLang()];
    roleEl.textContent = chair.name;
    descEl.textContent = chair.desc;
  };

  const showRole = (node: HTMLButtonElement) => {
    nodes.forEach((other) => other.classList.toggle('is-active', other === node));

    const key = node.dataset.role ?? '';
    const label = $('span', node)?.textContent?.trim() ?? '';
    const desc = ROLE_DESC[key]?.[getLang()] ?? node.dataset.roleDesc ?? '';

    roleEl.textContent = label;
    descEl.textContent = desc;
  };

  nodes.forEach((node) => {
    node.addEventListener('mouseenter', () => showRole(node));
    node.addEventListener('focus', () => showRole(node));
    node.addEventListener('click', () => showRole(node));
  });

  const orbit = $('[data-orbit]');
  orbit?.addEventListener('mouseleave', showChair);

  // Til almashganda holat boshlang'ichga qaytadi
  onLangChange(showChair);
}
