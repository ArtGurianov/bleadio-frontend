import { sepolia, bsc, foundry } from "viem/chains";
import {
  cookieStorage,
  createConfig,
  createStorage,
  http,
  injected,
} from "wagmi";
import { metaMask } from "wagmi/connectors";

// const chain = getAppChain();

const config = createConfig({
  chains: [sepolia, bsc, foundry],
  transports: {
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [foundry.id]: http(),
  },
  connectors: [injected(), metaMask()],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
});

export const getWagmiConfig = () => config;

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getWagmiConfig>;
  }
}
