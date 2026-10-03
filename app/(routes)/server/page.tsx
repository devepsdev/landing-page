"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Box,
  CalendarClock,
  Cpu,
  ExternalLink,
  HardDrive,
  Layers,
  MemoryStick,
  Network,
  Server,
  ShieldCheck,
  Thermometer,
} from "lucide-react";

import ContainerPage from "@/components/container-page";
import TransitionPage from "@/components/transition-page";
import { AreaChart, Gauge, Sparkline, StackedBars, type ChartSeries } from "@/components/server/charts";
import {
  clamp,
  durationSince,
  formatBytes,
  formatClock,
  formatDate,
  formatDuration,
  formatGb,
  formatLoadAvg,
  formatRate,
  levelColor,
  relativeTime,
  tempColor,
} from "@/components/server/format";
import type { HistoryPoint, ServiceData, SystemStatus } from "@/components/server/types";
import { Card, Meter, Pill, Skeleton, Stat, StatusDot, type Tone } from "@/components/server/ui";

const API_URL = process.env.NEXT_PUBLIC_MONITOR_URL ?? "/api/system-status";
const REFRESH_MS = 10_000;

const ACCENT = "#f5741c"; // secondary
const CYAN = "#22d3ee";
const VIOLET = "#a78bfa";

type FetchState = "loading" | "ok" | "stale" | "offline";
type ChartKey = "cpu" | "ram" | "temp" | "net";

const CATEGORY_LABEL: Record<NonNullable<ServiceData["category"]>, string> = {
  infra: "Infraestructura",
  app: "Aplicaciones",
  ci: "CI/CD",
};

// ── Página ───────────────────────────────────────────────────────────────────

const ServerPage = () => {
  const [data, setData] = useState<SystemStatus | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>("loading");
  const [receivedAt, setReceivedAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [chart, setChart] = useState<ChartKey>("cpu");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setData(await res.json());
      setReceivedAt(Date.now());
      setFetchState("ok");
    } catch {
      setFetchState((prev) => (prev === "loading" || prev === "offline" ? "offline" : "stale"));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const poll = setInterval(fetchData, REFRESH_MS);
    const tick = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      clearInterval(poll);
      clearInterval(tick);
    };
  }, [fetchData]);

  const points: HistoryPoint[] = useMemo(() => data?.history?.points ?? [], [data]);

  // Incidencias para el estado global
  const issues = useMemo(() => {
    if (!data) return [];
    const list: string[] = [];
    data.services.filter((s) => !s.active).forEach((s) => list.push(s.name));
    data.projects.filter((p) => !p.active || p.check?.ok === false).forEach((p) => list.push(p.name));
    data.docker.filter((c) => !c.error && c.state !== "running").forEach((c) => list.push(c.name));
    if (data.ssl.days_remaining != null && data.ssl.days_remaining < 14) list.push("Certificado SSL");
    return Array.from(new Set(list));
  }, [data]);

  return (
    <ContainerPage>
      <TransitionPage />

      <div className="relative z-10 space-y-5">
        <Hero data={data} fetchState={fetchState} issues={issues} receivedAt={receivedAt} now={now} />

        {fetchState === "offline" && (
          <div className="p-4 text-sm text-center rounded-2xl bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/20">
            No se puede conectar con el servidor. Reintentando cada {REFRESH_MS / 1000} s…
          </div>
        )}

        {!data && fetchState !== "offline" && <LoadingGrid />}

        {data && (
          <>
            <KpiRow data={data} points={points} />

            <div className="grid gap-5 lg:grid-cols-3">
              <HistoryCard points={points} chart={chart} setChart={setChart} className="lg:col-span-2" />
              <CoresCard data={data} />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <NetworkCard data={data} className="lg:col-span-2" />
              <SslCard data={data} now={now} />
            </div>

            <ProjectsCard data={data} />

            <div className="grid gap-5 lg:grid-cols-3">
              <ServicesCard data={data} now={now} className="lg:col-span-2" />
              <div className="space-y-5">
                <DockerCard data={data} now={now} />
                <TimersCard data={data} now={now} />
              </div>
            </div>

            <SystemCard data={data} receivedAt={receivedAt} now={now} />

            <p className="text-xs text-center text-gray-500">
              Datos reales servidos por una API propia (Python · FastAPI · psutil) desde la Orange Pi ·
              se actualiza cada {REFRESH_MS / 1000} s
              {data.generated_in_ms != null && ` · respuesta generada en ${data.generated_in_ms} ms`}
            </p>
          </>
        )}
      </div>
    </ContainerPage>
  );
};

export default ServerPage;

// ── Cabecera ─────────────────────────────────────────────────────────────────

const Hero = ({
  data,
  fetchState,
  issues,
  receivedAt,
  now,
}: {
  data: SystemStatus | null;
  fetchState: FetchState;
  issues: string[];
  receivedAt: number;
  now: number;
}) => {
  let tone: Tone = "muted";
  let label = "Conectando…";
  if (fetchState === "offline") {
    tone = "error";
    label = "Sin conexión con el servidor";
  } else if (data) {
    tone = issues.length ? "warn" : "ok";
    label = issues.length
      ? `${issues.length} ${issues.length === 1 ? "incidencia" : "incidencias"}: ${issues.slice(0, 3).join(", ")}`
      : "Todos los sistemas operativos";
  }
  const ago = receivedAt ? Math.max(0, Math.round((now - receivedAt) / 1000)) : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#1b1830] via-darkBg to-[#2a1a2e] p-6 md:p-8">
      <div className="absolute rounded-full pointer-events-none -top-24 -right-16 w-72 h-72 bg-secondary/20 blur-3xl" />
      <div className="absolute rounded-full pointer-events-none -bottom-28 -left-10 w-72 h-72 bg-violet-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Pill tone={fetchState === "offline" ? "error" : "ok"}>
              <StatusDot tone={fetchState === "offline" ? "error" : "ok"} pulse={fetchState === "ok"} />
              En directo
            </Pill>
            {data && (
              <Pill tone="muted">
                <Server className="w-3 h-3" /> {data.system.board} · {data.cpu.model ?? `${data.cpu.cores} núcleos`}
              </Pill>
            )}
          </div>
          <h1 className="text-3xl leading-tight md:text-5xl">
            Monitor del <span className="font-bold text-secondary">servidor</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-300 md:text-base">
            Esta web y mis proyectos se ejecutan en una Orange Pi 5 que tengo en casa, en Barcelona.
            Aquí puedes ver su estado real: rendimiento, servicios, contenedores y tráfico.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:items-end shrink-0">
          <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium ring-1 ${
              tone === "ok"
                ? "bg-emerald-400/10 text-emerald-200 ring-emerald-400/20"
                : tone === "warn"
                  ? "bg-amber-400/10 text-amber-200 ring-amber-400/20"
                  : tone === "error"
                    ? "bg-rose-500/10 text-rose-200 ring-rose-500/20"
                    : "bg-white/5 text-gray-300 ring-white/10"
            }`}
          >
            <StatusDot tone={tone} pulse={tone === "ok"} />
            <span className="max-w-xs truncate">{label}</span>
          </div>
          <p className="text-xs text-gray-500 tabular-nums">
            {fetchState === "stale" && "Fallo al actualizar · "}
            {ago != null ? (ago < 2 ? "Actualizado ahora mismo" : `Actualizado hace ${ago} s`) : " "}
            {data?.system.uptime_seconds != null &&
              ` · encendido desde hace ${formatDuration(data.system.uptime_seconds + (now - receivedAt) / 1000)}`}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── KPIs ─────────────────────────────────────────────────────────────────────

const KpiCard = ({
  icon,
  label,
  value,
  unit,
  pct,
  color,
  detail,
  spark,
  sparkMin = 0,
  sparkMax = 100,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  pct: number;
  color: string;
  detail: React.ReactNode;
  spark?: (number | null)[];
  sparkMin?: number;
  sparkMax?: number;
}) => (
  <Card className="!p-0 flex flex-col">
    <div className="flex items-center gap-4 p-5 pb-2">
      <Gauge pct={pct} color={color} size={84} stroke={8}>
        <span style={{ color }}>{icon}</span>
      </Gauge>
      <div className="min-w-0">
        <p className="text-xs tracking-[0.18em] uppercase text-gray-400">{label}</p>
        <p className="text-3xl font-bold tabular-nums leading-tight">
          {value}
          <span className="ml-0.5 text-base font-medium text-gray-400">{unit}</span>
        </p>
        <div className="text-xs text-gray-400 truncate">{detail}</div>
      </div>
    </div>
    <div className="mt-auto opacity-90">
      {spark && spark.length > 1 ? (
        <Sparkline values={spark} color={color} min={sparkMin} max={sparkMax} height={44} />
      ) : (
        <div className="h-11" />
      )}
    </div>
  </Card>
);

const KpiRow = ({ data, points }: { data: SystemStatus; points: HistoryPoint[] }) => {
  const { cpu, memory } = data;
  const disk = data.disks.find((d) => d.mountpoint === "/") ?? data.disks[0];
  const temp = cpu.temperature ?? 0;
  const maxTemp = cpu.temperatures ? Math.max(...Object.values(cpu.temperatures)) : temp;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        icon={<Cpu className="w-6 h-6" />}
        label="CPU"
        value={cpu.usage_percent.toFixed(1)}
        unit="%"
        pct={cpu.usage_percent}
        color={ACCENT}
        detail={<>Carga {formatLoadAvg(cpu.load_avg)[0]} · {cpu.cores_logical ?? cpu.cores} núcleos</>}
        spark={points.map((p) => p.cpu)}
        sparkMax={Math.max(25, ...points.map((p) => p.cpu))}
      />
      <KpiCard
        icon={<MemoryStick className="w-6 h-6" />}
        label="Memoria"
        value={memory.ram_percent.toFixed(0)}
        unit="%"
        pct={memory.ram_percent}
        color={VIOLET}
        detail={<>{formatGb(memory.ram_used_mb)} de {formatGb(memory.ram_total_mb)}</>}
        spark={points.map((p) => p.ram)}
      />
      <KpiCard
        icon={<Thermometer className="w-6 h-6" />}
        label="Temperatura"
        value={temp.toFixed(1)}
        unit="°C"
        pct={clamp(((temp - 20) / (85 - 20)) * 100)}
        color={tempColor(temp)}
        detail={<>Máx. sensores {maxTemp.toFixed(1)} °C · límite 85 °C</>}
        spark={points.map((p) => p.temp)}
        sparkMin={20}
        sparkMax={Math.max(60, ...points.map((p) => p.temp ?? 0))}
      />
      {disk && (
        <KpiCard
          icon={<HardDrive className="w-6 h-6" />}
          label="Disco NVMe"
          value={disk.percent.toFixed(0)}
          unit="%"
          pct={disk.percent}
          color={levelColor(disk.percent)}
          detail={<>{disk.used_gb.toFixed(0)} GB de {disk.total_gb.toFixed(0)} GB · libres {(disk.total_gb - disk.used_gb).toFixed(0)} GB</>}
        />
      )}
    </div>
  );
};

// ── Histórico ────────────────────────────────────────────────────────────────

const HistoryCard = ({
  points,
  chart,
  setChart,
  className = "",
}: {
  points: HistoryPoint[];
  chart: ChartKey;
  setChart: (k: ChartKey) => void;
  className?: string;
}) => {
  const times = points.map((p) => p.t);
  const pct = (v: number) => `${v.toFixed(1)} %`;

  let series: ChartSeries[] = [];
  let max = 100;
  let min = 0;
  let ticks = [0, 25, 50, 75, 100];
  let formatTick = (v: number) => `${v}%`;

  if (chart === "cpu") {
    max = Math.max(20, Math.ceil(Math.max(...points.map((p) => p.cpu), 0) / 10) * 10 + 10);
    ticks = [0, max / 4, max / 2, (3 * max) / 4, max].map((t) => Math.round(t));
    series = [{ label: "CPU", color: ACCENT, values: points.map((p) => p.cpu), format: pct }];
  } else if (chart === "ram") {
    series = [{ label: "RAM", color: VIOLET, values: points.map((p) => p.ram), format: pct }];
  } else if (chart === "temp") {
    min = 20;
    max = Math.max(60, Math.ceil(Math.max(...points.map((p) => p.temp ?? 0)) / 10) * 10 + 10);
    ticks = [20, 30, 40, 50, 60, 70, 80].filter((t) => t <= max);
    formatTick = (v) => `${v}°`;
    series = [
      { label: "SoC", color: "#fb7185", values: points.map((p) => p.temp), format: (v) => `${v.toFixed(1)} °C` },
    ];
  } else {
    const peak = Math.max(...points.flatMap((p) => [p.rx_bps ?? 0, p.tx_bps ?? 0]), 1024);
    max = peak * 1.15;
    ticks = [0, max / 2, max];
    formatTick = (v) => formatBytes(v, 0);
    series = [
      { label: "Bajada", color: ACCENT, values: points.map((p) => p.rx_bps), format: (v) => formatRate(v) },
      { label: "Subida", color: CYAN, values: points.map((p) => p.tx_bps), format: (v) => formatRate(v) },
    ];
  }

  const tabs: { key: ChartKey; label: string }[] = [
    { key: "cpu", label: "CPU" },
    { key: "ram", label: "RAM" },
    { key: "temp", label: "Temp." },
    { key: "net", label: "Red" },
  ];

  const minutes = points.length > 1
    ? Math.round((new Date(times[times.length - 1]).getTime() - new Date(times[0]).getTime()) / 60000)
    : 0;

  return (
    <Card
      title={minutes >= 55 ? "Última hora" : `Últimos ${minutes || "pocos"} minutos`}
      icon={<Activity className="w-4 h-4" />}
      className={className}
      action={
        <div className="flex p-0.5 rounded-lg bg-white/5" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={chart === t.key}
              onClick={() => setChart(t.key)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                chart === t.key ? "bg-secondary text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      }
    >
      {points.length > 1 ? (
        <AreaChart series={series} times={times} min={min} max={max} yTicks={ticks} formatTick={formatTick} />
      ) : (
        <div className="flex items-center justify-center h-[244px] text-sm text-gray-500">
          Recopilando datos… el histórico se rellena cada 10 s.
        </div>
      )}
    </Card>
  );
};

// ── Núcleos ──────────────────────────────────────────────────────────────────

const CoresCard = ({ data }: { data: SystemStatus }) => {
  const cores = data.cpu.per_core ?? [];
  const groups = [
    { model: "Cortex-A76", label: "Rendimiento" },
    { model: "Cortex-A55", label: "Eficiencia" },
  ]
    .map((g) => ({ ...g, cores: cores.filter((c) => c.model === g.model) }))
    .filter((g) => g.cores.length);

  return (
    <Card title="Núcleos" icon={<Cpu className="w-4 h-4" />}>
      {groups.length === 0 ? (
        <p className="text-sm text-gray-500">Sin datos por núcleo.</p>
      ) : (
        <div className="space-y-5">
          {groups.map((g) => (
            <div key={g.model}>
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-sm font-semibold">{g.label}</p>
                <p className="text-xs text-gray-500">
                  {g.cores.length}× {g.model} · hasta {((g.cores[0].max_freq_mhz ?? 0) / 1000).toFixed(2)} GHz
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {g.cores.map((c) => {
                  const u = c.usage_percent ?? 0;
                  return (
                    <div key={c.id} className="flex flex-col items-center gap-1.5">
                      <div className="relative w-full h-20 overflow-hidden rounded-lg bg-white/[0.05]">
                        <div
                          className="absolute inset-x-0 bottom-0 rounded-lg"
                          style={{
                            height: `${Math.max(u, 2)}%`,
                            background: `linear-gradient(to top, ${ACCENT}, ${ACCENT}99)`,
                            transition: "height 0.8s ease",
                          }}
                        />
                        <span className="absolute inset-x-0 text-xs font-semibold text-center top-1.5 tabular-nums">
                          {u.toFixed(0)}%
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-500 tabular-nums">
                        {c.freq_mhz != null ? `${(c.freq_mhz / 1000).toFixed(1)} GHz` : `#${c.id}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
            {(["1m", "5m", "15m"] as const).map((k, i) => (
              <Stat key={k} label={`Carga ${k}`} value={formatLoadAvg(data.cpu.load_avg)[i] ?? "—"} className="pt-3" />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

// ── Red ──────────────────────────────────────────────────────────────────────

const NetworkCard = ({ data, className = "" }: { data: SystemStatus; className?: string }) => {
  const net = data.network;
  const hours = net?.hours ?? [];
  return (
    <Card
      title="Red"
      icon={<Network className="w-4 h-4" />}
      className={className}
      action={net?.interface && <span className="font-mono text-xs text-gray-500">{net.interface}</span>}
    >
      {!net || net.error ? (
        <p className="text-sm text-gray-500">Datos de red no disponibles.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.04]">
                <p className="flex items-center gap-1 text-[11px] text-gray-400">
                  <ArrowDown className="w-3 h-3" style={{ color: ACCENT }} /> Bajada
                </p>
                <p className="text-lg font-bold tabular-nums">{formatRate(net.rx_bps)}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04]">
                <p className="flex items-center gap-1 text-[11px] text-gray-400">
                  <ArrowUp className="w-3 h-3" style={{ color: CYAN }} /> Subida
                </p>
                <p className="text-lg font-bold tabular-nums">{formatRate(net.tx_bps)}</p>
              </div>
            </div>
            <dl className="space-y-2 text-sm">
              {[
                ["Hoy", net.today],
                ["Este mes", net.month],
                [`Desde ${formatDate(net.since)}`, net.total],
              ].map(([label, pair]) =>
                pair && typeof pair === "object" ? (
                  <div key={label as string} className="flex items-center justify-between gap-2">
                    <dt className="text-gray-400">{label as string}</dt>
                    <dd className="text-xs whitespace-nowrap tabular-nums">
                      <span style={{ color: ACCENT }}>↓ {formatBytes(pair.rx)}</span>
                      <span className="mx-1.5 text-gray-600">·</span>
                      <span style={{ color: CYAN }}>↑ {formatBytes(pair.tx)}</span>
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          </div>

          <div className="min-w-0">
            <p className="mb-3 text-xs text-gray-400">Tráfico por hora · últimas 24 h</p>
            {hours.length ? (
              <>
                <StackedBars
                  items={hours.map((h) => ({ label: `${formatClock(h.time)} h`, a: h.rx, b: h.tx }))}
                  colors={[ACCENT, CYAN]}
                  height={130}
                  format={(v) => formatBytes(v)}
                />
                <div className="flex justify-between mt-2 text-[10px] text-gray-500 tabular-nums">
                  <span>{formatClock(hours[0].time)}</span>
                  <span>{formatClock(hours[hours.length - 1].time)}</span>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-500">Sin histórico.</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

// ── SSL ──────────────────────────────────────────────────────────────────────

const SslCard = ({ data, now }: { data: SystemStatus; now: number }) => {
  const { ssl } = data;
  const days = ssl.days_remaining;
  const validity = ssl.validity_days ?? 90;
  const color = days == null ? "#6b7280" : days < 14 ? "#f87171" : days < 30 ? "#fbbf24" : "#34d399";
  return (
    <Card title="Certificado SSL" icon={<ShieldCheck className="w-4 h-4" />}>
      {days == null ? (
        <p className="text-sm text-gray-500">No se pudo leer el certificado.</p>
      ) : (
        <div className="flex items-center gap-5">
          <Gauge pct={(days / validity) * 100} color={color} size={110} stroke={9}>
            <span className="text-3xl font-bold tabular-nums">{days}</span>
            <span className="text-[10px] text-gray-400 -mt-1">días</span>
          </Gauge>
          <dl className="min-w-0 space-y-2 text-sm">
            <div>
              <dt className="text-[11px] text-gray-500">Dominio</dt>
              <dd className="font-semibold truncate">{ssl.domain}</dd>
            </div>
            <div>
              <dt className="text-[11px] text-gray-500">Emisor</dt>
              <dd className="truncate">
                {ssl.issuer}
                {ssl.issuer_cn && <span className="text-gray-500"> · {ssl.issuer_cn}</span>}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] text-gray-500">Caduca</dt>
              <dd>{formatDate(ssl.expiry_date)}</dd>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <StatusDot tone={ssl.auto_renew ? "ok" : "error"} />
              <span className="text-gray-300">
                Renovación automática {ssl.auto_renew ? "activa" : "inactiva"}
                {ssl.auto_renew && ssl.auto_renew_timer && (
                  <span className="text-gray-500"> · revisa {relativeTime(ssl.auto_renew_timer, now)}</span>
                )}
              </span>
            </div>
          </dl>
        </div>
      )}
    </Card>
  );
};

// ── Proyectos ────────────────────────────────────────────────────────────────

const ProjectsCard = ({ data }: { data: SystemStatus }) => {
  const online = data.projects.filter((p) => p.active && p.check?.ok !== false).length;
  return (
    <Card
      title="Proyectos desplegados"
      icon={<Layers className="w-4 h-4" />}
      action={
        <Pill tone={online === data.projects.length ? "ok" : "warn"}>
          {online}/{data.projects.length} en línea
        </Pill>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.projects.map((p) => {
          const up = p.active && p.check?.ok !== false;
          const latency = p.check?.latency_ms;
          return (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-secondary/50 hover:bg-white/[0.06] transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <StatusDot tone={up ? "ok" : "error"} pulse={up} />
                  <p className="font-semibold truncate">{p.name}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-secondary shrink-0 mt-1" />
              </div>
              <div className="flex flex-wrap gap-1">
                {(p.stack ?? [p.technology]).map((s) => (
                  <span key={s} className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-auto text-xs text-gray-500 tabular-nums">
                <span className="font-mono">:{p.port}</span>
                <span className={up ? "text-emerald-300/90" : "text-rose-300"}>
                  {up ? (latency != null ? `${latency.toFixed(0)} ms` : "en línea") : "caído"}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </Card>
  );
};

// ── Servicios ────────────────────────────────────────────────────────────────

const ServicesCard = ({ data, now, className = "" }: { data: SystemStatus; now: number; className?: string }) => {
  const active = data.services.filter((s) => s.active).length;
  const maxMem = Math.max(...data.services.map((s) => s.memory_mb ?? 0), 1);
  const order: NonNullable<ServiceData["category"]>[] = ["infra", "app", "ci"];
  const groups = order
    .map((c) => ({ c, items: data.services.filter((s) => (s.category ?? "app") === c) }))
    .filter((g) => g.items.length);

  return (
    <Card
      title="Servicios systemd"
      icon={<Server className="w-4 h-4" />}
      className={className}
      action={
        <Pill tone={active === data.services.length ? "ok" : "warn"}>
          {active}/{data.services.length} activos
        </Pill>
      }
    >
      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g.c}>
            <p className="mb-1 text-[11px] font-semibold tracking-wider uppercase text-gray-500">
              {CATEGORY_LABEL[g.c]}
            </p>
            <ul className="divide-y divide-white/[0.05]">
              {g.items.map((s) => (
                <li key={s.unit} className="grid items-center grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_140px_90px] gap-x-4 gap-y-1 py-2.5">
                  <div className="flex items-center min-w-0 gap-3">
                    <StatusDot tone={s.active ? "ok" : "error"} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{s.name}</p>
                      <p className="font-mono text-[11px] text-gray-500 truncate">{s.unit}</p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Meter pct={((s.memory_mb ?? 0) / maxMem) * 100} color={`${VIOLET}cc`} />
                    <p className="mt-1 text-[11px] text-gray-500 tabular-nums">
                      {s.memory_mb != null ? `${s.memory_mb.toFixed(0)} MB` : "—"}
                    </p>
                  </div>
                  <p className="text-xs text-right text-gray-400 tabular-nums">
                    {s.active ? durationSince(s.active_since, now) : <span className="text-rose-300">{s.state ?? "inactivo"}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ── Docker ───────────────────────────────────────────────────────────────────

const DockerCard = ({ data, now }: { data: SystemStatus; now: number }) => {
  const containers = data.docker.filter((c) => !c.error);
  return (
    <Card title="Contenedores Docker" icon={<Box className="w-4 h-4" />}>
      {containers.length === 0 ? (
        <p className="text-sm text-gray-500">Sin contenedores.</p>
      ) : (
        <ul className="space-y-3">
          {containers.map((c) => {
            const running = c.state === "running";
            const tone: Tone = !running ? "error" : c.health && c.health !== "healthy" ? "warn" : "ok";
            return (
              <li key={c.name} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center min-w-0 gap-2">
                    <StatusDot tone={tone} />
                    <p className="text-sm font-semibold truncate">{c.name}</p>
                  </div>
                  <Pill tone={tone}>{c.health ?? c.state}</Pill>
                </div>
                <p className="mt-1 font-mono text-[11px] text-gray-500 truncate">{c.image}</p>
                <div className="flex justify-between mt-2 text-xs text-gray-400 tabular-nums">
                  <span>{running ? (c.started_at ? durationSince(c.started_at, now) : c.uptime ?? "—") : "detenido"}</span>
                  <span>{c.memory_mb != null ? `${c.memory_mb.toFixed(0)} MB` : ""}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
};

// ── Tareas programadas ───────────────────────────────────────────────────────

const TimersCard = ({ data, now }: { data: SystemStatus; now: number }) => {
  const timers = data.timers ?? [];
  if (!timers.length) return null;
  return (
    <Card title="Tareas programadas" icon={<CalendarClock className="w-4 h-4" />}>
      <ul className="space-y-3">
        {timers.map((t) => {
          const ok = t.active && (t.last_result == null || t.last_result === "success");
          return (
            <li key={t.unit} className="flex items-start gap-3">
              <span className="mt-1.5">
                <StatusDot tone={ok ? "ok" : t.active ? "warn" : "error"} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-[11px] text-gray-500">
                  Última {relativeTime(t.last_run, now)}
                  {t.last_result && t.last_result !== "success" && (
                    <span className="text-amber-300"> · {t.last_result}</span>
                  )}
                  {" · "}próxima {relativeTime(t.next_run, now)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

// ── Sistema ──────────────────────────────────────────────────────────────────

const SystemCard = ({ data, receivedAt, now }: { data: SystemStatus; receivedAt: number; now: number }) => {
  const s = data.system;
  const uptime =
    s.uptime_seconds != null ? formatDuration(s.uptime_seconds + (now - receivedAt) / 1000, true) : s.uptime;
  const swapPct = data.memory.swap_total_mb ? (data.memory.swap_used_mb / data.memory.swap_total_mb) * 100 : 0;
  return (
    <Card title="Sistema" icon={<Server className="w-4 h-4" />}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Placa" value={s.board} />
        <Stat label="Sistema operativo" value={s.os_version} />
        <Stat label="Kernel" value={<span className="font-mono text-xs">{s.kernel}</span>} />
        <Stat label="Encendido" value={uptime} />
        <Stat label="Procesos" value={s.processes ?? "—"} />
        <Stat
          label="Actualizaciones"
          value={
            s.pending_updates > 0 ? (
              <span className="text-amber-300">{s.pending_updates} pendientes</span>
            ) : (
              <span className="text-emerald-300">Al día</span>
            )
          }
        />
        <Stat label="Hostname" value={<span className="font-mono text-xs">{s.hostname}</span>} />
        <Stat
          label="Swap"
          value={`${formatGb(data.memory.swap_used_mb)} / ${formatGb(data.memory.swap_total_mb)} (${swapPct.toFixed(0)} %)`}
        />
        {data.memory.ram_available_mb != null && (
          <Stat label="RAM disponible" value={formatGb(data.memory.ram_available_mb)} />
        )}
        {data.cpu.temperatures?.["gpu-thermal"] != null && (
          <Stat label="GPU" value={`${data.cpu.temperatures["gpu-thermal"].toFixed(1)} °C`} />
        )}
        {data.cpu.temperatures?.["npu-thermal"] != null && (
          <Stat label="NPU" value={`${data.cpu.temperatures["npu-thermal"].toFixed(1)} °C`} />
        )}
        {data.disks[0]?.fstype && (
          <Stat label="Disco" value={<span className="font-mono text-xs">{data.disks[0].device} · {data.disks[0].fstype}</span>} />
        )}
      </div>
    </Card>
  );
};

// ── Carga inicial ────────────────────────────────────────────────────────────

const LoadingGrid = () => (
  <div className="space-y-5">
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-darkBg/80">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-24 h-7" />
            <Skeleton className="w-full h-3" />
          </div>
        </div>
      ))}
    </div>
    <div className="grid gap-5 lg:grid-cols-3">
      <Skeleton className="h-72 lg:col-span-2 rounded-2xl" />
      <Skeleton className="h-72 rounded-2xl" />
    </div>
  </div>
);
