import { GetApiKeyBtn } from "@/components/Buttons/GetApiKeyBtn";
import { ResetApiKeyBtn } from "@/components/Buttons/ResetApiKeyBtn";
import { InlineInfo } from "@/components/common/InlineInfo/InlineInfo";
import { auth } from "@/config/auth";
import { ApiKeyControls } from "./ApiKeyControls";

export const InstructionsApiKey = async () => {
  const session = await auth();
  const apiKey = session?.user?.apiKey;
  const userEmail = session?.user?.email;

  return (
    <li className="flex flex-col px-4 w-full justify-center items-center">
      <h3>{"1. Get Api key"}</h3>
      <div className="flex gap-2 flex-wrap justify-center items-center">
        <InlineInfo
          label="API KEY"
          description={
            "Make sure to store it as secret variable. Do not reveal/commit to public repositories."
          }
        >
          <ApiKeyControls initialValue={apiKey} userEmail={userEmail || null} />
        </InlineInfo>
      </div>
    </li>
  );
};
