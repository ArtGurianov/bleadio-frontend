"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ResetApiKeyBtn {
  children: ReactNode;
}

export const ResetApiKeyBtn = ({ children }: ResetApiKeyBtn) => {
  return <Button>{children}</Button>;
};
