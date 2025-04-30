"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  truncateString,
  TruncateStringProps,
} from "@/lib/utils/truncatedString";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import { AnyFragment } from "@/components/common/AnyFragment/AnyFragment";
import { TooltipPopover } from "@/components/common/TooltipPopover/TooltipPopover";
import { cn } from "@/lib/utils";

export interface TruncatedStringProps
  extends Omit<TruncateStringProps, "value"> {
  className?: string;
  children: string;
}

interface TruncatedStringDrawerProps extends TruncatedStringProps {
  title?: string;
}

const TruncatedStringDrawer = ({
  children,
  className,
  maxLen,
  cutFrom,
  title,
}: TruncatedStringDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        className="cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {truncateString({ value: children, maxLen, cutFrom })}
      </span>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} autoFocus={isOpen}>
        <DrawerContent className={className}>
          <DrawerHeader>
            <DrawerTitle className="text-center font-serif text-4xl my-4 text-muted">
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <span className="px-4 pb-8 text-center">{children}</span>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const TruncatedStringTooltip = ({
  children,
  className,
  maxLen,
  cutFrom,
}: TruncatedStringProps) => {
  return (
    <TooltipPopover
      content={children}
      className={cn("underline cursor-pointer", className)}
    >
      {`${truncateString({ value: children, maxLen, cutFrom })}`}
    </TooltipPopover>
  );
};

export const TruncatedString = (props: TruncatedStringProps) => {
  const isWindowOverSM = useBreakpoint("sm");
  const Cmp = isWindowOverSM ? TruncatedStringTooltip : TruncatedStringDrawer;
  return <Cmp {...props} />;
};

export const TruncatedStringMobile = (props: TruncatedStringDrawerProps) => {
  const isWindowOverSM = useBreakpoint("sm");
  const Comp = isWindowOverSM ? AnyFragment : TruncatedStringDrawer;

  return <Comp {...props} />;
};
