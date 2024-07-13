"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import useWoodlandStoreData from "@/lib/store/store";
import CancellationForm from "../forum/CancelOrderForm";

const CancelSheet = () => {
  const { cancelSheet, setCancelSheet } = useWoodlandStoreData();
  return (
    <Sheet
      open={cancelSheet.drawer}
      onOpenChange={(e) => setCancelSheet({ ...cancelSheet, drawer: e })}
    >
      <SheetContent className="sm:min-w-[500px] min-w-[100vw]">
        <SheetHeader className="space-y-0 space-x-8 flex flex-row">
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
          <div className="flex flex-col">
            <SheetTitle className="text-xl text-start">Cancel Order</SheetTitle>
            <SheetDescription className="text-xs">
              Help us understand your worries
            </SheetDescription>
          </div>
        </SheetHeader>
        <Separator className="mt-6" />
        <ScrollArea className={"h-[90vh]"}>
          <CancellationForm
            subOrderId={cancelSheet.subOrderId}
            orderId={cancelSheet.orderId}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CancelSheet;
