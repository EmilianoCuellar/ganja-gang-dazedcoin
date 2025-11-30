import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-[0_0_1px_#fff4] backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
