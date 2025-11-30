"use client";

import { Crown } from "lucide-react";

export default function VIPSection() {
  return (
    <section id="vip" className="py-20 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-3">
          <Crown className="text-amber-400" />
          <h2 className="text-3xl font-bold">VIP Access</h2>
        </div>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          NFT holders and $Dazed stakers unlock VIP entry to Dazed Cannabis events, private launches, and members-only
          experiences. Your NFT is your all-access pass.
        </p>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 font-semibold text-black hover:opacity-90">
          Join VIP List
        </button>
      </div>
    </section>
  );
}
