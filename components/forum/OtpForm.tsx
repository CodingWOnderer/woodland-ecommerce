"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { UseMutateFunction } from "@tanstack/react-query";
import { VerifyGuestLoginPayload } from "@/hooks/auth/mutation";
import { useAuth } from "../common/AuthWrapper";
import useWoodlandStoreData from "@/lib/store/store";

const formSchema = z.object({
  otp: z.string().length(6, {
    message: "OTP must be exactly 6 digits.",
  }),

});

type FormSchemaType = z.infer<typeof formSchema>;

interface OtpForm {
  mutate: UseMutateFunction<
    { token: string },
    unknown,
    VerifyGuestLoginPayload,
    unknown
  >;
  authMutate: UseMutateFunction<
    ResponseModal<{ newRegistration: boolean }>,
    unknown,
    Omit<VerifyGuestLoginPayload, "otp">,
    unknown
  >;
  isPending: boolean | undefined;
  mutateData: { token: string } | undefined;
  toggleAuthSheet: (value: boolean) => void;
  otpIspending: boolean | undefined;
}

export function VerifyOtpForm({
  mutate,
  isPending,
  authMutate,
  otpIspending,
  toggleAuthSheet,
}: OtpForm) {
  const {
    authForm: { userPhone, setVerifyForm },
  } = useWoodlandStoreData();
  const {setIsAuthenticated} = useAuth()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",

    },
  });

  return (
    <Form {...form}>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring" }}
        exit={{ opacity: 0, x: 60 }}
        className="flex flex-col w-full pl-4"
      >
        <form
          onSubmit={form.handleSubmit((data) => {
            mutate(
              {
                circleName: "woodland",
                credential: `${userPhone}`,
                otp: data.otp,
              },
              {
                onSuccess: () => {
                  setVerifyForm(false);
                  toggleAuthSheet(false);
                  setIsAuthenticated(true);
           
                },
              }
            );
          })}
          className="space-y-4  "
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base text-stone-800 font-bold">
                  Verify OTP sent to your mobile number
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot
                        className="h-12 bg-muted w-full"
                        index={0}
                      />
                      <InputOTPSlot
                        className="h-12 bg-muted w-full"
                        index={1}
                      />
                        <InputOTPSlot
                        className="h-12 bg-muted w-full"
                        index={2}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="w-full">
                    
                      <InputOTPSlot
                        className="h-12 bg-muted w-full"
                        index={3}
                      />
                        <InputOTPSlot
                        className="h-12 bg-muted w-full"
                        index={4}
                      />
                      <InputOTPSlot
                        className="h-12 bg-muted w-full"
                        index={5}
                      />
                    </InputOTPGroup>
                  
                    
                   
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <Button
            className="rounded-none font-semibold w-full h-12"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Veriyfying OTP" : "Verify OTP"}
          </Button>
        </form>
        <Button
          type="button"
          className="rounded-none font-semibold w-full h-12 mt-2"
          variant={"ghost"}
          disabled={otpIspending}
          onClick={() => {
            authMutate({ credential: userPhone, circleName: "woodland" });
            form.setFocus("otp");
          }}
        >
          {otpIspending ? "Resending OTP..." : " Resend OTP"}
        </Button>
      </motion.div>
    </Form>
  );
}
