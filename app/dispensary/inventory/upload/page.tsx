"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Upload, FileDown, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";

/** Expected logical columns */
const REQUIRED = ["SKU", "Name", "Category", "Quantity", "UnitPrice", "PackageID", "EventType", "Timestamp"] as const;
type RequiredKey = typeof REQUIRED[number];

type RawRow = Record<string, string>;
type NormalizedRow = Record<RequiredKey, string>;

export default function InventoryUploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<RawRow[]>([]);
  const [mapping, setMapping] = useState<Record<RequiredKey, string>>({
    SKU: "", Name: "", Category: "", Quantity: "", UnitPrice: "", PackageID: "", EventType: "", Timestamp: ""
  });
  const [preview, setPreview] = useState<NormalizedRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; receipts?: string[]; counts?: any; error?: string } | null>(null);

  /** CSV -> { headers, rows } (robust enough for simple CSV; handles quotes & commas) */
  const parseCsv = useCallback((text: string) => {
    const rows: string[][] = [];
    let cur = "", row: string[] = [], inQuotes = false;

    const pushCell = () => { row.push(cur); cur = ""; };
    const pushRow = () => { rows.push(row); row = []; };

    for (let i = 0; i < text.length; i++) {
      const c = text[i], n = text[i + 1];
      if (c === '"') {
        if (inQuotes && n === '"') { cur += '"'; i++; } // escaped quote
        else { inQuotes = !inQuotes; }
      } else if (c === "," && !inQuotes) {
        pushCell();
      } else if ((c === "\n" || (c === "\r" && n === "\n")) && !inQuotes) {
        pushCell(); pushRow();
        if (c === "\r") i++;
      } else {
        cur += c;
      }
    }
    if (cur.length || row.length) { pushCell(); pushRow(); }
    const [hdr, ...data] = rows.filter(r => r.length && r.some(x => x.trim().length));
    const header = (hdr ?? []).map(h => h?.trim());
    const body = data.map(r => {
      const o: RawRow = {};
      header.forEach((h, idx) => { o[h] = (r[idx] ?? "").trim(); });
      return o;
    });
    return { header, body };
  }, []);

  const onFile = useCallback(async (f: File) => {
    const text = await f.text();
    const { header, body } = parseCsv(text);
    setFileName(f.name);
    setHeaders(header);
    setRawRows(body);
    // try auto-map by header similarity
    const auto: Record<RequiredKey, string> = { SKU: "", Name: "", Category: "", Quantity: "", UnitPrice: "", PackageID: "", EventType: "", Timestamp: "" };
    header.forEach(h => {
      const key = h.toLowerCase();
      if (key.includes("sku")) auto.SKU = h;
      else if (key.includes("name") || key.includes("product")) auto.Name = h;
      else if (key.includes("cat")) auto.Category = h;
      else if (key.includes("qty") || key.includes("quantity")) auto.Quantity = h;
      else if (key.includes("price")) auto.UnitPrice = h;
      else if (key.includes("metrc") || key.includes("package")) auto.PackageID = h;
      else if (key.includes("event")) auto.EventType = h;
      else if (key.includes("time") || key.includes("date")) auto.Timestamp = h;
    });
    setMapping(auto);
    setPreview([]); setResult(null);
  }, [parseCsv]);

  const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile(f);
  }, [onFile]);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  }, [onFile]);

  const canMap = useMemo(() => REQUIRED.every(k => mapping[k]), [mapping]);

  const buildPreview = useCallback(() => {
    if (!canMap) return;
    const pv: NormalizedRow[] = rawRows.slice(0, 50).map(r => {
      const o: any = {};
      REQUIRED.forEach(key => { o[key] = r[mapping[key]] ?? ""; });
      return o as NormalizedRow;
    });
    setPreview(pv);
    setResult(null);
  }, [rawRows, mapping, canMap]);

  const submit = useCallback(async () => {
    if (!preview.length) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inventory/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: preview }),
      });
      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setResult({ ok: false, error: e?.message ?? "Upload failed" });
    } finally {
      setSubmitting(false);
    }
  }, [preview]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Top */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500 to-emerald-400" />
            <span className="text-lg font-semibold">Inventory Upload</span>
            <Badge>PoP mapping</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dispensary/inventory" className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:border-zinc-600">
              <ArrowLeft className="mr-1 inline" size={14}/> Dashboard
            </Link>
            <Link href="/" className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:border-zinc-600">Home</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Step 1: Template + Dropzone */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">
            <div className="mb-2 text-sm font-semibold">1) Download template</div>
            <p className="text-sm text-zinc-300">Use our CSV format or map your own headers.</p>
            <a href="/api/inventory/template" className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 px-3 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10">
              <FileDown size={16}/> Download CSV template
            </a>
          </div>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="lg:col-span-2 flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-black/30 p-8 text-center hover:border-zinc-500"
          >
            <div>
              <Upload className="mx-auto text-zinc-400" />
              <div className="mt-2 text-sm font-semibold">{fileName ?? "Drag & drop CSV here"}</div>
              <div className="text-xs text-zinc-400">or click to select</div>
              <input type="file" accept=".csv,text/csv" className="hidden" onChange={onInput} />
            </div>
          </label>
        </section>

        {/* Step 2: Mapping */}
        {!!headers.length && (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-black/40 p-5">
            <div className="mb-3 text-sm font-semibold">2) Map your columns</div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {REQUIRED.map((k) => (
                <div key={k} className="space-y-1">
                  <div className="text-xs text-zinc-400">{k}</div>
                  <select
                    value={mapping[k]}
                    onChange={(e) => setMapping((m) => ({ ...m, [k]: e.target.value }))}
                    className="w-full rounded-lg border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-200 outline-none"
                  >
                    <option value="">— Choose column —</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                disabled={!canMap}
                onClick={buildPreview}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-50"
              >
                Build preview
              </button>
              {!canMap && (
                <span className="ml-3 inline-flex items-center gap-1 text-xs text-amber-300">
                  <AlertTriangle size={14}/> Map all required fields
                </span>
              )}
            </div>
          </section>
        )}

        {/* Step 3: Preview */}
        {!!preview.length && (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-black/40">
            <div className="flex items-center justify-between border-b border-zinc-800 p-4">
              <div>
                <div className="text-sm text-zinc-400">3) Preview</div>
                <div className="text-lg font-semibold">{preview.length} rows (showing up to 50)</div>
              </div>
              <Badge>PoP-ready</Badge>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-xs uppercase text-zinc-400">
                  <tr className="border-b border-zinc-800">
                    {REQUIRED.map(h => <th key={h} className="px-4 py-3">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((r, i) => (
                    <tr key={i} className="border-b border-zinc-900/60">
                      {REQUIRED.map(h => <td key={h} className="px-4 py-3">{r[h]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-zinc-800 p-4">
              <p className="text-sm text-zinc-300">Submitting creates <b>PoP receipt candidates</b> (demo mode).</p>
              <button
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 disabled:opacity-50"
              >
                {submitting ? "Submitting…" : "Submit to Dazed (demo)"}
              </button>
            </div>
          </section>
        )}

        {/* Result */}
        {result && (
          <section className="mt-6 rounded-2xl border border-zinc-800 bg-black/40 p-5">
            {result.ok ? (
              <>
                <div className="mb-2 inline-flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 size={18}/> Uploaded successfully
                </div>
                <div className="text-sm text-zinc-300">
                  Receipts created: <b>{result.receipts?.length ?? 0}</b> · OK: <b>{result.counts?.ok ?? 0}</b> · Errors: <b>{result.counts?.error ?? 0}</b>
                </div>
                {!!result.receipts?.length && (
                  <div className="mt-3 overflow-x-auto rounded-lg border border-zinc-800">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs uppercase text-zinc-400">
                        <tr className="border-b border-zinc-800">
                          <th className="px-4 py-3">#</th>
                          <th className="px-4 py-3">Receipt ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.receipts!.slice(0, 25).map((id, i) => (
                          <tr key={id} className="border-b border-zinc-900/60">
                            <td className="px-4 py-3">{i + 1}</td>
                            <td className="px-4 py-3 font-mono">{id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-amber-300">Upload failed: {result.error ?? "Unknown error"}</div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
