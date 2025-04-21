import { NETWORK_NAMES_MAP } from "@/config/web3/networkConfig";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { encodePacked } from "viem";
import { z } from "zod";
import { appDataSchema } from "./schemas/appDataSchema";

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

const ommitedKeySchema = appDataSchema.omit({ apiKey: true });
export const formatDataMessage = ({
  title,
  app,
  action,
  timestamp,
  ...rest
}: z.infer<typeof ommitedKeySchema>) => {
  const fmtTitle = `<i>TITLE:</i> <b><u>${title}</u></b>`;
  const fmtApp = app ? `\n<q><i>APP:</i> <b>${app}</b></q>` : "";
  const fmtAction = action ? `\n<i>ACTION:</i> <b>${action}</b>` : "";

  const date = timestamp ? new Date(timestamp) : null;
  const fmtTimestamp = date
    ? `\n<i>DATE:</i> <b>${date.toLocaleString()}</b>`
    : "";

  const restEntries = Object.entries(rest);
  const restLabel = restEntries.length ? "\n\n<u>OTHER DATA FIELDS:</u>\n" : "";
  const fmtRest = restEntries.length
    ? restEntries
        .map(([key, value]) => `<i>${key.toUpperCase()}</i>: <b>${value}</b>`)
        .join("\n")
    : "";

  return `${fmtTitle}${fmtApp}${fmtAction}${fmtTimestamp}${restLabel}${fmtRest}`;
};
