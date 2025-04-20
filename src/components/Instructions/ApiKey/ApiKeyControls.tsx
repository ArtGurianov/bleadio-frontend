"use client";

import { getApiKey } from "@/app/actions/getApiKey";
import { GetApiKeyBtn } from "@/components/Buttons/GetApiKeyBtn";
import { ResetApiKeyBtn } from "@/components/Buttons/ResetApiKeyBtn";
import { useState } from "react";

interface ApiKeyControlsProps {
  initialValue?: string;
  userEmail: string | null;
}

export const ApiKeyControls = ({
  initialValue,
  userEmail,
}: ApiKeyControlsProps) => {
  const [apiKey, setApiKey] = useState(
    initialValue || "••••••••-••••-••••-••••-••••••••••••"
  );

  const handleGetApiKey = () => {
    getApiKey().then((data) => setApiKey(data));
  };

  return (
    <div className="flex gap-1">
      <span>{apiKey}</span>
      {!initialValue ? (
        <GetApiKeyBtn userEmail={userEmail || null} onClick={handleGetApiKey}>
          {"Get"}
        </GetApiKeyBtn>
      ) : (
        <ResetApiKeyBtn>{"Reset"}</ResetApiKeyBtn>
      )}
    </div>
  );
};
