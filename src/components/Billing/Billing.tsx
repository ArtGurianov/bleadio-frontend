"use client";

import { bleadContractAbi, usdContractAbi } from "@/config/web3/abi";
import { stringToBytes32 } from "@/lib/utils";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ButtonsBlock } from "./ButtonsBlock";
import { BILLING_PLANS_SOLIDITY_KEYS } from "./constants";

const BLEAD_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!BLEAD_CONTRACT_ADDRESS)
  throw new Error("env variable for contract address is not provided");

const BillingContent = ({
  address,
  userEmail,
}: {
  address: `0x${string}`;
  userEmail: string | null;
}) => {
  const {
    data: usdContractAddress,
    isPending: isPendingUsdContractAddress,
    isError: isErrorUsdContractAddress,
  } = useReadContract({
    abi: bleadContractAbi,
    address: BLEAD_CONTRACT_ADDRESS as `0x${string}`,
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
    address: BLEAD_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "MONTHLY_PRICE_USD",
  });

  const {
    data: annualPriceUsd,
    isPending: isPendingAnnualPriceUsd,
    isError: isErrorAnnualPriceUsd,
  } = useReadContract({
    abi: bleadContractAbi,
    address: BLEAD_CONTRACT_ADDRESS as `0x${string}`,
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
    args: [address, BLEAD_CONTRACT_ADDRESS],
    query: { enabled: !!usdContractAddress },
  });

  const {
    data: subscriptionEndTimestamp,
    isPending: isPendingSubscriptionEndTimestamp,
    isError: isErrorSubscriptionEndTimestamp,
    refetch: refetchSubscriptionEndTimestamp,
  } = useReadContract({
    abi: bleadContractAbi,
    address: BLEAD_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "getSubscriptionEndTimestamp",
    args: userEmail ? [stringToBytes32(userEmail)] : undefined,
    query: { enabled: !!userEmail },
  });

  const isLoading =
    isPendingBalance ||
    isPendingUsdContractAddress ||
    isPendingDecimals ||
    isPendingMonthlyPriceUsd ||
    isPendingAnnualPriceUsd ||
    isPendingAllowance ||
    isPendingSubscriptionEndTimestamp;

  const isError =
    isErrorBalance ||
    isErrorDecimals ||
    isErrorUsdContractAddress ||
    isErrorMonthlyPriceUsd ||
    isErrorAnnualPriceUsd ||
    isErrorAllowance ||
    isErrorSubscriptionEndTimestamp;

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
      <p>{`Subscribed till: ${subscriptionEndTimestamp}`}</p>
      <div className="w-full flex gap-8 flex-wrap justify-center items-center">
        <ButtonsBlock
          usdContractAddress={usdContractAddress as `0x${string}` | undefined}
          bleadContractAddress={BLEAD_CONTRACT_ADDRESS as `0x${string}`}
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
          userEmail={userEmail}
          billingPlan={BILLING_PLANS_SOLIDITY_KEYS.MONTLY}
          onRefetchAllowance={() => {
            refetchAllowance();
          }}
          onRefetchSubscriptionEndTimestamp={() => {
            refetchSubscriptionEndTimestamp();
          }}
        />
        <ButtonsBlock
          usdContractAddress={usdContractAddress as `0x${string}` | undefined}
          bleadContractAddress={BLEAD_CONTRACT_ADDRESS as `0x${string}`}
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
          userEmail={userEmail}
          billingPlan={BILLING_PLANS_SOLIDITY_KEYS.ANNUAL}
          onRefetchAllowance={() => {
            refetchAllowance();
          }}
          onRefetchSubscriptionEndTimestamp={() => {
            refetchSubscriptionEndTimestamp();
          }}
        />
      </div>
    </div>
  );
};

export const Billing = ({ userEmail }: { userEmail: string | null }) => {
  const { address } = useAccount();
  return address ? (
    <BillingContent address={address} userEmail={userEmail} />
  ) : null;
};
