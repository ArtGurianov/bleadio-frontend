"use client";

import { GetComponentProps } from "@/lib/types";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { GuardedLoginBtn } from "./LoginDialog";
import { useSession } from "next-auth/react";

export const withAuthBtn = <T extends GetComponentProps<typeof Button>>(
  component: FC<T>
) => {
  return (props: T) => {
    const { data } = useSession();
    const Cmp = component;
    return data?.user ? (
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
