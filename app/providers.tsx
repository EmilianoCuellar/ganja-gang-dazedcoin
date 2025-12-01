// app/providers.tsx
"use client";

import React, { useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { wagmiConfig, projectId } from "../lib/wallet";

const queryClient = new QueryClient();

// Make sure we only init Web3Modal once, even with React strict mode
let web3ModalCreated = false;

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    if (!web3ModalCreated && projectId) {
      createWeb3Modal({
        wagmiConfig,
        projectId,
        themeMode: "dark",
        themeVariables: {
          "--w3m-accent": "#ff2d55",
        },
        enableAnalytics: true,
      });
      web3ModalCreated = true;
    }
  
    setReady(true);
  }, []);

  // Avoid rendering children until Web3Modal is registered on the client
  if (!ready) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
