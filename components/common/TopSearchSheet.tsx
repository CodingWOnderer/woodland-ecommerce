"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import useWoodlandStoreData from "@/lib/store/store";
import { Input } from "../ui/input";
import { IoMdClose } from "react-icons/io";

const TopSearchSheet = () => {
  const { searchSheet, toggleSearchSheet, searchProduct, setSearch } =
    useWoodlandStoreData();

  useEffect(() => {
    console.log(searchProduct);
  }, [searchProduct]);
  return (
    <Sheet open={searchSheet} onOpenChange={(e) => toggleSearchSheet(e)}>
      <SheetContent className="bg-primary border-none" side={"top"}>
        <SheetHeader>
          <SheetTitle>
            <div className="flex px-4 mx-auto space-x-4">
              <Input
                type={"search"}
                value={searchProduct}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background flex-1"
                placeholder="Search Products...."
              />
              <SheetClose>
                <IoMdClose color={"white"} size={24} />
              </SheetClose>
              <SheetDescription></SheetDescription>
            </div>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TopSearchSheet;
