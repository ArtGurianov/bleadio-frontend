"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount, useConnect } from "wagmi";

export const ConnectWalletBtn = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const connectorIndex = connectors.findIndex(
    (connector) => connector.name === "MetaMask"
  );

  if (connectorIndex !== -1) {
    connectors[connectorIndex].getProvider().then((provider) => {
      // @ts-expect-error: wagmi ships provider with unknown type
      provider.on("display_uri", (uri: string) => router.push(uri));
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
