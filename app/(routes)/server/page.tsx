"use client"

import { useEffect, useState, useCallback } from 'react';
import ContainerPage from '@/components/container-page';
import TransitionPage from '@/components/transition-page';

// ── Types ────────────────────────────────────────────────────────────────────

interface CpuData {
  usage_percent: number;
  temperature: number;
  cores: number;
  freq_mhz: number;
  load_avg: Record<string, number> | number[];
}

interface MemoryData {
  ram_used_mb: number;
  ram_total_mb: number;
  ram_percent: number;
  swap_used_mb: number;
  swap_total_mb: number;
}

interface DiskData {
  device: string;
  mountpoint: string;
  used_gb: number;
  total_gb: number;
  percent: number;
}

interface DockerContainer {
  name: string;
  image: string;
  status: string;
  state: string;
  ports: Record<string, string[] | null> | string | null;
  uptime: string | null;
}

interface ServiceData {
  name: string;
  active: boolean;
  description: string;
  pid: number;
  memory_mb: number;
}

interface ProjectData {
  name: string;
  technology: string;
  path: string;
  port: number;
  active: boolean;
  url: string;
}

interface SslData {
  domain: string;
  issuer: string;
  expiry_date: string;
  days_remaining: number;
  auto_renew: boolean;
  auto_renew_timer: string;
}

interface SystemData {
  hostname: string;
  os_version: string;
  kernel: string;
  uptime: string;
  pending_updates: number;
  board: string;
}

interface SystemStatus {
  cpu: CpuData;
  memory: MemoryData;
  disks: DiskData[];
  docker: DockerContainer[];
  services: ServiceData[];
  projects: ProjectData[];
  ssl: SslData;
  system: SystemData;
  timestamp: string;
}

type FetchState = 'loading' | 'ok' | 'stale' | 'offline';

// ── Helpers ──────────────────────────────────────────────────────────────────

const barColor = (pct: number) => {
  if (pct < 60) return 'bg-green-500';
  if (pct < 80) return 'bg-yellow-400';
  return 'bg-red-500';
};

const formatLoadAvg = (la: Record<string, number> | number[]): string => {
  const values = Array.isArray(la) ? la : Object.values(la);
  return values.map(v => Number(v).toFixed(2)).join(' / ') || '—';
};

const formatPorts = (ports: Record<string, string[] | null> | string | null): string => {
  if (!ports) return '—';
  if (typeof ports === 'string') return ports || '—';
  return Object.entries(ports)
    .map(([proto, bindings]) => bindings?.length ? `${bindings[0]}→${proto}` : proto)
    .join(', ') || '—';
};

const sslColor = (days: number) => {
  if (days < 14) return 'text-red-400';
  if (days < 30) return 'text-yellow-400';
  return 'text-green-400';
};

// ── Reusable components ───────────────────────────────────────────────────────

const StatusDot = ({ active }: { active: boolean }) => (
  <span
    className={`inline-block w-2 h-2 rounded-full shrink-0 ${active ? 'bg-green-400' : 'bg-red-500'}`}
  />
);

const ProgressBar = ({ pct }: { pct: number }) => (
  <div className="w-full h-2 rounded-full bg-white/10">
    <div
      className={`h-2 rounded-full transition-all duration-500 ${barColor(pct)}`}
      style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
    />
  </div>
);

const Card = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => (
  <div className={`p-4 rounded-lg bg-darkBg ${className}`}>
    <h2 className="mb-3 text-xs font-bold tracking-widest uppercase text-secondary">{title}</h2>
    {children}
  </div>
);

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`rounded animate-pulse bg-white/10 ${className}`} />
);

// ── Page ──────────────────────────────────────────────────────────────────────

const ServerPage = () => {
  const [data, setData] = useState<SystemStatus | null>(null);
  const [fetchState, setFetchState] = useState<FetchState>('loading');
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/system-status', { cache: 'no-store' });
      if (!res.ok) throw new Error('bad response');
      const json: SystemStatus = await res.json();
      setData(json);
      setFetchState('ok');
      setLastUpdate(new Date().toLocaleTimeString('es-ES'));
    } catch {
      setFetchState(prev => (prev === 'loading' ? 'offline' : 'stale'));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 8000);
    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <ContainerPage>
      <TransitionPage />

      <div className="relative z-10">
      {/* ── Page header ── */}
      <div className="flex flex-col gap-2 mb-6 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl leading-tight md:text-4xl">
          Monitor del{' '}
          <span className="font-bold text-secondary">servidor</span>
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {fetchState === 'ok' && (
            <>
              <StatusDot active={true} />
              <span>En línea · {lastUpdate}</span>
            </>
          )}
          {fetchState === 'stale' && (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
              <span>Datos anteriores · {lastUpdate}</span>
            </>
          )}
          {fetchState === 'offline' && (
            <>
              <StatusDot active={false} />
              <span>Sin conexión</span>
            </>
          )}
          {fetchState === 'loading' && <span>Conectando...</span>}
        </div>
      </div>

      {/* ── Status banners ── */}
      {fetchState === 'offline' && (
        <div className="p-4 mb-5 text-sm text-center rounded-lg bg-red-500/20 text-red-300">
          No se puede conectar con el servidor. Reintentando cada 8 s...
        </div>
      )}
      {fetchState === 'stale' && (
        <div className="p-3 mb-4 text-sm text-center rounded-lg bg-yellow-500/10 text-yellow-300">
          Última actualización fallida — mostrando datos anteriores
        </div>
      )}

      {/* ── Skeleton loaders ── */}
      {fetchState === 'loading' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 rounded-lg bg-darkBg">
              <Skeleton className="w-24 h-3 mb-4" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-3/4 h-4 mb-2" />
              <Skeleton className="w-full h-2 mt-3" />
            </div>
          ))}
        </div>
      )}

      {/* ── Dashboard ── */}
      {data && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {/* CPU */}
          <Card title="CPU">
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-300">Uso</span>
                <span className="font-semibold">{data.cpu.usage_percent.toFixed(1)}%</span>
              </div>
              <ProgressBar pct={data.cpu.usage_percent} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Temperatura</p>
                <p className="font-semibold">{data.cpu.temperature}°C</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Núcleos</p>
                <p className="font-semibold">{data.cpu.cores}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Frecuencia</p>
                <p className="font-semibold">{data.cpu.freq_mhz} MHz</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Load avg</p>
                <p className="font-semibold text-xs">{formatLoadAvg(data.cpu.load_avg)}</p>
              </div>
            </div>
          </Card>

          {/* Memory */}
          <Card title="Memoria">
            <div className="mb-3">
              <div className="flex justify-between mb-1 text-sm">
                <span className="text-gray-300">RAM</span>
                <span className="font-semibold">
                  {(data.memory.ram_used_mb / 1024).toFixed(1)} / {(data.memory.ram_total_mb / 1024).toFixed(1)} GB
                </span>
              </div>
              <ProgressBar pct={data.memory.ram_percent} />
            </div>
            {data.memory.swap_total_mb > 0 && (
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-gray-300">Swap</span>
                  <span className="font-semibold">
                    {(data.memory.swap_used_mb / 1024).toFixed(1)} / {(data.memory.swap_total_mb / 1024).toFixed(1)} GB
                  </span>
                </div>
                <ProgressBar pct={(data.memory.swap_used_mb / data.memory.swap_total_mb) * 100} />
              </div>
            )}
          </Card>

          {/* SSL */}
          <Card title="Certificado SSL">
            <p className="mb-1 font-semibold">{data.ssl.domain}</p>
            <p className="mb-3 text-xs text-gray-400">{data.ssl.issuer}</p>
            <div className="flex items-center gap-2 mb-1">
              <StatusDot active={data.ssl.days_remaining > 7} />
              <span className={`text-sm font-semibold ${sslColor(data.ssl.days_remaining)}`}>
                {data.ssl.days_remaining} días restantes
              </span>
            </div>
            <p className="text-xs text-gray-400">Caduca: {data.ssl.expiry_date}</p>
            <p className="mt-1 text-xs text-gray-400">
              Auto-renovación:{' '}
              {data.ssl.auto_renew
                ? <span className="text-green-400">activa</span>
                : <span className="text-red-400">inactiva</span>
              }
              {data.ssl.auto_renew_timer ? ` · ${data.ssl.auto_renew_timer}` : ''}
            </p>
          </Card>

          {/* System */}
          <Card title="Sistema">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Board</p>
                <p className="font-semibold text-xs">{data.system.board}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Hostname</p>
                <p className="font-semibold text-xs">{data.system.hostname}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-xs">OS</p>
                <p className="font-semibold text-xs">{data.system.os_version}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-xs">Kernel</p>
                <p className="font-semibold text-xs">{data.system.kernel}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Uptime</p>
                <p className="font-semibold text-xs">{data.system.uptime}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Actualizaciones</p>
                <p className={`font-semibold text-xs ${data.system.pending_updates > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {data.system.pending_updates > 0 ? `${data.system.pending_updates} pendientes` : 'Al día'}
                </p>
              </div>
            </div>
          </Card>

          {/* Disks — span 2 cols on lg */}
          <div className="lg:col-span-2">
            <Card title="Almacenamiento" className="h-full">
              <div className="space-y-3">
                {Array.from(data.disks).map((disk) => (
                  <div key={disk.mountpoint}>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="text-gray-300">
                        {disk.mountpoint}{' '}
                        <span className="text-xs text-gray-500">({disk.device})</span>
                      </span>
                      <span className="font-semibold text-xs">
                        {disk.used_gb.toFixed(1)} / {disk.total_gb.toFixed(1)} GB
                      </span>
                    </div>
                    <ProgressBar pct={disk.percent} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Docker — full width */}
          <div className="md:col-span-2 lg:col-span-3">
            <Card title="Contenedores Docker">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="pb-2 font-normal pr-4">Estado</th>
                      <th className="pb-2 font-normal pr-4">Nombre</th>
                      <th className="pb-2 font-normal pr-4 hidden md:table-cell">Imagen</th>
                      <th className="pb-2 font-normal pr-4 hidden md:table-cell">Puertos</th>
                      <th className="pb-2 font-normal hidden md:table-cell">Uptime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(data.docker).map((c) => (
                      <tr key={c.name} className="border-b border-white/5 last:border-0">
                        <td className="py-2 pr-4">
                          <div className="flex items-center gap-2">
                            <StatusDot active={c.state === 'running'} />
                            <span className="text-xs text-gray-400">{c.status}</span>
                          </div>
                        </td>
                        <td className="py-2 pr-4 font-semibold">{c.name}</td>
                        <td className="py-2 pr-4 text-xs text-gray-400 hidden md:table-cell">{c.image}</td>
                        <td className="py-2 pr-4 text-xs text-gray-400 hidden md:table-cell">{formatPorts(c.ports)}</td>
                        <td className="py-2 text-xs text-gray-400 hidden md:table-cell">{c.uptime ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Services */}
          <div className="md:col-span-2 lg:col-span-2">
            <Card title="Servicios" className="h-full">
              <div className="space-y-1">
                {Array.from(data.services).map((svc) => (
                  <div
                    key={svc.name}
                    className="flex items-center justify-between gap-3 py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <StatusDot active={svc.active} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{svc.name}</p>
                        <p className="text-xs text-gray-400 truncate">{svc.description}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{svc.memory_mb.toFixed(0)} MB</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Projects */}
          <div className="md:col-span-2 lg:col-span-1">
            <Card title="Proyectos desplegados" className="h-full">
              <div className="space-y-1">
                {Array.from(data.projects).map((proj) => (
                  <div
                    key={proj.name}
                    className="flex items-start justify-between gap-2 py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <StatusDot active={proj.active} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{proj.name}</p>
                        <p className="text-xs text-gray-400">
                          :{proj.port} · <span className="text-secondary/80">{proj.technology}</span>
                        </p>
                      </div>
                    </div>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-secondary hover:text-secondary/70 shrink-0 mt-0.5"
                        title={`Abrir ${proj.name}`}
                      >
                        ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      )}
      </div>
    </ContainerPage>
  );
};

export default ServerPage;
