"use client";

import { bleadContractAbi, usdContractAbi } from "@/config/web3/abi";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ButtonsBlock } from "./ButtonsBlock";
import { BILLING_PLANS_SOLIDITY_KEYS } from "./constants";
import { getClientConfig } from "@/config/env";

const ENV_CONFIG = getClientConfig();

const BillingContent = ({
  address,
  userId,
}: {
  address: `0x${string}`;
  userId: string | null;
}) => {
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
    query: { enabled: !!usdContractAddress },
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

  if (isError) {
    return <p>{"An error occured while getting data from the blockchain"}</p>;
  }

  if (isLoading) {
    return <p>{"Loading data from the blockchain"}</p>;
  }

  return (
    <div>
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
          userId={userId}
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
          userId={userId}
          billingPlan={BILLING_PLANS_SOLIDITY_KEYS.ANNUAL}
          onRefetchAllowance={() => {
            refetchAllowance();
          }}
        />
      </div>
    </div>
  );
};

export const Billing = ({ userId }: { userId: string | null }) => {
  const { address } = useAccount();
  return address ? <BillingContent address={address} userId={userId} /> : null;
};
