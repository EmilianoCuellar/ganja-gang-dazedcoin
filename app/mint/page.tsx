"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  useAccount,
  useChainId,
  useBalance,
  useSwitchChain,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";
import { mainnet } from "viem/chains";
import { formatEther } from "viem";
import { Leaf, ArrowRight } from "lucide-react";
import WalletButton from "@/components/WalletButton";
import { GANJA_GANG_ABI } from "@/lib/abi/ganjaGang";
import MintStatusBar from "@/components/MintStatusBar";

// ---- Config ----
const CONTRACT = "0xf0893Cbbc7362449f8C4Bf24144a34f3eEe6485c" as `0x${string}`;

// ---- Small helpers ----
const asBigint = (v: unknown): bigint | undefined =>
  typeof v === "bigint" ? v : undefined;

const asBool = (v: unknown): boolean => Boolean(v);

export default function MintPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Reads (raw)
  const { data: _isSaleActive }    = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "isSaleActive" });
  const { data: _isPresaleActive } = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "isPresaleActive" });
  const { data: _whitelistPrice }  = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "whitelistPrice" });
  const { data: _publicPrice }     = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "publicPrice" });
  const { data: _totalSupply }     = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "totalSupply" });
  const { data: _MAX_TOKENS }      = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "MAX_TOKENS" });
  const { data: _MAX_PER_TX }      = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "MAX_MINT_PER_TX" });
  const { data: _WHITELIST_LIMIT } = useReadContract({ abi: GANJA_GANG_ABI, address: CONTRACT, functionName: "WHITELIST_LIMIT" });

  // Casted values
  const isSaleActive    = asBool(_isSaleActive);
  const isPresaleActive = asBool(_isPresaleActive);
  const whitelistPrice  = asBigint(_whitelistPrice);
  const publicPrice     = asBigint(_publicPrice);
  const totalSupply     = asBigint(_totalSupply);
  const MAX_TOKENS      = asBigint(_MAX_TOKENS);
  const MAX_PER_TX      = asBigint(_MAX_PER_TX);
  const WHITELIST_LIMIT = asBigint(_WHITELIST_LIMIT);

  const { data: balance } = useBalance({ address, chainId: 1 });

  // UI state
  const [qty, setQty] = useState<number>(1);
  const [proofInput, setProofInput] = useState<string>(""); // comma/space separated hex strings

  const merkleProof = useMemo(
    () =>
      proofInput
        .split(/[\s,]+/)
        .map((s) => s.trim())
        .filter(Boolean) as `0x${string}`[],
    [proofInput]
  );

  const activeUnitPrice = isPresaleActive ? whitelistPrice : publicPrice;

  // Total price in wei (bigint)
  const totalPrice = useMemo(() => {
    if (!activeUnitPrice) return undefined;
    try {
      return activeUnitPrice * BigInt(qty);
    } catch {
      return undefined;
    }
  }, [activeUnitPrice, qty]);

  // Write
  const {
    writeContractAsync,
    data: txHash,
    error: writeError,
    isPending
  } = useWriteContract();

  const {
    isLoading: isMining,
    isSuccess,
    data: receipt
  } = useWaitForTransactionReceipt({ hash: txHash });

  async function handleMint() {
    if (!isConnected) {
      alert("Please connect your wallet.");
      return;
    }
    if (chainId !== 1) {
      alert("Please switch to Ethereum Mainnet.");
      return;
    }
    if (!isSaleActive) {
      alert("Sale is paused.");
      return;
    }
    if (MAX_PER_TX && qty > Number(MAX_PER_TX)) {
      alert(`Max per transaction is ${Number(MAX_PER_TX)}.`);
      return;
    }
    if (!activeUnitPrice) {
      alert("Price not available. Please try again.");
      return;
    }

    const value = activeUnitPrice * BigInt(qty);
    const proof = isPresaleActive ? merkleProof : [];

    try {
      await writeContractAsync({
        abi: GANJA_GANG_ABI,
        address: CONTRACT,
        functionName: "mint",
        args: [qty, proof],
        value,
        chainId: 1
      });
    } catch {
      // Error is surfaced by wagmi; no-op here
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      {/* Top bar */}
      <MintStatusBar />
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <span className="text-lg font-semibold tracking-wide">Ganja Gang</span>
            <span className="ml-2 inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300">
              Mint
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-zinc-300 hover:text-white">Home</Link>
            <Link href="/ecosystem" className="text-sm text-zinc-300 hover:text-white">Ecosystem</Link>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Mint body */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">Mint a Ganja Gang NFT</h1>
            <a
              target="_blank" rel="noreferrer"
              href="https://etherscan.io/address/0xf0893cbbc7362449f8c4bf24144a34f3eee6485c"
              className="text-sm text-emerald-400 underline hover:text-emerald-300"
            >
              View on Etherscan
            </a>
          </div>

          {/* Status row */}
          <div className="mt-4 grid gap-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 md:grid-cols-3">
            <div>
              <div className="text-xs text-zinc-400">Sale</div>
              <div className="text-sm">
                {isSaleActive ? (isPresaleActive ? "Presale (whitelist)" : "Public") : "Paused"}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400">Supply</div>
              <div className="text-sm">
                {totalSupply?.toString() ?? "—"} / {MAX_TOKENS?.toString() ?? "—"}
                {isPresaleActive && WHITELIST_LIMIT ? (
                  <span className="text-xs text-zinc-400"> (WL cap {Number(WHITELIST_LIMIT)})</span>
                ) : null}
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400">Price</div>
              <div className="text-sm">
                {activeUnitPrice ? `${formatEther(activeUnitPrice)} ETH` : "—"}
              </div>
            </div>
          </div>

          {/* Network guard */}
          {isConnected && chainId !== 1 && (
            <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-amber-200">
              You’re on the wrong network. Switch to <strong>Mainnet</strong>.
              <button
                onClick={() => switchChain({ chainId: mainnet.id })}
                className="ml-3 rounded-lg border border-amber-400/50 px-3 py-1 text-xs hover:bg-amber-500/10"
              >
                Switch Network
              </button>
            </div>
          )}

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Left column */}
            <div>
              <div className="text-sm text-zinc-400">Connected</div>
              <div className="mt-1 text-sm">{isConnected ? address : "Not connected"}</div>

              <div className="mt-4 text-sm text-zinc-400">Your ETH (mainnet)</div>
              <div className="mt-1 text-sm">
                {balance ? `${balance.formatted.slice(0, 8)} ${balance.symbol}` : "—"}
              </div>

              <div className="mt-6">
                <label className="text-sm text-zinc-300">Quantity</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={MAX_PER_TX ? Number(MAX_PER_TX) : undefined}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                    className="w-24 rounded-lg border border-zinc-700 bg-zinc-950 p-2 text-sm outline-none"
                  />
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500"
                  >
                    −
                  </button>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500"
                  >
                    +
                  </button>
                </div>
                {MAX_PER_TX && (
                  <div className="mt-2 text-xs text-zinc-400">
                    Max per tx: {Number(MAX_PER_TX)}
                  </div>
                )}
              </div>

              {isPresaleActive && (
                <div className="mt-6">
                  <label className="text-sm text-zinc-300">
                    Whitelist Merkle Proof <span className="text-zinc-500">(comma or space separated)</span>
                  </label>
                  <textarea
                    placeholder="0xabc..., 0xdef..., 0x123..."
                    value={proofInput}
                    onChange={(e) => setProofInput(e.target.value)}
                    className="mt-2 h-24 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-2 text-sm outline-none"
                  />
                  <div className="mt-2 text-xs text-zinc-400">
                    If you don’t have a proof, contact the team or wait for public mint.
                  </div>
                </div>
              )}
            </div>

            {/* Right column */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="text-sm text-zinc-400">Total</div>
              <div className="mt-1 text-2xl font-extrabold">
                {totalPrice ? `${formatEther(totalPrice)} ETH` : (activeUnitPrice ? "…" : "—")}
              </div>

              <button
                onClick={handleMint}
                disabled={
                  !isConnected ||
                  chainId !== 1 ||
                  !isSaleActive ||
                  !activeUnitPrice ||
                  isPending ||
                  isMining
                }
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Leaf size={16} />
                {isPending || isMining ? "Minting…" : "Mint"}
                <ArrowRight size={16} />
              </button>

              {/* Feedback */}
              {writeError && (
                <div className="mt-3 break-words text-xs text-rose-300">
                  {writeError.message}
                </div>
              )}
              {isSuccess && receipt && (
                <div className="mt-3 text-xs">
                  ✅ Mint confirmed —{" "}
                  <a
                    className="underline text-emerald-400 hover:text-emerald-300"
                    target="_blank"
                    rel="noreferrer"
                    href={`https://etherscan.io/tx/${receipt.transactionHash}`}
                  >
                    view transaction
                  </a>
                </div>
              )}
              {!isSaleActive && (
                <div className="mt-3 text-xs text-zinc-400">Sale is currently paused.</div>
              )}
            </div>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Contract: <code className="break-all">{CONTRACT}</code>
          </p>
        </div>
      </main>
    </div>
  );
}
