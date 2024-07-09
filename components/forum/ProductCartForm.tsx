/* eslint-disable @next/next/no-img-element */
"use client";
import { cn, getBadgeDetails } from "@/lib/utils";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaRegHeart } from "react-icons/fa";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { IoCartOutline } from "react-icons/io5";
import usePincodeQuery from "@/hooks/pincode/queries";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaHeart } from "react-icons/fa";
import ToggleButton from "../common/ToggleButton";
import { ParsedProductData } from "./types";
import Link from "next/link";
import useWoodlandStoreData from "@/lib/store/store";

const appearanceFormSchema = z.object({
  colors: z.string(),
  size: z.string(),
  pincode: z.string(),
  quantitiy: z.string(),
  like: z.string(),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

export function AppearanceForm({
  productid,
  productData,
}: {
  productid: string;
  productData: Pick<ParsedProductData, "data">;
}) {
  const [pincode, setPincode] = useState<string>("");
  const [quantity, setQuantity] = useState(0);
  const {setSizeSheet,sizeSheet} =useWoodlandStoreData();

  const currentProduct = productData.data.productMeta.find(
    (item) => item.slug === productid
  );

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      colors: currentProduct?.slug,
      size: currentProduct?.sizes?.[0],
      quantitiy: "",
      like: "false",
      pincode: "",
    },
  });

  function onSubmit(data: AppearanceFormValues) {
    console.log(data);
  }

  const { refetch, data } = usePincodeQuery(pincode);
  return (
    <div>
      <Form {...form}>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {currentProduct?.title ?? ""}
        </h1>

        <p className="text-lg mt-8 font-bold text-gray-900 sm:text-xl">
          ₹ {currentProduct?.price}
        </p>
        <span className="text-[13px] text-muted-foreground">
          Prices include taxes
        </span>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-4">
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Colors</FormLabel>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap pt-2"
                >
                  {productData.data.productMeta.map((prod, ind) => (
                    <FormItem key={ind}>
                      <Link href={`/product-detail/${prod.slug}`}>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem
                              value={prod.slug}
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="items-center cursor-pointer w-fit rounded-md border-2 border-muted p-1 hover:border-accent">
                            <img
                              src={prod.urls[0]}
                              alt="Summer Travel Bag image"
                              className="min-[400px]:h-[100px] aspect-square border-2 border-gray-100 rounded-xl transition-all duration-500 "
                            />
                          </div>
                        </FormLabel>
                      </Link>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className=" whitespace-nowrap flex justify-between ">
                  <span>Size</span>
                  <Button onClick={()=>setSizeSheet(!sizeSheet)} variant={"ghost"} className="text-primary font-bold">
                    Size Guide
                  </Button>
                </FormLabel>
                <FormDescription>Select the size</FormDescription>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex max-w-fit flex-wrap gap-x-4 pt-2"
                >
                  {currentProduct?.sizes?.map((siz, ind) => (
                    <FormItem key={ind}>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:text-primary-foreground [&:has([data-state=checked])>div]:transition-all">
                        <FormControl>
                          <RadioGroupItem value={siz} className="sr-only" />
                        </FormControl>
                        <div className="items-center cursor-pointer w-fit rounded-md border  p-6 hover:border-primary">
                          {siz}
                        </div>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Free Delivery</FormLabel>
                <FormDescription>
                  For orders above ₹1000. Delivery in 3-7 working days.
                </FormDescription>
                <FormControl>
                  <div className="flex flex-col space-y-1">
                    <div className="flex  border ">
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPincode(e.target.value);
                        }}
                        type="number"
                        className="rounded-none border-none h-12 focus-visible:ring-0"
                        placeholder="Enter Pincode"
                      />
                      <Badge
                        onClick={() => (pincode.length > 0 ? refetch() : "")}
                        className={cn(
                          "text-xs m-1 ",
                          getBadgeDetails(data).classes
                        )}
                      >
                        Check
                      </Badge>
                    </div>
                    <FormDescription className="h-4">
                      {getBadgeDetails(data).text === "Check"
                        ? ""
                        : getBadgeDetails(data).text}
                    </FormDescription>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex  flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <FormField
              control={form.control}
              name="quantitiy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="inline-flex w-full lg:w-auto h-12">
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setValue("quantitiy", (quantity - 1).toString());
                          setQuantity(quantity - 1);
                        }}
                        className="rounded-r-none h-full"
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
                        className="rounded-none w-full lg:w-14 h-full focus-visible:ring-0"
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setValue("quantitiy", (quantity + 1).toString());
                          setQuantity(quantity + 1);
                        }}
                        className="rounded-l-none h-full"
                      >
                        +
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="flex col-span-3 space-x-2 rounded-none w-full h-12 lg:max-w-xl"
              type="submit"
            >
              <IoCartOutline size={24} />
              <span className="font-semibold text-lg">Add To Cart</span>
            </Button>

            <FormField
              control={form.control}
              name="like"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleButton
                      ActiveIcon={FaRegHeart}
                      DeactiveIcon={FaHeart}
                      variant={"outline"}
                      className="h-12 min-h-12 "
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        form.setValue("like", e.currentTarget.value);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
        <Accordion className="max-w-xl" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline ">
              <span className="text-sm font-medium text-gray-900 :text-indigo-600">
                MORE ABOUT THE PRODUCT
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentProduct?.description!,
                }}
                className="prose prose-sm mt-4 text-gray-500"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline text-md">
              <span className="text-sm font-medium text-gray-900 :text-indigo-600">
                SHIPPING & RETURNS
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <div className=" border-gray-200 p-4">
                <h2 className="text-sm font-medium text-gray-900">
                  Shipping Days
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  Your product will be delivered between 3-7 working days
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Return and Exchange
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    {" "}
                    Woodland may accept returns on apparel and footwear for
                    account credit only
                  </div>
                </div>
                <h2 className="text-sm font-medium text-gray-900">
                  Return and Exchange
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    <li>
                      For this purpose woodland must receive the merchandise
                      within 15 days from the date it was shipped to you.
                    </li>
                    <li>
                      Items must be unused, unworn, unwashed and undamaged by
                      you.
                    </li>
                    <li>
                      Goods will be returned only if they are returned in their
                      original packaging.
                    </li>
                    <li>
                      Goods once sold can only be exchanged for replacement or a
                      store credit if they meet our terms and conditions.
                    </li>
                    <li>
                      Since we keep limited inventory and do not always have all
                      sizes available and under such circumstances the amount
                      paid by you can be used by you whenever you shop with us
                      next time.
                    </li>
                    <li>
                      To return an item, the customer must write to us at
                      care@woodlandworldwide.com, a prompt response is assured
                      to such mails. For more details please read the{" "}
                      <a href="/refund-policy">FAQ’s</a>
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Form>
    </div>
  );
}
