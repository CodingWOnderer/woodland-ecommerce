"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { IoMdClose } from "react-icons/io";
import useWoodlandStoreData from "@/lib/store/store";
import { useRouter } from "next/navigation";

const TopSearchSheet = () => {
  const { searchSheet, toggleSearchSheet, searchProduct, setSearch } =
    useWoodlandStoreData();
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchProduct.trim()) {
        router.push(
          `/collections?search=${encodeURIComponent(searchProduct.trim())}`
        );
        toggleSearchSheet(false);
      }
    }
  };

  return (
    <Sheet open={searchSheet} onOpenChange={(e) => toggleSearchSheet(e)}>
      <SheetContent
        className="bg-primary border-none px-2 sm:px-auto"
        side={"top"}
      >
        <SheetHeader>
          <SheetTitle>
            <div className="flex md:px-4 w-full mx-auto space-x-4">
              <Input
                type={"search"}
                value={searchProduct}
                onKeyDown={handleKeyDown}
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
