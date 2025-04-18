"use client";

import { GetComponentProps } from "@/lib/types";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { GuardedLoginBtn } from "./LoginDialog";

type WithAuthBtnProps = GetComponentProps<typeof Button> & {
  userEmail: string | null;
};

export const withAuthBtn = <T extends WithAuthBtnProps>(component: FC<T>) => {
  return (props: T) => {
    const Cmp = props.userEmail ? component : GuardedLoginBtn;
    return <Cmp {...props} />;
  };
};
