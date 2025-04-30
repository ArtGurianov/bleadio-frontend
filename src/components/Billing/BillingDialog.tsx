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
import { useEffect, useState } from "react";
import { WalletInfo } from "../WalletInfo/WalletInfo";

const ENV_CONFIG = getClientConfig();

export const BillingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address } = useAccount();
  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    document.addEventListener("open-billing-dialog", handleOpen);
    return () => {
      document.removeEventListener("open-billing-dialog", handleOpen);
    };
  }, []);

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
    isLoading: isLoadingBalance,
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
    isLoading: isLoadingAllowance,
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
    isLoadingBalance ||
    isPendingUsdContractAddress ||
    isPendingDecimals ||
    isPendingMonthlyPriceUsd ||
    isPendingAnnualPriceUsd ||
    isLoadingAllowance;

  const isError =
    isErrorBalance ||
    isErrorDecimals ||
    isErrorUsdContractAddress ||
    isErrorMonthlyPriceUsd ||
    isErrorAnnualPriceUsd ||
    isErrorAllowance;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-mono">
            {"blead.io PRO PLAN"}
          </DialogTitle>
          <DialogDescription className="text-center font-sans font-medium text-md text-primary underline underline-offset-4">
            {"Jump from 100 to 5000 telegram notifications per month!"}
          </DialogDescription>
        </DialogHeader>
        {isError ? (
          <p>{"An error occured while getting data from the blockchain"}</p>
        ) : null}
        {isLoading ? <p>{"Loading data from the blockchain"}</p> : null}
        <WalletInfo />
        <div className="w-full flex gap-8 justify-center items-center">
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
