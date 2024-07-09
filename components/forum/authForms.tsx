"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VerifyGuestLoginPayload } from "@/hooks/auth/mutation";
import { UseMutateFunction } from "@tanstack/react-query";
import useWoodlandStoreData from "@/lib/store/store";

const formSchema = z.object({
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  receiveCommunications: z.boolean(),
});

interface AuthForm {
  mutate: UseMutateFunction<
    ResponseModal<{ newRegistration: boolean }>,
    unknown,
    Omit<VerifyGuestLoginPayload, "otp">,
    unknown
  >;
  isPending: boolean | undefined;
}

function AuthForm({ mutate, isPending }: AuthForm) {
  const {
    authForm: { setUserPhone, setVerifyForm },
  } = useWoodlandStoreData();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      receiveCommunications: false,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          mutate({
            circleName: "woodland",
            credential: `+91${data.phoneNumber}`,
          });

          setUserPhone(`+91${data.phoneNumber}`);
          setVerifyForm(true);
        })}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-stone-800 font-bold">
                Login/Register with your mobile number
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="h-12 rounded-none placeholder:text-xs bg-muted"
                  placeholder="Enter 10 digit mobile number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="receiveCommunications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-y-0 space-x-3">
              <FormControl className="border">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-xs font-semibold">
                Receive communications from us on messages
              </FormLabel>
            </FormItem>
          )}
        />
        <Button
          className="rounded-none font-semibold w-full h-12"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Sending OTP" : "Send OTP"}
        </Button>
      </form>
    </Form>
  );
}

export default AuthForm;
