"use client";

import { getApiKey } from "@/app/actions/getApiKey";
import { withAuthBtn } from "@/components/Login/withAuthBtn";
import { Button } from "@/components/ui/button";
import { FormStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ApiKeyControlsProps {
  initialValue?: string;
  userEmail: string | null;
}

const GetApiKeyBtn = withAuthBtn(Button);
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
      className={cn("flex px-2 py-1 justify-center items-center gap-2 w-full", {
        "bg-red-800/20": status === "ERROR",
      })}
    >
      <span className="grow">
        {status === "LOADING" ? "loading..." : apiKey}
      </span>
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
