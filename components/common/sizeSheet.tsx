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
import Image from "next/image";
import useWoodlandStoreData from "@/lib/store/store";
import SizeGuidsBottoms from "./sizeGuidesBottoms";
import SizeGuidTop from "./sizeGuideTops";

const womenFootwear = [
  {
    head: "UK SIZE",
    size: ["S", "M", "L", "XL", "XXL"],
  },
  {
    head: "EURO SIZE",
    size: ["34-35", "36-37", "38-39", "40-41", "42-44"],
  },
  {
    head: "SIZE IN CM",
    size: ["86-89", "91-94", "96-99", "101-104", "106-111"],
  },
];
const menbottom = [
  {
    head: "UK SIZE",
    size: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    head: "EURO SIZE",
    size: [39, 40, 41, 42, 43, 44, 45, 46],
  },
  {
    head: "SIZE IN CM",
    size: [24, 25, 26, 27, 28, 29, 30, 31],
  },
];

const SizeSheet = () => {
  const { sizeSheet, setSizeSheet, division } = useWoodlandStoreData();
  return (
    <Sheet open={sizeSheet} onOpenChange={(e) => setSizeSheet(e)}>
      <SheetContent className="sm:min-w-[500px] min-w-[100vw]">
        <SheetHeader className="space-y-0 space-x-8 flex flex-row">
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
          <div className="flex flex-col">
            <SheetTitle className="text-xl">Size Guide</SheetTitle>
            <SheetDescription className="text-xs">
              Select the size that suits you best
            </SheetDescription>
          </div>
        </SheetHeader>
        <Separator className="mt-6" />
        <ScrollArea className="h-[90vh] p-4">
          {division === "FOOTWEAR" && <SizeGuidsBottoms />}
          {division === "GARMENT" && <SizeGuidTop />}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SizeSheet;
