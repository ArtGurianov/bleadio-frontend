"use client";

import { Button } from "@/components/ui/button";
import { useDeepLink } from "@/lib/hooks/useDeepLink";
import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import Link from "next/link";

const FALLBACK_URL = "https://metamask.io/download";

export const ConnectWalletBtn = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const connectorIndex = connectors.findIndex(
    (connector) => connector.name === "MetaMask"
  );
  const [deeplink, setDeeplink] = useState<string | null>(null);
  useDeepLink(deeplink, FALLBACK_URL);

  if (connectorIndex !== -1) {
    connectors[connectorIndex].getProvider().then((provider) => {
      // @ts-expect-error: wagmi ships provider with unknown type
      provider.on("display_uri", (deeplink: string) => {
        setDeeplink(deeplink);
      });
    });
  }

  const handleClick = () => {
    if (connectorIndex !== -1) {
      connect({ connector: connectors[connectorIndex] });
    }
  };

  if (isConnected) return null;

  return (
    <Button onClick={handleClick}>
      {connectorIndex === -1 ? (
        <Link href="https://metamask.io/download">{"Get MetaMask"}</Link>
      ) : (
        `Connect MetaMask`
      )}
    </Button>
  );
};
