import getConfig from "next/config";
import { Providers } from "@/components/Providers/Providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { WalletInfo } from "@/components/WalletInfo/WalletInfo";
import { Billing } from "@/components/Billing/Billing";
import { auth } from "@/config/auth";
import { LogoutBtn } from "@/components/Buttons/LogoutBtn";
import { QueryInterceptor } from "@/components/common/DialogDrawer/QueryInterceptor";
import { InterceptQueryData } from "@/lib/types";
import { Instructions } from "@/components/Instructions/Instructions";
import { UserProfileBtn } from "@/components/Buttons/UserProfileBtn";

const INTERCEPT_QUERIES_CONFIG: InterceptQueryData[] = [
  {
    queryKey: "loggedIn",
    title: "Logged in",
    children: <h1>{"Successfully logged in"}</h1>,
  },
  {
    queryKey: "loggedOut",
    title: "Logged out",
    children: <h1>{"Successfully logged out"}</h1>,
  },
];

export default async function HomePage() {
  const session = await auth();

  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");
  const initialState = cookieToInitialState(getConfig(), cookieHeader);

  const userEmail = session?.user?.email;

  return (
    <Providers initialState={initialState}>
      <UserProfileBtn userEmail={userEmail || null}>{"test"}</UserProfileBtn>
      {/* <WalletInfo /> */}
      {/* <Billing userEmail={userEmail || null} /> */}
      <Instructions />
      <QueryInterceptor config={INTERCEPT_QUERIES_CONFIG} />
    </Providers>
  );
}
