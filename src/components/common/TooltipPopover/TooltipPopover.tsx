"use client";

import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipPopoverProps {
  className?: string;
  children: ReactNode;
  content: ReactNode;
}

const TooltipWrapper = ({
  className,
  children,
  content,
}: TooltipPopoverProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const PopoverWrapper = ({
  className,
  children,
  content,
}: TooltipPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={className}>{content}</PopoverContent>
    </Popover>
  );
};

export const TooltipPopover = (props: TooltipPopoverProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? TooltipWrapper : PopoverWrapper;
  return <Comp {...props} />;
};
