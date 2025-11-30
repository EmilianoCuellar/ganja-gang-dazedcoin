// components/WalletButton.tsx
"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { initWeb3ModalSingleton } from "../lib/wallet"; // 👈 important

// Make sure Web3Modal is created on the client BEFORE the hook is used
initWeb3ModalSingleton();

export default function WalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const shortAddress =
    address && address.length > 8
      ? `${address.slice(0, 6)}…${address.slice(-4)}`
      : address ?? "";

  if (!isConnected) {
    return (
      <button
        onClick={() => open()}
        className="rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-400"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="rounded-xl border border-zinc-700 bg-black/40 px-3 py-1 text-xs text-zinc-200">
        {shortAddress}
      </span>
      <button
        onClick={() => disconnect()}
        className="rounded-xl border border-zinc-700 px-3 py-1 text-xs text-zinc-300 hover:border-zinc-500"
      >
        Disconnect
      </button>
    </div>
  );
}
