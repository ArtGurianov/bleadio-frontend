"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAccount, useConnect } from "wagmi";

export const ConnectWalletBtn = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const connectorIndex = connectors.findIndex(
    (connector) => connector.name === "MetaMask"
  );

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
