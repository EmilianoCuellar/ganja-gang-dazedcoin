"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf, Factory, Coins, TrendingUp, BarChart4, ArrowRight, Info,
  ExternalLink, Star, StarOff, ChevronRight
} from "lucide-react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

/* ----------------------------- demo helpers ----------------------------- */

type HistoryPt = { t: number; p: number };

type TokenRow = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  mcap: number;
  history: HistoryPt[];

  // extra info for details
  category: "Flower" | "Pre-Roll" | "Concentrate" | "Edible";
  thc: number; // %
  cbd: number; // %
  supplyUnits: number; // units backing current tokenization
  backingBatch: string; // METRC-like id
  popProofs: number;    // PoP attestations
  description: string;
};

const STARTERS: TokenRow[] = [
  {
    id: "1", name: "OG Kush", symbol: "OGK", price: 96.2, change24h: 0,
    volume24h: 182_000, mcap: 2_100_000, history: [],
    category: "Flower", thc: 24, cbd: 0.2, supplyUnits: 1600,
    backingBatch: "PKG-A001", popProofs: 342,
    description: "Classic indica-leaning hybrid known for earthy pine and lemon notes. Popular evening strain with steady sell-through."
  },
  {
    id: "2", name: "Blue Dream", symbol: "BLUD", price: 75.4, change24h: 0,
    volume24h: 141_000, mcap: 1_750_000, history: [],
    category: "Flower", thc: 19, cbd: 0.1, supplyUnits: 2100,
    backingBatch: "PKG-B014", popProofs: 295,
    description: "Balanced sativa-dominant profile with blueberry sweetness. Strong daytime appeal and broad dispensary demand."
  },
  {
    id: "3", name: "Sour Diesel", symbol: "SOUR", price: 112.9, change24h: 0,
    volume24h: 203_000, mcap: 2_460_000, history: [],
    category: "Flower", thc: 22, cbd: 0.1, supplyUnits: 1300,
    backingBatch: "PKG-C221", popProofs: 401,
    description: "Energizing classic with diesel notes. Strong premium segment performance and consistent repeat purchases."
  },
  {
    id: "4", name: "Gelato 33", symbol: "GEL", price: 83.7, change24h: 0,
    volume24h: 120_500, mcap: 1_610_000, history: [],
    category: "Pre-Roll", thc: 21, cbd: 0.2, supplyUnits: 2400,
    backingBatch: "PKG-G033", popProofs: 188,
    description: "Dessert-leaning hybrid with creamy citrus profile. Higher conversion in promo bundles and VIP drops."
  },
  {
    id: "5", name: "Zkittlez", symbol: "ZKT", price: 68.5, change24h: 0,
    volume24h: 99_000, mcap: 1_300_000, history: [],
    category: "Edible", thc: 10, cbd: 0.0, supplyUnits: 5200,
    backingBatch: "PKG-Z111", popProofs: 122,
    description: "Fruit-forward profile popular in gummies. Broad retail placement with family SKUs at multiple price points."
  },
];

const NOW = () => Date.now();
function seededRand(seed: number) { const x = Math.sin(seed) * 10000; return x - Math.floor(x); }
function nextPrice(prev: number, i: number) {
  const drift = (seededRand(NOW() / 4000 + i) - 0.5) * 0.6; // ±0.3
  const revert = (100 - prev) * 0.003;
  return Number(Math.max(2, prev + drift + revert).toFixed(2));
}
function usd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

/* ------------------------------ details UI ------------------------------ */

function Drawer({
  open, onClose, token,
}: { open: boolean; onClose: () => void; token: TokenRow | null; }) {
  if (!open || !token) return null;
  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/60" />
      {/* panel */}
      <aside
        className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-zinc-800 bg-zinc-950 p-5 shadow-2xl"
        role="dialog" aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-emerald-400" />
            <div className="text-lg font-semibold">{token.name} <span className="text-zinc-400 text-sm">({token.symbol})</span></div>
          </div>
          <button onClick={onClose} className="rounded-lg border border-zinc-700 px-2 py-1 text-sm hover:border-zinc-500">
            Close
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-xs text-zinc-400">Price</div>
            <div className="mt-1 text-2xl font-bold">${token.price.toFixed(2)}</div>
            <div className={`text-sm ${token.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
              {token.change24h >= 0 ? "+" : ""}{token.change24h.toFixed(2)}% 24h
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-xs text-zinc-400 mb-2">Performance</div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={token.history}>
                  <CartesianGrid strokeOpacity={0.1} />
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip
                    contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a" }}
                    labelFormatter={() => ""}
                    formatter={(v: any) => [`$${Number(v).toFixed(2)}`, "Price"]}
                  />
                  <Line type="monotone" dataKey="p" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-zinc-800 p-3">
              <div className="text-xs text-zinc-400">24h Volume</div>
              <div className="mt-1 text-lg font-semibold">{usd(token.volume24h)}</div>
            </div>
            <div className="rounded-xl border border-zinc-800 p-3">
              <div className="text-xs text-zinc-400">Market Cap</div>
              <div className="mt-1 text-lg font-semibold">{usd(token.mcap)}</div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-3">
            <div className="text-xs text-zinc-400">About this strain</div>
            <p className="mt-2 text-sm text-zinc-300">{token.description}</p>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-zinc-400">Category</dt><dd className="font-medium">{token.category}</dd></div>
              <div><dt className="text-zinc-400">THC</dt><dd className="font-medium">{token.thc}%</dd></div>
              <div><dt className="text-zinc-400">CBD</dt><dd className="font-medium">{token.cbd}%</dd></div>
              <div><dt className="text-zinc-400">Supply Units</dt><dd className="font-medium">{token.supplyUnits.toLocaleString()}</dd></div>
              <div><dt className="text-zinc-400">Backing Batch</dt><dd className="font-mono">{token.backingBatch}</dd></div>
              <div><dt className="text-zinc-400">PoP Proofs</dt><dd className="font-medium">{token.popProofs.toLocaleString()}</dd></div>
            </dl>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <a className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-600"
               href="#" onClick={(e) => e.preventDefault()}>
              Mint/Redeem <ChevronRight size={16}/>
            </a>
            <a className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm text-zinc-100 hover:border-zinc-500"
               href="#" onClick={(e) => e.preventDefault()}>
              View on Explorer <ExternalLink size={16}/>
            </a>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm text-zinc-100 hover:border-zinc-500"
            onClick={() => alert("Added to watchlist (demo)")}
          >
            <Star size={16}/> Add to Watchlist
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------- main page ------------------------------ */

export default function StrainsPage() {
  // simulate price feed
  const [rows, setRows] = useState<TokenRow[]>(
    STARTERS.map((r) => ({
      ...r,
      history: Array.from({ length: 30 }, (_, k) => ({
        t: k,
        p: Number((r.price + (Math.sin(k / 2) * 2)).toFixed(2)),
      })),
    }))
  );
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<TokenRow | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused) { if (timer.current) cancelAnimationFrame(timer.current); timer.current = null; return; }
    let last = performance.now();
    const loop = (t: number) => {
      const dt = t - last;
      if (dt > 1200) {
        setRows(prev =>
          prev.map((r, i) => {
            const np = nextPrice(r.price, i);
            const hist = [...r.history, { t: (r.history.at(-1)?.t ?? 0) + 1, p: np }].slice(-40);
            const change = ((np - hist[0].p) / hist[0].p) * 100;
            const vol = Math.max(50_000, r.volume24h + (seededRand(t / 500 + i) - 0.5) * 15_000);
            const mcap = Math.max(500_000, np * (r.mcap / r.price));
            return { ...r, price: np, history: hist, change24h: Number(change.toFixed(2)), volume24h: vol, mcap };
          })
        );
        last = t;
      }
      timer.current = requestAnimationFrame(loop);
    };
    timer.current = requestAnimationFrame(loop);
    return () => { if (timer.current) cancelAnimationFrame(timer.current); };
  }, [paused]);

  const ranked = useMemo(() => [...rows].sort((a, b) => b.mcap - a.mcap), [rows]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-pink-500" />
            <span className="text-lg font-semibold tracking-wide">Dazed Blockchain</span>
            <span className="ml-2 hidden rounded-lg border border-zinc-700/70 bg-zinc-900/60 px-2 py-1 text-xs md:inline">
              Tokenized Strains
            </span>
          </Link>
          <Link href="/" className="text-sm text-zinc-300 hover:text-white">Home</Link>
        </div>
      </header>

      {/* Centered Hero */}
      <Section className="pt-12">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            Tokenized Cannabis Strains on the Dazed Blockchain
          </motion.h1>
          <p className="mx-auto mt-4 max-w-3xl text-zinc-400">
            Each cannabis product, verified through Proof of Product, becomes a digital asset backed by
            physical inventory. This bridges cultivation, retail, and decentralized finance — turning
            cannabis into a tradable, transparent commodity.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/inventory/walkthrough"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:border-zinc-500"
            >
              <Info size={16} /> How it works
            </Link>
            <Link
              href="/mint"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-5 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
              View NFT Utility <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* Feature highlights */}
      <Section className="pt-0">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <Card><Leaf className="mb-2 text-emerald-400" /><h3 className="text-lg font-semibold">Product Tokenization</h3><p className="mt-2 text-sm text-zinc-300">Each verified package ID mints a unique on-chain token, binding real cannabis inventory to blockchain proof.</p></Card>
          <Card><Factory className="mb-2 text-pink-400" /><h3 className="text-lg font-semibold">Cultivator Integration</h3><p className="mt-2 text-sm text-zinc-300">Growers register harvest batches directly on-chain, enabling traceable product flow from seed to sale.</p></Card>
          <Card><Coins className="mb-2 text-emerald-400" /><h3 className="text-lg font-semibold">$DAZED Rewards</h3><p className="mt-2 text-sm text-zinc-300">Every verified sale yields $DAZED rewards to dispensaries, cultivators, and Ganja Gang holders.</p></Card>
        </div>
      </Section>

      {/* Market simulator + clickable rows */}
      <Section>
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Live Market Simulator</h2>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${paused ? "text-zinc-400" : "text-emerald-400"}`}>
                {paused ? "Paused" : "Live"}
              </span>
              <button
                onClick={() => setPaused((v) => !v)}
                className="rounded-lg border border-zinc-700 px-3 py-1 text-xs hover:border-zinc-500"
              >
                {paused ? "Resume" : "Pause"}
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Leaderboard */}
            <Card className="lg:col-span-2 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-950/60 text-zinc-400">
                    <tr>
                      <th className="px-4 py-3 text-left">#</th>
                      <th className="px-4 py-3 text-left">Strain</th>
                      <th className="px-4 py-3 text-right">Price</th>
                      <th className="px-4 py-3 text-right">24h %</th>
                      <th className="px-4 py-3 text-right">Volume (24h)</th>
                      <th className="px-4 py-3 text-right">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranked.map((r, idx) => (
                      <tr
                        key={r.id}
                        tabIndex={0}
                        onClick={() => setSelected(r)}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(r)}
                        className="cursor-pointer border-t border-zinc-800 hover:bg-zinc-900/50 focus:bg-zinc-900/60"
                        aria-label={`Open details for ${r.name}`}
                      >
                        <td className="px-4 py-3">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{r.name}</span>
                            <span className="rounded bg-zinc-800/60 px-2 py-0.5 text-xs text-zinc-300">
                              {r.symbol}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">${r.price.toFixed(2)}</td>
                        <td className={`px-4 py-3 text-right ${r.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {r.change24h >= 0 ? "+" : ""}{r.change24h.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3 text-right">{usd(r.volume24h)}</td>
                        <td className="px-4 py-3 text-right">{usd(r.mcap)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Top chart */}
            <Card>
              <h3 className="text-lg font-semibold">Top Strain — {ranked[0]?.name} ({ranked[0]?.symbol})</h3>
              <div className="mt-3 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ranked[0]?.history ?? []}>
                    <CartesianGrid strokeOpacity={0.1} />
                    <XAxis dataKey="t" hide />
                    <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
                    <Tooltip
                      contentStyle={{ background: "#0a0a0a", border: "1px solid #27272a" }}
                      labelFormatter={() => ""}
                      formatter={(v: any) => [`$${Number(v).toFixed(2)}`, "Price"]}
                    />
                    <Line type="monotone" dataKey="p" dot={false} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-sm text-zinc-400">
                Demo data refreshes ~1.2s. Connects to Dazed indexer later.
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Why it matters */}
      <Section className="pt-0">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <Card><BarChart4 className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Real-World Liquidity</h3><p className="mt-2 text-sm text-zinc-300">Tokenized batches can be traded, staked, or redeemed, merging physical cannabis commerce with DeFi markets.</p></Card>
          <Card><TrendingUp className="mb-2 text-pink-400"/><h3 className="text-lg font-semibold">Market Transparency</h3><p className="mt-2 text-sm text-zinc-300">On-chain data ensures accurate supply metrics and real strain performance insights for investors and brands.</p></Card>
          <Card><Coins className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Backed by PoP</h3><p className="mt-2 text-sm text-zinc-300">Every token is backed by Proof-of-Product events from intake to sale—auditable and compliant.</p></Card>
        </div>
      </Section>

      {/* Details Drawer */}
      <Drawer open={!!selected} onClose={() => setSelected(null)} token={selected} />
    </div>
  );
}
