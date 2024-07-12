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
import { Separator } from "@/components/ui/separator";
import AuthForm from "../forum/authForms";
import Link from "next/link";
import { VerifyOtpForm } from "../forum/OtpForm";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  useAuthGuestLoginMutation,
  useVerifyGuestLoginMutation,
} from "@/hooks/auth/mutation";
import useWoodlandStoreData from "@/lib/store/store";

const AuthSheet = () => {
  const {
    authForm: { setAuthSheet, toggleAuthSheet, verifyForm, setVerifyForm },
  } = useWoodlandStoreData();
  const { mutate: authMutate, isPending: AuthPending } =
    useAuthGuestLoginMutation();

  const {
    mutate: verifyMutate,
    isPending: verifyPending,
    data,
  } = useVerifyGuestLoginMutation();

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
        <div className="min-h-[83vh] flex justify-center py-16 border-b">
          {!verifyForm ? (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" }}
              exit={{ opacity: 0, x: 60 }}
              className="w-full mt-10 ml-4"
            >
              <AuthForm mutate={authMutate} isPending={AuthPending} />
            </motion.div>
          ) : (
            <div className="flex flex-col items-start space-y-8 w-full">
              <Button
                onClick={() => setVerifyForm(false)}
                variant={"ghost"}
                className="font-semibold"
              >
                <ArrowLeft size={16} />
                &nbsp; Go Back
              </Button>
              <VerifyOtpForm
                mutate={verifyMutate}
                toggleAuthSheet={toggleAuthSheet}
                authMutate={authMutate}
                isPending={verifyPending}
                mutateData={data}
                otpIspending={AuthPending}
              />
            </div>
          )}
        </div>
        <SheetFooter className="flex justify-center items-center">
          <div className="mx-auto my-2 font-semibold text-sm">
            <span>To know more check out</span>{" "}
            <Link href={"/compliance/refund"} className="underline">
              FAQ’s
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
