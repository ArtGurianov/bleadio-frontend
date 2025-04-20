"use client";

import { withAuthBtn } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";
import { GetComponentProps } from "@/lib/types";
import { FC } from "react";

const GetApiKeyBtnCore: FC<GetComponentProps<typeof Button>> = (props) => {
  return <Button {...props}>{"Get"}</Button>;
};

export const GetApiKeyBtn = withAuthBtn(GetApiKeyBtnCore);
