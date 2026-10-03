export const clamp = (v: number, min = 0, max = 100) =>
  Math.min(Math.max(v, min), max);

/** Verde < 60 %, ámbar < 80 %, rojo a partir de ahí. */
export const levelColor = (pct: number) => {
  if (pct < 60) return "#34d399";
  if (pct < 80) return "#fbbf24";
  return "#f87171";
};

export const tempColor = (c: number) => {
  if (c < 55) return "#34d399";
  if (c < 70) return "#fbbf24";
  return "#f87171";
};

const UNITS = ["B", "KB", "MB", "GB", "TB"];

export const formatBytes = (bytes: number | null | undefined, decimals = 1) => {
  if (bytes == null || !isFinite(bytes)) return "—";
  let v = bytes;
  let i = 0;
  while (v >= 1024 && i < UNITS.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(i === 0 ? 0 : decimals)} ${UNITS[i]}`;
};

export const formatRate = (bps: number | null | undefined) =>
  bps == null ? "—" : `${formatBytes(bps)}/s`;

export const formatGb = (mb: number) => `${(mb / 1024).toFixed(1)} GB`;

const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

/** "hace 3 h", "en 20 min"… */
export const relativeTime = (iso: string | null | undefined, now = Date.now()) => {
  if (!iso) return "—";
  const diff = (new Date(iso).getTime() - now) / 1000;
  const abs = Math.abs(diff);
  if (abs < 60) return rtf.format(Math.round(diff), "second");
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  return rtf.format(Math.round(diff / 86400), "day");
};

/** 101649 -> "1d 4h 14m 9s" */
export const formatDuration = (seconds: number, withSeconds = false) => {
  const s = Math.max(Math.floor(seconds), 0);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const parts = [];
  if (d) parts.push(`${d}d`);
  if (d || h) parts.push(`${h}h`);
  parts.push(`${m}m`);
  if (withSeconds) parts.push(`${String(s % 60).padStart(2, "0")}s`);
  return parts.join(" ");
};

export const durationSince = (iso: string | null | undefined, now = Date.now()) =>
  iso ? formatDuration((now - new Date(iso).getTime()) / 1000) : "—";

export const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

export const formatDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

export const formatLoadAvg = (la: Record<string, number> | number[]) =>
  (Array.isArray(la) ? la : Object.values(la)).map((v) => Number(v).toFixed(2));
