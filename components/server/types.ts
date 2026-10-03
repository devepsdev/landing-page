// Respuesta de la Monitor API (FastAPI en la Orange Pi: /api/system-status).
// Los campos opcionales son los añadidos en la versión 2 de la API.

export interface CoreData {
  id: number;
  model: string | null;
  usage_percent: number | null;
  freq_mhz: number | null;
  max_freq_mhz: number | null;
}

export interface CpuData {
  usage_percent: number;
  temperature: number | null;
  temperatures?: Record<string, number>;
  cores: number;
  cores_logical?: number;
  freq_mhz: number | null;
  load_avg: Record<string, number> | number[];
  model?: string;
  per_core?: CoreData[];
}

export interface MemoryData {
  ram_used_mb: number;
  ram_total_mb: number;
  ram_percent: number;
  ram_available_mb?: number;
  ram_cached_mb?: number;
  swap_used_mb: number;
  swap_total_mb: number;
}

export interface DiskData {
  device: string;
  mountpoint: string;
  fstype?: string;
  used_gb: number;
  total_gb: number;
  percent: number;
}

export interface DockerContainer {
  name: string;
  image: string;
  status: string;
  state: string;
  health?: string | null;
  ports: Record<string, string[] | null> | string | null;
  uptime: string | null;
  started_at?: string | null;
  memory_mb?: number | null;
  error?: string;
}

export interface ServiceData {
  name: string;
  unit: string;
  category?: "infra" | "app" | "ci";
  active: boolean;
  state?: string;
  description: string;
  memory_mb: number | null;
  active_since?: string | null;
}

export interface ProjectCheck {
  ok: boolean;
  latency_ms: number | null;
  http_status?: number;
  checked_at?: string;
}

export interface ProjectData {
  name: string;
  technology: string;
  stack?: string[];
  port: number;
  active: boolean;
  url: string;
  check?: ProjectCheck;
}

export interface SslData {
  domain: string;
  issuer: string | null;
  issuer_cn?: string | null;
  issued_date?: string | null;
  expiry_date: string | null;
  days_remaining: number | null;
  validity_days?: number | null;
  auto_renew: boolean | null;
  auto_renew_timer: string | null;
  error?: string;
}

export interface SystemData {
  hostname: string;
  os_version: string;
  kernel: string;
  uptime: string;
  uptime_seconds?: number;
  pending_updates: number;
  board: string;
  processes?: number;
}

export interface TrafficPair {
  rx: number;
  tx: number;
}

export interface NetworkData {
  interface: string;
  today?: TrafficPair;
  month?: TrafficPair;
  total?: TrafficPair;
  since?: string;
  hours?: (TrafficPair & { time: string })[];
  rx_bps?: number | null;
  tx_bps?: number | null;
  error?: string;
}

export interface TimerData {
  name: string;
  unit: string;
  active: boolean;
  last_run: string | null;
  next_run: string | null;
  last_result: string | null;
  last_exit_code: number | null;
}

export interface HistoryPoint {
  t: string;
  cpu: number;
  ram: number;
  temp: number | null;
  rx_bps: number | null;
  tx_bps: number | null;
}

export interface SystemStatus {
  cpu: CpuData;
  memory: MemoryData;
  disks: DiskData[];
  docker: DockerContainer[];
  services: ServiceData[];
  projects: ProjectData[];
  ssl: SslData;
  system: SystemData;
  network?: NetworkData;
  timers?: TimerData[];
  history?: { interval_s: number; points: HistoryPoint[] };
  timestamp: string;
  generated_in_ms?: number;
}
