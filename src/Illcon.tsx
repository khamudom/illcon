import * as React from 'react';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import type { FluentIcon } from '@fluentui/react-icons';
import { GRID, buildPath, peekCoverage, sampleCoverage, type IllconVariant } from './rasterize';

/** Multiples of the 24-cell grid, so every dot lands on whole pixels (pitch 2/3/4/6/8px). */
export type IllconSize = 48 | 72 | 96 | 144 | 192;

export interface IllconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Filled Fluent icon. *24Filled variants map 1:1 to the grid. */
  icon: FluentIcon;
  /** Rendered size in px. Default 96. */
  size?: IllconSize;
  /** 'dot' = halftone dots, 'dither' = ordered-dither squares. Default 'dot'. */
  variant?: IllconVariant;
  /** Mark diameter as a fraction of the cell (0–1), snapped to whole px. Default 0.5. */
  dotSize?: number;
  /** Coverage needed to draw a dot (0–1). Used by 'dot'. Default 0.5. */
  threshold?: number;
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    flexShrink: 0,
    color: tokens.colorNeutralForeground1,
  },
  svg: { display: 'block' },
});

export const Illcon = React.forwardRef<HTMLSpanElement, IllconProps>(function Illcon(
  {
    icon: Icon,
    size = 96,
    variant = 'dot',
    dotSize = 0.5,
    threshold = 0.5,
    className,
    style,
    'aria-label': ariaLabel,
    ...rest
  },
  ref,
) {
  const styles = useStyles();
  const sourceRef = React.useRef<HTMLSpanElement>(null);
  const [, rerender] = React.useReducer((n: number) => n + 1, 0);

  // Coverage comes from the module cache, so it can never go stale when `icon` changes.
  const coverage = peekCoverage(Icon);

  // First use of an icon: read its paths from the hidden source and sample once (before paint).
  useIsoLayoutEffect(() => {
    if (coverage) return;
    const svg = sourceRef.current?.querySelector('svg');
    if (svg) {
      sampleCoverage(Icon, svg);
      rerender();
    }
  }, [Icon, coverage]);

  const pitch = size / GRID;
  const d = React.useMemo(
    () => (coverage ? buildPath(coverage, variant, pitch, dotSize, threshold) : ''),
    [coverage, variant, pitch, dotSize, threshold],
  );

  const labelled = Boolean(ariaLabel);

  return (
    <span
      ref={ref}
      role={labelled ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={labelled ? undefined : true}
      className={mergeClasses(styles.root, className)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      {coverage ? (
        <svg
          className={styles.svg}
          width={size}
          height={size}
          viewBox={`0 0 ${GRID} ${GRID}`}
          shapeRendering={variant === 'dither' ? 'crispEdges' : undefined}
          focusable="false"
        >
          <path d={d} fill="currentColor" />
        </svg>
      ) : (
        // Rendered only until the icon is sampled; never visible.
        <span ref={sourceRef} hidden>
          <Icon />
        </span>
      )}
    </span>
  );
});

/*
Usage:

import { Sparkle24Filled } from '@fluentui/react-icons';

<Illcon icon={Sparkle24Filled} size={192} aria-label="Copilot" />
<Illcon icon={Sparkle24Filled} size={96} variant="dither" />
*/
