import { sepolia, bsc, foundry } from "viem/chains";
import { cookieStorage, createConfig, createStorage, injected } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { createViemClient } from "./viemClient";

export const wagmiConfig = createConfig({
  chains: [sepolia, bsc, foundry],
  connectors: [injected({ target: "metaMask" }), metaMask()],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  client: ({ chain }) => createViemClient(chain),
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
