"use client";

import { ApproveTransactionBtn } from "@/components/Buttons/ApproveTransactionBtn";
import { SpendTransactionBtn } from "@/components/Buttons/SpendTransactionBtn";
import { BillingPlansSolidityKey } from "./constants";
import { useState } from "react";

interface ButtonsBlockProps {
  usdContractAddress?: `0x${string}`;
  bleadContractAddress: `0x${string}`;
  priceUsd?: number;
  decimals?: number;
  userEmail: string;
  billingPlan: BillingPlansSolidityKey;
}

export const ButtonsBlock = ({
  usdContractAddress,
  bleadContractAddress,
  priceUsd,
  decimals,
  userEmail,
  billingPlan,
}: ButtonsBlockProps) => {
  const [isError, setIsError] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isSpent, setIsSpent] = useState(false);

  return (
    <div className="flex flex-col gap-2 justify-center items-center p-8 w-full max-w-[320px]">
      <div className="flex flex-col gap-2 justify-center items-center">
        <ApproveTransactionBtn
          usdContractAddress={usdContractAddress}
          bleadContractAddress={bleadContractAddress}
          priceUsd={priceUsd}
          decimals={decimals}
          onSuccess={() => {
            setIsApproved(true);
          }}
          onError={() => {
            setIsError(true);
          }}
        />
        <SpendTransactionBtn
          contractAddress={bleadContractAddress}
          userEmail={userEmail}
          billingPlan={billingPlan}
          isApproved={isApproved}
          onSuccess={() => {
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
