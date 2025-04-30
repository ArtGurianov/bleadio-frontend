"use client";

import { useAccount, useReadContract } from "wagmi";
import { DisconnectWalletBtn } from "../Buttons/DisconnectWalletBtn";
import { formatUnits } from "viem";
import { bleadContractAbi, usdContractAbi } from "@/config/web3/abi";
import { getClientConfig } from "@/config/env";
import { TruncatedString } from "../common/TruncatedString/TruncatedString";
import { TooltipPopover } from "../common/TooltipPopover/TooltipPopover";
import { AlertCircleIcon } from "lucide-react";

export const WalletInfoConnected = () => {
  const { address } = useAccount();

  const {
    data: usdContractAddress,
    isPending: isPendingUsdContractAddress,
    isError: isErrorUsdContractAddress,
  } = useReadContract({
    abi: bleadContractAbi,
    address: getClientConfig().NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "USD_CONTRACT_ADDRESS",
  });

  const {
    data: decimals,
    isPending: isPendingDecimals,
    isError: isErrorDecimals,
  } = useReadContract({
    abi: usdContractAbi,
    address: usdContractAddress as `0x${string}`,
    functionName: "decimals",
    query: { enabled: !!usdContractAddress },
  });

  const {
    data: symbol,
    isPending: isPendingSymbol,
    isError: isErrorSymbol,
  } = useReadContract({
    abi: usdContractAbi,
    address: usdContractAddress as `0x${string}`,
    functionName: "symbol",
    query: { enabled: !!usdContractAddress },
  });

  const {
    data: balanceUsd,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useReadContract({
    abi: usdContractAbi,
    address: usdContractAddress as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  const isLoading =
    isPendingUsdContractAddress ||
    isLoadingBalance ||
    isPendingDecimals ||
    isPendingSymbol;
  const isError =
    isErrorUsdContractAddress ||
    isErrorBalance ||
    isErrorDecimals ||
    isErrorSymbol;

  let displayBalance = "loading...";
  if (typeof balanceUsd === "bigint" && typeof decimals === "number") {
    displayBalance = formatUnits(
      balanceUsd ? (balanceUsd as bigint) : BigInt(0),
      Number(decimals)
    );
  }
  if (isError) {
    displayBalance = "blockchain fetch error";
  }
  if (isLoading) {
    displayBalance = "loading...";
  }

  return (
    <div className="flex flex-wrap gap-4 justify-between items-center w-full px-6">
      <div className="flex flex-col gap-1 justify-center items-start">
        <p className="flex gap-2 justify-center items-center flex-wrap font-mono font-medium">
          {"Connected:"}
          <TruncatedString cutFrom="middle">{address!}</TruncatedString>
        </p>
        <p className="flex justify-center items-center gap-1 font-mono">
          {`Balance: ${displayBalance} ${symbol}`}
          <TooltipPopover
            content={`${symbol} token address is ${usdContractAddress} on BNB chain`}
          >
            <AlertCircleIcon size={16} className="text-muted" />
          </TooltipPopover>
        </p>
      </div>
      <DisconnectWalletBtn />
    </div>
  );
};
