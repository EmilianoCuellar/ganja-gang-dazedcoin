// lib/wallet.ts
"use client";

import { http, createConfig } from "wagmi";
import { mainnet, arbitrum, optimism } from "wagmi/chains";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

if (!projectId) {
  console.warn(
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is missing. Web3Modal will not work until this is set."
  );
}

// Chains supported in the app + modal
export const chains = [mainnet, arbitrum, optimism] as const;

// dApp metadata (shown in wallet UIs)
const metadata = {
  name: "Ganja Gang",
  description: "Ganja Gang PoP + zk-ID minting and Dazed ecosystem",
  url: "https://ganjagang.xyz",
  icons: ["https://ganjagang.xyz/favicon.ico"],
};

// Wagmi config (no MetaMask SDK, so no async-storage error)
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, showQrModal: false, metadata }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: "Ganja Gang" }),
  ],
  ssr: true,
});
