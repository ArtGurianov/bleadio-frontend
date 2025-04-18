"use client";

import { useBreakpoint } from "@/lib/hooks/useBreakpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export interface DialogDrawerProps {
  className?: string;
  children: ReactNode;
  trigger: ReactNode;
  title: string;
}

const DialogWrapper = ({
  className,
  children,
  trigger,
  title,
}: DialogDrawerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("py-8 px-4", className)}>
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-4xl my-4 text-muted">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {`Dialog content for ${title}`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 px-3 bg-primary/20 border border-primary">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DrawerWrapper = ({
  className,
  children,
  trigger,
  title,
}: DialogDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className={cn("px-2 py-2", className)}>
        <DrawerHeader>
          <DrawerTitle className="text-center font-serif text-4xl text-muted">
            {title}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            {`Drawer content for ${title}`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4 px-3 bg-primary/20 border border-primary">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const DialogDrawer = (props: DialogDrawerProps) => {
  const isWindowOverSM = useBreakpoint("sm");

  const Comp = isWindowOverSM ? DialogWrapper : DrawerWrapper;
  return <Comp {...props} />;
};
