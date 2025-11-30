"use client";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow } from "@/components/Decor";
import { LifeBuoy, Mail, MessageSquare } from "lucide-react";

export default function Support() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      <Glow />
      <Section className="pt-12 text-center">
        <h1 className="text-4xl font-extrabold">Support & Onboarding</h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">Pilot setup, training, and SLAs.</p>
      </Section>
      <Section className="pt-0">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <Card><Mail className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Email</h3><p className="mt-1 text-sm text-zinc-300">invest@ganjagang.xyz</p></Card>
          <Card><MessageSquare className="mb-2 text-pink-400"/><h3 className="text-lg font-semibold">Response time</h3><p className="mt-1 text-sm text-zinc-300">24–48h (Mon–Fri)</p></Card>
          <Card><LifeBuoy className="mb-2 text-emerald-400"/><h3 className="text-lg font-semibold">Pilot program</h3><p className="mt-1 text-sm text-zinc-300">Limited slots per quarter</p></Card>
        </div>
      </Section>
    </div>
  );
}
