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
    const { data, status } = useSession();
    const Cmp = component;
    return data?.user ? (
      <Cmp {...props} />
    ) : (
      <GuardedLoginBtn
        disabled={status === "loading"}
        size={props.size}
        variant={props.variant}
        children={status === "loading" ? "loading..." : props.children}
        className={props.className}
      />
    );
  };
};
