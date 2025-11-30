"use client";

import Link from "next/link";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow, DemoPanel } from "@/components/Decor";
import {
  Building2, IdCard, ShieldCheck, Boxes, FileCode, BookOpen, Link2, LifeBuoy, ArrowRight
} from "lucide-react";

export default function DispensaryHub() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      <Glow />

      <Section className="pt-12 text-center">
        <div className="mx-auto max-w-4xl">
          <span className="rounded-lg border border-pink-500/30 px-2 py-1 text-xs text-pink-300">
            Dispensary Suite
          </span>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Onboard to the Dazed Blockchain</h1>
          <p className="mx-auto mt-3 max-w-3xl text-zinc-400">
            Identity, Proof-of-Product, and inventory—shipped as modular tools that plug into your current POS.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/dispensary/inventory/upload" className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600">
              Start Upload
            </Link>
            <Link href="/inventory/walkthrough" className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-100 hover:border-zinc-500">
              Walkthrough
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card><IdCard className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Dazed-ID</h3><p className="mt-2 text-sm text-zinc-300">Age/eligibility via zk-proofs—no PII on chain.</p><Link className="mt-3 inline-flex items-center gap-1 text-sm text-emerald-400 underline" href="/dazed-id">Open <ArrowRight size={14}/></Link></Card>
          <Card><ShieldCheck className="mb-2 text-pink-400"/><h3 className="text-lg font-semibold">PoP Integration</h3><p className="mt-2 text-sm text-zinc-300">Anchor Intake/Move/Sell events to PoP.</p><Link className="mt-3 inline-flex items-center gap-1 text-sm text-emerald-400 underline" href="/pop">Open <ArrowRight size={14}/></Link></Card>
          <Card><Boxes className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Inventory</h3><p className="mt-2 text-sm text-zinc-300">Normalize, dedupe, reconcile, export to POS.</p><div className="mt-3 flex gap-3"><Link className="text-sm text-emerald-400 underline" href="/dispensary/inventory">Dashboard</Link><Link className="text-sm text-emerald-400 underline" href="/dispensary/inventory/upload">Upload</Link></div></Card>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-5">
          <Card className="md:col-span-2"><h4 className="text-sm text-zinc-400">This Week</h4><div className="mt-2 text-3xl font-bold">+1,284</div><p className="text-sm text-zinc-400">PoP events anchored</p></Card>
          <Card className="md:col-span-1"><h4 className="text-sm text-zinc-400">Shrinkage</h4><div className="mt-2 text-3xl font-bold">-42%</div><p className="text-sm text-zinc-400">vs baseline</p></Card>
          <Card className="md:col-span-1"><h4 className="text-sm text-zinc-400">Avg. check-in</h4><div className="mt-2 text-3xl font-bold">&lt; 5s</div></Card>
          <Card className="md:col-span-1"><h4 className="text-sm text-zinc-400">Auditor bounties</h4><div className="mt-2 text-3xl font-bold">$1.2k</div></Card>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <DemoPanel title="Bridge: POS → PoP" subtitle="Flow">
            <ol className="grid gap-2 text-sm text-zinc-300">
              <li><span className="rounded bg-zinc-800/60 px-2 py-1">1</span> Export METRC/Flowhub CSV → <span className="text-emerald-400">Upload</span></li>
              <li><span className="rounded bg-zinc-800/60 px-2 py-1">2</span> Normalize & dedupe → create <em>Intake</em> events</li>
              <li><span className="rounded bg-zinc-800/60 px-2 py-1">3</span> Batch anchor to Dazed PoP</li>
              <li><span className="rounded bg-zinc-800/60 px-2 py-1">4</span> Dashboard shows status + explorer links</li>
            </ol>
          </DemoPanel>

          <DemoPanel title="Developer Kit" subtitle="SDK & API">
            <pre className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs">
{`npm i @ganjagang/sdk
import { createClient } from "@ganjagang/sdk";
const client = createClient({ apiKey: process.env.DAZED_API_KEY });

await client.pop.intake({ packageIdHash, qty, ts });
await client.inventory.export({ format: "flowhub" });`}
            </pre>
          </DemoPanel>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card><FileCode className="mb-2 text-pink-400"/><h3 className="text-lg font-semibold">Inventory Contract</h3><p className="mt-2 text-sm text-zinc-300">Events: Intake, Move, Sell, Adjust.</p><Link className="mt-3 inline-block text-sm text-emerald-400 underline" href="/contracts/inventory">View ABI</Link></Card>
          <Card><BookOpen className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Docs</h3><div className="mt-2 flex gap-4 text-sm"><Link className="text-emerald-400 underline" href="/docs/api">API</Link><Link className="text-emerald-400 underline" href="/docs/sdk">SDK</Link><Link className="text-emerald-400 underline" href="/docs/pos">POS Bridge</Link></div></Card>
          <Card><LifeBuoy className="mb-2 text-pink-400"/><h3 className="text-lg font-semibold">Support</h3><p className="mt-2 text-sm text-zinc-300">Onboarding & SLAs.</p><Link className="mt-3 inline-block text-sm text-emerald-400 underline" href="/support">Contact</Link></Card>
        </div>
      </Section>
    </div>
  );
}
