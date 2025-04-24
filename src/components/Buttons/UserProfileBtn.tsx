"use client";

import { PopoverDrawer } from "@/components/common/PopoverDrawer/PopoverDrawer";
import { withAuthBtn, WithAuthBtnProps } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";
import { LogoutBtn } from "./LogoutBtn";

const DISPLAY_USER_KEYS = {
  EMAIL: "EMAIL",
  TG_ID: "TG_ID",
  MESSAGES_SENT: "MESSAGES_SENT",
} as const;
type DisplayUserKey = keyof typeof DISPLAY_USER_KEYS;
const DISPLAY_DATA_ORDER: DisplayUserKey[] = [
  DISPLAY_USER_KEYS.EMAIL,
  DISPLAY_USER_KEYS.TG_ID,
  DISPLAY_USER_KEYS.MESSAGES_SENT,
];

interface UserProfileBtnProps extends WithAuthBtnProps {
  tgUserId?: number;
  billingPeriodMessagesSent: number;
}

const UserProfileBtnCore = ({
  tgUserId,
  userEmail,
  billingPeriodMessagesSent,
  children,
  className,
  variant,
  size,
}: UserProfileBtnProps) => {
  const displayData: Record<DisplayUserKey, { label: string; value: string }> =
    {
      [DISPLAY_USER_KEYS.EMAIL]: { label: "email:", value: userEmail! },
      [DISPLAY_USER_KEYS.TG_ID]: {
        label: "tg id:",
        value: tgUserId ? tgUserId.toString() : "not set! (read step 2)",
      },
      [DISPLAY_USER_KEYS.MESSAGES_SENT]: {
        label: "messages (current billing period):",
        value: billingPeriodMessagesSent.toString(),
      },
    };

  return (
    <PopoverDrawer
      title="User profile"
      className="pb-1"
      content={
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 px-4 py-3 bg-card/80 rounded-sm">
            {DISPLAY_DATA_ORDER.map((each) => (
              <p className="flex gap-2 justify-between items-center" key={each}>
                <span className="font-sans font-medium text-primary">
                  {displayData[each].label}
                </span>
                <span className="px-2 py-px bg-foreground/20 rounded-full text-sm font-mono">
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
