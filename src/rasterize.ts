/**
 * Illcon rasterizer.
 * Samples a filled vector icon onto a fixed GRID x GRID cell grid (coverage 0..1 per cell),
 * then turns that coverage into a single SVG path of dots or dithered squares.
 */

export const GRID = 24; // cells per side; matches Fluent's 24px design grid
const SS = 4; // supersamples per cell axis (16 samples per cell)

export type IllconVariant = 'dot' | 'dither';

// Coverage cache keyed by icon component identity (Fluent icons are module constants).
const coverageCache = new WeakMap<object, Float32Array>();

export function peekCoverage(key: object): Float32Array | undefined {
  return coverageCache.get(key);
}

function create2dContext(px: number) {
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(px, px).getContext('2d', { willReadFrequently: true });
  }
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px;
  return canvas.getContext('2d', { willReadFrequently: true });
}

/** Rasterize the icon's paths and return per-cell coverage. Cached per key. */
export function sampleCoverage(key: object, svg: SVGSVGElement): Float32Array {
  const cached = coverageCache.get(key);
  if (cached) return cached;

  const vb = svg.viewBox.baseVal;
  const w = vb?.width || Number(svg.getAttribute('width')) || GRID;
  const h = vb?.height || Number(svg.getAttribute('height')) || GRID;
  const vx = vb?.x ?? 0;
  const vy = vb?.y ?? 0;
  const rootRule = (svg.getAttribute('fill-rule') as CanvasFillRule | null) ?? 'nonzero';

  const px = GRID * SS;
  const ctx = create2dContext(px);
  if (!ctx) throw new Error('Illcon: 2D canvas context is unavailable.');

  // Fit the viewBox into the square canvas, centered.
  const s = px / Math.max(w, h);
  ctx.setTransform(s, 0, 0, s, (px - w * s) / 2 - vx * s, (px - h * s) / 2 - vy * s);

  svg.querySelectorAll('path').forEach((p) => {
    const d = p.getAttribute('d');
    if (!d) return;
    const rule = (p.getAttribute('fill-rule') as CanvasFillRule | null) ?? rootRule;
    ctx.fill(new Path2D(d), rule);
  });

  const { data } = ctx.getImageData(0, 0, px, px);
  const coverage = new Float32Array(GRID * GRID);
  for (let y = 0; y < px; y++) {
    const row = ((y / SS) | 0) * GRID;
    const base = y * px * 4;
    for (let x = 0; x < px; x++) {
      coverage[row + ((x / SS) | 0)] += data[base + x * 4 + 3];
    }
  }
  const norm = 1 / (255 * SS * SS);
  for (let i = 0; i < coverage.length; i++) coverage[i] *= norm;

  coverageCache.set(key, coverage);
  return coverage;
}

// 4x4 ordered-dither thresholds, centered in each bucket.
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const f = (n: number) => +n.toFixed(4);

/**
 * Build one SVG path (in grid units, viewBox 0 0 GRID GRID) from coverage.
 * pitch = rendered px per cell (an integer); mark size is snapped to whole pixels.
 */
export function buildPath(
  coverage: Float32Array,
  variant: IllconVariant,
  pitch: number,
  dotSize: number,
  threshold: number,
): string {
  // Snap the mark diameter to whole pixels, with the same parity as pitch so the inset is whole too.
  let diaPx = Math.min(pitch, Math.max(1, Math.round(pitch * dotSize)));
  if ((pitch - diaPx) % 2 !== 0) diaPx += diaPx < pitch ? 1 : -1;

  const d = diaPx / pitch;
  const r = f(d / 2);
  const inset = (1 - d) / 2;
  const dd = f(d);

  let out = '';
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const c = coverage[y * GRID + x];
      const on = variant === 'dither' ? c > BAYER4[(y & 3) * 4 + (x & 3)] : c >= threshold;
      if (!on) continue;
      if (variant === 'dot') {
        out += `M${f(x + inset)} ${f(y + 0.5)}a${r} ${r} 0 1 0 ${dd} 0a${r} ${r} 0 1 0 ${-dd} 0`;
      } else {
        out += `M${f(x + inset)} ${f(y + inset)}h${dd}v${dd}h${-dd}z`;
      }
    }
  }
  return out;
}
