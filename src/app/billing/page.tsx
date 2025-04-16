import getConfig from "next/config";
import { Providers } from "@/components/Providers/Providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { WalletInfo } from "@/components/WalletInfo/WalletInfo";
import { Billing } from "@/components/Billing/Billing";

export default async function BillingPage() {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  const initialState = cookieToInitialState(getConfig(), cookieHeader);

  return (
    <Providers initialState={initialState}>
      <WalletInfo />
      <Billing />
    </Providers>
  );
}
