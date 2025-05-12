"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface WalletInfoDeepLinkProps {
  url: string | null;
}

const FALLBACK_URL = "https://metamask.io/download";

export const WalletInfoDeepLink: FC<WalletInfoDeepLinkProps> = ({ url }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!url) return;

    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500);

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
  }, [url]);

  if (!isVisible) return null;
  return (
    <div className="px-4 py-px bg-destructive/20 border border-destructive/60 rounded-md font-light font-serif">
      {"Metamask not installed - "}
      <Button
        size="unset"
        variant="unset"
        onClick={() => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }}
      >
        <Link
          className="underline font-medium text-lg"
          href={FALLBACK_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          {"Get MetaMask wallet"}
        </Link>
      </Button>
    </div>
  );
};
