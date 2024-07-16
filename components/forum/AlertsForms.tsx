"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export function AlertForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await axios.post(
        `https://asia-south2-woodland-397213.cloudfunctions.net/subscribe`,
        { email: data.email }
      );
      toast.success("Thank you for subscribing");
      setLoading(false);
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center  space-x-4 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel className="text-md text-primary-foreground">
                Always keep exploring more!
              </FormLabel>
              <p className="text-sm text-primary-foreground">
                Get alerts for new arrivals, offers, and more!
              </p>
              <div className="flex divide-x-2 w-[90%] bg-white items-center">
                <FormControl>
                  <Input
                    className="outline-none placeholder:text-xs h-11 focus-visible:ring-0 border-none"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant={"ghost"}
                  disabled={loading}
                  className="rounded-none text-xs shadow-none"
                >
                  Submit
                </Button>
              </div>

              <FormDescription className="text-muted">
                By entering your email, you agree to our Terms of Service &
                Privacy Policy, including receipt of emails and promotions. You
                can unsubscribe at any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
