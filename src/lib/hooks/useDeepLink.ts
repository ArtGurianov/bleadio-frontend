"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useDeepLink = (url: string | null, fallbackUrl: string) => {
  const router = useRouter();

  useEffect(() => {
    if (!url) return;

    const timeoutId = setTimeout(() => {
      router.push(fallbackUrl);
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeoutId);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    router.push(url);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [url, fallbackUrl]);
};
