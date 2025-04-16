"use client";

import { useAccount } from "wagmi";
import { ConnectWalletBtn } from "../Buttons/ConnectWalletBtn";
import { DisconnectWalletBtn } from "../Buttons/DisconnectWalletBtn";

export const WalletInfo = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="flex w-full p-8 flex-col gap-4 justify-center items-center">
      {!isConnected ? (
        <ConnectWalletBtn />
      ) : (
        <div className="flex flex-wrap gap-4 justify-center items-center w-full">
          <p>{`Connected ${address}.`}</p>
          <DisconnectWalletBtn />
        </div>
      )}
    </div>
  );
};
