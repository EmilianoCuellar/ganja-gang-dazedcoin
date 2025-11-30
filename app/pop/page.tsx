"use client";

import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow, DemoPanel } from "@/components/Decor";
import { Boxes, Upload, Link2, ShieldCheck } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import { CodeBlock } from "@/components/Code";

export default function PoP() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
        <HeaderBar title="Dazed (PoP) Integration" subtitle="Intake → Move → Sell" />
      <Glow />
      <Section className="pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold">Dazed (PoP) Integration</h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">Map METRC packages and POS events to immutable PoP receipts.</p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <DemoPanel title="Event Flow" subtitle="Intake → Move → Sell">
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Upload className="text-pink-400" /> Intake <span className="text-zinc-400">— create package hash</span>
              </div>
              <div className="flex items-center gap-2">
                <Boxes className="text-emerald-400" /> Move <span className="text-zinc-400">— location/owner change</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-400" /> Sell <span className="text-zinc-400">— qty deducted, receipt anchored</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-zinc-800">
                <div className="h-full w-1/3 animate-[slide_3s_linear_infinite] bg-gradient-to-r from-pink-500 to-emerald-400" />
              </div>
              <style jsx>{`
                @keyframes slide {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(300%); }
                }
              `}</style>
            </div>
          </DemoPanel>

          <DemoPanel title="Code" subtitle="SDK">
          <CodeBlock
  caption="SDK"
  code={`import { pop } from "@ganjagang/sdk";

// Hash package ID client-side for privacy
const packageIdHash = await pop.hash("METRC-PKG-123");

// Anchor an Intake event
await pop.intake({ packageIdHash, qty: 24, ts: Date.now() });

// Later...
await pop.sell({ packageIdHash, qty: 1, ts: Date.now() });`}
/>
          </DemoPanel>
        </div>
      </Section>

      <Section className="pt-0">
        <Card>
          <h3 className="text-lg font-semibold">Security & Privacy</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-300">
            <li>Only hashed package IDs leave your system</li>
            <li>Batching minimizes fees and spikes</li>
            <li>Explorer links for every anchored receipt</li>
          </ul>
        </Card>
      </Section>
    </div>
    
  );
}
