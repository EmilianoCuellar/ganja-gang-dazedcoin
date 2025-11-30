"use client";

import React, { useState } from "react";
import Link from "next/link";
import WalletButton from "@/components/WalletButton";
import { Menu, X, ChevronDown, Building2, ShieldCheck, Boxes, Link2, FileCode, BookOpen, LifeBuoy, IdCard } from "lucide-react";



export default function Nav() {
    const [dispOpen, setDispOpen] = useState(false);
    const [ecoOpen, setEcoOpen] = useState(false);
    const [open, setOpen] = useState(false);
    
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
          <span className="text-lg font-semibold tracking-wide">Ganja Gang</span>
          <span className="ml-2 inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
            PoP + zk-ID
          </span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {/* Existing anchor links for the homepage sections */}
          <a href="/strains" className="text-sm text-zinc-300 hover:text-white">Tokenized Strains</a>
          <a href="/mint" className="text-sm text-zinc-300 hover:text-white">Mint</a>
          
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
      <div className="my-1 h-px bg-zinc-800" />
      <Link href="/inventory" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
        <Boxes size={16}/> Inventory Dashboard
      </Link>
      <Link href="/inventory/upload" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
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
          {/* NEW: Ecosystem full page */}
          <Link href="/ecosystem" className="text-sm text-zinc-300 hover:text-white">
            Ecosystem
          </Link>
          <Link href="/inventory/walkthrough" className="block rounded-lg px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/60">
          <div className="relative">
  <button
    onClick={() => setEcoOpen(false) || setOpen(false)} // close others
    className="sr-only"
  />
</div>
</Link>
        </nav>

        <WalletButton />
      </div>
    </header>
  );
}
