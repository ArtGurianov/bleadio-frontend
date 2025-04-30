"use client";

import { ConnectWalletBtn } from "../Buttons/ConnectWalletBtn";

export const WalletInfoNotConnected = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <span className="font-mono text-lg text-primary">
        {"Wallet not connected"}
      </span>
      <ConnectWalletBtn />
    </div>
  );
};
