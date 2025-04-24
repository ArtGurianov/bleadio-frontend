"use client";

import { PopoverDrawer } from "@/components/common/PopoverDrawer/PopoverDrawer";
import { withAuthBtn, WithAuthBtnProps } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";
import { LogoutBtn } from "./LogoutBtn";

const UserProfileBtnCore = ({ children }: WithAuthBtnProps) => {
  return (
    <PopoverDrawer
      title="User Account"
      content={
        <div>
          <LogoutBtn />
        </div>
      }
    >
      <Button>{children}</Button>
    </PopoverDrawer>
  );
};

export const UserProfileBtn = withAuthBtn(UserProfileBtnCore);
