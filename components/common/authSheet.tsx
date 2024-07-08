"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { IoMdClose } from "react-icons/io";
import useWoodlandStoreData from "@/lib/store/store";
import { Separator } from "@/components/ui/separator";
import AuthForm from "../forum/authForms";
import Link from "next/link";

const AuthSheet = () => {
  const { setAuthSheet, toggleAuthSheet } = useWoodlandStoreData();
  return (
    <Sheet open={setAuthSheet} onOpenChange={(e) => toggleAuthSheet(e)}>
      <SheetContent className="sm:min-w-[500px] min-w-[100vw]">
        <SheetHeader className="space-y-0 space-x-8 flex flex-row">
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
          <div className="flex flex-col">
            <SheetTitle className="text-xl">Login/Register</SheetTitle>
            <SheetDescription className="text-xs">
              For a personalized experience
            </SheetDescription>
          </div>
        </SheetHeader>
        <Separator className="mt-6" />
        <div className="min-h-[80vh] flex justify-center py-16 border-b">
          <AuthForm />
        </div>
        <SheetFooter className="flex justify-center items-center">
          <div className="mx-auto my-2 font-semibold text-sm">
            <span>To know more check out</span>{" "}
            <Link href={"/compliance/refund"} className="underline">
              {" "}
              FAQ’s
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
