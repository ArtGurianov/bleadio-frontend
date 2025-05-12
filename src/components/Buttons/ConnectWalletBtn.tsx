"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";

export const ConnectWalletBtn = ({
  onSetDeeplink,
}: {
  onSetDeeplink: (_: string) => void;
}) => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [disabled, setDisabled] = useState(false);

  connectors[0].getProvider().then((provider) => {
    // @ts-expect-error: wagmi ships provider with unknown type
    provider.on("display_uri", (deeplink: string) => {
      onSetDeeplink(deeplink);
      setDisabled(true);
    });
  });

  const handleClick = () => {
    connect({ connector: connectors[0] });
  };

  if (isConnected) return null;

  return (
    <Button disabled={disabled} onClick={handleClick}>
      {"Connect MetaMask"}
    </Button>
  );
};
