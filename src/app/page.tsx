import getConfig from "next/config";
import { Providers } from "@/components/Providers/Providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { WalletInfo } from "@/components/WalletInfo/WalletInfo";
import { Billing } from "@/components/Billing/Billing";
import { auth } from "@/config/auth";
import { QueryInterceptor } from "@/components/common/DialogDrawer/QueryInterceptor";
import { InterceptQueryData } from "@/lib/types";
import { Instructions } from "@/components/Instructions/Instructions";
import { UserProfileBtn } from "@/components/Buttons/UserProfileBtn";
import { UserSvgUrl } from "@/components/svg";
import Image from "next/image";

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

  return (
    <Providers initialState={initialState}>
      {session?.user ? (
        <UserProfileBtn
          className="absolute top-4 right-8 lg:opacity-60 lg:hover:opacity-100"
          variant="unset"
          size="unset"
          userEmail={session.user.email || null}
          tgUserId={session.user.tgUserId}
          billingPeriodMessagesSent={session.user.billingPeriodMessagesSent}
        >
          <Image
            src={UserSvgUrl}
            className="w-16"
            alt="user"
            width="0"
            height="0"
            sizes="100vh"
            priority
          />
        </UserProfileBtn>
      ) : null}
      {/* <WalletInfo /> */}
      {/* <Billing userEmail={userEmail || null} /> */}
      <Instructions />
      <QueryInterceptor config={INTERCEPT_QUERIES_CONFIG} />
    </Providers>
  );
}
