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
}: DialogDrawerProps) => {
  return (
    <Dialog onOpenChange={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn("py-8 px-4", className)}>
        <DialogHeader>
          <DialogTitle className="text-center font-medium font-serif text-3xl my-4 text-muted-foreground">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {`Dialog content for ${title}`}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 px-3 bg-primary/20 border border-primary rounded-md">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DrawerWrapper = ({
  className,
  children,
  content,
  title,
  onClose,
}: DialogDrawerProps) => {
  return (
    <Drawer onClose={onClose}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className={cn("px-2 py-2", className)}>
        <DrawerHeader>
          <DrawerTitle className="text-center font-medium font-serif text-3xl text-muted-foreground">
            {title}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            {`Drawer content for ${title}`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4 px-3 bg-primary/20 border border-primary rounded-md">
          {content}
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
