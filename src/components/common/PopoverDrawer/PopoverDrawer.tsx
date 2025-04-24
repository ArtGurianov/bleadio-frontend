"use client";

import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export interface PopoverDrawerProps {
  className?: string;
  children: ReactNode;
  content: ReactNode;
  title: string;
  onClose?: () => void;
}

const DialogWrapper = ({
  className,
  children,
  content,
  title,
  onClose,
}: PopoverDrawerProps) => {
  return (
    <Popover onOpenChange={onClose}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className={cn("py-8 px-4", className)}>
        <div className="flex w-full justify-center items-center px-4 py-2">
          <h2 className="text-center font-serif text-4xl my-4 text-muted-foreground">
            {title}
          </h2>
          <span className="sr-only">{`Dialog content for ${title}`}</span>
        </div>
        <div className="py-4 px-3 bg-primary/20 border border-primary">
          {content}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const DrawerWrapper = ({
  className,
  children,
  content,
  title,
  onClose,
}: PopoverDrawerProps) => {
  return (
    <Drawer onClose={onClose}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={cn("px-2 py-2", className)}>
        <DrawerHeader>
          <DrawerTitle className="text-center font-serif text-4xl text-muted-foreground">
            {title}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            {`Drawer content for ${title}`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4 px-3 bg-primary/20 border border-primary">
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const PopoverDrawer = (props: PopoverDrawerProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? DialogWrapper : DrawerWrapper;
  return <Comp {...props} />;
};
