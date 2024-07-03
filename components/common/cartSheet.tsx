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
import useWoodlandStoreData from "@/lib/store/store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";

const CartSheet = () => {
  const { storeSheet, toggleStore } = useWoodlandStoreData();
  return (
    <Sheet open={storeSheet} onOpenChange={(e) => toggleStore(e)}>
      <SheetContent className="min-w-[500px]">
        <SheetHeader className="space-y-0 space-x-8 flex flex-row">
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
          <div className="flex flex-col">
            <SheetTitle className="text-xl">Your Cart</SheetTitle>
            <SheetDescription className="text-xs">
              Never leave a cart empty
            </SheetDescription>
          </div>
        </SheetHeader>
        <Separator className="mt-6" />
        <ScrollArea className="h-[90vh]">
          <div className="flex justify-center items-center h-[90vh]">
            <Image
              alt={"empty-cart"}
              width={100}
              height={100}
              quality={100}
              src={"/emptycart.png"}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
