"use client";

import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow } from "@/components/Decor";
import { FileCode, BadgeCheck } from "lucide-react";
import HeaderBar from "@/components/HeaderBar";

export default function InventoryContract() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      <Glow />
      <Section className="pt-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold">Inventory Management Contract</h1>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-400">Events & methods for anchoring PoP inventory updates.</p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-2 flex items-center gap-2"><BadgeCheck className="text-emerald-400"/><h3 className="text-lg font-semibold">Events</h3></div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-lg bg-zinc-800/60 px-2 py-1">Intake(address, bytes32, uint256)</span>
              <span className="rounded-lg bg-zinc-800/60 px-2 py-1">Move(address, bytes32, string)</span>
              <span className="rounded-lg bg-zinc-800/60 px-2 py-1">Sell(address, bytes32, uint256)</span>
              <span className="rounded-lg bg-zinc-800/60 px-2 py-1">Adjust(address, bytes32, int256)</span>
            </div>
          </Card>

          <Card>
            <div className="mb-2 flex items-center gap-2"><FileCode className="text-pink-400"/><h3 className="text-lg font-semibold">Methods</h3></div>
            <pre className="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs">
{`function intake(bytes32 packageIdHash, uint256 qty) external;
function move(bytes32 packageIdHash, string calldata location) external;
function sell(bytes32 packageIdHash, uint256 qty) external;
function adjust(bytes32 packageIdHash, int256 delta) external;`}
            </pre>
          </Card>
        </div>
      </Section>
    </div>
  );
}
