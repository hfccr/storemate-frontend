import '../styles/globals.css'
import { useState, useEffect } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import dynamic from "next/dynamic";

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


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
