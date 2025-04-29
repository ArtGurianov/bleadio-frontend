import { cookieStorage, createConfig, createStorage, injected } from "wagmi";
import { createViemClient } from "./viemClient";
import { getAppChain } from "@/lib/utils";

const chain = getAppChain();

export const wagmiConfig = createConfig({
  chains: [chain],
  connectors: [injected()],
  storage: createStorage({ storage: cookieStorage }),
  ssr: true,
  client: () => createViemClient(chain),
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
