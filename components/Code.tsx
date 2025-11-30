"use client";

import { useState } from "react";

export function CodeBlock({
  code,
  language = "ts",
  className = "",
  caption,
}: {
  code: string;
  language?: string;
  className?: string;
  caption?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback: do nothing
    }
  }

  return (
    <figure className={`relative rounded-xl border border-zinc-800 bg-zinc-950 ${className}`}>
      <div className="flex items-center justify-between px-3 py-2">
        <figcaption className="text-xs text-zinc-400">{caption ?? language.toUpperCase()}</figcaption>
        <button
          onClick={onCopy}
          className="rounded-lg border border-zinc-700 px-2 py-1 text-xs text-zinc-200 hover:border-zinc-500"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-3 pb-3 text-xs leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </figure>
  );
}
