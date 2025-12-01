// components/WalletButton.tsx
"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

export default function WalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortAddress =
    address && address.length > 8
      ? `${address.slice(0, 6)}…${address.slice(-4)}`
      : address;

  if (!isConnected) {
    return (
      <button
        type="button"
        onClick={() => open()}
        className="rounded-xl border border-zinc-700 bg-black/40 px-4 py-2 text-sm font-semibold text-zinc-100 hover:border-emerald-400 hover:text-white"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => disconnect()}
      className="rounded-xl border border-emerald-500 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20"
    >
      {shortAddress ?? "Disconnect"}
    </button>
  );
}
