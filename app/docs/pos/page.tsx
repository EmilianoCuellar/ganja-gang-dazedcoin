"use client";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow } from "@/components/Decor";
import { Upload, Link2 } from "lucide-react";

export default function POSDocs() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      <Glow />
      <Section className="pt-12 text-center">
        <h1 className="text-4xl font-extrabold">POS & METRC Bridge</h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">Export formats & field mapping.</p>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-3">
          <Card><Upload className="mb-2 text-pink-400"/><h3 className="text-lg font-semibold">CSV Exports</h3><p className="mt-1 text-sm text-zinc-300">Flowhub / Treez / BioTrack</p></Card>
          <Card><Link2 className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Field Mapping</h3><p className="mt-1 text-sm text-zinc-300">sku, metrcId → packageIdHash</p></Card>
          <Card><h3 className="text-lg font-semibold">Webhooks</h3><p className="mt-1 text-sm text-zinc-300">Real-time PoP anchoring</p></Card>
        </div>
      </Section>
    </div>
  );
}
