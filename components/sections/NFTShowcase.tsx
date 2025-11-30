"use client";

import { Star } from "lucide-react";

export default function NFTShowcase() {
  return (
    <section id="nft-showcase" className="py-20 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-center gap-3">
          <Star className="text-yellow-400" />
          <h2 className="text-3xl font-bold">Ganja Gang NFT Showcase</h2>
        </div>

        <p className="max-w-3xl text-zinc-300 mb-10">
          NFTs are membership keys to utility: rewards, auditing rights, and exclusive access to events, drops, and partner perks.
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array(8).fill(null).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl border border-zinc-800 bg-zinc-900/70 flex items-center justify-center"
            >
              <span className="text-zinc-500 text-sm">NFT #{i + 1}</span>
              {/* Later: replace with <Image src={`/nfts/${i}.png`} .../> or map from IPFS */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
