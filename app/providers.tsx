// app/providers.tsx
"use client";

import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, initWeb3ModalSingleton } from "@/lib/wallet";

// ✅ Initialize Web3Modal on the client before any component renders
if (typeof window !== "undefined") {
  initWeb3ModalSingleton();
}

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
