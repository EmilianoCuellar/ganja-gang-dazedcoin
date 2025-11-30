"use client";

import { Layers } from "lucide-react";

export default function PoPSection() {
  return (
    <section id="pop" className="py-20 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <Layers className="text-emerald-400" />
          <h2 className="text-3xl font-bold">Proof of Product (PoP)</h2>
        </div>

        <p className="max-w-3xl text-zinc-300">
          PoP authenticates each cannabis product with an on-chain receipt tied to its package ID. 
          Movements like intake, transfer, and sale create cryptographic events—improving reconciliation, reducing shrinkage, and enabling data-driven audits without exposing PII.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "Physical → Digital", text: "Each package ID is mapped to a tamper-evident, on-chain PoP record." },
            { title: "Transparency", text: "Lifecycle is traceable from intake to sale while preserving privacy." },
            { title: "Aligned Incentives", text: "Auditor bounties & rewards for verified, accurate reporting." },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h3 className="text-lg font-semibold text-emerald-400">{c.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
