// app/docs/page.tsx
"use client";

import Link from "next/link";
import HeaderBar from "@/components/HeaderBar";
import { Badge } from "@/components/Badge";
import { FileCode2, Webhook, Boxes, Key, ArrowRight } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <HeaderBar
        title="Dazed Docs"
        subtitle="Quickstarts • REST API • Webhooks • Schemas"
        right={<Link href="/" className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:border-zinc-600">Home</Link>}
      />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-8 rounded-2xl border border-zinc-800 bg-black/40 p-6">
          <Badge>Start here</Badge>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Build on the Dazed stack</h1>
          <p className="mt-2 max-w-3xl text-zinc-300">
            Integrate zk-ID, PoP events, and inventory flows. Use our REST endpoints now; SDKs are coming.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="#quickstart" className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600">
              Quickstart <ArrowRight size={16}/>
            </Link>
            <Link href="/api/openapi.json" className="rounded-xl border border-zinc-800 px-4 py-2 text-sm hover:border-zinc-600">
              OpenAPI (stub)
            </Link>
          </div>
        </section>

        <section id="quickstart" className="grid gap-4 sm:grid-cols-3">
          <DocCard icon={<FileCode2 />} title="Inventory API">
            POST /api/inventory/upload — map CSV/METRC → Dazed PoP receipts. <Link href="/docs/inventory" className="underline">Learn more</Link>.
          </DocCard>
          <DocCard icon={<Webhook />} title="Webhooks">
            Receive PoP confirmations & anomaly flags at your endpoint.
          </DocCard>
          <DocCard icon={<Boxes />} title="PoP Events">
            Event schema: intake, move, sell. Deterministic IDs + signatures.
          </DocCard>
        </section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-6">
          <div className="mb-2 text-sm text-zinc-400">Auth</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm">
              <div className="mb-2 flex items-center gap-2"><Key className="text-emerald-400"/><b>API Keys</b></div>
              Send <code className="rounded bg-zinc-900 px-1 py-0.5">Authorization: Bearer &lt;key&gt;</code> on every request.
            </div>
            <div className="rounded-xl border border-zinc-800 bg-black/30 p-4 text-sm">
              <b>Rate limits</b><br/> 60 req/min per key (burst 120). Contact us for higher limits.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function DocCard({ icon, title, children }: any) {
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
