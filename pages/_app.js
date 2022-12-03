import '../styles/globals.css'
import { useState, useEffect } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";

const Navbar = dynamic(() => import("../components/Navbar"), {
  ssr: false,
});

const fvmChain = {
  id: 31415,
  name: "Filecoin — Wallaby testnet",
  network: "wallaby",
  nativeCurrency: {
    decimals: 18,
    name: "Testnet Filecoin",
    symbol: "tFil",
  },
  rpcUrls: {
    default: "https://wallaby.node.glif.io/rpc/v0",
  },
  blockExplorers: {
    default: { name: "Glif", url: "https://explorer.glif.io/wallaby" },
  },
  testnet: true,
};

const { chains, provider, webSocketProvider } = configureChains(
  [fvmChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== fvmChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

let client;
if (typeof window !== "undefined") {
  client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });
}

function MyApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      {typeof window !== "undefined" && client && (
        <WagmiConfig client={client}>
          <Navbar suppressHydrationWarning />
          <Component {...pageProps} />
          <Toaster />
        </WagmiConfig>
      )}

    </div>

  );
}

export default MyApp
