"use client";
import WalletButton from "@/components/WalletButton";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ShieldCheck, Zap, Layers, Lock, Coins, LineChart, Users, Leaf,
  CheckCircle2, Twitter, Globe, Github, FileText, Mail, Wallet
} from "lucide-react";
import { Section } from "@/components/Section";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { Menu, X, ChevronDown, Building2, Boxes, Link2, FileCode, BookOpen, LifeBuoy, IdCard } from "lucide-react";
import Link from "next/link";
import HeroDemo from "@/components/HeroDemo";

export default function Nav() {
    const [dispOpen, setDispOpen] = useState(false);
    const [ecoOpen, setEcoOpen] = useState(false);
    const [open, setOpen] = useState(false);
    

const brand = {
  bg: "from-black via-zinc-900 to-black",
};

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b ${brand.bg} text-zinc-100 selection:bg-pink-500/30 selection:text-white`}>
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <span className="text-lg font-semibold tracking-wide">Ganja Gang</span>
            <Badge>PoP + zk-ID</Badge>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="/strains" className="text-sm text-zinc-300 hover:text-white">Tokenized Strains</a>
            <a href="/mint" className="text-sm text-zinc-300 hover:text-white">Mint</a>
            {/* NEW: Ecosystem full page */}
            <a href="/ecosystem" className="text-sm text-zinc-300 hover:text-white">Ecosystem</a>
            <Link
  href="/wallet"
  className="text-sm text-zinc-300 hover:text-white"
>
  Dazed Wallet
</Link>

            {/* Dispensary dropdown */}
<div className="relative">
  <button
    onClick={() => {
      setEcoOpen(false);
      setOpen(false);
      setDispOpen((v) => !v);
    }}
    className="inline-flex items-center gap-1 text-sm text-zinc-300 hover:text-white"
  >
    Dispensary <ChevronDown size={14} className="opacity-70" />
  </button>
  {dispOpen && (
    <div
      onMouseLeave={() => setDispOpen(false)}
      className="absolute right-0 mt-2 grid w-[320px] gap-1 rounded-xl border border-zinc-800 bg-zinc-950/95 p-2 shadow-xl"
    >
      <Link href="/dispensary" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <Building2 size={16}/> Overview
      </Link>
      <Link href="/dazed-id" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <IdCard size={16}/> Dazed-ID (coming soon)
      </Link>
      <Link href="/pop" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <ShieldCheck size={16}/> Dazed (PoP) Integration
      </Link>
      <Link
      href="/demo/pos"
      className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
    >
      POS Demo
    </Link>
      <div className="my-1 h-px bg-zinc-800" />
      <Link href="/dispensary/inventory" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <Boxes size={16}/> Inventory Dashboard
      </Link>
      <Link href="/dispensary/inventory/upload" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <Link2 size={16}/> Upload CSV
      </Link>
      <Link href="/inventory/walkthrough" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <BookOpen size={16}/> Walkthrough
      </Link>
      <div className="my-1 h-px bg-zinc-800" />
      <Link href="/contracts/inventory" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <FileCode size={16}/> Inventory Contract
      </Link>
      <Link href="/docs/sdk" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <FileCode size={16}/> SDK
      </Link>
      <Link href="/docs/api" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <BookOpen size={16}/> API
      </Link>
      <Link href="/docs/pos" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <Link2 size={16}/> POS & METRC Bridge
      </Link>
      <div className="my-1 h-px bg-zinc-800" />
      <Link href="/support" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <LifeBuoy size={16}/> Support
      </Link>
    </div>
  )}
</div>
          </nav>
          

          <div className="flex items-center gap-3">
           
          <Link
  href="/contact"
  className="rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-400"
>
  Contact
</Link>

            {/* NEW: Connect Wallet */}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section id="home" className="pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge>Real-World Asset × Cannabis × Blockchain</Badge>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Cannabis inventory without shrinkage.
                <span className="block bg-gradient-to-r from-pink-500 to-emerald-400 bg-clip-text text-transparent"> Powered by Dazed.</span>
              </h1>
              <p className="mt-4 max-w-xl text-zinc-300">
                Ganja Gang is an NFT collection with utility that solves a $10B+ industry pain: inventory loss and compliance friction. Each NFT is tied to real product flow via <strong>Proof of Product (PoP) consensus</strong> and private, on-chain <strong>zk-ID</strong>.
                We turn fans into auditors, and dispensaries into provably efficient operators.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#utility" className="rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white hover:bg-pink-600">Explore Utility</a>
                <a href="#economics" className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-500">View Economics</a>
                <a href="#deck" className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 px-5 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10">
                  <FileText size={16}/> Deck
                </a>
                {/* Optional CTA to Ecosystem page */}
                <a href="/ecosystem" className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-500">
                  Explore Ecosystem
                </a>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <Card>
                  <div className="text-sm text-zinc-400">Targeted Shrinkage Cut</div>
                  <div className="mt-1 text-2xl font-bold">−50%</div>
                </Card>
                <Card>
                  <div className="text-sm text-zinc-400">Avg. Check-in Time</div>
                  <div className="mt-1 text-2xl font-bold">&lt; 5s</div>
                </Card>
                <Card>
                  <div className="text-sm text-zinc-400">On-chain Proofs</div>
                  <div className="mt-1 text-2xl font-bold">zk-ID + PoP</div>
                </Card>
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-pink-500/20 via-emerald-500/10 to-transparent blur-2xl"/>
              <Card className="p-0">
  <HeroDemo />
</Card>

            </div>
          </motion.div>
        </div>
      </Section>

      {/* Investment Thesis */}
      <Section id="thesis">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-emerald-400"/>
              <h3 className="text-lg font-semibold">Compliance-first</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Integrates with regulated tracking and notarizes key events on-chain without leaking PII via zk-proofs.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Zap className="text-pink-400"/>
              <h3 className="text-lg font-semibold">Operational Alpha</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Dazed incentives align staff, customers, and operators to report and reconcile discrepancies in near-real time.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <LineChart className="text-emerald-400"/>
              <h3 className="text-lg font-semibold">Scalable Economics</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">NFTs unlock membership, rewards, and data rights. B2B SaaS + transaction fees + premium analytics create defensible revenue.</p>
          </Card>
        </div>
      </Section>

      {/* Utility */}
      <Section id="utility">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Utility that goes beyond art</h2>
          <Badge>For Holders & Operators</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="flex items-center gap-3">
              <Coins className="text-pink-400"/>
              <h3 className="text-lg font-semibold">Rewards & Perks</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Earn event-based rewards for verified purchases, reviews, and shrinkage-reduction actions. Exclusive drops, IRL Dispensary events.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Lock className="text-emerald-400"/>
              <h3 className="text-lg font-semibold">zk-ID Access</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Age-gated membership and dispensary access without exposing personal details. Faster check-ins, fewer compliance headaches.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Layers className="text-emerald-400"/>
              <h3 className="text-lg font-semibold">PoP Inventory Proofs</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Trace product from intake to sale with cryptographic receipts tied to package IDs. Community verifies; chain attests.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Users className="text-pink-400"/>
              <h3 className="text-lg font-semibold">Community Auditors</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Holders become aligned auditors—flagging anomalies, earning bounties, and improving store performance.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Leaf className="text-emerald-400"/>
              <h3 className="text-lg font-semibold">Brand Partnerships</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">Token-gated campaigns and verifiable promos for cultivators, distributors, and retailers. Data-driven, fraud-resistant.</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-400"/>
              <h3 className="text-lg font-semibold">SLAs & Support</h3>
            </div>
            <p className="mt-2 text-sm text-zinc-300">B2B SLAs for uptime, integration support, and analytics. NFTs confer priority support tiers.</p>
          </Card>
        </div>
      </Section>

      {/* Tech */}
      <Section id="tech">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Architecture</h2>
          <Badge>Privacy-preserving</Badge>
        </div>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">Proof of Product (PoP)</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Event proofs on receive, move, and sell—anchored to package IDs</li>
              <li>Discrepancy bounties for community auditors</li>
              <li>Low-fee, energy-efficient confirmations</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Zero-Knowledge ID (zk-ID)</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Age/eligibility proofs without leaking PII</li>
              <li>Reusable credentials for faster check-ins</li>
              <li>Composable with partner loyalty programs</li>
            </ul>
          </Card>
        </div>
        <Card className="mt-6">
          <h4 className="text-sm font-semibold text-zinc-200">Data Flow</h4>
          <p className="mt-2 text-sm text-zinc-300">Intake → On-chain PoP receipt → zk-ID-gated purchase → Rewards issuance → Analytics. Operators get dashboards; holders get perks and bounties.</p>
        </Card>
      </Section>

      {/* Economics */}
      <Section id="economics">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">NFT & Revenue Economics</h2>
          <Badge>Aligned incentives</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold">Collection</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>Supply: <strong>4,200</strong></li>
              <li>Presale cap: <strong>3,333</strong></li>
              <li>Reserved promos: <strong>20</strong></li>
              <li>Royalties: <strong>8%</strong></li>
              <li>Base URI: IPFS (pinning ready)</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Revenue Model</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>B2B SaaS (PoP + zk-ID + Analytics)</li>
              <li>Transaction fees on verified sales</li>
              <li>Brand promos & token-gated campaigns</li>
              <li>Enterprise SLAs & onboarding</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">KPIs We Optimize</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li>Shrinkage % (target −50%)</li>
              <li>Check-in time (sub-5s)</li>
              <li>Verified sales %</li>
              <li>Active auditor count</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Roadmap */}
      <Section id="roadmap">
        <h2 className="mb-8 text-3xl font-bold">Roadmap</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { q: "Q1 ‘26", title: "Investor relaunch", items: ["New site + deck", "Pilot store signings", "MVP zk-ID"] },
            { q: "Q2 ‘26", title: "PoP pilots", items: ["3–5 dispensaries", "Shrinkage baseline", "Rewards beta"] },
            { q: "Q3 ‘26", title: "Scale & data", items: ["Analytics v1", "Brand partnerships", "Auditor incentives"] },
            { q: "Q4 ‘26", title: "Expansion", items: ["Multi-state ops", "SaaS tiers", "Exchange integrations"] },
          ].map((r, i) => (
            <Card key={i}>
              <div className="text-xs text-zinc-400">{r.q}</div>
              <h3 className="mt-1 text-lg font-semibold">{r.title}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                {r.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <h2 className="mb-8 text-3xl font-bold">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { q: "How do NFTs tie to real utility?", a: "Membership unlocks rewards, auditing rights, and gated access. Dazed links product events to on-chain receipts, turning holders into aligned stakeholders." },
            { q: "Is customer data exposed?", a: "No. zk-ID proves eligibility (like age) without revealing PII (Personally Identifiable Information). Operators verify compliance without storing sensitive data on-chain." },
            { q: "What’s the business model?", a: "B2B SaaS + transaction fees + campaigns + enterprise onboarding. NFTs bootstrap community and confer premium tiers." },
            { q: "Integration effort for dispensaries?", a: "Lightweight. Map existing package IDs, run PoP listeners, and enable zk-ID check-ins. We provide support and SLAs." },
            {
              q: "How does Dazed minimize inventory discrepancies?",
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
          ].map((f, i) => (
            <Card key={i}>
              <h3 className="text-base font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-zinc-300">{f.a}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Deck + Contact */}
      <Section id="deck">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">Investor Materials</h3>
           
            <a href="contact" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400">Request Access <ArrowRight size={16}/></a>
          </Card>
          <Card id="contact">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p className="mt-2 text-sm text-zinc-300">Interested in pilots, partnerships, or investing? Let’s talk.</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500" href="mailto:invest@ganjagang.xyz"><Mail size={16}/> contact@ganjagang.xyz</a>
              <a className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:border-zinc-500" href="https://x.com/ganjagangNFT"><Twitter size={16}/> @ganjagangNFT</a>
            </div>
          </Card>
        </div>
      </Section>
  

      {/* Footer */}
      <footer className="border-t border-zinc-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Ganja Gang. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <a href="/privacy" className="hover:text-zinc-200">Privacy</a>
            <a href="/terms" className="hover:text-zinc-200">Terms</a>
            <a href="/docs" className="hover:text-zinc-200">Docs</a>
            <a href="https://github.com/" className="hover:text-zinc-200 flex items-center gap-1"><Github size={14}/>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
