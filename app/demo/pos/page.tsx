// app/demo/pos/page.tsx
"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Barcode,
  CheckCircle2,
  MoveRight,
  RefreshCcw,
  ShoppingCart,
  ShieldCheck,
  UserCheck,
  Wifi,
  WifiOff,
  Timer,
  Cloud,
  AlertTriangle,
} from "lucide-react";

/** ---------------- Types ---------------- */
type Location = "VAULT" | "FLOOR" | "BACKROOM";
type Role = "REGISTER" | "INVENTORY" | "MANAGER";
type EventKind = "RECEIVE" | "MOVE" | "SELL";
type SyncMode = "ONLINE" | "OFFLINE" | "AUTO";
type LimitMode = "rec" | "med";

type Category =
  | "FLOWER"
  | "PREROLL"
  | "VAPE"
  | "CONCENTRATE"
  | "EDIBLE";

interface Batch {
  batchId: string;
  sku: string;
  name: string;
  category: Category;
  unit: string;               // e.g. "3.5g flower", "1g cart", "100mg edible"
  location: Location;
  qty: number;
  sellable: boolean;
  priceCents: number;
  equivGramsPerUnit: number;  // flower-equivalent grams this unit counts toward the 28g limit
}

interface PoPEvent {
  id: string;
  kind: EventKind;
  ts: string;
  actor: Role;
  terminal: string;
  ok: boolean;
  details: string;
  reason?: string;
  chain: "pending" | "confirmed" | "queued";
  latencyMs?: number;
}

/** ---------------- State presets (example values) ---------------- */
const STATE_PRESETS: Record<
  string,
  { label: string; rec: number; med: number }
> = {
  MA: { label: "Massachusetts (example)", rec: 28, med: 28 },
  CA: { label: "California (example)", rec: 28, med: 56 },
  CO: { label: "Colorado (example)", rec: 28, med: 56 },
};

/** ---------------- Demo Data ----------------
 *  Equivalence logic (to 28g flower daily limit):
 *  - Flower / prerolls: 1:1 actual grams
 *  - 1g vape cart / concentrate: 5.6g equivalent
 *  - 0.5g vape cart / concentrate: 2.8g equivalent
 *  - 100mg edible: 5.6g equivalent
 *  - 50mg edible: 2.8g equivalent
 * ------------------------------------------- */
const initialBatches: Batch[] = [
  // Flower / prerolls
  {
    batchId: "0xFLOOR-FLW-1",
    sku: "GG-FLW-HYB-3.5",
    name: "Ganja Gang Hybrid 3.5g",
    category: "FLOWER",
    unit: "3.5g flower",
    location: "FLOOR",
    qty: 20,
    sellable: true,
    priceCents: 4500,
    equivGramsPerUnit: 3.5,
  },
  {
    batchId: "0xVAULT-FLW-1",
    sku: "GG-FLW-HYB-3.5",
    name: "Ganja Gang Hybrid 3.5g",
    category: "FLOWER",
    unit: "3.5g flower",
    location: "VAULT",
    qty: 12,
    sellable: true,
    priceCents: 4500,
    equivGramsPerUnit: 3.5,
  },
  {
    batchId: "0xFLOOR-PR-1",
    sku: "GG-PR-IND-1",
    name: "Indica Single Preroll",
    category: "PREROLL",
    unit: "1g preroll",
    location: "FLOOR",
    qty: 30,
    sellable: true,
    priceCents: 1500,
    equivGramsPerUnit: 1.0,
  },

  // Vape carts
  {
    batchId: "0xFLOOR-VAPE-1G",
    sku: "GG-VAPE-HYB-1G",
    name: "Hybrid Vape Cart 1g",
    category: "VAPE",
    unit: "1g cart",
    location: "FLOOR",
    qty: 25,
    sellable: true,
    priceCents: 5500,
    equivGramsPerUnit: 5.6, // 1g cart = 5.6g eq
  },
  {
    batchId: "0xFLOOR-VAPE-0_5G",
    sku: "GG-VAPE-SAT-0.5G",
    name: "Sativa Vape Cart 0.5g",
    category: "VAPE",
    unit: "0.5g cart",
    location: "FLOOR",
    qty: 40,
    sellable: true,
    priceCents: 3500,
    equivGramsPerUnit: 2.8, // 0.5g cart = 2.8g eq
  },

  // Concentrates
  {
    batchId: "0xFLOOR-CON-1G",
    sku: "GG-CON-OG-1G",
    name: "OG Shatter 1g",
    category: "CONCENTRATE",
    unit: "1g concentrate",
    location: "FLOOR",
    qty: 18,
    sellable: true,
    priceCents: 6000,
    equivGramsPerUnit: 5.6, // 1g concentrate = 5.6g eq
  },
  {
    batchId: "0xFLOOR-CON-0_5G",
    sku: "GG-CON-HASH-0.5G",
    name: "Live Hash 0.5g",
    category: "CONCENTRATE",
    unit: "0.5g concentrate",
    location: "FLOOR",
    qty: 24,
    sellable: true,
    priceCents: 3800,
    equivGramsPerUnit: 2.8, // 0.5g concentrate = 2.8g eq
  },

  // Edibles
  {
    batchId: "0xFLOOR-ED-50MG",
    sku: "GG-ED-GUM-50",
    name: "Ganja Gummies 50mg (10x5mg)",
    category: "EDIBLE",
    unit: "50mg edible",
    location: "FLOOR",
    qty: 50,
    sellable: true,
    priceCents: 2500,
    equivGramsPerUnit: 2.8, // 50mg edible = 2.8g eq
  },
  {
    batchId: "0xFLOOR-ED-100MG",
    sku: "GG-ED-GUM-100",
    name: "Ganja Gummies 100mg (10x10mg)",
    category: "EDIBLE",
    unit: "100mg edible",
    location: "FLOOR",
    qty: 40,
    sellable: true,
    priceCents: 3200,
    equivGramsPerUnit: 5.6, // 100mg edible = 5.6g eq
  },
];

/** ---------------- Helpers ---------------- */
const nowIso = () => new Date().toISOString();
const rid = (p = "evt") => `${p}_${Math.random().toString(36).slice(2, 8)}`;
const dollars = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const randLatency = () => Math.floor(320 + Math.random() * 570); // 0.32s - 0.89s

function canSell(b: Batch, qty: number, ageVerified: boolean) {
  if (!ageVerified) return { ok: false, reason: "Age not verified (zk-ID required)" };
  if (b.location !== "FLOOR") return { ok: false, reason: `Not on floor (location=${b.location})` };
  if (!b.sellable) return { ok: false, reason: "Batch not sellable (compliance hold/recall)" };
  if (qty <= 0) return { ok: false, reason: "Quantity must be > 0" };
  if (b.qty < qty) return { ok: false, reason: "Insufficient quantity" };
  return { ok: true as const };
}

function canMove(b: Batch, to: Location) {
  if (b.location === to) return { ok: false, reason: "Already at destination" };
  return { ok: true as const };
}

/** ---------------- Component ---------------- */
export default function POSDemo() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [selected, setSelected] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [scanInput, setScanInput] = useState("");
  const [ageVerified, setAgeVerified] = useState(false);
  const [zkCached, setZkCached] = useState(false);
  const [role, setRole] = useState<Role>("REGISTER");
  const [terminal, setTerminal] = useState("REG-03");

  const [syncMode, setSyncMode] = useState<SyncMode>("ONLINE");
  const [queue, setQueue] = useState<PoPEvent[]>([]);
  const [events, setEvents] = useState<PoPEvent[]>([]);
  const [flash, setFlash] = useState<{ type: "ok" | "err"; msg: string } | null>(
    null
  );

  // Speed indicator
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [validating, setValidating] = useState(false);

  // Daily purchase grams for compliance bar (demo)
  const [cartGrams, setCartGrams] = useState<number>(0);

  // Compliance / state presets
  const [stateCode, setStateCode] = useState<string>("MA");
  const [limitMode, setLimitMode] = useState<LimitMode>("rec");
  const [recLimit, setRecLimit] = useState<number>(STATE_PRESETS["MA"].rec);
  const [medLimit, setMedLimit] = useState<number>(STATE_PRESETS["MA"].med);

  const current = useMemo(
    () => batches.find((b) => b.batchId === selected) || null,
    [batches, selected]
  );

  // Auto-clear toast
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 2400);
    return () => clearTimeout(t);
  }, [flash]);

  // AUTO mode: periodically flush queue
  useEffect(() => {
    if (syncMode !== "AUTO") return;
    if (queue.length === 0) return;
    const t = setInterval(() => replayQueue(true), 1200);
    return () => clearInterval(t);
  }, [syncMode, queue.length]);

  const setSpeed = (ms: number) => {
    setLastLatency(ms);
    setValidating(false);
  };

  const startValidate = () => {
    setValidating(true);
    const ms = randLatency();
    setTimeout(() => setSpeed(ms), ms);
    return ms;
  };

  const log = useCallback((evt: PoPEvent) => {
    setEvents((prev) => [evt, ...prev].slice(0, 300));
  }, []);

  const writeOrQueue = useCallback(
    (evt: PoPEvent) => {
      if (syncMode === "OFFLINE") {
        setQueue((q) => [{ ...evt, chain: "queued" }, ...q]);
        setFlash({ type: "err", msg: "Offline — event queued" });
      } else {
        // simulate chain confirmation
        log({ ...evt, chain: "pending" });
        setTimeout(() => {
          setEvents((prev) =>
            prev.map((e) => (e.id === evt.id ? { ...e, chain: "confirmed" } : e))
          );
        }, 450); // visual confirm ping
      }
    },
    [syncMode, log]
  );

  const replayQueue = (silent = false) => {
    if (queue.length === 0) return;
    const flushed = queue.map((q) => ({
      ...q,
      id: rid("replay"),
      ts: nowIso(),
      chain: "pending" as const,
    }));
    setQueue([]);
    setEvents((prev) => [...flushed, ...prev].slice(0, 300));
    setTimeout(() => {
      setEvents((prev) =>
        prev.map((e) =>
          flushed.find((f) => f.id === e.id) ? { ...e, chain: "confirmed" } : e
        )
      );
    }, 500);
    if (!silent) setFlash({ type: "ok", msg: "Queued events submitted" });
  };

  const scan = () => {
    const found = batches.find(
      (b) => b.batchId.toLowerCase() === scanInput.trim().toLowerCase()
    );
    if (!found) {
      setFlash({ type: "err", msg: "Batch not found" });
      return;
    }
    setSelected(found.batchId);
    setFlash({ type: "ok", msg: `Scanned ${found.batchId}` });
    setScanInput("");
  };

  const doMove = (to: Location) => {
    if (!current) return setFlash({ type: "err", msg: "Select a batch first" });
    const check = canMove(current, to);
    const evt: PoPEvent = {
      id: rid(),
      kind: "MOVE",
      ts: nowIso(),
      actor: role,
      terminal,
      ok: check.ok,
      details: `Move(${current.batchId}: ${current.location} → ${to})`,
      reason: check.ok ? undefined : check.reason,
      chain: "pending",
    };
    if (!check.ok) {
      writeOrQueue(evt);
      setFlash({ type: "err", msg: check.reason! });
      return;
    }
    // apply state locally (instant)
    setBatches((bs) =>
      bs.map((b) => (b.batchId === current.batchId ? { ...b, location: to } : b))
    );
    writeOrQueue(evt);
    setFlash({ type: "ok", msg: `Moved to ${to}` });
  };

  const doSell = () => {
    if (!current) return setFlash({ type: "err", msg: "Select a batch first" });
    if (role !== "REGISTER") {
      const evt: PoPEvent = {
        id: rid(),
        kind: "SELL",
        ts: nowIso(),
        actor: role,
        terminal,
        ok: false,
        details: `Sell(${current.batchId}, qty=${qty})`,
        reason: "Unauthorized role",
        chain: "pending",
      };
      writeOrQueue(evt);
      setFlash({ type: "err", msg: "Only REGISTER role can sell" });
      return;
    }

    // zk-ID: if previously verified in session, treat as cached
    const useAge = ageVerified || zkCached;

    // Compliance limit (rec vs med)
    const limit = limitMode === "rec" ? recLimit : medLimit;
    const addedGrams = qty * current.equivGramsPerUnit;
    const nextGrams = cartGrams + addedGrams;

    // local validation with synthetic latency to showcase speed
    const ms = startValidate();
    const check = canSell(current, qty, useAge);

    setTimeout(() => {
      let ok = check.ok;
      let reason = check.reason as string | undefined;

      // If basic checks pass, enforce daily limit
      if (ok && nextGrams > limit) {
        ok = false;
        reason = "Daily purchase limit exceeded";
      }

      if (!ok) {
        writeOrQueue({
          id: rid(),
          kind: "SELL",
          ts: nowIso(),
          actor: role,
          terminal,
          ok: false,
          details: `Sell(${current.batchId}, qty=${qty})`,
          reason,
          chain: "pending",
          latencyMs: ms,
        });
        setFlash({ type: "err", msg: reason || "Sale reverted" });
        return;
      }

      // success: instant POS update, async chain write
      setBatches((bs) =>
        bs.map((b) =>
          b.batchId === current.batchId ? { ...b, qty: b.qty - qty } : b
        )
      );
      writeOrQueue({
        id: rid(),
        kind: "SELL",
        ts: nowIso(),
        actor: role,
        terminal,
        ok: true,
        details: `Sell(${current.batchId}, ${current.sku}, qty=${qty}, price=${dollars(
          current.priceCents
        )})`,
        chain: "pending",
        latencyMs: ms,
      });
      setFlash({ type: "ok", msg: "Sale successful" });
      // once age verified in a session, mark cached
      if (ageVerified) setZkCached(true);
      // Update daily equivalent grams toward the limit
      setCartGrams(nextGrams);
    }, ms);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <span className="text-lg font-semibold tracking-wide">
              POS Demo — Fast, Enforced, On-chain
            </span>
            <span className="rounded-md border border-emerald-500/30 px-2 py-0.5 text-xs text-emerald-300">
              PoP + zk-ID
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/investors"
              className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
            >
              <ArrowLeft className="mr-1 inline" size={14} /> Investors
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────────
         Dispensary Operations & Efficiency (above the POS demo)
         ──────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 pt-8 sm:pt-12">
        {/* Top bar: back home */}
        <div className="mb-6 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 px-3 py-1.5 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="-ml-0.5"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Home
          </a>
          <span className="rounded-lg bg-pink-500/10 px-3 py-1.5 text-xs font-medium text-pink-400">
            Dispensary Operations &amp; Efficiency
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            How Dazed minimizes inventory discrepancies — without slowing
            checkout
          </h1>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Dazed binds each SKU to a batch <em>and</em> location (vault vs.
            floor) on-chain with Proof of Product (PoP). Your POS validates
            against the smart contract in milliseconds, so wrong-batch sales
            (e.g., a vault unit sold as a floor SKU by manual entry) are blocked
            automatically, while normal sales stay fast.
          </p>
        </div>

        {/* Four-up explainer */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-sm font-semibold">SKU-bound batches</div>
            <p className="mt-2 text-sm text-zinc-300">
              Upload/ingest creates an immutable hash for{" "}
              <strong>METRC package ID + SKU + location</strong>. Floor vs.
              vault is explicit on-chain.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-sm font-semibold">Smart POS validation</div>
            <p className="mt-2 text-sm text-zinc-300">
              At scan/add, POS pings PoP. If the batch’s last location ≠
              “floor”, the sale is blocked and staff sees the correct batch
              suggestion.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-sm font-semibold">Speed preserved</div>
            <p className="mt-2 text-sm text-zinc-300">
              Validation is sub-second. Chain commits are batched
              asynchronously. zk-ID is cached during session for instant
              re-use.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-sm font-semibold">Auto-sync &amp; recovery</div>
            <p className="mt-2 text-sm text-zinc-300">
              If offline, the node queues writes and syncs later. Dashboards
              still show last-known state with clear staleness badges.
            </p>
          </div>
        </div>

        {/* KPI strip */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-xs text-zinc-400">Targeted shrinkage cut</div>
            <div className="mt-1 text-2xl font-bold">−50%</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-xs text-zinc-400">Avg POS validation</div>
            <div className="mt-1 text-2xl font-bold">&lt; 300ms</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-4">
            <div className="text-xs text-zinc-400">Manual override risk</div>
            <div className="mt-1 text-2xl font-bold">Blocked by PoP</div>
          </div>
        </div>

        {/* FAQ bullets */}
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="text-sm font-semibold">
              Why manual entry often causes discrepancies
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              A budtender can add a product line manually and accidentally
              select the wrong batch. Dazed prevents this by checking the batch
              hash and refusing mismatched locations (e.g., “vault”) at the
              moment of sale.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="text-sm font-semibold">
              Will this slow my lines?
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              No. The validation happens in parallel with the POS UI. The user
              experience is unchanged—except it’s more accurate.
            </p>
          </div>
        </div>
      </section>

      {/* Section divider before the existing POS demo */}
      <div className="mx-auto my-8 max-w-7xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      {/* Interactive POS section header + compliance bar */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold sm:text-2xl">Interactive POS Demo</h2>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500/90" />
            Live validation (simulated)
          </div>
        </div>

        {/* Compliance bar with presets */}
        <ComplianceLimitBar
          gramsInCart={cartGrams}
          stateCode={stateCode}
          onStateCodeChange={(code) => {
            setStateCode(code);
            const preset = STATE_PRESETS[code];
            if (preset) {
              setRecLimit(preset.rec);
              setMedLimit(preset.med);
            }
          }}
          limitMode={limitMode}
          onLimitModeChange={setLimitMode}
          recLimit={recLimit}
          medLimit={medLimit}
          onRecLimitChange={setRecLimit}
          onMedLimitChange={setMedLimit}
        />

        <div className="mb-4 text-xs text-zinc-500">
          Daily limit progress is based on{" "}
          <span className="font-semibold">flower-equivalent grams</span>:
          1g/0.5g carts &amp; concentrates and 50mg/100mg edibles convert to a
          flower-style limit using state-style equivalency (5.6g or 2.8g per
          unit). Limits shown here are example presets for demo purposes.
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Top controls */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <ControlCard
            title="Terminal & Role"
            icon={<ShieldCheck className="text-emerald-400" />}
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-1 text-xs text-zinc-400">Terminal</div>
                <select
                  value={terminal}
                  onChange={(e) => setTerminal(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm"
                >
                  <option>REG-03</option>
                  <option>REG-07</option>
                  <option>REG-11</option>
                </select>
              </div>
              <div>
                <div className="mb-1 text-xs text-zinc-400">Role</div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm"
                >
                  <option value="REGISTER">REGISTER</option>
                  <option value="INVENTORY">INVENTORY</option>
                  <option value="MANAGER">MANAGER</option>
                </select>
              </div>
            </div>
          </ControlCard>

          <ControlCard
            title="zk-ID (Age Check)"
            icon={<UserCheck className="text-emerald-400" />}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-300">Age Verified</div>
              <button
                onClick={() => {
                  setAgeVerified((a) => !a);
                  if (!zkCached && !ageVerified) setZkCached(true);
                }}
                className={`rounded-md border px-3 py-1 text-sm ${
                  ageVerified
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-zinc-700 text-zinc-300"
                }`}
              >
                {ageVerified ? "Yes" : "No"}
              </button>
            </div>
            <div className="mt-2 text-xs">
              <span
                className={`rounded-md border px-2 py-0.5 ${
                  zkCached
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-zinc-700 text-zinc-400"
                }`}
              >
                {zkCached ? "zk-ID Cached for session" : "Not cached"}
              </span>
            </div>
          </ControlCard>

          <ControlCard title="Sync Mode" icon={<Cloud className="text-emerald-400" />}>
            <div className="flex items-center justify-between gap-2">
              <select
                value={syncMode}
                onChange={(e) => setSyncMode(e.target.value as SyncMode)}
                className="rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm"
              >
                <option value="ONLINE">ONLINE</option>
                <option value="OFFLINE">OFFLINE</option>
                <option value="AUTO">AUTO SYNC</option>
              </select>
              {syncMode !== "OFFLINE" ? (
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                  <Wifi size={14} />{" "}
                  {syncMode === "AUTO" ? "Auto flush" : "Live"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-amber-300">
                  <WifiOff size={14} /> Queueing
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
              <span>Queued: {queue.length}</span>
              {syncMode !== "OFFLINE" && queue.length > 0 && (
                <button
                  onClick={() => replayQueue()}
                  className="rounded-md border border-emerald-500/40 px-2 py-0.5 text-emerald-300 hover:bg-emerald-500/10"
                >
                  Submit queued
                </button>
              )}
            </div>
          </ControlCard>

          <ControlCard
            title="Validation Speed"
            icon={<Timer className="text-emerald-400" />}
          >
            <div className="text-sm">
              {validating ? (
                <span className="text-zinc-300">Validating…</span>
              ) : lastLatency != null ? (
                <span className="text-emerald-300">
                  Validated in {(lastLatency / 1000).toFixed(2)}s
                </span>
              ) : (
                <span className="text-zinc-400">—</span>
              )}
            </div>
            <div className="mt-2 text-xs text-zinc-500">
              Local checks → chain write async (sub-second)
            </div>
          </ControlCard>
        </div>

        {/* Scanner + Batches + Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-black/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-200">
                Product Batches (Flower, Vapes, Concentrates, Edibles)
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    placeholder="Scan/enter BatchID (e.g., 0xFLOOR-FLW-1)"
                    className="w-72 rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm outline-none"
                  />
                  <Barcode
                    size={16}
                    className="absolute right-2 top-2.5 text-zinc-500"
                  />
                </div>
                <button
                  onClick={scan}
                  className="rounded-lg border border-emerald-500/40 px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
                >
                  Scan
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {batches.map((b) => (
                <motion.button
                  key={b.batchId}
                  onClick={() => setSelected(b.batchId)}
                  whileHover={{ scale: 1.01 }}
                  className={`text-left rounded-xl border p-4 transition ${
                    selected === b.batchId
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{b.name}</div>
                    <span
                      className={`rounded-md border px-2 py-0.5 text-xs ${
                        b.location === "FLOOR"
                          ? "border-emerald-500/30 text-emerald-300"
                          : b.location === "VAULT"
                          ? "border-amber-500/30 text-amber-300"
                          : "border-zinc-600 text-zinc-300"
                      }`}
                    >
                      {b.location}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-mono">{b.batchId}</span>
                    <span className="rounded-md bg-zinc-800/70 px-2 py-0.5 text-[11px]">
                      {b.category} · {b.unit}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-zinc-400">SKU:</span> {b.sku}
                    </div>
                    <div>
                      <span className="text-zinc-400">Qty:</span> {b.qty}
                    </div>
                    <div>
                      <span className="text-zinc-400">Price:</span>{" "}
                      {dollars(b.priceCents)}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Equiv:{" "}
                    <span className="font-mono">
                      {b.equivGramsPerUnit.toFixed(1)}g
                    </span>{" "}
                    towards daily limit / unit
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="text-sm text-zinc-300">Qty</label>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value || 1)))
                }
                className="w-20 rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={() => doMove("FLOOR")}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 px-3 py-2 text-sm text-amber-300 hover:bg-amber-500/10"
              >
                <MoveRight size={16} /> Move to FLOOR
              </button>
              <button
                onClick={doSell}
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
              >
                <ShoppingCart size={16} /> Sell
              </button>
              <button
                onClick={() => {
                  setBatches(initialBatches);
                  setEvents([]);
                  setQueue([]);
                  setSelected(null);
                  setQty(1);
                  setLastLatency(null);
                  setValidating(false);
                  setCartGrams(0);
                  // reset limits to current state's preset if available
                  const preset = STATE_PRESETS[stateCode];
                  if (preset) {
                    setRecLimit(preset.rec);
                    setMedLimit(preset.med);
                  }
                }}
                className="ml-auto inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-500"
              >
                <RefreshCcw size={16} /> Reset
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              Tip: Try selling different product types (flower, carts,
              concentrates, edibles) and watch the compliance bar adjust based on{" "}
              <b>equivalent grams</b>, not just raw weight. If a sale would push
              the guest over the configured limit, the transaction is blocked
              and logged as a contract-style revert.
            </p>
          </div>

          {/* Event log */}
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-200">
                Event Log (PoP)
              </div>
              <span className="rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400">
                {events.length} events · {queue.length} queued
              </span>
            </div>
            <div className="h-[420px] overflow-auto pr-1">
              <ul className="space-y-2">
                {events.map((e) => (
                  <li
                    key={e.id}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <KindBadge kind={e.kind} />
                        <span className="text-xs text-zinc-500">
                          {new Date(e.ts).toLocaleTimeString()}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs ${
                          e.ok
                            ? "border-emerald-500/30 text-emerald-300"
                            : "border-rose-500/30 text-rose-300"
                        }`}
                      >
                        {e.ok ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <AlertTriangle size={14} />
                        )}
                        {e.ok ? "ok" : "reverted"}
                      </span>
                    </div>
                    <div className="mt-1 text-sm">{e.details}</div>
                    <div className="mt-1 flex items-center justify-between text-xs text-zinc-500">
                      <span>
                        actor={e.actor} · terminal={e.terminal}
                        {e.reason ? ` · reason="${e.reason}"` : ""}
                      </span>
                      <span
                        className={`rounded-md border px-2 py-0.5 ${
                          e.chain === "pending"
                            ? "border-sky-500/30 text-sky-300"
                            : e.chain === "queued"
                            ? "border-amber-500/30 text-amber-300"
                            : "border-emerald-500/30 text-emerald-300"
                        }`}
                      >
                        {e.chain === "pending"
                          ? "writing to chain…"
                          : e.chain === "queued"
                          ? "queued"
                          : "confirmed"}
                      </span>
                    </div>
                    {typeof e.latencyMs === "number" && (
                      <div className="mt-1 text-xs text-zinc-400">
                        local validation: {(e.latencyMs / 1000).toFixed(2)}s
                      </div>
                    )}
                  </li>
                ))}
                {events.length === 0 && (
                  <li className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-400">
                    No events yet — scan/select a batch and try move/sell.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border px-4 py-2 text-sm shadow-lg ${
              flash.type === "ok"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : "border-rose-500/40 bg-rose-500/10 text-rose-300"
            }`}
          >
            {flash.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** ---------------- Compliance Limit Bar ---------------- */
interface ComplianceLimitBarProps {
  gramsInCart: number;
  stateCode: string;
  onStateCodeChange: (code: string) => void;
  limitMode: LimitMode;
  onLimitModeChange: (mode: LimitMode) => void;
  recLimit: number;
  medLimit: number;
  onRecLimitChange: (val: number) => void;
  onMedLimitChange: (val: number) => void;
}

function ComplianceLimitBar({
  gramsInCart,
  stateCode,
  onStateCodeChange,
  limitMode,
  onLimitModeChange,
  recLimit,
  medLimit,
  onRecLimitChange,
  onMedLimitChange,
}: ComplianceLimitBarProps) {
  const [showConfig, setShowConfig] = useState<boolean>(false);

  const limit = limitMode === "rec" ? recLimit : medLimit;
  const pct = useMemo(
    () => Math.max(0, Math.min(100, (gramsInCart / Math.max(1, limit)) * 100)),
    [gramsInCart, limit]
  );
  const remaining = Math.max(0, limit - gramsInCart);
  const exceeded = gramsInCart > limit;

  const handleStateChange = (code: string) => {
    onStateCodeChange(code);
    const preset = STATE_PRESETS[code];
    if (preset) {
      onRecLimitChange(preset.rec);
      onMedLimitChange(preset.med);
    }
  };

  return (
    <div className="mx-auto mb-4 max-w-7xl rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-4">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="text-sm font-semibold">
          Compliance Limit — {stateCode}{" "}
          <span className="text-zinc-400">(daily)</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 ml-auto">
          {/* State preset selector */}
          <select
            value={stateCode}
            onChange={(e) => handleStateChange(e.target.value)}
            className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200"
          >
            <option value="MA">MA — Massachusetts</option>
            <option value="CA">CA — California</option>
            <option value="CO">CO — Colorado</option>
            <option value="CUSTOM">Custom</option>
          </select>

          <button
            onClick={() => onLimitModeChange("rec")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              limitMode === "rec"
                ? "bg-pink-500 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Recreational
          </button>
          <button
            onClick={() => onLimitModeChange("med")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
              limitMode === "med"
                ? "bg-emerald-500 text-black"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            Medical
          </button>

          <button
            onClick={() => setShowConfig((s) => !s)}
            className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700"
            title="Adjust limits (per state policy)"
          >
            Configure
          </button>
        </div>
      </div>

      {/* Config row (optional) */}
      {showConfig && (
        <div className="mb-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
            <div className="text-xs text-zinc-400">State preset</div>
            <div className="mt-1 text-sm">
              {STATE_PRESETS[stateCode]?.label || "Custom configuration"}
            </div>
            <div className="mt-2 text-[11px] text-zinc-500">
              Presets are illustrative and can be overridden below.
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
            <label className="text-xs text-zinc-400">Recreational limit (g)</label>
            <input
              type="number"
              min={0}
              value={recLimit}
              onChange={(e) => onRecLimitChange(Number(e.target.value || 0))}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100 outline-none focus:border-zinc-500"
            />
            <div className="mt-1 text-[11px] text-zinc-500">
              Example: 28g in many markets.
            </div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
            <label className="text-xs text-zinc-400">Medical limit (g)</label>
            <input
              type="number"
              min={0}
              value={medLimit}
              onChange={(e) => onMedLimitChange(Number(e.target.value || 0))}
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100 outline-none focus:border-zinc-500"
            />
            <div className="mt-1 text-[11px] text-zinc-500">
              Configure per local program rules.
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          Cart (flower-equivalent):{" "}
          <span className="text-zinc-200">{gramsInCart.toFixed(1)}g</span> /{" "}
          <span className="text-zinc-200">{limit.toFixed(1)}g</span> limit
        </div>
        {!exceeded ? (
          <div className="text-xs text-emerald-400">
            {remaining.toFixed(1)}g remaining
          </div>
        ) : (
          <div className="text-xs font-medium text-red-400">Limit exceeded</div>
        )}
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full transition-all ${
            exceeded
              ? "bg-red-500"
              : limitMode === "rec"
              ? "bg-pink-500"
              : "bg-emerald-500"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Compliance hint */}
      <div className="mt-2 text-[11px] text-zinc-500">
        Limits vary by jurisdiction and program (recreational vs. medical).
        Non-flower products are converted into a flower-equivalent limit using
        state-style rules. This demo uses example presets only.
      </div>
    </div>
  );
}

/** ---------------- UI bits ---------------- */
function ControlCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-200">
        {icon} {title}
      </div>
      {children}
    </div>
  );
}

function KindBadge({ kind }: { kind: EventKind }) {
  if (kind === "RECEIVE")
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-xs text-sky-300">
        RECEIVE
      </span>
    );
  if (kind === "MOVE")
    return (
      <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
        MOVE
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
      SELL
    </span>
  );
}
