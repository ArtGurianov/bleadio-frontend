"use client";

import Image from "next/image";
import { logout } from "@/app/actions/logout";
import { Button } from "@/components/ui/button";
import { LogoutSvgUrl } from "@/components/svg";

export const LogoutBtn = () => {
  return (
    <Button
      onClick={logout}
      className="absolute top-8 right-8 opacity-60 hover:opacity-100"
      variant="unset"
      size="unset"
    >
      <Image
        src={LogoutSvgUrl}
        className="w-16"
        alt="logot"
        width="0"
        height="0"
        sizes="100vh"
        priority
      />
    </Button>
  );
};
