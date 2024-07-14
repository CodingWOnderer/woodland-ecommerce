"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RiLoader4Line } from "react-icons/ri";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { CancelFormData, CancelformSchema } from "@/hooks/orders/types";
import useCancelOrderMutation from "@/hooks/orders/mutation";
import useWoodlandStoreData from "@/lib/store/store";
import { useRouter } from "next/navigation";

type FormSchemaType = CancelFormData;
type CancelFormProps = {
  subOrderId: string;
  orderId: string;
};
function CancellationForm(props: CancelFormProps) {
  const { setCancelSheet } = useWoodlandStoreData();
  const { mutate, isPending } = useCancelOrderMutation();
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(CancelformSchema),
    defaultValues: {
      reason: "",
      consent: false,
    },
  });

  function onSubmit(data: FormSchemaType) {
    mutate(
      {
        subOrderId: props.subOrderId,
        Status: "109",
        orderId: props.orderId,
        status: "109",
        cancelFormData: data,
        circle: "woodland",
      },
      {
        onSuccess: () => {
          setCancelSheet({ orderId: "", subOrderId: "", drawer: false });
          toast.success("Welcome Again to Woodland");
          router.push("/");
        },
        onError: () => {
          setCancelSheet({ orderId: "", subOrderId: "", drawer: false });
          toast.error("Something went wrong");
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">
                What is the reason for Cancellation?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {CancelformSchema.shape.title.options.map((option) => (
                    <FormItem
                      key={option}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem value={option} />
                      <FormLabel className="font-normal">{option}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please share more about the problem</FormLabel>
              <FormControl>
                <Textarea
                  className=" placeholder:text-xs"
                  placeholder="We would like to know more so that we can help you better"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-[13px] font-normal">
                By submitting review you give us your consent to publish and
                process personal information in accordance with Terms of use &
                Privacy Policy
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-10 rounded-none"
        >
          {isPending ? (
            <RiLoader4Line size={24} className="animate-spin" />
          ) : (
            ""
          )}{" "}
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default CancellationForm;
