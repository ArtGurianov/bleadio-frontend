import { InstructionsApiKey } from "./ApiKey/InstructionsApiKey";
import { InstructionsTelegramBot } from "./TelegramBot/InstructionsTelegramBot";
import { InstructionsUsage } from "./Usage/InstructionsUsage";

export const Instructions = () => {
  return (
    <div className="flex w-full flex-col gap-4 justify-center items-center">
      <h2 className="text-center text-3xl font-serif">
        {"Start receiving notifications in just 3 steps:"}
      </h2>
      <ul className="flex flex-col px-4 justify-center items-stretch gap-4">
        <InstructionsApiKey />
        <InstructionsTelegramBot />
        <InstructionsUsage />
      </ul>
    </div>
  );
};
