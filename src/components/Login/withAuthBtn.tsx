"use client";

import { GetComponentProps } from "@/lib/types";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { GuardedLoginBtn } from "./LoginDialog";

export type WithAuthBtnProps = GetComponentProps<typeof Button> & {
  userId: string | null;
};

export const withAuthBtn = <T extends WithAuthBtnProps>(component: FC<T>) => {
  return (props: T) => {
    const Cmp = component;
    return props.userId ? (
      <Cmp {...props} />
    ) : (
      <GuardedLoginBtn
        size={props.size}
        variant={props.variant}
        children={props.children}
        className={props.className}
      />
    );
  };
};
