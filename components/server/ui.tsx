import type { ReactNode } from "react";

export type Tone = "ok" | "warn" | "error" | "muted";

const TONE_DOT: Record<Tone, string> = {
  ok: "bg-emerald-400",
  warn: "bg-amber-400",
  error: "bg-rose-500",
  muted: "bg-gray-500",
};

const TONE_PILL: Record<Tone, string> = {
  ok: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  warn: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
  error: "bg-rose-500/10 text-rose-300 ring-rose-500/25",
  muted: "bg-white/5 text-gray-400 ring-white/10",
};

export const StatusDot = ({ tone, pulse = false }: { tone: Tone; pulse?: boolean }) => (
  <span className="relative inline-flex w-2.5 h-2.5 shrink-0">
    {pulse && (
      <span
        className={`absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping ${TONE_DOT[tone]}`}
      />
    )}
    <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${TONE_DOT[tone]}`} />
  </span>
);

export const Pill = ({ tone, children }: { tone: Tone; children: ReactNode }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap rounded-full ring-1 ring-inset ${TONE_PILL[tone]}`}
  >
    {children}
  </span>
);

export const Card = ({
  title,
  icon,
  action,
  children,
  className = "",
}: {
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={`relative overflow-hidden p-5 rounded-2xl bg-darkBg/80 backdrop-blur-sm border border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.25)] ${className}`}
  >
    {title && (
      <header className="flex items-center justify-between gap-3 mb-4">
        <h2 className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-gray-400">
          {icon && <span className="text-secondary">{icon}</span>}
          {title}
        </h2>
        {action}
      </header>
    )}
    {children}
  </section>
);

export const Stat = ({ label, value, className = "" }: { label: string; value: ReactNode; className?: string }) => (
  <div className={className}>
    <p className="text-[11px] text-gray-500">{label}</p>
    <p className="text-sm font-semibold tabular-nums">{value}</p>
  </div>
);

export const Meter = ({ pct, color }: { pct: number; color: string }) => (
  <div className="w-full h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
    <div
      className="h-full rounded-full"
      style={{
        width: `${Math.min(Math.max(pct, 0), 100)}%`,
        background: color,
        transition: "width 0.8s ease",
      }}
    />
  </div>
);

export const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-lg animate-pulse bg-white/[0.06] ${className}`} />
);
