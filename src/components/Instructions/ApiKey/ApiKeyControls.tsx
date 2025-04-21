"use client";

import { getApiKey } from "@/app/actions/getApiKey";
import { GetApiKeyBtn } from "@/components/Buttons/GetApiKeyBtn";
import { FormStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Clipboard } from "./Clipboard";

interface ApiKeyControlsProps {
  initialValue?: string;
  userEmail: string | null;
}

const API_KEY_MASK = "••••••••-••••-••••-••••-••••••••••••";

export const ApiKeyControls = ({
  initialValue,
  userEmail,
}: ApiKeyControlsProps) => {
  const [status, setStatus] = useState<FormStatus>("PENDING");
  const [apiKey, setApiKey] = useState(initialValue || API_KEY_MASK);

  const handleGetApiKey = () => {
    const isReset = apiKey !== API_KEY_MASK;
    setStatus("LOADING");
    getApiKey(isReset)
      .then((data) => {
        setApiKey(data);
        setStatus("SUCCESS");
      })
      .catch(() => {
        setStatus("ERROR");
      });
  };

  let displayValue = apiKey;
  if (status === "LOADING") {
    displayValue = "loading...";
  }
  if (status === "ERROR") {
    displayValue = "Error! Please try again";
  }

  return (
    <div
      className={cn("flex px-2 py-1 justify-center items-center gap-4 w-full", {
        "bg-red-800/20": status === "ERROR",
      })}
    >
      <span className="grow">{displayValue}</span>
      {apiKey !== API_KEY_MASK ? <Clipboard apiKey={apiKey} /> : null}
      <GetApiKeyBtn
        disabled={status === "LOADING"}
        userEmail={userEmail || null}
        onClick={() => {
          handleGetApiKey();
        }}
      >
        {apiKey !== API_KEY_MASK ? "RESET" : "GET"}
      </GetApiKeyBtn>
    </div>
  );
};
