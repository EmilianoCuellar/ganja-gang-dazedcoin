// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  CalendarClock,
  ShieldCheck,
} from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect to Formspree / API / email service.
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide">
                Ganja Gang × Dazed Blockchain
              </span>
              <span className="text-xs text-zinc-400">Contact & Demo Requests</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[1.3fr,1fr] md:items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let’s talk pilots, integrations, and partnerships.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
              Whether you&apos;re a{" "}
              <span className="font-semibold text-pink-400">dispensary operator</span>{" "}
              exploring Dazed inventory and zk-ID, an{" "}
              <span className="font-semibold text-emerald-400">investor</span> looking
              at the Ganja Gang × Dazed ecosystem, or media / general interest—
              this is the best way to reach us.
            </p>

            {/* Quick cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <Building2 size={14} className="text-pink-400" />
                  Dispensary pilots
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  Dazed inventory, zk-ID check-in, and POS integration for
                  legal state and multi-state operators.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <CalendarClock size={14} className="text-emerald-400" />
                  Investor demos
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  30–45 minute deep-dives into Proof of Product, tokenomics, and the Dazed
                  blockchain roadmap.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                  <ShieldCheck size={14} className="text-sky-400" />
                  Compliance & security
                </div>
                <p className="mt-2 text-xs text-zinc-400">
                  Discuss age-gated zk-ID, PII-minimal design, and audit-ready
                  inventory flows.
                </p>
              </div>
            </div>

            {/* Direct channels */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
              <div className="inline-flex items-center gap-2">
                <Mail size={14} className="text-zinc-300" />
                <span>
                  Email:{" "}
                  <a
                    className="text-pink-400 hover:text-pink-300"
                    href="mailto:contact@ganjagang.xyz"
                  >
                    contact@ganjagang.xyz
                  </a>
                </span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Phone size={14} className="text-zinc-300" />
                <span>Phone for scheduled calls only (shared after booking).</span>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-xl shadow-pink-500/5">
            <h2 className="text-sm font-semibold text-zinc-100">
              Send us a message
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              We usually respond within 1–2 business days.
            </p>

            <form className="mt-4 space-y-3 text-sm" onSubmit={handleSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Name
                  </label>
                  <input
                    required
                    name="name"
                    className="w-full rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 outline-none focus:border-pink-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Work email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 outline-none focus:border-pink-500"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Company / Dispensary
                  </label>
                  <input
                    name="company"
                    className="w-full rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 outline-none focus:border-pink-500"
                    placeholder="Brand or license name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    What best describes you?
                  </label>
                  <select
                    name="persona"
                    className="w-full rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 outline-none focus:border-pink-500"
                  >
                    <option value="dispensary">Dispensary / MSO</option>
                    <option value="investor">Investor / VC</option>
                    <option value="brand">Brand / cultivator</option>
                    <option value="media">Media / press</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  Topic
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 text-xs">
                    <input
                      type="radio"
                      name="topic"
                      value="pilot"
                      defaultChecked
                      className="accent-pink-500"
                    />
                    Dispensary pilot / integration
                  </label>
                  <label className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 text-xs">
                    <input
                      type="radio"
                      name="topic"
                      value="investor"
                      className="accent-pink-500"
                    />
                    Investor / tokenomics deep-dive
                  </label>
                  <label className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 text-xs">
                    <input
                      type="radio"
                      name="topic"
                      value="media"
                      className="accent-pink-500"
                    />
                    Media / partnership
                  </label>
                  <label className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 text-xs">
                    <input
                      type="radio"
                      name="topic"
                      value="other"
                      className="accent-pink-500"
                    />
                    Other
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  How can we help?
                </label>
                <textarea
                  required
                  name="message"
                  className="h-28 w-full rounded-lg border border-zinc-700 bg-black/40 px-3 py-2 text-sm outline-none focus:border-pink-500"
                  placeholder="Tell us about your dispensary, tech stack, or what you’d like to see in a demo."
                />
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  name="nda"
                  className="accent-pink-500"
                />
                I&apos;d like to discuss under NDA (optional).
              </label>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-black hover:bg-pink-400"
              >
                {status === "sent" ? "Message sent ✓" : "Send message"}
              </button>

              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                
               
              </p>
            </form>
          </div>
        </section>

        {/* Helpful links */}
        <section className="mt-10 grid gap-4 border-t border-zinc-800 pt-6 text-sm sm:grid-cols-3">
          <Link
            href="/faq"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-600"
          >
            <div className="text-xs font-semibold text-zinc-200">
              FAQ: Proof of Product, zk-ID & inventory
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Common questions investors and operators ask about shrinkage,
              compliance, and performance.
            </p>
          </Link>
          <Link
            href="/inventory/dashboard"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-600"
          >
            <div className="text-xs font-semibold text-zinc-200">
              Inventory dashboard preview
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              See how Dazed maps real-world SKUs to on-chain inventory and audit
              trails.
            </p>
          </Link>
          <Link
            href="/demo/pos"
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-600"
          >
            <div className="text-xs font-semibold text-zinc-200">
              POS & daily-limit demo
            </div>
            <p className="mt-2 text-xs text-zinc-400">
              Explore how Dazed enforces batch, location, and purchase limits
              without slowing checkout.
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
