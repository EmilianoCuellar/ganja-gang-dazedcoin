// app/faq/page.tsx
"use client";

import { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does Dazed minimize inventory discrepancies (e.g., vault vs. floor mix-ups)?",
      a: `Dazed makes every batch location-aware on-chain and forces the POS to sign Proof of Product (PoP) events for any move or sale.
A sale is only valid if the batch is on the floor, sellable, and has available quantity. If a cashier picks a vault batch for a floor sale, 
the transaction is blocked with a clear prompt to perform a Move event first. Every move and sale is signed by user and terminal, 
creating an auditable trail. The result: fewer silent mismatches, automatic reconciliation, and a measurable reduction in shrinkage
(our pilot goal: −50% within 90 days).`
    },
    {
      q: "What is Proof of Product (PoP)?",
      a: `PoP is our smart contract protocol that logs every inventory movement—Receive, Move, and Sell—as verified blockchain events.
Each event is signed by the POS terminal, staff member, and store key. This ensures transparency, traceability, and compliance integrity.`
    },
    {
      q: "Can Dazed integrate with my current POS system?",
      a: `Yes. Dazed uses lightweight SDKs and APIs to integrate with existing dispensary POS systems such as Flowhub or Blaze.
The connector signs events in the background, so staff workflow remains the same—no extra steps.`
    },
    {
      q: "What metrics can I track as an owner or investor?",
      a: `Our dashboard provides real-time KPIs: shrinkage reduction, wrong-location sell attempts, move events per terminal,
and time-to-reconcile discrepancies. These are visible daily for each location.`
    },
    {
      q: "What happens if my POS goes offline?",
      a: `Offline POS terminals cache signed events locally and sync to the blockchain once reconnected.
Smart timestamp validation ensures no duplication or out-of-order events.`
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-zinc-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Dazed FAQ</h1>
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-zinc-800 py-4">
            <button
              className="flex w-full justify-between items-center text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-semibold text-lg text-emerald-400">{f.q}</span>
              <span>{openIndex === i ? "−" : "+"}</span>
            </button>
            {openIndex === i && (
              <p className="mt-2 text-zinc-300 leading-relaxed whitespace-pre-line">
                {f.a}
              </p>
            )}
          </div>
        ))}
        <div className="mt-10 text-center">
          <a href="/" className="text-emerald-400 hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
