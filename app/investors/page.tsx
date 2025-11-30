// app/investors/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Coins, LineChart, FileText, Link2, ExternalLink } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import { Badge } from "@/components/Badge";

const ETHERSCAN = "https://etherscan.io/address/0xf0893cbbc7362449f8c4bf24144a34f3eee6485c";
const OPENSEA  = "https://opensea.io/assets/ethereum/0xf0893cbbc7362449f8c4bf24144a34f3eee6485c";

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <HeaderBar
        title="Investors & Partners"
        subtitle="Executive overview • traction • how to engage"
        right={<Link href="/" className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:border-zinc-600">Home</Link>}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero */}
        <section className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
          <Badge>Executive Summary</Badge>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Real-world asset rails for cannabis — PoP + zk-ID + community.
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            We reduce shrinkage and compliance friction with Proof of Product (PoP) and privacy-preserving zk-ID.
            Ganja Gang NFTs bootstrap aligned stakeholders; DazedCoin underpins rewards and fees on the Dazed L1.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/deck.pdf" className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 inline-flex items-center gap-2"><FileText size={16}/> Pitch Deck</a>
            <a href={ETHERSCAN} target="_blank" className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:border-zinc-600 inline-flex items-center gap-2"><Link2 size={16}/> Contract</a>
            <a href={OPENSEA} target="_blank" className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:border-zinc-600 inline-flex items-center gap-2"><ExternalLink size={16}/> OpenSea</a>
          </div>
        </section>

        {/* 3-up value props */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card icon={<ShieldCheck className="text-emerald-400"/>} title="Compliance-first">
            zk-ID age/eligibility with zero PII on-chain; PoP proofs mapped to regulated package IDs.
          </Card>
          <Card icon={<LineChart className="text-sky-400"/>} title="Operational alpha">
            Shrinkage reduction targets (−50%), faster check-ins (&lt;5s), real-time anomaly flags.
          </Card>
          <Card icon={<Coins className="text-pink-400"/>} title="Aligned incentives">
            NFTs for access & perks; DazedCoin for rewards, gas discounts, governance.
          </Card>
        </section>

        {/* KPIs / traction placeholder */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <KPI label="Pilot pipeline" value="3–5 dispensaries" />
          <KPI label="Target shrinkage cut" value="−50%" />
          <KPI label="Avg. check-in" value="< 5s" />
        </section>

        {/* CTA */}
        <section className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-black/40 p-4">
          <div className="text-sm text-zinc-300">Interested in pilots, partnerships, or investing?</div>
          <a href="/#contact" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10">
            Contact us <ArrowRight size={16}/>
          </a>
        </section>
      </main>
    </div>
  );
}

function Card({ icon, title, children }: any) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="rounded-lg border border-zinc-700 bg-black/40 p-2">{icon}</div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <p className="text-sm text-zinc-300">{children}</p>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
