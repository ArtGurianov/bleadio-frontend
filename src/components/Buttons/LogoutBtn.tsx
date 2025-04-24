"use client";

import Image from "next/image";
import { logout } from "@/app/actions/logout";
import { Button } from "@/components/ui/button";
import { LogoutSvgUrl } from "@/components/svg";

export const LogoutBtn = () => {
  return (
    <Button
      onClick={() => {
        logout();
      }}
      variant="link"
      size="unset"
      className="flex gap-1 text-lg font-light font-mono"
    >
      <Image
        src={LogoutSvgUrl}
        className="w-6"
        alt="logout"
        width="0"
        height="0"
        sizes="100vh"
        priority
      />
      {"logout"}
    </Button>
  );
};
