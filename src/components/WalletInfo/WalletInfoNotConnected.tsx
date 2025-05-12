"use client";

import { useState } from "react";
import { ConnectWalletBtn } from "../Buttons/ConnectWalletBtn";
import { WalletInfoDeepLink } from "./WalletInfoDeepLink";

export const WalletInfoNotConnected = () => {
  const [deeplink, setDeeplink] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <span className="font-mono text-lg text-primary">
        {"Wallet not connected"}
      </span>
      <ConnectWalletBtn onSetDeeplink={setDeeplink} />
      <WalletInfoDeepLink url={deeplink} />
    </div>
  );
};
