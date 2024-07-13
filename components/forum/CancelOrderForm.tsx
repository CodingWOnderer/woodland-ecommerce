"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { CancelFormData, CancelformSchema } from "@/hooks/orders/types";
import useCancelOrderMutation from "@/hooks/orders/mutation";

type FormSchemaType = CancelFormData;
type CancelFormProps = {
  subOrderId: string;
  orderId: string;
};
function CancellationForm(props: CancelFormProps) {
  const { mutate } = useCancelOrderMutation();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(CancelformSchema),
    defaultValues: {
      reasonForCancellation: "Ordered by mistake",
      problemDetails: "",
      consent: false,
    },
  });

  function onSubmit(data: FormSchemaType) {
    mutate({
      subOrderId: props.subOrderId,
      Status: "109",
      orderId: props.orderId,
      status: "109",
      cancelFormData: data,
      circle: "woodland",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reasonForCancellation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What is the reason for Cancellation?</FormLabel>
              <FormControl>
                <RadioGroup {...field}>
                  {CancelformSchema.shape.reasonForCancellation.options.map(
                    (option) => (
                      <FormItem
                        key={option}
                        className="flex items-center space-x-3"
                      >
                        <RadioGroupItem value={option} />
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    )
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problemDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please share more about the problem</FormLabel>
              <FormControl>
                <Textarea
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
            <FormItem>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                By submitting review you give us your consent to publish and
                process personal information in accordance with Terms of use &
                Privacy Policy
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CancellationForm;
