"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { Badge } from "@/components/Badge";

const CONTRACT = "0xf0893cbbc7362449f8c4bf24144a34f3eee6485c" as `0x${string}`;

const abi = [
  { "type":"function", "name":"totalSupply", "stateMutability":"view", "inputs":[], "outputs":[{"type":"uint256"}]},
  { "type":"function", "name":"isSaleActive", "stateMutability":"view", "inputs":[], "outputs":[{"type":"bool"}]},
  { "type":"function", "name":"isPresaleActive", "stateMutability":"view", "inputs":[], "outputs":[{"type":"bool"}]},
  { "type":"function", "name":"publicPrice", "stateMutability":"view", "inputs":[], "outputs":[{"type":"uint256"}]},
  { "type":"function", "name":"whitelistPrice", "stateMutability":"view", "inputs":[], "outputs":[{"type":"uint256"}]},
] as const;

const client = createPublicClient({ chain: mainnet, transport: http() });

export default function MintStatusBar() {
  const [supply, setSupply] = useState<bigint | null>(null);
  const [sale, setSale] = useState<boolean | null>(null);
  const [presale, setPresale] = useState<boolean | null>(null);
  const [pubPrice, setPubPrice] = useState<bigint | null>(null);
  const [wlPrice, setWlPrice] = useState<bigint | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [ts, sa, psa, pp, wp] = await Promise.all([
          client.readContract({ address: CONTRACT, abi, functionName: "totalSupply" }),
          client.readContract({ address: CONTRACT, abi, functionName: "isSaleActive" }),
          client.readContract({ address: CONTRACT, abi, functionName: "isPresaleActive" }),
          client.readContract({ address: CONTRACT, abi, functionName: "publicPrice" }),
          client.readContract({ address: CONTRACT, abi, functionName: "whitelistPrice" }),
        ]);
        setSupply(ts as bigint);
        setSale(sa as boolean);
        setPresale(psa as boolean);
        setPubPrice(pp as bigint);
        setWlPrice(wp as bigint);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const fmtEth = (wei?: bigint | null) =>
    typeof wei === "bigint" ? `${Number(wei) / 1e18} ETH` : "—";

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-black/40 px-4 py-3">
      <Badge>Mint status</Badge>
      <div className="text-sm text-zinc-300">Supply: <b>{supply !== null ? `${supply.toString()} / 4200` : "—"}</b></div>
      <div className="text-sm text-zinc-300">Sale: <b className={sale ? "text-emerald-400" : "text-zinc-300"}>{sale ? "Active" : "Paused"}</b></div>
      <div className="text-sm text-zinc-300">Phase: <b className={presale ? "text-amber-300" : "text-sky-300"}>{presale ? "Presale" : "Public"}</b></div>
      <div className="ml-auto flex items-center gap-4 text-sm text-zinc-300">
        <span>WL: <b>{fmtEth(wlPrice)}</b></span>
        <span>Public: <b>{fmtEth(pubPrice)}</b></span>
      </div>
    </div>
  );
}
