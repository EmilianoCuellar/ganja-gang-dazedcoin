"use client";

import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Wallet } from "lucide-react";

export default function WalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const short = (a?: string) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "");

  return (
    <div className="flex items-center gap-2">
      {!isConnected ? (
        <button
          onClick={() => open()}
          className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600"
        >
          <Wallet size={16} />
          Connect Wallet
        </button>
      ) : (
        <>
          <span className="text-xs text-zinc-300 hidden md:inline">{short(address)}</span>
          <button
            onClick={() => disconnect()}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-200 hover:border-zinc-500"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
}
