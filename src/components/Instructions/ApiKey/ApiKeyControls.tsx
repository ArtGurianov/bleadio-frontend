"use client";

import { getApiKey } from "@/app/actions/getApiKey";
import { GetApiKeyBtn } from "@/components/Buttons/GetApiKeyBtn";
import { FormStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Clipboard } from "./Clipboard";
import { useSession } from "next-auth/react";

const API_KEY_MASK = "••••••••-••••-••••-••••-••••••••••••";

export const ApiKeyControls = () => {
  const { data, update } = useSession();

  const [status, setStatus] = useState<FormStatus>("PENDING");

  const handleGetApiKey = () => {
    const isReset = !!data?.user?.apiKey;
    setStatus("LOADING");
    getApiKey(isReset)
      .then((res) => {
        update({ apiKey: res.data }).finally(() => {
          setStatus(res.success ? "SUCCESS" : "ERROR");
        });
      })
      .catch(() => {
        setStatus("ERROR");
      });
  };

  let displayValue = data?.user?.apiKey || API_KEY_MASK;
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
      {!!data?.user?.apiKey ? <Clipboard apiKey={data.user.apiKey} /> : null}
      <GetApiKeyBtn
        userId={data?.user?.id || null}
        disabled={status === "LOADING"}
        userEmail={data?.user?.email || null}
        onClick={() => {
          handleGetApiKey();
        }}
      >
        {data?.user?.apiKey ? "RESET" : "GET"}
      </GetApiKeyBtn>
    </div>
  );
};
