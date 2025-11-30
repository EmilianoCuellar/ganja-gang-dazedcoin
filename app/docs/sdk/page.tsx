"use client";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow } from "@/components/Decor";
import { FileCode } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";
import { CodeBlock } from "@/components/Code";

export default function SDKDocs() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      <HeaderBar title="TypeScript SDK" />
      <Glow />
      <Section className="pt-12 text-center">
        <h1 className="text-4xl font-extrabold">TypeScript SDK</h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">Post PoP events, manage inventory, export to POS.</p>
      </Section>
      <Section className="pt-0">
        <Card>
          <div className="mb-2 flex items-center gap-2"><FileCode className="text-pink-400"/><h3 className="text-lg font-semibold">Install</h3></div>
          <pre className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs">
          <CodeBlock
  caption="Install"
  code={`npm i @ganjagang/sdk
import { createClient } from "@ganjagang/sdk";
const client = createClient({ apiKey: process.env.DAZED_API_KEY });`}
/>

          </pre>
        </Card>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card><h4 className="font-semibold">pop.intake()</h4><p className="mt-1 text-sm text-zinc-300">Anchor intake events</p></Card>
          <Card><h4 className="font-semibold">inventory.uploadCSV()</h4><p className="mt-1 text-sm text-zinc-300">Normalize & store</p></Card>
          <Card><h4 className="font-semibold">pos.export()</h4><p className="mt-1 text-sm text-zinc-300">Flowhub/Treez formats</p></Card>
        </div>
      </Section>
    </div>
  );
}
