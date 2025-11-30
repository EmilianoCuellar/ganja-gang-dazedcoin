// app/dispensary/inventory/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Badge } from "@/components/Badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/** ---------------------- Types & helpers ---------------------- */
type Range = 7 | 30 | 90;
type Status = "OK" | "Low" | "OOS";

interface BaseRow {
  sku: string;
  name: string;
  cat: "Flower" | "Pre-rolls" | "Carts" | "Edibles" | "Concentrates";
  baseStock: number;    // baseline stock for 30d window
  price: number;
  lastMove: "Sell" | "Receive" | "Move";
  trend: "up" | "down";
}
interface Row extends Omit<BaseRow, "baseStock"> {
  stock: number;
  status: Status;
}

/** Status thresholds */
function statusFromStock(stock: number): Status {
  if (stock <= 0) return "OOS";
  if (stock < 80) return "Low";
  return "OK";
}

/** ---------------------- Demo data generators ---------------------- */
function genTimeseries(days: Range) {
  return Array.from({ length: days }, (_, i) => {
    const base = 1100 + (days === 7 ? 0 : days === 30 ? 200 : 320);
    const trend = i * (days === 7 ? 6 : days === 30 ? 10 : 7);
    const wave = Math.round(70 * Math.sin(i / (days === 7 ? 1.7 : 3.2)) + 40 * Math.sin(i / 5));
    return { d: i + 1, units: base + trend + wave };
  });
}

function deriveShrinkageByCategory(days: Range) {
  const mult = days === 7 ? 0.8 : days === 30 ? 1 : 1.15;
  const clamp = (x: number) => Math.max(0.4, Math.round(x * mult * 10) / 10);
  return [
    { cat: "Flower", pct: clamp(1.6) },
    { cat: "Pre-rolls", pct: clamp(1.2) },
    { cat: "Carts", pct: clamp(2.3) },
    { cat: "Edibles", pct: clamp(0.9) },
    { cat: "Concentrates", pct: clamp(1.4) },
  ];
}

/** Base inventory (for 30d baseline); we'll transform per range */
const BASE_ROWS: BaseRow[] = [
  { sku: "GG-FLOW-HYB-3.5", name: "Ganja Gang Hybrid 3.5g",  cat: "Flower",       baseStock: 186, price: 45, lastMove: "Sell",    trend: "up"   },
  { sku: "GG-PR-SOUR-1",    name: "Sour Diesel Pre-roll 1g", cat: "Pre-rolls",    baseStock: 62,  price: 12, lastMove: "Sell",    trend: "down" },
  { sku: "GG-CART-OG-1",    name: "OG Kush Cart 1g",         cat: "Carts",        baseStock: 0,   price: 48, lastMove: "Sell",    trend: "down" },
  { sku: "GG-EDB-CHOC-10",  name: "Choco Bites 10-pack",     cat: "Edibles",      baseStock: 140, price: 22, lastMove: "Receive", trend: "up"   },
  { sku: "GG-CON-ROS-.5",   name: "Live Rosin .5g",          cat: "Concentrates", baseStock: 28,  price: 36, lastMove: "Move",    trend: "up"   },
];

/** Adjust stock per window and recompute status */
function computeRowsForRange(days: Range): Row[] {
  // Multipliers: healthier short window, more depletion long window
  const mult = days === 7 ? 1.15 : days === 30 ? 1 : 0.8;

  // Small category-based nudges to keep things interesting
  const catAdj: Record<BaseRow["cat"], number> = {
    Flower: 1.05,
    "Pre-rolls": 0.95,
    Carts: 0.9,
    Edibles: 1.1,
    Concentrates: 0.85,
  };

  return BASE_ROWS.map((b, i) => {
    // add a tiny deterministic wiggle so values change between ranges
    const wiggle = days === 7 ? 6 : days === 30 ? 0 : -8;
    const stock = Math.max(0, Math.round(b.baseStock * mult * catAdj[b.cat] + wiggle));
    const status = statusFromStock(stock);
    // slight trend tweak: if 90d and stock is low → bias trend down
    const trend =
      days === 90 && status !== "OK"
        ? ("down" as const)
        : b.trend;

    return {
      sku: b.sku,
      name: b.name,
      cat: b.cat,
      stock,
      status,
      price: b.price,
      lastMove: b.lastMove,
      trend,
    };
  });
}

/** Build status distribution from current table rows (percentages for pie) */
function buildStatusPie(rows: Row[]) {
  const total = rows.length || 1;
  const ok = rows.filter(r => r.status === "OK").length;
  const low = rows.filter(r => r.status === "Low").length;
  const oos = rows.filter(r => r.status === "OOS").length;
  const toPct = (n: number) => Math.round((n / total) * 100);
  return [
    { name: "OK", value: toPct(ok) },
    { name: "Low", value: toPct(low) },
    { name: "OOS", value: toPct(oos) },
  ];
}

const PIE_COLORS = ["#34d399", "#f59e0b", "#ef4444"];

/** ---------------------- UI ---------------------- */
export default function InventoryDashboard() {
  const [store, setStore] = useState("Massachusetts — Downtown");
  const [range, setRange] = useState<Range>(30);

  const timeseries = useMemo(() => genTimeseries(range), [range]);
  const shrinkageByCategory = useMemo(() => deriveShrinkageByCategory(range), [range]);
  const tableRows = useMemo(() => computeRowsForRange(range), [range]);
  const statusPie = useMemo(() => buildStatusPie(tableRows), [tableRows]);

  const totals = useMemo(() => {
    const okPct = statusPie.find(s => s.name === "OK")?.value ?? 0;
    // headline shrinkage varies with range (demo)
    const shrinkageWindow = range === 7 ? 1.0 : range === 30 ? 1.4 : 1.7;
    const checkInSecs = range === 7 ? 4.4 : range === 30 ? 4.6 : 4.8;

    return {
      activeSkus: 312,
      inStockPct: okPct,
      shrinkagePct: shrinkageWindow,
      checkInSecs,
    };
  }, [statusPie, range]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <span className="text-lg font-semibold tracking-wide">Inventory Dashboard</span>
            <Badge>PoP + zk-ID</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className="rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none"
            >
              <option>Massachusetts — Holyoke</option>
              <option>New York — Union Square</option>
              <option>New York — Syracuse</option>

            </select>

            <select
              value={String(range)}
              onChange={(e) => setRange(Number(e.target.value) as Range)}
              className="rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none"
              aria-label="Date range"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>

            <Link
              href="/"
              className="ml-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:border-zinc-600"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* KPI strip */}
        <div className="grid gap-4 sm:grid-cols-4">
          <KPI label="Active SKUs" value={totals.activeSkus.toString()} />
          <KPI label="In-Stock %" value={`${totals.inStockPct}%`} />
          <KPI label={`Shrinkage (${range}d)`} value={`${totals.shrinkagePct}%`} />
          <KPI label="Avg. Check-In" value={`${totals.checkInSecs}s`} />
        </div>

        {/* Charts row */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Inventory over time */}
          <ChartCard title="Inventory over time" subtitle={`Last ${range} days`}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeseries} margin={{ top: 6, left: 2, right: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="invFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.06} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                  <XAxis dataKey="d" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "#0b0c0f", border: "1px solid #3f3f46" }}
                    labelStyle={{ color: "#d4d4d8" }}
                    itemStyle={{ color: "#e5e7eb" }}
                    formatter={(v: any) => [v, "Units"]}
                    labelFormatter={(l) => `Day ${l}`}
                  />
                  <Area type="monotone" dataKey="units" stroke="#60a5fa" strokeWidth={2} fill="url(#invFill)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Shrinkage by category */}
          <ChartCard title="Shrinkage by category" subtitle={`Window: ${range}d`}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={shrinkageByCategory} margin={{ top: 6, left: 2, right: 6, bottom: 0 }}>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                  <XAxis dataKey="cat" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: "#0b0c0f", border: "1px solid #3f3f46" }}
                    labelStyle={{ color: "#d4d4d8" }}
                    itemStyle={{ color: "#e5e7eb" }}
                    formatter={(v: any) => [`${v}%`, "Shrinkage"]}
                  />
                  <Bar dataKey="pct" stroke="#34d399" fill="#34d399" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Stock status */}
          <ChartCard title="Stock status" subtitle={`SKUs distribution (${range}d)`}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={2}
                    stroke="#0b0c0f"
                  >
                    {statusPie.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    formatter={(v) => <span style={{ color: "#e5e7eb", fontSize: 12 }}>{v}</span>}
                  />
                  <Tooltip
                    contentStyle={{ background: "#0b0c0f", border: "1px solid #3f3f46" }}
                    labelStyle={{ color: "#d4d4d8" }}
                    itemStyle={{ color: "#e5e7eb" }}
                    formatter={(v: any, n: any) => [`${v}%`, n]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/40">
          <div className="flex items-center justify-between border-b border-zinc-800 p-4">
            <div>
              <div className="text-sm text-zinc-400">Live inventory (sample)</div>
              <div className="text-lg font-semibold">{store}</div>
            </div>
            <Badge>Window: {range}d</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-zinc-400">
                <tr className="border-b border-zinc-800">
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Last Move</th>
                  <th className="px-4 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((r) => (
                  <tr key={r.sku} className="border-b border-zinc-900/60">
                    <td className="px-4 py-3 font-mono text-zinc-300">{r.sku}</td>
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3 text-zinc-300">{r.cat}</td>
                    <td className="px-4 py-3">{r.stock}</td>
                    <td className="px-4 py-3">
                      <span className={badgeClass(r.status)}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3">${r.price}</td>
                    <td className="px-4 py-3 text-zinc-300">{r.lastMove}</td>
                    <td className="px-4 py-3">
                      {r.trend === "up" ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <ArrowUpRight size={14} /> up
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400">
                          <ArrowDownRight size={14} /> down
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between gap-3 border-t border-zinc-800 p-4">
            <p className="text-sm text-zinc-300">
              Ready to see your own data? Connect METRC / CSV and map to PoP receipts.
            </p>
            <Link
              href="/dispensary/inventory/upload"
              className="rounded-lg border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
            >
              Upload inventory
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

/** ---------------------- helpers ---------------------- */
function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0b0c0f] p-4">
      <div className="mb-2">
        <div className="text-sm font-semibold text-zinc-200">{title}</div>
        {subtitle && <div className="text-xs text-zinc-500">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function badgeClass(status: Status) {
  const base = "rounded-md border px-2 py-0.5 text-xs";
  if (status === "OK")  return `${base} border-emerald-500/30 text-emerald-300`;
  if (status === "Low") return `${base} border-amber-500/30 text-amber-300`;
  return `${base} border-rose-500/30 text-rose-300`;
}
