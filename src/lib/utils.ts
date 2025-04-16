import { NETWORK_NAMES_MAP } from "@/config/web3/networkConfig";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { encodePacked } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAppChain() {
  switch (process.env.NEXT_PUBLIC_APP_ENV) {
    case "development":
      return NETWORK_NAMES_MAP.FOUNDRY;
    case "test":
      return NETWORK_NAMES_MAP.FOUNDRY;
    case "production":
      return process.env.NEXT_PUBLIC_NETWORK === "mainnet"
        ? NETWORK_NAMES_MAP.MAINNET
        : NETWORK_NAMES_MAP.TESTNET;
    default:
      return NETWORK_NAMES_MAP.FOUNDRY;
  }
}

export function stringToBytes32(value: string) {
  const bytes = encodePacked(["string"], [value]);

  return bytes.length > 66
    ? (bytes.slice(0, 66) as `0x${string}`)
    : (`${bytes}${"0".repeat(66 - bytes.length)}` as `0x${string}`);
}
