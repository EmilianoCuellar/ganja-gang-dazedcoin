// lib/wallet.ts
import { http, createConfig } from "wagmi";
import { mainnet, polygon, arbitrum, optimism, base } from "viem/chains";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { createWeb3Modal } from "@web3modal/wagmi/react";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;
if (!projectId) throw new Error("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID");

export const chains = [mainnet, base, polygon, arbitrum, optimism] as const;

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: "Ganja Gang" }),
  ],
});

// ---- Singleton init: call BEFORE any hook usage ----
let _w3mInited = false;
export function initWeb3ModalSingleton() {
  if (_w3mInited) return;
  if (typeof window === "undefined") return; // guard SSR
  createWeb3Modal({
    wagmiConfig,
    projectId,
    themeMode: "dark",
    themeVariables: { "--w3m-accent": "#ff2d55" },
    enableAnalytics: true,
  });
  _w3mInited = true;
}
