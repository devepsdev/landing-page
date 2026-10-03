"use client";

import { useId, useState, type ReactNode } from "react";
import { clamp } from "./format";

// ── Utilidades ───────────────────────────────────────────────────────────────

const W = 1000; // ancho lógico de los SVG (se escalan con preserveAspectRatio="none")

const buildPath = (
  values: (number | null)[],
  height: number,
  min: number,
  max: number,
) => {
  const n = values.length;
  const pts: [number, number][] = [];
  values.forEach((v, i) => {
    if (v == null) return;
    const x = n === 1 ? W : (i / (n - 1)) * W;
    const y = height - ((clamp(v, min, max) - min) / (max - min || 1)) * height;
    pts.push([x, y]);
  });
  if (pts.length < 2) return { line: "", area: "" };
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${height} L${pts[0][0].toFixed(1)},${height} Z`;
  return { line, area };
};

// ── Sparkline ────────────────────────────────────────────────────────────────

export const Sparkline = ({
  values,
  color,
  min = 0,
  max = 100,
  height = 48,
}: {
  values: (number | null)[];
  color: string;
  min?: number;
  max?: number;
  height?: number;
}) => {
  const id = useId();
  const { line, area } = buildPath(values, height, min, max);
  if (!line) return <div style={{ height }} />;
  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ── Indicador radial ─────────────────────────────────────────────────────────

export const Gauge = ({
  pct,
  color,
  size = 96,
  stroke = 9,
  children,
}: {
  pct: number;
  color: string;
  size?: number;
  stroke?: number;
  children?: ReactNode;
}) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const arc = 0.75; // 270º
  const filled = (clamp(pct) / 100) * arc * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[135deg]" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${arc * c} ${c}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${c}`}
          style={{
            transition: "stroke-dasharray 0.8s ease, stroke 0.8s ease",
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// ── Gráfico de área interactivo (histórico) ──────────────────────────────────

export interface ChartSeries {
  label: string;
  color: string;
  values: (number | null)[];
  format: (v: number) => string;
}

export const AreaChart = ({
  series,
  times,
  min = 0,
  max = 100,
  yTicks,
  formatTick,
  height = 220,
}: {
  series: ChartSeries[];
  times: string[];
  min?: number;
  max?: number;
  yTicks: number[];
  formatTick: (v: number) => string;
  height?: number;
}) => {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const n = times.length;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setHover(n > 1 ? Math.round(clamp(x, 0, 1) * (n - 1)) : null);
  };

  const xLabels =
    n > 1 ? [0, Math.floor((n - 1) / 2), n - 1].map((i) => ({ i, t: times[i] })) : [];

  return (
    <div className="flex gap-3">
      {/* Eje Y */}
      <div className="relative w-10 text-[10px] text-gray-500 shrink-0" style={{ height }}>
        {yTicks.map((t) => (
          <span
            key={t}
            className="absolute right-0 -translate-y-1/2 tabular-nums"
            style={{ top: `${(1 - (t - min) / (max - min)) * 100}%` }}
          >
            {formatTick(t)}
          </span>
        ))}
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="relative touch-none cursor-crosshair"
          style={{ height }}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {/* Rejilla */}
          {yTicks.map((t) => (
            <div
              key={t}
              className="absolute inset-x-0 border-t border-dashed border-white/[0.07]"
              style={{ top: `${(1 - (t - min) / (max - min)) * 100}%` }}
            />
          ))}

          <svg
            viewBox={`0 0 ${W} ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              {series.map((s, i) => (
                <linearGradient key={i} id={`${id}-${i}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>
            {series.map((s, i) => {
              const { line, area } = buildPath(s.values, height, min, max);
              return (
                <g key={s.label}>
                  <path d={area} fill={`url(#${id}-${i})`} />
                  <path
                    d={line}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}
          </svg>

          {/* Cursor + tooltip */}
          {hover != null && (
            <>
              <div
                className="absolute inset-y-0 w-px bg-white/30 pointer-events-none"
                style={{ left: `${(hover / (n - 1)) * 100}%` }}
              />
              {series.map((s) => {
                const v = s.values[hover];
                if (v == null) return null;
                return (
                  <div
                    key={s.label}
                    className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-darkBg pointer-events-none"
                    style={{
                      left: `${(hover / (n - 1)) * 100}%`,
                      top: `${(1 - (clamp(v, min, max) - min) / (max - min)) * 100}%`,
                      background: s.color,
                    }}
                  />
                );
              })}
              <div
                className="absolute top-0 z-10 px-3 py-2 text-xs rounded-lg shadow-xl pointer-events-none bg-[#0b0c18]/95 border border-white/10 whitespace-nowrap"
                style={{
                  left: `${(hover / (n - 1)) * 100}%`,
                  transform: hover > (n - 1) / 2 ? "translateX(calc(-100% - 10px))" : "translateX(10px)",
                }}
              >
                <p className="mb-1 text-gray-400">
                  {new Date(times[hover]).toLocaleTimeString("es-ES")}
                </p>
                {series.map((s) => (
                  <p key={s.label} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                    <span className="text-gray-300">{s.label}</span>
                    <span className="ml-auto font-semibold tabular-nums">
                      {s.values[hover] != null ? s.format(s.values[hover] as number) : "—"}
                    </span>
                  </p>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Eje X */}
        <div className="relative h-5 mt-2 text-[10px] text-gray-500">
          {xLabels.map(({ i, t }, k) => (
            <span
              key={i}
              className="absolute tabular-nums"
              style={{
                left: `${(i / (n - 1)) * 100}%`,
                transform: k === 0 ? "none" : k === xLabels.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
              }}
            >
              {new Date(t).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Barras apiladas (tráfico por hora) ───────────────────────────────────────

export const StackedBars = ({
  items,
  colors,
  height = 120,
  format,
}: {
  items: { label: string; a: number; b: number }[];
  colors: [string, string];
  height?: number;
  format: (v: number) => string;
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...items.map((i) => i.a + i.b), 1);
  return (
    <div className="relative">
      <div className="flex items-end gap-[3px]" style={{ height }}>
        {items.map((it, i) => {
          const total = it.a + it.b;
          return (
            <div
              key={i}
              className="relative flex flex-col justify-end flex-1 h-full group"
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
            >
              <div
                className={`flex flex-col justify-end w-full overflow-hidden rounded-t transition-opacity ${hover != null && hover !== i ? "opacity-40" : ""}`}
                style={{ height: `${Math.max((total / max) * 100, 2)}%` }}
              >
                <div style={{ height: `${(it.b / (total || 1)) * 100}%`, background: colors[1] }} />
                <div style={{ height: `${(it.a / (total || 1)) * 100}%`, background: colors[0] }} />
              </div>
            </div>
          );
        })}
      </div>
      {hover != null && (
        <div
          className="absolute bottom-full mb-2 z-10 px-3 py-2 text-xs rounded-lg shadow-xl pointer-events-none bg-[#0b0c18]/95 border border-white/10 whitespace-nowrap"
          style={{
            left: `${((hover + 0.5) / items.length) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          <p className="mb-1 text-gray-400">{items[hover].label}</p>
          <p style={{ color: colors[0] }}>↓ {format(items[hover].a)}</p>
          <p style={{ color: colors[1] }}>↑ {format(items[hover].b)}</p>
        </div>
      )}
    </div>
  );
};
