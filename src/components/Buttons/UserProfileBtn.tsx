"use client";

import { PopoverDrawer } from "@/components/common/PopoverDrawer/PopoverDrawer";
import { withAuthBtn, WithAuthBtnProps } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";
import { LogoutBtn } from "./LogoutBtn";
import { useSession } from "next-auth/react";
import { useSubscription } from "../Providers/SubscriptionProvider";
import { getUserBillingPlan } from "@/lib/utils/getUserBillingPlan";
import { getClientConfig } from "@/config/env";

const DISPLAY_USER_KEYS = {
  EMAIL: "EMAIL",
  TG_ID: "TG_ID",
  MESSAGES_SENT: "MESSAGES_SENT",
  BILLING_PLAN: "BILLING_PLAN",
  SUBSCRIPTION_TILL: "SUBSCRIPTION_TILL",
} as const;
type DisplayUserKey = keyof typeof DISPLAY_USER_KEYS;
const DISPLAY_DATA_ORDER: DisplayUserKey[] = [
  DISPLAY_USER_KEYS.EMAIL,
  DISPLAY_USER_KEYS.TG_ID,
  DISPLAY_USER_KEYS.MESSAGES_SENT,
  DISPLAY_USER_KEYS.BILLING_PLAN,
  DISPLAY_USER_KEYS.SUBSCRIPTION_TILL,
];

const UserProfileBtnCore = ({
  children,
  className,
  variant,
  size,
}: WithAuthBtnProps) => {
  const {
    data: subscriptionData,
    isPending,
    isLoading,
    isError,
  } = useSubscription();

  const { data: session } = useSession();
  if (!session) return null;
  const {
    user: { email, tgUserId, billingPeriodMessagesSent },
  } = session;

  let displayBillingPlan = "loading...";
  if (isError) {
    displayBillingPlan = "error";
  }
  if (subscriptionData) {
    displayBillingPlan = getUserBillingPlan(
      Number(subscriptionData.subscriptionEndTimestamp)
    );
  }
  if (isPending || isLoading) {
    displayBillingPlan = "loading...";
  }

  let displaySubscriptionTill = "loading...";
  if (isError) {
    displaySubscriptionTill = "error";
  }
  if (subscriptionData) {
    displaySubscriptionTill = `${
      Number(subscriptionData.subscriptionEndTimestamp) === 0
        ? "-"
        : new Date(
            Number(subscriptionData.subscriptionEndTimestamp) * 1000
          ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
    }`;
  }
  if (isPending || isLoading) {
    displaySubscriptionTill = "loading...";
  }

  const displayData: Record<DisplayUserKey, { label: string; value: string }> =
    {
      [DISPLAY_USER_KEYS.EMAIL]: { label: "email:", value: email! },
      [DISPLAY_USER_KEYS.TG_ID]: {
        label: "tg id:",
        value: tgUserId ? tgUserId.toString() : "not set! (read step 2)",
      },
      [DISPLAY_USER_KEYS.MESSAGES_SENT]: {
        label: "messages (current billing period):",
        value: `${billingPeriodMessagesSent.toString()}${
          displayBillingPlan === "LIGHT"
            ? "/" + getClientConfig().NEXT_PUBLIC_MESSAGES_LIMIT_LIGHT
            : displayBillingPlan === "PRO"
            ? "/" + getClientConfig().NEXT_PUBLIC_MESSAGES_LIMIT_PRO
            : ""
        }`,
      },
      [DISPLAY_USER_KEYS.BILLING_PLAN]: {
        label: "current plan:",
        value: displayBillingPlan,
      },
      [DISPLAY_USER_KEYS.SUBSCRIPTION_TILL]: {
        label: "subscriptionTill:",
        value: displaySubscriptionTill,
      },
    };

  return (
    <PopoverDrawer
      title="User profile"
      className="pb-1"
      content={
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 px-4 py-3 bg-background/60 rounded-sm">
            {DISPLAY_DATA_ORDER.map((each) => (
              <p className="flex gap-2 justify-between items-center" key={each}>
                <span className="font-sans font-medium text-primary">
                  {displayData[each].label}
                </span>
                <span className="px-2 py-px bg-foreground/10 rounded-full text-sm font-mono">
                  {displayData[each].value}
                </span>
              </p>
            ))}
          </div>
          <div className="flex w-full items-center justify-end">
            <LogoutBtn />
          </div>
        </div>
      }
    >
      <Button className={className} variant={variant} size={size}>
        {children}
      </Button>
    </PopoverDrawer>
  );
};

export const UserProfileBtn = withAuthBtn(UserProfileBtnCore);
