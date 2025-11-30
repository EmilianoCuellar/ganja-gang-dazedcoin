"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  XAxis,
  YAxis,
  RadialBarChart,
  RadialBar,
} from "recharts";
import HeaderBar from "@/components/HeaderBar";
import { Badge } from "@/components/Badge";
import {
  X,
  Maximize2,
  ArrowRight,
  ExternalLink,
  Link2,
  Coins,
  ShieldCheck,
  Package,
  Key,
  Building2,
  Users,
  Network,
  MapPinned,
  BarChart3,
  TrendingUp,
} from "lucide-react";

/* ---------------------------------- Types --------------------------------- */
type Nft = {
  id: string;
  name: string;
  image: string;
  collection: "Ganja Gang" | "Dazed";
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";
  tags: string[];
  desc?: string;
};

/* ----------------------------- External Links ----------------------------- */
const CONTRACT = "0xf0893cbbc7362449f8c4bf24144a34f3eee6485c";
const OPENSEA_COLLECTION_URL = `https://opensea.io/assets/ethereum/${CONTRACT}`;
const ETHERSCAN_CONTRACT_URL = `https://etherscan.io/address/${CONTRACT}`;

/* ------------------------------ Tokenomics (NFT) ------------------------------ */
const NFT_TOKENOMICS = {
  supply: 4200,
  presaleCap: 3333,
  reserved: 20,
  royalties: "8%",
  whitelistPriceEth: 0.08,
  publicPriceEth: 0.1,
  chain: "Ethereum (migration path to Dazed)",
};

/* ------------------------------ Tokenomics (DazedCoin) ------------------------------ */
const DAZEDCOIN = {
  ticker: "DZD",
  chain: "Dazed L1 (planned)",
  totalSupply: 420_000_000,
  allocation: [
    { name: "Community Rewards", value: 40 },
    { name: "Ecosystem/Partners", value: 15 },
    { name: "Treasury", value: 15 },
    { name: "Team (4y vest)", value: 20 },
    { name: "Liquidity/Market", value: 10 },
  ],
  emissions: Array.from({ length: 24 }, (_, i) => ({
    m: i + 1,
    dist: Math.round(25 + Math.sin(i / 2) * 10 + i * 1.2),
  })),
  vestingNote:
    "Team unlocks linearly over 48 months; partner grants subject to milestone cliffs.",
  utility:
    "Gas discounts, staking boosts for PoP submissions, fee rebates for verified retail flows, governance for integrations.",
};

const ALLOC_COLORS = ["#34d399", "#60a5fa", "#f472b6", "#f59e0b", "#a78bfa"];

/* ---------------------------------- NFTs ---------------------------------- */
const NFTs: Nft[] = [
  { id: "0001", name: "Ganja Gang #0001", image: "/nfts/0001.png", collection: "Dazed", rarity: "Rare", tags: ["Baseball Hat", "Long Dreads Black", "Black Frost Hoodie", "Brown Eyes", "Orange"] },
  { id: "0008", name: "Ganja Gang #0008", image: "/nfts/0008.png", collection: "Dazed", rarity: "Epic", tags: ["Halo", "Purple", "BubbleGum", "Flannel"] },
  { id: "0010", name: "Ganja Gang #0010", image: "/nfts/0010.png", collection: "Dazed", rarity: "Uncommon", tags: ["Airpods", "Hoodie Black", "Blue Eyes", "Fade Blonde", "Blue"]},
  { id: "0012", name: "Ganja Gang #0012", image: "/nfts/0012.png", collection: "Dazed", rarity: "Uncommon", tags: ["Airpods", "BubbleGum", "Shirt", "Gray Eyes", "Wavy Brown", "Orange"] },
  { id: "0015", name: "Ganja Gang #0015", image: "/nfts/0015.png", collection: "Dazed", rarity: "Rare", tags: ["Airpods", "Hoodie Black", "Tongue Out", "Green Eyes", "Fade Black", "Pink"] },
  { id: "0016", name: "Ganja Gang #0016", image: "/nfts/0016.png", collection: "Dazed", rarity: "Epic", tags: ["Bandana", "Black Frost Hoodie", "Tongue Out", "FUEGO!", "Mohawk Blonde", "Dark"] },
  { id: "0018", name: "Ganja Gang #0018", image: "/nfts/0018.png", collection: "Dazed", rarity: "Rare", tags: ["Halo", "W Black Frost LS", "Buublegum", "Red Eyes", "Fade Black", "Orange"] },
  { id: "0019", name: "Ganja Gang #0019", image: "/nfts/0019.png", collection: "Dazed", rarity: "Epic", tags: ["SkiMask", "Hoodie Maroon", "Airpods", "Red Eyes", "White"] },
];

const rarityColors: Record<Nft["rarity"], string> = {
  Common: "border-zinc-700 text-zinc-300",
  Uncommon: "border-sky-500/40 text-sky-300",
  Rare: "border-violet-500/40 text-violet-300",
  Epic: "border-emerald-500/40 text-emerald-300",
  Legendary: "border-amber-500/40 text-amber-300",
};

/* ------------------------------ Demo Data ------------------------------ */
const rewardRadial = [
  { name: "Holders", value: 72, fill: "#34d399" },
  { name: "Dispensaries", value: 54, fill: "#60a5fa" },
  { name: "Auditors", value: 38, fill: "#f472b6" },
];

const demoBalance = Array.from({ length: 30 }, (_, i) => ({
  d: i + 1,
  bal: Math.round(100 + i * 6 + (Math.sin(i / 3) + 1) * 10),
}));

/* -------------------------------- Component ------------------------------- */
export default function EcosystemPage() {
  const [q, setQ] = useState("");
  const [r, setR] = useState<"All" | Nft["rarity"]>("All");
  const [active, setActive] = useState<Nft | null>(null);
  const [wallet, setWallet] = useState("0x…dazed");

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return NFTs.filter((n) => {
      const textMatch =
        !text ||
        n.name.toLowerCase().includes(text) ||
        n.tags.some((t) => t.toLowerCase().includes(text));
      const rarityMatch = r === "All" || n.rarity === r;
      return textMatch && rarityMatch;
    });
  }, [q, r]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <HeaderBar
        title="Ecosystem"
        subtitle="NFTs • tokenomics • utility"
        right={
          <Link
            href="/"
            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:border-zinc-600"
          >
            Home
          </Link>
        }
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Intro + external links */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Badge>Ganja Gang × Dazed</Badge>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The Dazed Ecosystem
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-300">
              Explore featured artworks and economics. Holders gain{" "}
              <span className="text-emerald-400">PoP-verified</span> utility,{" "}
              <span className="text-emerald-400">VIP access</span>, and a path to{" "}
              <span className="text-emerald-400">Dazed L1</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={OPENSEA_COLLECTION_URL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-600"
            >
              <ExternalLink size={16} /> OpenSea
            </a>
            <a
              href={ETHERSCAN_CONTRACT_URL}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-600"
            >
              <Link2 size={16} /> Contract
            </a>
            <a
              href="/mint"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
              Mint Ganja Gang <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {(["All", "Uncommon", "Rare", "Epic"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setR(opt as any)}
                className={`rounded-lg border px-3 py-1.5 text-xs ${
                  r === opt
                    ? "border-emerald-500/50 text-emerald-300"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Search traits, e.g. "Halo" or "FROST"…'
            className="w-full rounded-xl border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-200 placeholder-zinc-500 outline-none sm:w-80"
          />
        </div>

        {/* Stats strip */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Tile label="Items" value={NFTs.length.toString()} />
          <Tile label="Collections" value="Dazed • Ganja Gang" />
          <Tile label="Utility" value="VIP • PoP • zk-ID" />
        </div>

        {/* NFT Grid */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((nft) => (
            <li key={nft.id}>
              <motion.button
                onClick={() => setActive(nft)}
                whileHover={{ y: -3 }}
                className="group block w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-left"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  <div className="pointer-events-none absolute left-3 top-3 rounded-lg border px-2 py-1 text-[11px] backdrop-blur bg-black/40 border-zinc-700/70 text-zinc-300">
                    {nft.collection}
                  </div>
                  <div className="pointer-events-none absolute right-3 top-3 rounded-lg border px-2 py-1 text-[11px] backdrop-blur bg-black/40 border-zinc-700/70 text-zinc-300 inline-flex items-center gap-1">
                    <Maximize2 size={12} /> Preview
                  </div>
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <div className="text-sm font-semibold">{nft.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {nft.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] ${rarityColors[nft.rarity]}`}
                  >
                    {nft.rarity}
                  </span>
                </div>
              </motion.button>
            </li>
          ))}
        </ul>

        {/* -------- NFT Tokenomics -------- */}
        <section className="mt-12" id="nft-tokenomics">
          <SectionHeader title="Ganja Gang Tokenomics" badge="Aligned incentives" />
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Tile label="Supply" value={NFT_TOKENOMICS.supply.toLocaleString()} />
            <Tile label="Presale cap" value={NFT_TOKENOMICS.presaleCap.toLocaleString()} />
            <Tile label="Reserved promos" value={NFT_TOKENOMICS.reserved.toLocaleString()} />
            <Tile label="Royalties" value={NFT_TOKENOMICS.royalties} />
            <Tile label="Whitelist" value={`${NFT_TOKENOMICS.whitelistPriceEth} ETH`} />
            <Tile label="Public" value={`${NFT_TOKENOMICS.publicPriceEth} ETH`} />
          </div>
          <Note>
            Chain: <b>{NFT_TOKENOMICS.chain}</b>. NFTs live on Ethereum today, with a planned bridge
            to <b>Dazed</b> for PoP rewards and zk-ID perks.
          </Note>
        </section>

        {/* -------- DazedCoin Economics -------- */}
        <section className="mt-12" id="dazedcoin">
          <SectionHeader title="Dazed Economics" badge="DAZED" />
          <div className="mb-4 grid gap-4 sm:grid-cols-4">
            <Tile label="Ticker" value={DAZEDCOIN.ticker} />
            <Tile label="Total Supply" value={DAZEDCOIN.totalSupply.toLocaleString()} />
            <Tile label="Chain" value={DAZEDCOIN.chain} />
            <Tile label="Utility" value="Gas discounts • Staking boosts • Governance" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Allocation donut */}
            <Card title="Allocation">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DAZEDCOIN.allocation}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="55%"
                      outerRadius="80%"
                      paddingAngle={2}
                      stroke="#0b0c0f"
                    >
                      {DAZEDCOIN.allocation.map((_, i) => (
                        <Cell key={i} fill={ALLOC_COLORS[i % ALLOC_COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend formatter={(v) => <span style={{ color: "#e5e7eb", fontSize: 12 }}>{v}</span>} />
                    <Tooltip
                      contentStyle={{ background: "#0c0d10", border: "1px solid #3f3f46" }}
                      labelStyle={{ color: "#d4d4d8" }}
                      itemStyle={{ color: "#e5e7eb" }}
                      formatter={(val: any, name: any) => [`${val}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Emissions area */}
            <Card title="Illustrative Emissions (monthly)">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DAZEDCOIN.emissions} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                    <defs>
                      <linearGradient id="dazedFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.55} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0.08} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                    <XAxis dataKey="m" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={{ stroke: "#3f3f46" }} tickLine={{ stroke: "#3f3f46" }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background: "#0c0d10", border: "1px solid #3f3f46" }}
                      labelStyle={{ color: "#d4d4d8" }}
                      itemStyle={{ color: "#e5e7eb" }}
                      formatter={(v: any) => [`${v}`, "Emissions Index"]}
                      labelFormatter={(l) => `Month ${l}`}
                    />
                    <Area type="monotone" dataKey="dist" stroke="#34d399" strokeWidth={2} fill="url(#dazedFill)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-zinc-400">{DAZEDCOIN.vestingNote}</div>
            </Card>
          </div>

          <Note>{DAZEDCOIN.utility}</Note>
        </section>

        {/* -------- Rewards & Staking Dashboard -------- */}
        <section className="mt-12">
          <SectionHeader title="Earning Utility" badge="Rewards & Staking" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Card title="Reward Participation">
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="35%"
                    outerRadius="100%"
                    data={rewardRadial}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar background dataKey="value" />
                    <Legend iconSize={10} layout="vertical" verticalAlign="middle" />
                    <Tooltip
                      contentStyle={{ background: "#0c0d10", border: "1px solid #3f3f46" }}
                      labelStyle={{ color: "#d4d4d8" }}
                      itemStyle={{ color: "#e5e7eb" }}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Staking Yield (simulated)">
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demoBalance}>
                    <defs>
                      <linearGradient id="yield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.08} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                    <XAxis dataKey="d" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background: "#0c0d10", border: "1px solid #3f3f46" }}
                      labelStyle={{ color: "#d4d4d8" }}
                      itemStyle={{ color: "#e5e7eb" }}
                      formatter={(v: any) => [`${v} DZD`, "Balance"]}
                      labelFormatter={(l) => `Day ${l}`}
                    />
                    <Area type="monotone" dataKey="bal" stroke="#60a5fa" fill="url(#yield)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Current Pools">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black/30 p-3">
                  <span className="flex items-center gap-2"><Coins size={16} className="text-emerald-400" /> Holder Rewards</span>
                  <span className="font-semibold text-emerald-300">APY ~12%</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black/30 p-3">
                  <span className="flex items-center gap-2"><Building2 size={16} className="text-sky-400" /> Dispensary Pool</span>
                  <span className="font-semibold text-sky-300">APY ~9%</span>
                </li>
                <li className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black/30 p-3">
                  <span className="flex items-center gap-2"><Users size={16} className="text-pink-400" /> Auditor Bounties</span>
                  <span className="font-semibold text-pink-300">Variable</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* -------- Layer Architecture -------- */}
        <section className="mt-12">
          <SectionHeader title="Layer Architecture" badge="How it fits" />
          <div className="grid gap-4 md:grid-cols-3">
            <StackCard icon={<Network />} title="Layer 1 — Dazed Chain" lines={[
              "Low-fee PoP settlement",
              "Inventory proofs",
              "On-chain incentives",
            ]}/>
            <StackCard icon={<ShieldCheck />} title="Layer 2 — zk-ID" lines={[
              "Age / eligibility zk-proofs",
              "Re-usable credentials",
              "PII-free verification",
            ]}/>
            <StackCard icon={<Package />} title="Layer 3 — Apps" lines={[
              "Dispensary inventory portal",
              "Auditor tools & rewards",
              "Holders: staking + access",
            ]}/>
          </div>
        </section>

        {/* -------- Utility Breakdown -------- */}
        <section className="mt-12">
          <SectionHeader title="Utility Breakdown" badge="What you get" />
          <div className="grid gap-4 md:grid-cols-4">
            <UtilCard icon={<Coins />} title="NFT Utility" text="Access tiers, staking boosts, token-gated events and drops." />
            <UtilCard icon={<Key />} title="zk-ID" text="Fast, private eligibility checks—no PII on-chain." />
            <UtilCard icon={<Package />} title="PoP" text="Product-level proofs reduce shrinkage and verify movement." />
            <UtilCard icon={<ShieldCheck />} title="Compliance" text="Provable intake/sale events mapped to regulated IDs." />
          </div>
        </section>

        {/* -------- Interactive Demo Zone -------- */}
        <section className="mt-12" id="demo">
          <SectionHeader title="Interactive Demo Zone" badge="Sandbox" />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Mock Wallet">
              <div className="flex items-center gap-2">
                <input
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none"
                  placeholder="0x…"
                />
                <button className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10">
                  <Key size={14}/> zk-ID Check
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Mini label="Status" value="Verified" color="text-emerald-300" icon={<ShieldCheck size={14}/>}/>
                <Mini label="Tier" value="Gold" color="text-amber-300" icon={<TrendingUp size={14}/>}/>
                <Mini label="PoP Score" value="87" color="text-sky-300" icon={<BarChart3 size={14}/>}/>
              </div>
            </Card>

            <Card title="Sample Balance (simulated)">
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demoBalance}>
                    <defs>
                      <linearGradient id="bal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.08} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                    <XAxis dataKey="d" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ background: "#0c0d10", border: "1px solid #3f3f46" }}
                      labelStyle={{ color: "#d4d4d8" }}
                      itemStyle={{ color: "#e5e7eb" }}
                      formatter={(v: any) => [`${v} DZD`, "Balance"]}
                      labelFormatter={(l) => `Day ${l}`}
                    />
                    <Area type="monotone" dataKey="bal" stroke="#a78bfa" fill="url(#bal)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </section>

        {/* Partner CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-black/40 p-4">
          <div className="text-sm text-zinc-300">
            Want your brand in the ecosystem? Run PoP-verified drops with zk-ID gating.
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
          >
            Partner with us <ArrowRight size={16} />
          </a>
        </div>
      </main>

      {/* Lightbox for NFT preview */}
      <AnimatePresence>
        {!!active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative mx-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 z-10 rounded-lg border border-zinc-800 bg-black/40 p-1.5 text-zinc-300 hover:text-white"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              <div className="grid gap-4 p-4 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-zinc-800">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <Badge>{active.collection}</Badge>
                  <h3 className="mt-2 text-2xl font-bold">{active.name}</h3>
                  <div className="mt-1 text-sm text-zinc-400">
                    Rarity: <span className="text-zinc-200">{active.rarity}</span>
                  </div>
                  {active.desc && (
                    <p className="mt-3 text-sm text-zinc-300">{active.desc}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={OPENSEA_COLLECTION_URL}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-600"
                    >
                      <ExternalLink size={16} /> View on OpenSea
                    </a>
                    <a
                      href={ETHERSCAN_CONTRACT_URL}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:border-zinc-600"
                    >
                      <Link2 size={16} /> View Contract
                    </a>
                    <a
                      href="/mint"
                      className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-3 py-2 text-sm font-semibold text-white hover:bg-pink-600"
                    >
                      Mint Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------ Reusable bits ------------------------------ */
function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-xl font-bold">{value}</div>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm text-zinc-300">
      {children}
    </div>
  );
}

function SectionHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Badge>{badge}</Badge>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#0b0c0f] p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-zinc-300">{title}</div>
      </div>
      {children}
    </div>
  );
}

function StackCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
      <div className="mb-2 flex items-center gap-2 text-zinc-200">
        <div className="rounded-lg border border-zinc-700 bg-black/40 p-2">{icon}</div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <ul className="mt-2 space-y-2 text-sm text-zinc-300">
        {lines.map((l) => (
          <li key={l} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UtilCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-lg border border-zinc-700 bg-black/40 p-2">{icon}</div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <p className="text-sm text-zinc-300">{text}</p>
    </div>
  );
}

function Mini({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black/30 px-3 py-2 text-sm">
      <span className="flex items-center gap-2 text-zinc-300">
        {icon}
        {label}
      </span>
      <span className={`font-semibold ${color ?? "text-zinc-200"}`}>{value}</span>
    </div>
  );
}
