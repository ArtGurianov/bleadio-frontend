"use client";

import { useSubscription } from "@/components/Providers/SubscriptionProvider";
import { cn } from "@/lib/utils";
import { BILLING_PLANS } from "@/lib/utils/contsants";
import { getUserBillingPlan } from "@/lib/utils/getUserBillingPlan";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export const UpgradeBanner = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { data } = useSubscription();

  const isVisible =
    data &&
    getUserBillingPlan(Number(data.subscriptionEndTimestamp)) ===
      BILLING_PLANS.LIGHT;

  return (
    <div
      className={cn(
        "fixed flex flex-col gap-2 w-full bottom-0 translate-y-full px-4 py-4 bg-muted/90 justify-center items-center border-t-2 rounded-t-lg",
        {
          "transform -translate-y-0 duration-800 delay-1000 ease-in-out":
            isVisible,
        }
      )}
    >
      <p className="flex flex-col gap-1 lg:flex-row justify-center items-center">
        <span>{"You’re currently on a LITE plan"}</span>
        <span>{"limited to 100 notifications/month."}</span>
      </p>
      <p className="flex gap-2 justify-center items-center">
        {"Need more?"}
        <Button
          ref={buttonRef}
          onClick={() => {
            const event = new CustomEvent("open-billing-dialog", {
              bubbles: true,
            });
            buttonRef.current?.dispatchEvent(event);
          }}
        >
          {"Upgrade to PRO"}
        </Button>
      </p>
    </div>
  );
};
