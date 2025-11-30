"use client";

import Link from "next/link";

export default function HeaderBar({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode; // optional slot (e.g., CTA)
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-lg border border-zinc-800 px-3 py-1 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white">
            Home
          </Link>
          <div className="h-6 w-px bg-zinc-800" />
          <div>
            <div className="text-sm font-semibold">{title}</div>
            {subtitle ? <div className="text-xs text-zinc-400">{subtitle}</div> : null}
          </div>
        </div>
        {right}
      </div>
    </header>
  );
}
