"use client";

import { getApiKey } from "@/app/actions/getApiKey";
import { GetApiKeyBtn } from "@/components/Buttons/GetApiKeyBtn";
import { FormStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Clipboard } from "@/components/common/Clipboard/Clipboard";
import { useSession } from "next-auth/react";

const API_KEY_MASK = "••••••••-••••-••••-••••-••••••••••••";

export const ApiKeyControls = () => {
  const { data: sessionData, update: updateSession } = useSession();

  const [status, setStatus] = useState<FormStatus>("PENDING");

  const handleGetApiKey = () => {
    const isReset = !!sessionData?.user?.apiKey;
    setStatus("LOADING");
    getApiKey(isReset)
      .then((res) => {
        updateSession({ apiKey: res.data }).finally(() => {
          setStatus(res.success ? "SUCCESS" : "ERROR");
        });
      })
      .catch(() => {
        setStatus("ERROR");
      });
  };

  let displayValue = sessionData?.user?.apiKey || API_KEY_MASK;
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
      {!!sessionData?.user?.apiKey ? (
        <Clipboard
          value={sessionData.user.apiKey}
          className="w-6 self-stretch"
        />
      ) : null}
      <GetApiKeyBtn
        disabled={status === "LOADING"}
        userEmail={sessionData?.user?.email || null}
        onClick={() => {
          handleGetApiKey();
        }}
      >
        {sessionData?.user?.apiKey ? "Reset" : "Get"}
      </GetApiKeyBtn>
    </div>
  );
};
