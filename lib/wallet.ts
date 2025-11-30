// lib/wallet.ts
"use client";

import { createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, optimism } from "wagmi/chains";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { createWeb3Modal } from "@web3modal/wagmi/react";

// ---------------- Env + constants ----------------
const envProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!envProjectId) {
  throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");
}

// Explicit string so TS stops complaining
export const WALLETCONNECT_PROJECT_ID: string = envProjectId;

// ---------------- wagmi config ----------------
export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      showQrModal: false,
    }),
    injected({
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: "Ganja Gang",
    }),
  ],
});

// ---------------- Web3Modal singleton init ----------------
let _w3mInited = false;

export function initWeb3ModalSingleton() {
  if (_w3mInited) return;
  if (typeof window === "undefined") return; // SSR guard

  createWeb3Modal({
    wagmiConfig,
    projectId: WALLETCONNECT_PROJECT_ID, // now typed as string
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#ff2d55",
    },
    enableAnalytics: true,
  });

  _w3mInited = true;
}
