/**
 * Hero dot-globe on a 2D canvas: land dots, Tashkent hub, animated great-circle arcs.
 * - Renders only while on screen (IntersectionObserver) and while the tab is visible.
 * - devicePixelRatio capped at 2.
 * - Reduced motion: a single static frame (re-rendered on resize).
 */

import { $, prefersReducedMotion, isTouch } from '../../utils/dom';
import { ARC_CITIES, HUB } from '../config';
import { isLand } from './globe-land';

const DEG = Math.PI / 180;
const DOT_STEP = 2.15; // degrees between dots
const ARC_SEGMENTS = 56;
const ARC_CYCLE = 4.2; // seconds per arc animation
const HOME = 48 * DEG; // view centre: between Europe, the Gulf and Tashkent
const SWING = 58 * DEG; // auto-rotation swings ±SWING around HOME (Tashkent stays in view)
const SWING_SPEED = 0.11; // rad/s of the swing phase
const TILT = 0.38;

interface Vec {
  x: number;
  y: number;
  z: number;
}

interface Arc {
  points: Float32Array; // world-space xyz triplets
  offset: number; // phase offset in seconds
  city: Vec;
}

function toVec(lat: number, lon: number, lift = 1): Vec {
  const la = lat * DEG;
  const lo = lon * DEG;
  return {
    x: Math.cos(la) * Math.sin(lo) * lift,
    y: Math.sin(la) * lift,
    z: Math.cos(la) * Math.cos(lo) * lift,
  };
}

function buildDots(): Float32Array {
  const values: number[] = [];
  for (let lat = -56; lat <= 80; lat += DOT_STEP) {
    const step = DOT_STEP / Math.max(Math.cos(lat * DEG), 0.2);
    for (let lon = -180; lon < 180; lon += step) {
      if (isLand(lon, lat)) {
        const v = toVec(lat, lon);
        values.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(values);
}

function buildArc(from: Vec, to: Vec): Float32Array {
  const dot = from.x * to.x + from.y * to.y + from.z * to.z;
  const omega = Math.acos(Math.min(Math.max(dot, -1), 1));
  const sinO = Math.sin(omega) || 1;
  const lift = 0.08 + (omega / Math.PI) * 0.42;
  const out = new Float32Array((ARC_SEGMENTS + 1) * 3);

  for (let i = 0; i <= ARC_SEGMENTS; i += 1) {
    const t = i / ARC_SEGMENTS;
    const a = Math.sin((1 - t) * omega) / sinO;
    const b = Math.sin(t * omega) / sinO;
    const h = 1 + Math.sin(Math.PI * t) * lift;
    out[i * 3] = (a * from.x + b * to.x) * h;
    out[i * 3 + 1] = (a * from.y + b * to.y) * h;
    out[i * 3 + 2] = (a * from.z + b * to.z) * h;
  }
  return out;
}

export function initGlobe(): void {
  const canvas = $<HTMLCanvasElement>('[data-globe]');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return;

  const reduced = prefersReducedMotion();
  const dots = buildDots();
  const hub = toVec(HUB.lat, HUB.lon);
  const arcs: Arc[] = ARC_CITIES.map((city, index) => {
    const target = toVec(city.lat, city.lon);
    return { points: buildArc(hub, target), offset: index * (ARC_CYCLE / ARC_CITIES.length) * 1.3, city: target };
  });
  const projected = new Float32Array((ARC_SEGMENTS + 1) * 3);

  let rot = HOME;
  let swingPhase = 0;
  let dragOffset = 0;
  let dragVel = 0;
  let tilt = TILT;
  let parallaxX = 0;
  let parallaxY = 0;
  let targetPX = 0;
  let targetPY = 0;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let visible = true;
  let running = false;
  let last = 0;
  let clock = 0;
  let frame = 0;

  // ---------- projection ----------
  let cosR = 1;
  let sinR = 0;
  let cosT = 1;
  let sinT = 0;
  let cx = 0;
  let cy = 0;
  let radius = 0;

  function setView(): void {
    const r = rot + parallaxX;
    const tl = tilt + parallaxY;
    cosR = Math.cos(r);
    sinR = Math.sin(r);
    cosT = Math.cos(tl);
    sinT = Math.sin(tl);
  }

  /** Writes screen x, y and depth z of a world vector into `out[i..i+2]`. */
  function project(x: number, y: number, z: number, out: Float32Array, i: number): void {
    const rx = x * cosR - z * sinR;
    const rz = z * cosR + x * sinR;
    const ty = y * cosT - rz * sinT;
    const tz = y * sinT + rz * cosT;
    out[i] = cx + rx * radius;
    out[i + 1] = cy - ty * radius;
    out[i + 2] = tz;
  }

  const tmp = new Float32Array(3);

  function resize(): void {
    const rect = canvas!.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width * dpr));
    height = Math.max(1, Math.round(rect.height * dpr));
    canvas!.width = width;
    canvas!.height = height;
    cx = width / 2;
    cy = height / 2;
    radius = Math.min(width, height) * 0.42;
    if (!running) draw(0);
  }

  // ---------- drawing ----------
  function drawSphere(): void {
    const g = ctx!.createRadialGradient(cx - radius * 0.35, cy - radius * 0.4, radius * 0.1, cx, cy, radius);
    g.addColorStop(0, 'rgba(34, 64, 120, 0.55)');
    g.addColorStop(0.7, 'rgba(12, 22, 48, 0.55)');
    g.addColorStop(1, 'rgba(8, 12, 28, 0.2)');
    ctx!.fillStyle = g;
    ctx!.beginPath();
    ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx!.fill();

    const rim = ctx!.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
    rim.addColorStop(0, 'rgba(34, 211, 238, 0.55)');
    rim.addColorStop(0.5, 'rgba(107, 124, 240, 0.12)');
    rim.addColorStop(1, 'rgba(107, 124, 240, 0.45)');
    ctx!.strokeStyle = rim;
    ctx!.lineWidth = 1.2 * dpr;
    ctx!.stroke();
  }

  function drawDots(): void {
    const size = Math.max(1.1, radius * 0.0068);
    const buckets: [number, string][] = [
      [-1, 'rgba(120, 150, 220, 0.07)'],
      [0, 'rgba(150, 180, 240, 0.32)'],
      [0.35, 'rgba(170, 200, 250, 0.58)'],
      [0.7, 'rgba(200, 225, 255, 0.92)'],
    ];

    for (let b = 0; b < buckets.length; b += 1) {
      const min = buckets[b][0];
      const max = b + 1 < buckets.length ? buckets[b + 1][0] : 2;
      ctx!.fillStyle = buckets[b][1];
      ctx!.beginPath();
      for (let i = 0; i < dots.length; i += 3) {
        project(dots[i], dots[i + 1], dots[i + 2], tmp, 0);
        const z = tmp[2];
        if (z < min || z >= max) continue;
        const s = z > 0 ? size * (0.7 + 0.45 * z) : size * 0.7;
        ctx!.rect(tmp[0] - s / 2, tmp[1] - s / 2, s, s);
      }
      ctx!.fill();
    }
  }

  function isVisible(x: number, y: number, z: number): boolean {
    if (z > 0) return true;
    const dx = (x - cx) / radius;
    const dy = (y - cy) / radius;
    return dx * dx + dy * dy > 1;
  }

  function drawArc(arc: Arc, time: number): void {
    const pts = arc.points;
    for (let i = 0; i < pts.length; i += 3) project(pts[i], pts[i + 1], pts[i + 2], projected, i);

    // faint full route
    ctx!.lineWidth = 1 * dpr;
    ctx!.strokeStyle = 'rgba(107, 124, 240, 0.22)';
    strokeRange(0, ARC_SEGMENTS);

    // animated comet
    const phase = reduced ? 1.15 : ((time + arc.offset) % ARC_CYCLE) / ARC_CYCLE * 1.6;
    const head = Math.min(phase, 1);
    const tail = reduced ? 0 : Math.max(0, phase - 0.45);
    if (head > tail) {
      const from = Math.floor(tail * ARC_SEGMENTS);
      const to = Math.ceil(head * ARC_SEGMENTS);
      ctx!.lineCap = 'round';
      ctx!.lineWidth = 4 * dpr;
      ctx!.strokeStyle = 'rgba(34, 211, 238, 0.14)';
      strokeRange(from, to);
      ctx!.lineWidth = 1.6 * dpr;
      ctx!.strokeStyle = 'rgba(125, 235, 255, 0.95)';
      strokeRange(from, to);

      if (head < 1 && !reduced) {
        const hi = Math.min(to, ARC_SEGMENTS) * 3;
        if (isVisible(projected[hi], projected[hi + 1], projected[hi + 2])) {
          ctx!.fillStyle = '#e6fbff';
          ctx!.beginPath();
          ctx!.arc(projected[hi], projected[hi + 1], 2.4 * dpr, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    // destination marker + landing ripple
    project(arc.city.x, arc.city.y, arc.city.z, tmp, 0);
    if (tmp[2] > 0) {
      ctx!.fillStyle = 'rgba(107, 124, 240, 0.95)';
      ctx!.beginPath();
      ctx!.arc(tmp[0], tmp[1], 2.6 * dpr, 0, Math.PI * 2);
      ctx!.fill();
      if (!reduced && phase >= 1 && phase < 1.45) {
        const k = (phase - 1) / 0.45;
        ctx!.strokeStyle = `rgba(107, 124, 240, ${0.7 * (1 - k)})`;
        ctx!.lineWidth = 1.2 * dpr;
        ctx!.beginPath();
        ctx!.arc(tmp[0], tmp[1], (3 + k * 14) * dpr, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }
  }

  function strokeRange(from: number, to: number): void {
    ctx!.beginPath();
    let pen = false;
    for (let s = from; s <= to && s <= ARC_SEGMENTS; s += 1) {
      const i = s * 3;
      if (!isVisible(projected[i], projected[i + 1], projected[i + 2])) {
        pen = false;
        continue;
      }
      if (pen) ctx!.lineTo(projected[i], projected[i + 1]);
      else ctx!.moveTo(projected[i], projected[i + 1]);
      pen = true;
    }
    ctx!.stroke();
  }

  function drawHub(time: number): void {
    project(hub.x, hub.y, hub.z, tmp, 0);
    if (tmp[2] <= 0) return;
    const [x, y] = [tmp[0], tmp[1]];

    const glow = ctx!.createRadialGradient(x, y, 0, x, y, 22 * dpr);
    glow.addColorStop(0, 'rgba(34, 211, 238, 0.55)');
    glow.addColorStop(1, 'rgba(34, 211, 238, 0)');
    ctx!.fillStyle = glow;
    ctx!.beginPath();
    ctx!.arc(x, y, 22 * dpr, 0, Math.PI * 2);
    ctx!.fill();

    if (!reduced) {
      for (let r = 0; r < 2; r += 1) {
        const k = ((time * 0.6 + r * 0.5) % 1 + 1) % 1;
        ctx!.strokeStyle = `rgba(34, 211, 238, ${0.65 * (1 - k)})`;
        ctx!.lineWidth = 1.4 * dpr;
        ctx!.beginPath();
        ctx!.arc(x, y, (4 + k * 26) * dpr, 0, Math.PI * 2);
        ctx!.stroke();
      }
    }

    ctx!.fillStyle = '#22d3ee';
    ctx!.beginPath();
    ctx!.arc(x, y, 4 * dpr, 0, Math.PI * 2);
    ctx!.fill();
    ctx!.fillStyle = '#ffffff';
    ctx!.beginPath();
    ctx!.arc(x, y, 1.6 * dpr, 0, Math.PI * 2);
    ctx!.fill();
  }

  function draw(time: number): void {
    setView();
    ctx!.clearRect(0, 0, width, height);
    drawSphere();
    drawDots();
    for (const arc of arcs) drawArc(arc, time);
    drawHub(time);
  }

  // ---------- loop ----------
  function tick(now: number): void {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    clock += dt;

    swingPhase += dt * SWING_SPEED;
    if (!dragging) {
      dragOffset += dragVel * dt;
      dragVel *= Math.max(0, 1 - dt * 2.5);
      dragOffset *= Math.max(0, 1 - dt * 0.25);
    }
    rot = HOME - Math.sin(swingPhase) * SWING + dragOffset;
    parallaxX += (targetPX - parallaxX) * Math.min(1, dt * 3);
    parallaxY += (targetPY - parallaxY) * Math.min(1, dt * 3);
    tilt = TILT;

    draw(clock);
    frame = requestAnimationFrame(tick);
  }

  function updateRunning(): void {
    const shouldRun = !reduced && visible && !document.hidden;
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(frame);
    }
  }

  // ---------- interaction ----------
  let dragging = false;
  let lastX = 0;
  let lastT = 0;

  if (!reduced) {
    canvas.addEventListener('pointerdown', (event) => {
      dragging = true;
      lastX = event.clientX;
      lastT = performance.now();
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = event.clientX - lastX;
      const dt = Math.max((now - lastT) / 1000, 0.008);
      const delta = (dx / Math.max(radius / dpr, 1)) * 1.2;
      dragOffset -= delta;
      dragVel = -delta / dt;
      lastX = event.clientX;
      lastT = now;
    });
    const stop = (): void => {
      dragging = false;
    };
    canvas.addEventListener('pointerup', stop);
    canvas.addEventListener('pointercancel', stop);

    if (!isTouch()) {
      const hero = canvas.closest('section');
      hero?.addEventListener('pointermove', (event) => {
        targetPX = (event.clientX / window.innerWidth - 0.5) * -0.35;
        targetPY = (event.clientY / window.innerHeight - 0.5) * 0.18;
      });
    }
  }

  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      updateRunning();
    },
    { rootMargin: '80px' },
  ).observe(canvas);
  document.addEventListener('visibilitychange', updateRunning);

  resize();
  updateRunning();
}
