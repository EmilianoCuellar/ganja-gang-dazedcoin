// app/wallet/page.tsx
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  WalletCards,
  QrCode,
  Sparkles,
  Lock,
  Smartphone,
  Coins,
  Cloud,
  ArrowUpRight,
  ArrowDownLeft,
  IdCard,
  Image as ImageIcon,
} from "lucide-react";

export default function DazedWalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide">
                Dazed Wallet
              </span>
              <span className="text-xs text-zinc-400">
                The native wallet for the Dazed Blockchain
              </span>
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
        {/* Hero Section */}
        <section className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-pink-400">
              Coming Soon · Dazed Ecosystem
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Dazed Wallet:
              <span className="block text-transparent bg-gradient-to-r from-pink-500 via-emerald-400 to-sky-400 bg-clip-text">
                built for cannabis-native crypto.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-zinc-300 sm:text-base">
              Dazed Wallet is the first wallet purpose-built for the{" "}
              <span className="font-semibold text-emerald-300">Dazed Blockchain</span>,
              Proof of Product (PoP) inventory, and <span className="font-semibold">
              zk-ID</span> check-ins. It&apos;s where customers hold{" "}
              <span className="font-semibold">$Dazed</span>, manage Ganja Gang NFTs, and
              interact with dispensaries running on-chain.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-300">
                <Sparkles size={14} />
                v1 in design & prototyping
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                <ShieldCheck size={14} />
                PoP + zk-ID ready
              </span>
            </div>

            <div className="mt-8 grid gap-3 text-xs text-zinc-300 sm:text-sm">
              <div className="inline-flex items-center gap-2">
                <WalletCards size={16} className="text-pink-400" />
                Non-custodial, multi-chain wallet for $DZD and Ganja Gang NFTs
              </div>
              <div className="inline-flex items-center gap-2">
                <QrCode size={16} className="text-emerald-400" />
                One tap zk-ID check-ins and PoP-linked purchases
              </div>
              <div className="inline-flex items-center gap-2">
                <Smartphone size={16} className="text-sky-400" />
                iOS & Android first, with web wallet and browser extension later
              </div>
            </div>
          </div>

          {/* Right-side visual: wallet preview card */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.26),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(45,212,191,0.24),_transparent_55%)]" />
            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-[0_0_80px_rgba(236,72,153,0.25)]">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-pink-500 to-emerald-400" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-zinc-100">
                      Dazed Wallet
                    </span>
                    <span className="text-[11px] text-zinc-400">Preview · Mock UI</span>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  PoP Connected
                </span>
              </div>

              <div className="space-y-3">
                {/* Balance card */}
                <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Total Balance</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/90 px-2 py-0.5 text-[10px]">
                      <Coins size={12} className="text-emerald-300" />
                      Dazed Layer
                    </span>
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-zinc-50">
                    4,206.90 <span className="text-sm text-zinc-400">DZD</span>
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-300">
                    +12.4% · rewards from PoP-verified purchases
                  </div>
                </div>

                {/* Asset list */}
                <div className="grid gap-2 text-xs">
                  <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                    <div>
                      <div className="font-medium text-zinc-100">$Dazed</div>
                      <div className="text-[11px] text-zinc-400">Gas + rewards token</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">3,800</div>
                      <div className="text-[11px] text-emerald-300">Staked / earning</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                    <div>
                      <div className="font-medium text-zinc-100">Ganja Gang</div>
                      <div className="text-[11px] text-zinc-400">NFTs · 8 shown</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">x 4</div>
                      <div className="text-[11px] text-pink-300">RWA-linked perks</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2">
                    <div>
                      <div className="font-medium text-zinc-100">zk-ID</div>
                      <div className="text-[11px] text-zinc-400">Age/eligibility proofs</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-emerald-300">Cached · 24h</div>
                      <div className="text-[11px] text-zinc-500">No PII stored on-chain</div>
                    </div>
                  </div>
                </div>

                {/* Coming soon footer */}
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/70 px-3 py-2">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <Cloud size={13} className="text-sky-400" />
                    <span>
                      SDK + WalletConnect support{" "}
                      <span className="text-zinc-200">for builders</span>
                    </span>
                  </div>
                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-[10px] uppercase tracking-wide text-zinc-400">
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screen Gallery (for mobile devs) */}
        <section className="mt-12">
          <h2 className="text-lg font-semibold">Screen gallery (v1 concept)</h2>
          <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
            These mock screens show how Dazed Wallet behaves in practice: balances and rewards,
            fast zk-ID backed payments, and Ganja Gang NFTs under one roof.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* Home / Balances */}
            <PhoneFrame label="Home · Balances">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-zinc-400">Welcome back</div>
                  <div className="text-sm font-semibold">0xDazed…420</div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300">
                  zk-ID ready
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-gradient-to-br from-pink-500/20 via-emerald-500/10 to-zinc-900/80 p-3 border border-zinc-800">
                <div className="flex items-center justify-between text-[11px] text-zinc-200">
                  <span>Total balance</span>
                  <span className="text-zinc-400">Dazed layer</span>
                </div>
                <div className="mt-1 text-2xl font-semibold text-zinc-50">
                  4,206.90 <span className="text-xs text-zinc-300">DZD</span>
                </div>
                <div className="mt-1 text-[11px] text-emerald-300">
                  +142.3 DZD this month · PoP rewards
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-[11px]">
                <Row label="$Dazed" value="3,800 DZD" sub="Gas · rewards" accent="emerald" />
                <Row label="ETH" value="0.14" sub="Bridge · fees" accent="zinc" />
                <Row label="Ganja Gang" value="4 NFTs" sub="Tokenized access" accent="pink" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                <ActionPill icon={<ArrowUpRight size={13} />} label="Send" />
                <ActionPill icon={<ArrowDownLeft size={13} />} label="Receive" />
                <ActionPill icon={<QrCode size={13} />} label="Pay in-store" />
              </div>
            </PhoneFrame>

            {/* Send / Pay with zk-ID */}
            <PhoneFrame label="Pay · zk-ID enforced">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Pay to</span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    Dazed Dispensary · REG-03
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-100">
                  420.00 <span className="text-xs text-zinc-400">DZD</span>
                </div>

                <div className="mt-3 grid gap-2 rounded-lg bg-zinc-900/80 p-2">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-[11px] text-zinc-300">
                      <IdCard size={13} className="text-emerald-400" />
                      zk-ID: Age 21+ · MA-compliant
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Last check: &lt; 30s ago</span>
                    <span>No PII stored on-chain</span>
                  </div>
                </div>

                <div className="mt-3 grid gap-1 text-[10px] text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span>PoP batch</span>
                    <span className="font-mono text-zinc-300">0xFLOOR123 · 3.5g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location</span>
                    <span className="text-emerald-300">Floor (valid to sell)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Daily limit (MA adult-use)</span>
                    <span>3.5g / 28g used</span>
                  </div>
                </div>
              </div>

              <button className="mt-4 w-full rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-black hover:bg-emerald-400">
                Confirm payment
              </button>
              <p className="mt-2 text-[10px] text-zinc-500">
                If PoP or zk-ID fail (wrong batch, vault-only SKU, limit exceeded),
                the transaction is blocked before it hits the chain.
              </p>
            </PhoneFrame>

            {/* NFT Gallery */}
            <PhoneFrame label="Ganja Gang · NFTs">
              <div className="flex items-center justify-between text-[11px]">
                <div>
                  <div className="text-xs font-semibold text-zinc-100">Ganja Gang</div>
                  <div className="text-[10px] text-zinc-400">4 NFTs · 1 collection</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/10 px-2 py-1 text-[10px] text-pink-300">
                  <ImageIcon size={12} />
                  View on OpenSea
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Urban King", "Neon Oracle", "Meta Roller", "Sky High"].map((name, idx) => (
                  <div
                    key={name}
                    className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60"
                  >
                    <div className="h-20 bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-emerald-400/30" />
                    <div className="p-2 text-[10px]">
                      <div className="font-semibold text-zinc-100 truncate">
                        #{idx + 1} · {name}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-400">
                        <span>Utility: PoP perks</span>
                        <span className="text-emerald-300">Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[10px] text-zinc-500">
                Ganja Gang NFTs unlock rewards, VIP access, and PoP-linked perks
                across Dazed-enabled dispensaries.
              </p>
            </PhoneFrame>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mt-12 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<ShieldCheck className="text-emerald-400" size={18} />}
            title="Non-custodial & compliant"
            body="You own your keys. Dazed Wallet is built around regulatory realities in legal cannabis markets—age-gated, PoP-aware, and PII-minimal by design."
          />
          <FeatureCard
            icon={<Lock className="text-pink-400" size={18} />}
            title="zk-ID & purchase limits"
            body="Link zk-ID proofs and daily purchase limits per jurisdiction. Customers stay anonymous on-chain while dispensaries stay compliant."
          />
          <FeatureCard
            icon={<Smartphone className="text-sky-400" size={18} />}
            title="Retail-ready UX"
            body="Tap to check in, tap to pay. The wallet is designed for real customers at real dispensaries—not just crypto-native users."
          />
        </section>

        {/* Roadmap / Dev section */}
        <section className="mt-12 grid gap-8 border-t border-zinc-800 pt-8 lg:grid-cols-[1.2fr,1fr]">
          <div>
            <h2 className="text-lg font-semibold">Wallet roadmap</h2>
            <div className="mt-4 space-y-4 text-sm text-zinc-300">
              <RoadmapRow
                label="Phase 1 – Core wallet"
                detail="Hold/send $Dazed, view Ganja Gang NFTs, connect to Dazed dApps, and sign PoP transactions."
                status="In design"
              />
              <RoadmapRow
                label="Phase 2 – zk-ID + PoP integration"
                detail="Embed zk-ID passes and PoP incentives directly in the wallet, including visit streaks and inventory-linked rewards."
                status="Planned"
              />
              <RoadmapRow
                label="Phase 3 – Multi-tenant & white-label"
                detail="Offer dispensary-branded wallet skins and deeper POS integrations for operators who want a fully on-chain loyalty stack."
                status="Planned"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm">
            <h3 className="text-sm font-semibold text-zinc-100">
              For builders & partners
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Dazed Wallet will ship with a{" "}
              <span className="font-medium text-zinc-200">
                TypeScript/React SDK
              </span>{" "}
              and simple REST endpoints so POS systems and dApps can:
            </p>
            <ul className="mt-3 space-y-1 text-xs text-zinc-300">
              <li>• Request zk-ID proofs with purchase-limit checks</li>
              <li>• Trigger PoP events (receive, move, sell) from the wallet</li>
              <li>• Read $DZD balances and reward states</li>
              <li>• Deep link from SMS or push into a specific action</li>
            </ul>
            <p className="mt-4 text-xs text-zinc-400">
              Interested in integrating early? Reach out via{" "}
              <Link
                href="/contact"
                className="text-pink-400 hover:text-pink-300"
              >
                the contact page
              </Link>{" "}
              and mention &quot;Dazed Wallet early access&quot;.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------ Small UI helpers ------------ */

function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-xs font-medium text-zinc-300">{label}</div>
      <div className="relative h-[360px] w-[210px] rounded-[2.4rem] border border-zinc-800 bg-zinc-950 p-3 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        {/* top notch */}
        <div className="mx-auto mb-3 h-5 w-24 rounded-full bg-black/70" />
        <div className="flex h-[300px] flex-col gap-2 overflow-hidden rounded-2xl bg-zinc-950/90 p-3 border border-zinc-800 text-[11px]">
          {children}
        </div>
        {/* bottom bar */}
        <div className="mt-2 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-zinc-700/80" />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: "emerald" | "pink" | "zinc";
}) {
  const accentClass =
    accent === "emerald"
      ? "text-emerald-300"
      : accent === "pink"
      ? "text-pink-300"
      : "text-zinc-300";

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950/80 px-2 py-1.5">
      <div>
        <div className="text-[11px] text-zinc-200">{label}</div>
        <div className="text-[10px] text-zinc-500">{sub}</div>
      </div>
      <div className={`text-[11px] font-mono ${accentClass}`}>{value}</div>
    </div>
  );
}

function ActionPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="inline-flex items-center justify-center gap-1 rounded-full border border-zinc-800 bg-zinc-950/80 px-2 py-1 text-[11px] text-zinc-200 hover:border-zinc-600">
      {icon}
      {label}
    </button>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-100">
        {icon}
        {title}
      </div>
      <p className="text-xs text-zinc-400">{body}</p>
    </div>
  );
}

function RoadmapRow({
  label,
  detail,
  status,
}: {
  label: string;
  detail: string;
  status: "In design" | "Planned" | "Live" | string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-zinc-100">{label}</div>
        <span className="rounded-full border border-zinc-700 bg-zinc-950 px-2 py-0.5 text-[11px] text-zinc-300">
          {status}
        </span>
      </div>
      <p className="mt-2 text-xs text-zinc-400">{detail}</p>
    </div>
  );
}
