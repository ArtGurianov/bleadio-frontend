import getConfig from "next/config";
import { Providers } from "@/components/Providers/Providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { WalletInfo } from "@/components/WalletInfo/WalletInfo";
import { Billing } from "@/components/Billing/Billing";
import { auth } from "@/config/auth";

export default async function BillingPage() {
  const session = await auth();

  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  const initialState = cookieToInitialState(getConfig(), cookieHeader);

  const userEmail = session?.user?.email;

  return (
    <Providers initialState={initialState}>
      <WalletInfo />
      <Billing userEmail={userEmail || null} />
    </Providers>
  );
}
