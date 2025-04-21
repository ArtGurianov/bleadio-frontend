"use client";

import { CheckSvgUrl, ClipboardSvgUrl } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface ClipboardProps {
  apiKey: string;
}

export const Clipboard = ({ apiKey }: ClipboardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    });
  };

  return (
    <div className="relative w-6 self-stretch">
      <AnimatePresence>
        {!isCopied ? (
          <motion.div
            className="absolute h-full w-full flex justify-center items-center"
            key="btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
          >
            <Button
              className="opacity-60 hover:opacity-100"
              variant="unset"
              size="unset"
              onClick={() => {
                handleCopyToClipboard();
              }}
            >
              <Image
                src={ClipboardSvgUrl}
                className="w-6"
                alt="clipboard"
                width="0"
                height="0"
                sizes="100vh"
                priority
              />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="absolute h-full w-full flex justify-center items-center"
            key="copied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 0,
            }}
          >
            <Image
              src={CheckSvgUrl}
              className="w-6"
              alt="check"
              width="0"
              height="0"
              sizes="100vh"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
