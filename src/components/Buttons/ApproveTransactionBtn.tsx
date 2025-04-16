"use client";

import { Button } from "@/components/ui/button";
import { usdContractAbi } from "@/config/web3/abi";
import { useEffect } from "react";
import { parseUnits } from "viem";
import { useTransactionReceipt, useWriteContract } from "wagmi";

interface ApproveTransactionBtnProps {
  currentAllowanceUsd?: number;
  currentBalanceUsd?: number;
  priceUsd?: number;
  usdContractAddress?: `0x${string}`;
  bleadContractAddress: `0x${string}`;
  decimals?: number;
  onSuccess: () => void;
  onError: () => void;
}

export const ApproveTransactionBtn = ({
  currentAllowanceUsd,
  currentBalanceUsd,
  priceUsd,
  usdContractAddress,
  bleadContractAddress,
  decimals,
  onSuccess,
  onError,
}: ApproveTransactionBtnProps) => {
  const { writeContract, data: hash, isError: isTxError } = useWriteContract();

  const {
    isFetching,
    isSuccess,
    isError: isReceiptError,
  } = useTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isTxError || isReceiptError) {
      onError();
    }
  }, [isTxError, isReceiptError]);

  const sendTransaction = () => {
    if (!!usdContractAddress && !!priceUsd && !!decimals) {
      writeContract({
        abi: usdContractAbi,
        address: usdContractAddress,
        functionName: "approve",
        args: [bleadContractAddress, parseUnits(priceUsd.toString(), decimals)],
      });
    }
  };

  return (
    <Button
      disabled={
        isTxError ||
        isReceiptError ||
        isSuccess ||
        isFetching ||
        !usdContractAddress ||
        !decimals ||
        !priceUsd ||
        typeof currentAllowanceUsd !== "number" ||
        currentAllowanceUsd >= priceUsd ||
        typeof currentBalanceUsd !== "number" ||
        currentBalanceUsd < priceUsd
      }
      onClick={() => sendTransaction()}
    >
      {!isFetching ? `Approve ${priceUsd} USD` : "..."}
    </Button>
  );
};
