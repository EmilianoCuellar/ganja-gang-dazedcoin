"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Timer,
  Boxes,
} from "lucide-react";
import type { TooltipProps } from "recharts";

type Tab = "checkin" | "inventory";
type Pt = { t: number; v: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
type InventoryTooltipEntry = {
    value: number;
    payload?: {
      name?: string;
    };
  };
  
  interface InventoryTooltipProps {
    active?: boolean;
    payload?: InventoryTooltipEntry[];
    label?: string;
  }

/** Custom tooltip for Inventory bar chart (high contrast + shadow) */
function InventoryTooltip({ active, payload, label }: InventoryTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0];

  return (
    <div
      className="rounded-lg border border-zinc-700/80 bg-[#0c0d10]/95 px-3 py-2 text-xs text-zinc-200 shadow-2xl backdrop-blur"
      style={{ pointerEvents: "none" }}
    >
      <div className="font-semibold">{String(p?.payload?.name ?? label)}</div>
      <div className="mt-0.5 text-zinc-300">
        Stock: <span className="font-semibold">{p?.value}</span> g
      </div>
    </div>
  );
}

export default function HeroShowcase() {
  const [tab, setTab] = useState<Tab>("checkin");

  /** -------------------- CHECK-IN SIM -------------------- */
  const [queue, setQueue] = useState(3);          // people in line
  const [avgSec, setAvgSec] = useState(4.8);      // avg check-in seconds
  const [verified, setVerified] = useState(true); // zk proof light
  const [flow, setFlow] = useState<Pt[]>(
    Array.from({ length: 32 }, (_, i) => ({ t: i, v: 16 + Math.sin(i / 3) * 2 }))
  );

  /** -------------------- INVENTORY SIM -------------------- */
  const [receipts, setReceipts] = useState(1284); // PoP receipts count
  const [stock, setStock] = useState([
    { name: "Flower", grams: 820 },
    { name: "Pre-rolls", grams: 260 },
    { name: "Vapes", grams: 410 },
    { name: "Edibles", grams: 190 },
  ]);
  const [trend, setTrend] = useState<Pt[]>(
    Array.from({ length: 40 }, (_, i) => ({ t: i, v: 50 + Math.sin(i / 4) * 4 }))
  );

  /** Animation loop (lightweight) */
  const raf = useRef<number | null>(null);
  useEffect(() => {
    let tick = 0;
    const loop = () => {
      tick++;
      // update every ~1s
      if (tick % 60 === 0) {
        // CHECK-IN
        setQueue((q) => clamp(q + (Math.random() > 0.5 ? 1 : -1), 0, 9));
        setAvgSec((s) => Number(clamp(s + (Math.random() - 0.5) * 0.4, 3.8, 5.8).toFixed(1)));
        setVerified(Math.random() > 0.1);
        setFlow((prev) => {
          const last = prev.at(-1)?.t ?? 0;
          const next = clamp((prev.at(-1)?.v ?? 16) + (Math.random() - 0.5) * 1.4, 10, 24);
          return [...prev, { t: last + 1, v: Number(next.toFixed(2)) }].slice(-40);
        });

        // INVENTORY
        setReceipts((n) => n + Math.floor(Math.random() * 6));
        setTrend((prev) => {
          const last = prev.at(-1)?.t ?? 0;
          const next = clamp((prev.at(-1)?.v ?? 50) + (Math.random() - 0.5) * 2, 44, 58);
          return [...prev, { t: last + 1, v: Number(next.toFixed(2)) }].slice(-60);
        });
        setStock((prev) =>
          prev.map((r) => {
            const delta = Math.round((Math.random() - 0.55) * 10);
            return { ...r, grams: clamp(r.grams + delta, 80, 1200) };
          })
        );
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  const checkinData = useMemo(() => flow, [flow]);
  const trendData = useMemo(() => trend, [trend]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800/70 bg-zinc-950/60 p-6">
      {/* subtle animated glows */}
      <motion.div
        className="pointer-events-none absolute -left-10 -top-20 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 10, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-10 -bottom-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -12, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <div className="relative z-10 mb-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <div className="text-sm text-zinc-400">Demo Visual</div>
          <h3 className="text-2xl font-bold">zk-ID Check-in & PoP Inventory</h3>
        </div>
        <div className="inline-flex items-center gap-1 rounded-xl border border-zinc-800 bg-black/40 p-1">
          <button
            onClick={() => setTab("checkin")}
            className={`rounded-lg px-3 py-1.5 text-xs ${tab === "checkin" ? "bg-pink-500 text-white" : "text-zinc-300 hover:bg-zinc-800"}`}
          >
            Check-in
          </button>
          <button
            onClick={() => setTab("inventory")}
            className={`rounded-lg px-3 py-1.5 text-xs ${tab === "inventory" ? "bg-emerald-500 text-black" : "text-zinc-300 hover:bg-zinc-800"}`}
          >
            Inventory
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {tab === "checkin" ? (
        <div className="relative z-10 grid gap-5 sm:grid-cols-5">
          {/* phone / kiosk mock */}
          <div className="sm:col-span-2">
            <div className="relative mx-auto w-full max-w-xs">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
                <div className="mx-auto h-1.5 w-24 rounded-full bg-zinc-800" />
                <div className="mt-5 text-center">
                  <div className="mx-auto w-28 rounded-lg border border-zinc-800 bg-zinc-900 p-2">
                    <QrCode className="mx-auto h-14 w-14 text-emerald-400" />
                  </div>
                  <div className="mt-3 text-xs text-zinc-400">Scan Dazed-ID</div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {verified ? (
                      <>
                        <ShieldCheck className="text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">zk-ID Verified</span>
                      </>
                    ) : (
                      <>
                        <Timer className="text-pink-400" />
                        <span className="text-sm font-medium text-pink-400">Verifying…</span>
                      </>
                    )}
                  </div>
                  <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-left text-xs leading-5 text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span>Age proof</span>
                      <CheckCircle2 className="text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Residency / Med status</span>
                      <CheckCircle2 className="text-emerald-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>PII leakage</span>
                      <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px]">Zero</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KPIs + sparkline */}
          <div className="sm:col-span-3 grid gap-5">
            {/* compact KPI cards (no overflow) */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:p-4">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wide">Queue</div>
                <div className="mt-1 text-lg font-semibold sm:text-xl">
                  {queue} <span className="text-zinc-400 text-sm">people</span>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:p-4">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wide">Avg. check-in</div>
                <div className="mt-1 text-lg font-semibold sm:text-xl">
                  &lt; {avgSec.toFixed(1)}
                  <span className="text-zinc-400 text-sm">s</span>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-black/40 p-3 sm:p-4">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wide">Pass status</div>
                <div
                  className={`mt-1 text-lg sm:text-xl font-semibold ${
                    verified ? "text-emerald-400" : "text-pink-400"
                  }`}
                >
                  {verified ? "Verified" : "Pending"}
                </div>
              </div>
            </div>

            <div className="h-40 rounded-xl border border-zinc-800 bg-black/30 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={checkinData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="currentColor" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeOpacity={0.08} />
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={["dataMin - 4", "dataMax + 4"]} />
                  <Tooltip
                    contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a" }}
                    formatter={(v: any) => [`${Number(v).toFixed(0)} ppl/min`, "Throughput"]}
                    wrapperStyle={{ outline: "none" }}
                    offset={12}
                  />
                  <Area type="monotone" dataKey="v" strokeWidth={2} dot={false} fillOpacity={1} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-zinc-400">Throughput (people per minute) — simulated.</div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid gap-5 sm:grid-cols-5">
          {/* stock cards */}
          <div className="sm:col-span-2 grid gap-4">
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs text-zinc-400"><Boxes /> On-hand grams</div>
              <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                {stock.map((s) => (
                  <div key={s.name} className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
                    <div className="text-zinc-400">{s.name}</div>
                    <div className="text-lg font-semibold sm:text-xl">{s.grams}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
              <div className="text-xs text-zinc-400">PoP receipts (7d)</div>
              <div className="mt-1 text-2xl font-bold">{receipts.toLocaleString()}</div>
              <div className="mt-1 text-xs text-zinc-500">Intake • Move • Sell</div>
            </div>
          </div>

          {/* charts */}
          <div className="sm:col-span-3 grid gap-4">
            {/* High-contrast BarChart with custom tooltip */}
            <div className="h-40 rounded-xl border border-zinc-800 bg-[#0b0c0f] p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stock} margin={{ top: 8, right: 8, left: 8, bottom: 12 }}>
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    axisLine={{ stroke: "#3f3f46" }}
                    tickLine={{ stroke: "#3f3f46" }}
                  />
                  <YAxis
                    tick={{ fill: "#a1a1aa", fontSize: 12 }}
                    axisLine={{ stroke: "#3f3f46" }}
                    tickLine={{ stroke: "#3f3f46" }}
                  />
                  <Tooltip
                    content={<InventoryTooltip />}
                    cursor={{ fill: "rgba(163,163,163,0.08)" }}
                    offset={16}
                    allowEscapeViewBox={{ x: true, y: true }}
                    wrapperStyle={{ outline: "none" }}
                  />
                  <Bar dataKey="grams" fill="url(#barGrad)" radius={[6, 6, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Higher-contrast AreaChart */}
            <div className="h-40 rounded-xl border border-zinc-800 bg-[#0b0c0f] p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={["dataMin - 4", "dataMax + 4"]} />
                  <Tooltip
                    contentStyle={{ background: "#0c0d10", border: "1px solid #3f3f46" }}
                    labelStyle={{ color: "#d4d4d8" }}
                    itemStyle={{ color: "#e5e7eb" }}
                    cursor={{ stroke: "rgba(96,165,250,0.5)" }}
                    offset={14}
                    wrapperStyle={{ outline: "none" }}
                    formatter={(v: any) => [`${Number(v).toFixed(2)}`, "Index"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    fill="url(#trendFill)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="text-xs text-zinc-400">
              Stock by category • Inventory trend (simulated).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
