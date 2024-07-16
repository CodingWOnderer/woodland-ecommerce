"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import useWoodlandStoreData from "@/lib/store/store";
import ManufacturingIndo from "./ManufacturingInfo";

const ManufacturingInfoSheet = () => {
  const { infoSheet, setInfoSheet, productManufacturingData } =
    useWoodlandStoreData();

  return (
    <Sheet open={infoSheet} onOpenChange={(e) => setInfoSheet(e)}>
      <SheetContent className="sm:min-w-[500px] border min-w-[100vw]">
        <SheetHeader className="space-y-0 space-x-8 flex flex-row">
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
          <div className="flex flex-col">
            <SheetTitle className="md:text-lg text-sm  whitespace-nowrap">
              IMPORT, MANUFACTURING & PACKAGING INFO
            </SheetTitle>
          </div>
        </SheetHeader>
        <Separator className="mt-6" />

        <div className=" min-h-[80vh] flex justify-center ">
          {productManufacturingData !== undefined && (
            <ManufacturingIndo {...productManufacturingData} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ManufacturingInfoSheet;
