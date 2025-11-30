"use client";
import React from "react";

export function Glow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(50%_50%_at_50%_40%,#000_20%,transparent)] ${className}`}
    >
      <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute right-1/4 top-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl" />
    </div>
  );
}

export function DemoPanel({
  title,
  subtitle,
  children,
}: React.PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-950 to-black p-5">
      <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-zinc-500">{subtitle}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
