/**
 * "Software factory" flow: an SVG path through every step's node, drawn on scroll;
 * nodes light up as the line reaches them. Also drives the 14-day timeline rail.
 */

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { $, $$, prefersReducedMotion } from '../../utils/dom';

function buildPath(flow: HTMLElement, nodes: HTMLElement[]): string {
  const box = flow.getBoundingClientRect();
  const points = nodes.map((node) => {
    const r = node.getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  });
  if (!points.length) return '';

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const my = (b.y - a.y) / 2;
    d += ` C ${a.x.toFixed(1)} ${(a.y + my).toFixed(1)}, ${b.x.toFixed(1)} ${(b.y - my).toFixed(1)}, ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}

function initFactoryFlow(): void {
  const flow = $('[data-factory]');
  const svg = $<SVGSVGElement>('.factory__svg', flow ?? document);
  const path = $<SVGPathElement>('[data-factory-path]');
  const trackPath = $<SVGPathElement>('[data-factory-track]');
  if (!flow || !svg || !path || !trackPath) return;
  const nodes = $$('[data-factory-node]', flow);
  const steps = $$('.factory__step', flow);
  const reduced = prefersReducedMotion();
  let length = 0;
  let progress = reduced ? 1 : 0;

  function paint(): void {
    path!.style.strokeDashoffset = String(length * (1 - progress));
  }

  function layout(): void {
    const { width, height } = flow!.getBoundingClientRect();
    svg!.setAttribute('viewBox', `0 0 ${width.toFixed(0)} ${height.toFixed(0)}`);
    svg!.setAttribute('width', width.toFixed(0));
    svg!.setAttribute('height', height.toFixed(0));
    $('[data-factory-grad]', svg!)?.setAttribute('y2', height.toFixed(0));
    const d = buildPath(flow!, nodes);
    path!.setAttribute('d', d);
    trackPath!.setAttribute('d', d);
    length = path!.getTotalLength();
    path!.style.strokeDasharray = String(length);
    paint();
  }

  layout();
  new ResizeObserver(() => layout()).observe(flow);

  if (reduced) {
    steps.forEach((step) => step.classList.add('is-lit'));
    return;
  }

  ScrollTrigger.create({
    trigger: flow,
    start: 'top 65%',
    end: 'bottom 65%',
    scrub: true,
    onUpdate: (self) => {
      progress = self.progress;
      paint();
    },
  });

  steps.forEach((step) => {
    const node = $('[data-factory-node]', step) ?? step;
    ScrollTrigger.create({
      trigger: node,
      start: 'center 65%',
      end: 'max',
      onEnter: () => step.classList.add('is-lit'),
      onLeaveBack: () => step.classList.remove('is-lit'),
    });
  });
}

function initTimeline(): void {
  const root = $('[data-timeline]');
  const fill = $('[data-timeline-fill]');
  if (!root || !fill) return;
  const steps = $$('.timeline__step', root);

  if (prefersReducedMotion()) {
    root.style.setProperty('--p', '1');
    steps.forEach((step) => step.classList.add('is-lit'));
    return;
  }

  ScrollTrigger.create({
    trigger: root,
    start: 'top 70%',
    end: 'bottom 55%',
    scrub: 0.5,
    onUpdate: (self) => {
      root.style.setProperty('--p', self.progress.toFixed(4));
      steps.forEach((step, index) => {
        step.classList.toggle('is-lit', self.progress >= index / steps.length - 0.001);
      });
    },
  });
}

export function initFactory(): void {
  initFactoryFlow();
  initTimeline();
}
