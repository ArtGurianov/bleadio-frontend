import { InstructionsApiKey } from "./ApiKey/InstructionsApiKey";
import { InstructionsTelegramBot } from "./TelegramBot/InstructionsTelegramBot";
import { InstructionsUsage } from "./Usage/InstructionsUsage";

export const Instructions = () => {
  return (
    <div className="w-full flex-col gap-2 justify-center items-center">
      <h2 className="text-center text-3xl font-serif">
        {"Start receiving notifications in just 3 steps:"}
      </h2>
      <ul className="flex-col gap-1 justify-center items-center w-full">
        <InstructionsApiKey />
        <InstructionsTelegramBot />
        <InstructionsUsage />
      </ul>
    </div>
  );
};
