import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Subtitle2,
  Body1,
  Caption1,
  Label,
  Slider,
  Switch,
  ToggleButton,
  Button,
  Tooltip,
  Divider,
} from '@fluentui/react-components';
import {
  Sparkle24Filled,
  Heart24Filled,
  Star24Filled,
  Globe24Filled,
  Lightbulb24Filled,
  Rocket24Filled,
  Bot24Filled,
  Cloud24Filled,
  Trophy24Filled,
  Camera24Filled,
  Mail24Filled,
  Emoji24Filled,
  Copy20Regular,
  Checkmark20Regular,
  WeatherMoon20Regular,
} from '@fluentui/react-icons';
import type { FluentIcon } from '@fluentui/react-icons';
import { Illcon, type IllconSize } from './Illcon';
import { GRID, type IllconVariant } from './rasterize';

const ICONS: { name: string; icon: FluentIcon }[] = [
  { name: 'Sparkle', icon: Sparkle24Filled },
  { name: 'Heart', icon: Heart24Filled },
  { name: 'Star', icon: Star24Filled },
  { name: 'Globe', icon: Globe24Filled },
  { name: 'Lightbulb', icon: Lightbulb24Filled },
  { name: 'Rocket', icon: Rocket24Filled },
  { name: 'Bot', icon: Bot24Filled },
  { name: 'Cloud', icon: Cloud24Filled },
  { name: 'Trophy', icon: Trophy24Filled },
  { name: 'Camera', icon: Camera24Filled },
  { name: 'Mail', icon: Mail24Filled },
  { name: 'Emoji', icon: Emoji24Filled },
];

const SIZES: IllconSize[] = [48, 72, 96, 144, 192];

const COLORS: { name: string; value: string }[] = [
  { name: 'Foreground', value: tokens.colorNeutralForeground1 },
  { name: 'Brand', value: tokens.colorBrandForeground1 },
  { name: 'Berry', value: tokens.colorPaletteBerryForeground1 },
  { name: 'Lavender', value: tokens.colorPaletteLavenderForeground2 },
  { name: 'Teal', value: tokens.colorPaletteTealForeground2 },
  { name: 'Marigold', value: tokens.colorPaletteMarigoldForeground1 },
];

const useStyles = makeStyles({
  provider: {
    minHeight: '100%',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  page: {
    maxWidth: '1120px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('24px', '16px', '48px'),
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    columnGap: '16px',
    rowGap: '8px',
  },
  titleRow: { display: 'flex', alignItems: 'center', columnGap: '12px' },
  subtitle: { color: tokens.colorNeutralForeground3, display: 'block', marginTop: '2px' },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    rowGap: '20px',
    columnGap: '20px',
    '@media (min-width: 860px)': { gridTemplateColumns: 'minmax(0, 1fr) 340px' },
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    boxShadow: tokens.shadow4,
    ...shorthands.padding('20px'),
  },
  stage: {
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    minHeight: '360px',
    overflowX: 'auto',
    backgroundImage: `radial-gradient(${tokens.colorNeutralStroke2} 1px, transparent 1.5px)`,
    backgroundSize: '16px 16px',
  },
  stageMeta: {
    position: 'absolute',
    left: '16px',
    bottom: '12px',
    color: tokens.colorNeutralForeground3,
  },
  controls: { display: 'flex', flexDirection: 'column', rowGap: '18px' },
  field: { display: 'flex', flexDirection: 'column', rowGap: '8px' },
  fieldHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  value: { color: tokens.colorNeutralForeground3, fontVariantNumeric: 'tabular-nums' },
  row: { display: 'flex', flexWrap: 'wrap', columnGap: '6px', rowGap: '6px' },
  iconGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    columnGap: '6px',
    rowGap: '6px',
  },
  iconBtn: { minWidth: 0, height: '40px' },
  swatch: {
    width: '28px',
    height: '28px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.border('2px', 'solid', tokens.colorNeutralBackground1),
    boxShadow: `0 0 0 1px ${tokens.colorNeutralStroke1}`,
    cursor: 'pointer',
    ...shorthands.padding(0),
    ':focus-visible': { outlineStyle: 'solid', outlineWidth: '2px', outlineColor: tokens.colorStrokeFocus2 },
  },
  swatchOn: { boxShadow: `0 0 0 2px ${tokens.colorNeutralForeground1}` },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('12px'),
    ...shorthands.margin(0),
    whiteSpace: 'pre',
    overflowX: 'auto',
  },
  codeHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  family: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))',
    columnGap: '12px',
    rowGap: '12px',
    marginTop: '12px',
  },
  tile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '8px',
    ...shorthands.padding('14px', '8px', '10px'),
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border('1px', 'solid', 'transparent'),
    cursor: 'pointer',
    color: 'inherit',
    ':hover': { backgroundColor: tokens.colorNeutralBackground2Hover },
    ':focus-visible': { outlineStyle: 'solid', outlineWidth: '2px', outlineColor: tokens.colorStrokeFocus2 },
  },
  tileOn: { ...shorthands.borderColor(tokens.colorBrandStroke1) },
  tileName: { color: tokens.colorNeutralForeground2 },
});

function useSystemDark(): [boolean, (v: boolean) => void] {
  const initial = () => {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark') return true;
    if (attr === 'light') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  };
  const [dark, setDark] = React.useState(initial);
  React.useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches);
    mq?.addEventListener('change', onChange);
    return () => mq?.removeEventListener('change', onChange);
  }, []);
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, setDark];
}

function App() {
  const s = useStyles();
  const [dark, setDark] = useSystemDark();
  const [iconIdx, setIconIdx] = React.useState(0);
  const [size, setSize] = React.useState<IllconSize>(192);
  const [variant, setVariant] = React.useState<IllconVariant>('dot');
  const [dotSize, setDotSize] = React.useState(0.5);
  const [threshold, setThreshold] = React.useState(0.5);
  const [colorIdx, setColorIdx] = React.useState(0);
  const [showGrid, setShowGrid] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const current = ICONS[iconIdx];
  const color = COLORS[colorIdx].value;
  const pitch = size / GRID;

  const gridBg: React.CSSProperties = showGrid
    ? {
        backgroundImage: `linear-gradient(to right, ${tokens.colorNeutralStroke2} 1px, transparent 1px), linear-gradient(to bottom, ${tokens.colorNeutralStroke2} 1px, transparent 1px)`,
        backgroundSize: `${pitch}px ${pitch}px`,
        outline: `1px solid ${tokens.colorNeutralStroke2}`,
      }
    : {};

  const code = [
    `<Illcon`,
    `  icon={${current.name}24Filled}`,
    `  size={${size}}`,
    variant !== 'dot' ? `  variant="${variant}"` : null,
    dotSize !== 0.5 ? `  dotSize={${dotSize}}` : null,
    variant === 'dot' && threshold !== 0.5 ? `  threshold={${threshold}}` : null,
    `  aria-label="${current.name}"`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard may be blocked; the code stays selectable */
    }
  };

  return (
    <FluentProvider theme={dark ? webDarkTheme : webLightTheme} className={s.provider}>
      <div className={s.page}>
        <header className={s.header}>
          <div className={s.titleRow}>
            <Illcon icon={Sparkle24Filled} size={48} dotSize={0.75} style={{ color: tokens.colorBrandForeground1 }} />
            <div>
              <Title1 as="h1">Illcon</Title1>
              <Body1 className={s.subtitle}>Turns a filled Fluent icon into a dotted illustration. CoreAI prototype.</Body1>
            </div>
          </div>
          <Switch
            checked={dark}
            onChange={(_, d) => setDark(d.checked)}
            label={
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <WeatherMoon20Regular /> Dark
              </span>
            }
          />
        </header>

        <div className={s.layout}>
          <section className={`${s.card} ${s.stage}`} aria-label="Preview">
            <Illcon
              icon={current.icon}
              size={size}
              variant={variant}
              dotSize={dotSize}
              threshold={threshold}
              aria-label={current.name}
              style={{ color, ...gridBg }}
            />
            <Caption1 className={s.stageMeta}>
              {size}px, {GRID}×{GRID} grid, {pitch}px pitch
            </Caption1>
          </section>

          <aside className={`${s.card} ${s.controls}`} aria-label="Props">
            <div className={s.field}>
              <Label weight="semibold">icon</Label>
              <div className={s.iconGrid}>
                {ICONS.map((it, i) => (
                  <Tooltip key={it.name} content={it.name} relationship="label" withArrow>
                    <ToggleButton
                      className={s.iconBtn}
                      checked={i === iconIdx}
                      appearance={i === iconIdx ? 'primary' : 'subtle'}
                      icon={<it.icon />}
                      onClick={() => setIconIdx(i)}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className={s.field}>
              <Label weight="semibold">size</Label>
              <div className={s.row}>
                {SIZES.map((v) => (
                  <ToggleButton key={v} size="small" shape="circular" checked={v === size} onClick={() => setSize(v)}>
                    {v}
                  </ToggleButton>
                ))}
              </div>
            </div>

            <div className={s.field}>
              <Label weight="semibold">variant</Label>
              <div className={s.row}>
                {(['dot', 'dither'] as IllconVariant[]).map((v) => (
                  <ToggleButton key={v} size="small" shape="circular" checked={v === variant} onClick={() => setVariant(v)}>
                    {v}
                  </ToggleButton>
                ))}
              </div>
            </div>

            <div className={s.field}>
              <div className={s.fieldHead}>
                <Label weight="semibold" htmlFor="dotSize">dotSize</Label>
                <Caption1 className={s.value}>{dotSize.toFixed(2)}</Caption1>
              </div>
              <Slider id="dotSize" min={0.2} max={1} step={0.05} value={dotSize} onChange={(_, d) => setDotSize(d.value)} />
            </div>

            <div className={s.field}>
              <div className={s.fieldHead}>
                <Label weight="semibold" htmlFor="threshold" disabled={variant !== 'dot'}>threshold</Label>
                <Caption1 className={s.value}>{threshold.toFixed(2)}</Caption1>
              </div>
              <Slider
                id="threshold"
                min={0.05}
                max={0.95}
                step={0.05}
                value={threshold}
                disabled={variant !== 'dot'}
                onChange={(_, d) => setThreshold(d.value)}
              />
            </div>

            <div className={s.field}>
              <Label weight="semibold">color (inherits currentColor)</Label>
              <div className={s.row}>
                {COLORS.map((c, i) => (
                  <Tooltip key={c.name} content={c.name} relationship="label" withArrow>
                    <button
                      type="button"
                      aria-pressed={i === colorIdx}
                      className={`${s.swatch} ${i === colorIdx ? s.swatchOn : ''}`}
                      style={{ backgroundColor: c.value }}
                      onClick={() => setColorIdx(i)}
                    />
                  </Tooltip>
                ))}
              </div>
            </div>

            <Switch checked={showGrid} onChange={(_, d) => setShowGrid(d.checked)} label="Show pixel grid" />

            <Divider />

            <div className={s.field}>
              <div className={s.codeHead}>
                <Label weight="semibold">Usage</Label>
                <Button
                  size="small"
                  appearance="subtle"
                  icon={copied ? <Checkmark20Regular /> : <Copy20Regular />}
                  onClick={copy}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <pre className={s.code}>{code}</pre>
            </div>
          </aside>
        </div>

        <section className={s.card} aria-label="Icon family">
          <Subtitle2 as="h2">Family at 72px</Subtitle2>
          <Body1 className={s.subtitle}>Same settings, every icon. Pick one to preview it large.</Body1>
          <div className={s.family}>
            {ICONS.map((it, i) => (
              <button
                key={it.name}
                type="button"
                className={`${s.tile} ${i === iconIdx ? s.tileOn : ''}`}
                onClick={() => setIconIdx(i)}
                aria-pressed={i === iconIdx}
              >
                <Illcon
                  icon={it.icon}
                  size={72}
                  variant={variant}
                  dotSize={dotSize}
                  threshold={threshold}
                  style={{ color }}
                />
                <Caption1 className={s.tileName}>{it.name}</Caption1>
              </button>
            ))}
          </div>
        </section>
      </div>
    </FluentProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
