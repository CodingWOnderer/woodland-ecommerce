"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useWoodlandStoreData from "@/lib/store/store";
import { CartItem } from "@/lib/store/slices/persistedSlice";
import { useGoToCartMutation } from "@/hooks/cart/mutation";
import { toast } from "sonner";

const formSchema = z.object({
  quantitiy: z.string().refine(
    (val) => {
      const num = Number(val);
      return num >= 1;
    },
    {
      message: "Quantity must be at least 1.",
    }
  ),
});

export function QuantityForm({ item }: { item: CartItem }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantitiy: item.quantity.toString(),
    },
  });
  const {
    updateCartItem,
    items: productData,
    addItemToCart,
  } = useWoodlandStoreData();
  const { mutate } = useGoToCartMutation();

  const [quantity, setQuantity] = useState(1);
  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const currentQuantity = Number(form.getValues("quantitiy"));
    const newQuantity = currentQuantity <= 1 ? 1 : currentQuantity - 1;
    form.setValue("quantitiy", newQuantity.toString());
    setQuantity(newQuantity);
  };

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const currentQuantity = 40;
    const newQuantity =
      currentQuantity !== undefined
        ? Math.min(quantity + 1, currentQuantity)
        : quantity + 1;

    form.setValue("quantitiy", newQuantity.toString());
    setQuantity(newQuantity);
  };

  const isDecrementDisabled = quantity <= 1;
  const isIncrementDisabled = 40 <= quantity;

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate(
      {
        variants: addItemToCart({
          ...item,
          quantity: Number(data.quantitiy),
        }).map((item) => ({
          id: item.id,
          orderQuantity: item.quantity,
        })),
        circle: "woodland",
      },
      {
        onSuccess: (data) => {
          data.data.map((cart) =>
            updateCartItem({
              id: cart.variantId,
              price: cart.offerPrice || cart.price,
              quantity: cart.selectedQty,
              name: cart.title,
              color: cart.color,
              slug: cart.slug,
              size: cart.size,
              imageURL: cart.url,
            })
          );
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 500);

    return () => clearTimeout(timer);
  }, [quantity]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="quantitiy"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="inline-flex w-full lg:w-auto h-6">
                  <Button
                    type="button"
                    onClick={handleDecrement}
                    disabled={isDecrementDisabled}
                    className="rounded-none h-full w-4"
                  >
                    -
                  </Button>
                  <Input
                    {...field}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                      form.setValue("quantitiy", e.target.value);
                    }}
                    type="number"
                    min={1}
                    className="rounded-none  text-center w-9 p-0 h-full focus-visible:ring-0"
                  />
                  <Button
                    type="button"
                    onClick={handleIncrement}
                    disabled={isIncrementDisabled}
                    className="rounded-none w-4   h-6"
                  >
                    +
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
