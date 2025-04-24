import { BILLING_PLANS } from "@/lib/utils/contsants";

export const getUserBillingPlan = (subscriptionEndTimestamp: number) => {
  const now = new Date();
  return Math.round(now.getTime() / 1000) > subscriptionEndTimestamp
    ? BILLING_PLANS.FREE
    : BILLING_PLANS.PAID;
};
