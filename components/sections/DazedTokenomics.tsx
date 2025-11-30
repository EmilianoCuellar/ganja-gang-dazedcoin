"use client";

import { Coins } from "lucide-react";

export default function DazedTokenomics() {
  return (
    <section id="dazedcoin" className="py-20 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <Coins className="text-pink-500" />
          <h2 className="text-3xl font-bold">$Dazed Tokenomics</h2>
        </div>

        <p className="max-w-3xl text-zinc-300 mb-6">
          $Dazed powers rewards, access, and transactions across the Dazed Blockchain. 
          It’s designed to align incentives between holders, auditors, brands, and operators.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h3 className="text-lg font-semibold mb-2">Total Supply</h3>
            <div className="text-2xl font-bold text-emerald-400">420,000,000 $Dazed</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h3 className="text-lg font-semibold mb-2">Allocation</h3>
            <ul className="space-y-1 text-sm text-zinc-300">
              <li>20% Founder & Core</li>
              <li>10% Ganja Gang NFT Holders</li>
              <li>70% Public & Investors</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
            <h3 className="text-lg font-semibold mb-2">Utility</h3>
            <ul className="space-y-1 text-sm text-zinc-300">
              <li>Purchases & Rewards</li>
              <li>Staking & Event Bonuses</li>
              <li>Network Fees (low & efficient)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
