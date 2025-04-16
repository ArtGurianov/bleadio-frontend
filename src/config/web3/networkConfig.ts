import { ValueOf } from "@/lib/types";
import { bsc, foundry, sepolia } from "viem/chains";

export const APP_NETWORKS = {
  FOUNDRY: "FOUNDRY",
  TESTNET: "TESTNET",
  MAINNET: "MAINNET",
} as const;
export type AppNetwork = ValueOf<typeof APP_NETWORKS>;

export const NETWORK_NAMES_MAP: Record<
  AppNetwork,
  typeof sepolia | typeof bsc | typeof foundry
> = {
  [APP_NETWORKS.FOUNDRY]: foundry,
  [APP_NETWORKS.TESTNET]: sepolia,
  [APP_NETWORKS.MAINNET]: bsc,
} as const;
