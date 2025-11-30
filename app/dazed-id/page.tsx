"use client";

import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow } from "@/components/Decor";
import { IdCard, ShieldCheck, QrCode, Smartphone } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";

export default function DazedID() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
        <HeaderBar title="Dazed-ID" subtitle="Private, zk-proof identity" />
      <Glow />
      <Section className="pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="rounded-lg border border-emerald-500/30 px-2 py-1 text-xs text-emerald-300">Coming soon</span>
          <h1 className="mt-3 text-4xl font-extrabold">Dazed-ID</h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">
            Zero-knowledge age & eligibility pass. Prove what’s needed—never reveal PII.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          {/* Phone mock */}
          <div className="relative mx-auto w-full max-w-xs">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-4 shadow-2xl">
              <div className="mx-auto h-1.5 w-24 rounded-full bg-zinc-800" />
              <div className="mt-6 text-center">
                <Smartphone className="mx-auto text-pink-400" />
                <h3 className="mt-2 font-semibold">Dazed-ID Wallet Pass</h3>
                <div className="mx-auto mt-4 w-40 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
                  <QrCode className="mx-auto h-20 w-20 text-emerald-400" />
                </div>
                <p className="mt-3 text-xs text-zinc-400">Scan at entry. zk-proof happens on device.</p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="grid gap-4">
            <Card><ShieldCheck className="mb-1 text-emerald-400"/><h3 className="text-lg font-semibold">Age-gate w/out PII</h3><p className="mt-1 text-sm text-zinc-300">Prove 21+ (or local threshold) via zk-proof—no birthdate stored.</p></Card>
            <Card><IdCard className="mb-1 text-pink-400"/><h3 className="text-lg font-semibold">Reusable Credentials</h3><p className="mt-1 text-sm text-zinc-300">Fast check-ins and staff roles on a single pass.</p></Card>
            <Card><QrCode className="mb-1 text-emerald-400"/><h3 className="text-lg font-semibold">POS Bridges</h3><p className="mt-1 text-sm text-zinc-300">Drop-in scanning for Flowhub/Treez with SDK helpers.</p></Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
