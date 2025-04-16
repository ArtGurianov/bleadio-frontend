"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect } from "wagmi";

export const ConnectWalletBtn = () => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  return !isConnected ? (
    <>
      {connectors.map((connector) =>
        connector.name !== "Injected" ? (
          <Button
            key={connector.uid}
            onClick={() => {
              connect({ connector });
            }}
          >
            {`Connect ${connector.name}`}
          </Button>
        ) : null
      )}
    </>
  ) : null;
};
