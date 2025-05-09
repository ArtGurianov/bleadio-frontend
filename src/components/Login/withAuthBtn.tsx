"use client";

import { GetComponentProps } from "@/lib/types";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { GuardedLoginBtn } from "./LoginDialog";
import { useSession } from "next-auth/react";

export const withAuthBtn = <T extends GetComponentProps<typeof Button>>(
  component: FC<T>
): FC<T> => {
  const WithAuthBtn = (props: T) => {
    const { data, status } = useSession();
    const Cmp = component;
    Cmp.displayName = "Button";
    return data?.user ? (
      <Cmp {...props} />
    ) : (
      <GuardedLoginBtn
        disabled={status === "loading"}
        size={props.size}
        variant={props.variant}
        className={props.className}
      >
        {status === "loading" ? "loading..." : props.children}
      </GuardedLoginBtn>
    );
  };
  WithAuthBtn.displayName = "WithAuthBtn";

  return WithAuthBtn;
};
