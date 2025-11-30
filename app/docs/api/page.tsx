"use client";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Glow } from "@/components/Decor";
import { CodeBlock } from "@/components/Code";

export default function APIDocs() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-zinc-100">
      <Glow />
      <Section className="pt-12 text-center">
        <h1 className="text-4xl font-extrabold">REST API</h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-400">Simple endpoints for inventory & PoP.</p>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">POST /api/pop/intake</h3>
            <pre className="mt-2 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs">
            <CodeBlock
  caption="REST: POST /api/pop/intake"
  language="json"
  code={`{"packageIdHash":"0xabc...","qty":24,"ts":1712345678}`}
/>
            </pre>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">GET /api/inventory/list</h3>
            <pre className="mt-2 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs">
            <CodeBlock
  caption="REST: GET /api/inventory/list"
  language="json"
  code={`GET /api/inventory/list?wallet=0xYourAddress`}
 />
<div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-lg">
  <h3 className="mb-3 text-sm font-semibold text-zinc-300">
    Example: Inventory Preview
  </h3>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm text-zinc-300">
      <thead>
        <tr className="border-b border-zinc-800 text-zinc-400">
          <th className="px-3 py-2 text-left">Package ID</th>
          <th className="px-3 py-2 text-left">SKU</th>
          <th className="px-3 py-2 text-left">Strain</th>
          <th className="px-3 py-2 text-left">Category</th>
          <th className="px-3 py-2 text-right">Grams</th>
          <th className="px-3 py-2 text-right">Units</th>
          <th className="px-3 py-2 text-left">Location</th>
          <th className="px-3 py-2 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b border-zinc-800/70 hover:bg-zinc-900/40">
          <td className="px-3 py-2 font-mono text-xs text-zinc-400">
            0xabc123...
          </td>
          <td className="px-3 py-2">GG-INDICA-420</td>
          <td className="px-3 py-2">Purple Haze</td>
          <td className="px-3 py-2">Flower</td>
          <td className="px-3 py-2 text-right">28</td>
          <td className="px-3 py-2 text-right">10</td>
          <td className="px-3 py-2">Main Dispensary</td>
          <td className="px-3 py-2 text-emerald-400">Intake</td>
        </tr>

        <tr className="border-b border-zinc-800/70 hover:bg-zinc-900/40">
          <td className="px-3 py-2 font-mono text-xs text-zinc-400">
            0xdef456...
          </td>
          <td className="px-3 py-2">GG-SATIVA-777</td>
          <td className="px-3 py-2">Lemon Diesel</td>
          <td className="px-3 py-2">Flower</td>
          <td className="px-3 py-2 text-right">14</td>
          <td className="px-3 py-2 text-right">5</td>
          <td className="px-3 py-2">Vault</td>
          <td className="px-3 py-2 text-pink-400">Move</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p className="mt-3 text-xs text-zinc-500">
    This table renders a live snapshot of your on-chain inventory
  </p>
</div>

            </pre>
          </Card>
          
        </div>
      </Section>
    </div>
  );
}
