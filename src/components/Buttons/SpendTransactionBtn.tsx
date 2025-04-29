"use client";

import { Button } from "@/components/ui/button";
import { bleadContractAbi } from "@/config/web3/abi";
import { stringToBytes32 } from "@/lib/utils";
import { useTransactionReceipt, useWriteContract } from "wagmi";
import {
  BILLING_PLANS_SOLIDITY_KEYS_MAP,
  BillingPlansSolidityKey,
} from "@/components/Billing/constants";
import { FC, useEffect } from "react";
import { withAuthBtn } from "@/components/Login/withAuthBtn";
import { GetComponentProps } from "@/lib/types";
import { useSubscription } from "@/components/Providers/SubscriptionProvider";

interface SpendTransactionBtnProps extends GetComponentProps<typeof Button> {
  userId: string | null;
  currentAllowanceUsd?: number;
  currentBalanceUsd?: number;
  priceUsd?: number;
  contractAddress: `0x${string}`;
  billingPlan: BillingPlansSolidityKey;
  onSuccess: () => void;
  onError: () => void;
}

const SpendTransactionBtnCore: FC<SpendTransactionBtnProps> = ({
  currentAllowanceUsd,
  currentBalanceUsd,
  priceUsd,
  contractAddress,
  userId,
  billingPlan,
  onSuccess,
  onError,
  children,
}) => {
  const { writeContract, data: hash, isError: isTxError } = useWriteContract();
  const { refetch } = useSubscription();

  const {
    isFetching,
    isSuccess,
    isError: isReceiptError,
  } = useTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      refetch();
      onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isTxError || isReceiptError) {
      onError();
    }
  }, [isTxError, isReceiptError]);

  const sendTransaction = () => {
    if (userId) {
      writeContract({
        abi: bleadContractAbi,
        address: contractAddress,
        functionName: "updateSubscription",
        args: [
          stringToBytes32(userId),
          BILLING_PLANS_SOLIDITY_KEYS_MAP[billingPlan],
        ],
      });
    }
  };

  return (
    <Button
      disabled={
        isTxError ||
        isReceiptError ||
        isFetching ||
        !priceUsd ||
        typeof currentAllowanceUsd !== "number" ||
        currentAllowanceUsd < priceUsd ||
        typeof currentBalanceUsd !== "number" ||
        currentBalanceUsd < priceUsd
      }
      onClick={() => {
        sendTransaction();
      }}
    >
      {!isFetching ? children : "..."}
    </Button>
  );
};

export const SpendTransactionBtn = withAuthBtn(SpendTransactionBtnCore);
