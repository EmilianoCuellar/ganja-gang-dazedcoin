"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import WalletButton from "@/components/WalletButton";
import {
  Upload, FileDown, CheckCircle2, ShieldCheck, Package, ScanLine,
  ArrowRight, Wallet, Server, Link2, Home
} from "lucide-react";

type Step = {
  n: number;
  title: string;
  desc: string;
  icon: any;
  extra?: React.ReactNode;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: "Connect wallet & pass zk-ID gate",
    desc:
      "Staff or admin connects a wallet and verifies age/eligibility with zero-knowledge proof—no PII stored on-chain.",
    icon: Wallet,
    extra: (
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
        <li>Click <strong>Connect Wallet</strong></li>
        <li>Complete zk-ID check (toggle in settings when live)</li>
        <li>Role-based access: Admin, Staff, Auditor</li>
      </ul>
    ),
  },
  {
    n: 2,
    title: "Prepare inventory CSV",
    desc:
      "Export from METRC/Flowhub or fill our template with package and quantity data.",
    icon: Upload,
    extra: (
      <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
        Required: <code>metrcId, sku, unitCount</code><br />
        Optional: <code>strain, category, grams, location</code>
      </div>
    ),
  },
  {
    n: 3,
    title: "Upload & validate",
    desc:
      "Upload CSV on the Upload page. The backend normalizes rows, checks duplicates, and stores them.",
    icon: Server,
    extra: (
      <p className="mt-3 text-sm text-zinc-300">
        Each row creates an <strong>Intake</strong> PoP event off-chain, queued for anchoring on the Dazed chain.
      </p>
    ),
  },
  {
    n: 4,
    title: "Anchor PoP events on-chain",
    desc:
      "A background worker batches and submits Intake/Move/Sell events to the PoP contract.",
    icon: Link2,
    extra: (
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
        <li>Hashes METRC IDs for privacy, emits <code>Intake</code> with <code>packageIdHash</code></li>
        <li>Tx status appears on your dashboard with explorer links</li>
      </ul>
    ),
  },
  {
    n: 5,
    title: "Monitor inventory & reconcile",
    desc:
      "Search, filter, and track units on the dashboard. Reconcile discrepancies and create Adjust events.",
    icon: Package,
    extra: (
      <p className="mt-3 text-sm text-zinc-300">
        KPIs: shrinkage %, units on hand, verified sales %, auditor flags.
      </p>
    ),
  },
  {
    n: 6,
    title: "Compliance & rewards",
    desc:
      "zk-ID ensures age-gating and compliant access; verified activity can trigger $DAZED rewards.",
    icon: ShieldCheck,
  },
];

function StepCard({ s, side }: { s: Step; side: "left" | "right" }) {
  return (
    <div
      className={[
        "relative md:col-span-6",
        side === "left" ? "md:col-start-1" : "md:col-start-7",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute top-8 hidden h-3 w-3 -translate-y-1/2 rounded-full md:block",
          side === "left" ? "right-[-0.40rem]" : "left-[-0.40rem]",
          "bg-pink-500 shadow-[0_0_0_4px_rgba(236,72,153,0.15)]",
        ].join(" ")}
      />
      <Card className="relative">
        <div className="absolute -left-3 top-5 hidden h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white md:flex">
          {s.n}
        </div>
        <div className="flex items-start gap-3">
          <s.icon className="mt-1 shrink-0 text-emerald-400" />
          <div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{s.desc}</p>
            {s.extra}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function InventoryWalkthrough() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo + Home link */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <span className="text-lg font-semibold tracking-wide">Ganja Gang</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/dispensary/inventory" className="text-sm text-zinc-300 hover:text-white">
              Dashboard
            </Link>
            <Link href="/inventory/upload" className="text-sm text-zinc-300 hover:text-white">
              Upload
            </Link>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section className="pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold sm:text-5xl"
          >
            From Physical Inventory to On-Chain Proofs
          </motion.h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            A step-by-step guide for dispensaries to upload inventory, pass zk-ID, and anchor PoP events on the Dazed Blockchain.
          </p>

          {/* CTA Buttons */}
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <Link
              href="/inventory/upload"
              className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
            >
              Start Upload <ArrowRight size={16} />
            </Link>
            <a
              href="/inventory-template.csv"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:border-zinc-500"
            >
              <FileDown size={16} /> CSV Template
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-600/10"
            >
              <Home size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <section className="relative mx-auto max-w-6xl px-6">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-zinc-800 md:block" />
        <div className="grid grid-cols-12 gap-6">
          {STEPS.map((s, i) => (
            <StepCard key={s.n} s={s} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      </section>

      {/* CTA cards */}
      <Section>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card>
            <CheckCircle2 className="mb-2 text-emerald-400" />
            <h3 className="text-lg font-semibold">Go to Upload</h3>
            <p className="mt-2 text-sm text-zinc-300">Push your first CSV and see items appear instantly.</p>
            <Link href="/inventory/upload" className="mt-4 inline-block text-sm text-emerald-400 underline">
              Upload inventory
            </Link>
          </Card>
          <Card>
            <ScanLine className="mb-2 text-pink-400" />
            <h3 className="text-lg font-semibold">View Dashboard</h3>
            <p className="mt-2 text-sm text-zinc-300">Search/filter items, watch totals, and track PoP status.</p>
            <Link href="/inventory" className="mt-4 inline-block text-sm text-emerald-400 underline">
              Open dashboard
            </Link>
          </Card>
          <Card>
            <ShieldCheck className="mb-2 text-emerald-400" />
            <h3 className="text-lg font-semibold">POS & METRC Bridge</h3>
            <p className="mt-2 text-sm text-zinc-300">
              Export to POS/Flowhub today; METRC webhook and Dazed anchoring are queued automatically.
            </p>
            <Link href="/strains" className="mt-4 inline-block text-sm text-emerald-400 underline">
              Tokenized strains
            </Link>
          </Card>
        </div>
      </Section>
    </div>
  );
}
