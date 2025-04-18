"use client";

import { ApproveTransactionBtn } from "@/components/Buttons/ApproveTransactionBtn";
import { SpendTransactionBtn } from "@/components/Buttons/SpendTransactionBtn";
import { BillingPlansSolidityKey } from "./constants";
import { useState } from "react";

interface ButtonsBlockProps {
  usdContractAddress?: `0x${string}`;
  bleadContractAddress: `0x${string}`;
  priceUsd?: number;
  allowance?: number;
  balance?: number;
  decimals?: number;
  userEmail: string | null;
  billingPlan: BillingPlansSolidityKey;
  onRefetchAllowance: () => void;
  onRefetchSubscriptionEndTimestamp: () => void;
}

export const ButtonsBlock = ({
  usdContractAddress,
  bleadContractAddress,
  priceUsd,
  allowance,
  balance,
  decimals,
  userEmail,
  billingPlan,
  onRefetchAllowance,
  onRefetchSubscriptionEndTimestamp,
}: ButtonsBlockProps) => {
  const [isError, setIsError] = useState(false);
  const [isSpent, setIsSpent] = useState(false);

  return (
    <div className="flex flex-col gap-2 justify-center items-center p-8 w-full max-w-[320px]">
      <div className="flex flex-col gap-2 justify-center items-center">
        <ApproveTransactionBtn
          userEmail={userEmail}
          usdContractAddress={usdContractAddress}
          bleadContractAddress={bleadContractAddress}
          priceUsd={priceUsd}
          currentAllowanceUsd={allowance}
          currentBalanceUsd={balance}
          decimals={decimals}
          onSuccess={() => {
            onRefetchAllowance();
          }}
          onError={() => {
            setIsError(true);
          }}
        />
        <SpendTransactionBtn
          contractAddress={bleadContractAddress}
          priceUsd={priceUsd}
          currentAllowanceUsd={allowance}
          currentBalanceUsd={balance}
          userEmail={userEmail}
          billingPlan={billingPlan}
          onSuccess={() => {
            onRefetchAllowance();
            onRefetchSubscriptionEndTimestamp();
            setIsSpent(true);
          }}
          onError={() => {
            setIsError(true);
          }}
        />
      </div>
      {isError ? <p>{"A blockchain error occured."}</p> : null}
      {isSpent ? <p>{"Well done!"}</p> : null}
    </div>
  );
};
