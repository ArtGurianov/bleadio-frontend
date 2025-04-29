import { InlineInfo } from "@/components/common/InlineInfo/InlineInfo";
import { ApiKeyControls } from "./ApiKeyControls";

export const InstructionsApiKey = () => {
  return (
    <li className="flex flex-col px-4 justify-center items-center gap-1">
      <h3 className="w-full px-2 font-mono">{"1. Get Api key"}</h3>
      <div className="flex gap-2 flex-wrap justify-center items-center">
        <InlineInfo
          className="lg:min-w-[520px]"
          label="API KEY"
          description={
            "Make sure to store it as secret variable. Do not reveal/commit to public repositories."
          }
        >
          <ApiKeyControls />
        </InlineInfo>
      </div>
    </li>
  );
};
