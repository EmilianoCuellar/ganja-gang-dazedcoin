import React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
      {children}
    </span>
  );
}
