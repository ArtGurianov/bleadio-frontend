"use client";

import { GetComponentProps } from "@/lib/types";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { GuardedLoginBtn } from "./LoginDialog";

export type WithAuthBtnProps = GetComponentProps<typeof Button> & {
  userEmail: string | null;
};

export const withAuthBtn = <T extends WithAuthBtnProps>(component: FC<T>) => {
  return (props: T) => {
    const Cmp = component;
    return props.userEmail ? (
      <Cmp {...props} />
    ) : (
      <GuardedLoginBtn children={props.children} className={props.className} />
    );
  };
};
