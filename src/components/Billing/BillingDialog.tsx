"use client";

import { bleadContractAbi, usdContractAbi } from "@/config/web3/abi";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ButtonsBlock } from "./ButtonsBlock";
import { BILLING_PLANS_SOLIDITY_KEYS } from "./constants";
import { getClientConfig } from "@/config/env";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const ENV_CONFIG = getClientConfig();

export const BillingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();

  const {
    data: usdContractAddress,
    isPending: isPendingUsdContractAddress,
    isError: isErrorUsdContractAddress,
  } = useReadContract({
    abi: bleadContractAbi,
    address: ENV_CONFIG.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
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
    data: balanceUsd,
    isPending: isPendingBalance,
    isError: isErrorBalance,
  } = useReadContract({
    abi: usdContractAbi,
    address: usdContractAddress as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
    query: { enabled: !!address },
  });

  const {
    data: monthlyPriceUsd,
    isPending: isPendingMonthlyPriceUsd,
    isError: isErrorMonthlyPriceUsd,
  } = useReadContract({
    abi: bleadContractAbi,
    address: ENV_CONFIG.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "MONTHLY_PRICE_USD",
  });

  const {
    data: annualPriceUsd,
    isPending: isPendingAnnualPriceUsd,
    isError: isErrorAnnualPriceUsd,
  } = useReadContract({
    abi: bleadContractAbi,
    address: ENV_CONFIG.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "ANNUAL_PRICE_USD",
  });

  const {
    data: allowance,
    isPending: isPendingAllowance,
    isError: isErrorAllowance,
    refetch: refetchAllowance,
  } = useReadContract({
    abi: usdContractAbi,
    address: usdContractAddress as `0x${string}`,
    functionName: "allowance",
    args: [address, ENV_CONFIG.NEXT_PUBLIC_CONTRACT_ADDRESS],
    query: { enabled: !!usdContractAddress && !!address },
  });

  const isLoading =
    isPendingBalance ||
    isPendingUsdContractAddress ||
    isPendingDecimals ||
    isPendingMonthlyPriceUsd ||
    isPendingAnnualPriceUsd ||
    isPendingAllowance;

  const isError =
    isErrorBalance ||
    isErrorDecimals ||
    isErrorUsdContractAddress ||
    isErrorMonthlyPriceUsd ||
    isErrorAnnualPriceUsd ||
    isErrorAllowance;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-screen h-screen">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        {isError ? (
          <p>{"An error occured while getting data from the blockchain"}</p>
        ) : null}
        {isLoading ? <p>{"Loading data from the blockchain"}</p> : null}
        <p>{`User balance: ${Number(
          formatUnits(
            balanceUsd ? (balanceUsd as bigint) : BigInt(0),
            Number(decimals)
          )
        )}`}</p>
        <p>{`Montly price USD: ${monthlyPriceUsd}`}</p>
        <p>{`Montly price USD: ${annualPriceUsd}`}</p>
        <p>{`Allowance USD: ${Number(
          formatUnits(
            allowance ? (allowance as bigint) : BigInt(0),
            Number(decimals)
          )
        )}`}</p>
        <div className="w-full flex gap-8 flex-wrap justify-center items-center">
          <ButtonsBlock
            usdContractAddress={usdContractAddress as `0x${string}` | undefined}
            bleadContractAddress={
              ENV_CONFIG.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
            }
            priceUsd={monthlyPriceUsd as number | undefined}
            allowance={Number(
              formatUnits(
                allowance ? (allowance as bigint) : BigInt(0),
                Number(decimals)
              )
            )}
            balance={Number(
              formatUnits(
                balanceUsd ? (balanceUsd as bigint) : BigInt(0),
                Number(decimals)
              )
            )}
            decimals={decimals as number | undefined}
            billingPlan={BILLING_PLANS_SOLIDITY_KEYS.MONTLY}
            onRefetchAllowance={() => {
              refetchAllowance();
            }}
          />
          <ButtonsBlock
            usdContractAddress={usdContractAddress as `0x${string}` | undefined}
            bleadContractAddress={
              ENV_CONFIG.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`
            }
            priceUsd={annualPriceUsd as number | undefined}
            allowance={Number(
              formatUnits(
                allowance ? (allowance as bigint) : BigInt(0),
                Number(decimals)
              )
            )}
            balance={Number(
              formatUnits(
                balanceUsd ? (balanceUsd as bigint) : BigInt(0),
                Number(decimals)
              )
            )}
            decimals={decimals as number | undefined}
            billingPlan={BILLING_PLANS_SOLIDITY_KEYS.ANNUAL}
            onRefetchAllowance={() => {
              refetchAllowance();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
