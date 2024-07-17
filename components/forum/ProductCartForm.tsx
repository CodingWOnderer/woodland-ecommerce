/* eslint-disable @next/next/no-img-element */
"use client";
import { cn, getBadgeDetails, sortBySize } from "@/lib/utils";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaRegHeart } from "react-icons/fa";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { IoCartOutline } from "react-icons/io5";
import usePincodeQuery from "@/hooks/pincode/queries";
import { useEffect, useState } from "react";
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
import { toast } from "sonner";
import useWoodlandStoreData from "@/lib/store/store";
import { IManufacturingInfo } from "@/lib/store/types";
import { useGoToCartMutation } from "@/hooks/cart/mutation";
import { sendGTMEvent } from "@next/third-parties/google";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

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
  manufacturingInfo,
}: {
  productid: string;
  productData: Pick<ParsedProductData, "data">;
  manufacturingInfo: Partial<IManufacturingInfo>;
}) {
  const [pincode, setPincode] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const {
    setSizeSheet,
    sizeSheet,
    infoSheet,
    setInfoSheet,
    setManufacturingInfo,
    addItemToCart,
    toggleStore,
    updateCartItem,
    items: cartItems,
  } = useWoodlandStoreData();
  const { mutate, isPending } = useGoToCartMutation();

  const currentProduct = productData.data.productMeta.find(
    (item) => item.slug === productid
  );

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      colors: currentProduct?.slug,
      size:
        productData.data.sizes.find(
          (siz) => siz.quantity > 0 && siz.size !== "No Size"
        )?.size ?? "",
      quantitiy: "1",
      like: "false",
      pincode: "",
    },
  });
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(
    () =>
      setIsInCart(
        !!cartItems.find(
          (item) =>
            item.slug === productid && item.size === form.getValues("size")
        )
      ),
    [form.watch("size"), cartItems, form.getValues("size")]
  );

  const addCartGtm = (newItem: {
    id: string;
    name: string;
    price: number | undefined;
    quantity: number;
    size: string;
    color: string;
    imageURL: string;
  }) =>
    sendGTMEvent({
      event: "add_to_cart",
      ecommerce: {
        currency: "INR",
        value: newItem?.price,
        items: [
          {
            item_id: newItem?.id,
            item_name: newItem?.name || "",
            item_price: newItem?.price,
            quantity: newItem?.quantity,
            item_brand: productData?.data?.brand,
            item_category: productData?.data?.gender || "",
            item_category2:
              productData?.data?.category &&
              productData?.data?.category.length > 0
                ? productData?.data?.category[1]
                : "",
            item_category3:
              productData?.data?.category &&
              productData?.data?.category.length > 0
                ? productData?.data?.category[0]
                : "",
            item_variant: newItem?.color,
          },
        ],
      },
    });

  function onSubmit(fdata: AppearanceFormValues) {
    if (isInCart) {
      toast.info("Item is already in Cart");
      return;
    }
    const newItem = {
      id:
        productData.data.sizes.find((item) => item.size === fdata.size)
          ?.variantID ?? "",
      name: currentProduct?.title ?? "",
      price: currentProduct?.offerPrice,
      quantity: Number(fdata.quantitiy) ?? 1,
      size: fdata.size,
      color: fdata.colors ?? "",
      imageURL: currentProduct?.urls[0] ?? "",
    };

    mutate(
      {
        variants: addItemToCart(newItem).map((item) => ({
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

          addCartGtm(newItem);
          toggleStore(true);
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  }

  const formatPrice = (price: number) => {
    const priceStr = price.toString();
    return (
      <>
        ₹ {priceStr[0]}
        {priceStr.slice(1)}
      </>
    );
  };

  const offerPrice = currentProduct?.offerPrice ?? 0;
  const price = currentProduct?.price ?? 0;
  const discount = currentProduct?.discount ?? 0;
  const isDiscounted = offerPrice > 0 && offerPrice !== price;

  const { refetch, data } = usePincodeQuery(pincode);
  return (
    <div className="w-full h-full">
      <Form {...form}>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
          {currentProduct?.title ?? ""}
        </h1>

        <p className="text-2xl mt-8 flex text-gray-900">
          <span className={mulish.className}>
            {isDiscounted ? formatPrice(offerPrice) : formatPrice(price)}
          </span>
          &nbsp;&nbsp;
          {isDiscounted && (
            <span
              className={cn("line-through text-neutral-500", mulish.className)}
            >
              MRP &nbsp; {formatPrice(price)}
            </span>
          )}
          &nbsp;&nbsp;
          {discount > 0 && (
            <span
              className={cn(
                "text-primary font-sans font-bold",
                mulish.className
              )}
            >
              {discount} % off
            </span>
          )}
        </p>
        <span className="text-[13px] text-muted-foreground">
          Prices include taxes
        </span>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 my-4">
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-lg font-semisemibold">
                  Colors
                </FormLabel>
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
                          <div className="items-center bg-[#F0F0F0] cursor-pointer w-fit border-[1px] border-muted p-1 hover:border-accent">
                            <img
                              src={prod.urls[0]}
                              alt="Summer Travel Bag image"
                              className="  h-[50px] w-[50px] mix-blend-multiply border-gray-100 transition-all duration-500 "
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
                  <span className="text-lg font-semibold">Size</span>
                  <Button
                    onClick={() => setSizeSheet(!sizeSheet)}
                    variant={"ghost"}
                    type="button"
                    disabled={productData.data.sizes[0].size === "No Size"}
                    className="text-primary uppercase text-xs font-semibold"
                  >
                    Size Guide
                  </Button>
                </FormLabel>
                <FormMessage />
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex max-w-fit flex-wrap gap-x-4 "
                >
                  {sortBySize(productData.data.sizes).map((siz, ind) => {
                    return (
                      <FormItem key={ind}>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary [&:has([data-state=checked])>div]:text-primary-foreground [&:has([data-state=checked])>div]:transition-all">
                          <FormControl>
                            <RadioGroupItem
                              value={siz.size}
                              className="sr-only"
                              disabled={
                                siz.quantity === 0 || siz.size === "No Size"
                              }
                            />
                          </FormControl>
                          <div>
                            {siz.size === "No Size" ? (
                              <div className="items-center bg-gray-200 border border-black/10 w-fit text-gray-950/40  p-5 px-8 cursor-not-allowed">
                                {siz.size}
                              </div>
                            ) : siz.quantity > 0 ? (
                              <div className="items-center cursor-pointer w-fit border p-5 px-8 hover:border-primary">
                                {siz.size}
                              </div>
                            ) : (
                              <>
                                <div
                                  className="items-center w-fit border relative cursor-not-allowed border-red-300/40 text-red-500/50 bg-red-100 after:h-[180%]
        after:rotate-[56deg] overflow-hidden after:border-[0.5px] after:absolute after:border-red-300/40 after:left-1/2 after:right-1/2 after:content-[''] after:-top-5 p-5 px-8"
                                >
                                  {siz.size}
                                </div>
                                <div className="mx-auto mt-1 w-full text-center text-[10px] text-gray-500">
                                  Sold Out
                                </div>
                              </>
                            )}
                          </div>
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Free Delivery
                </FormLabel>
                <FormDescription>
                  For orders above ₹1000. Delivery in 3-7 working days.
                </FormDescription>
                <FormControl>
                  <div className="flex flex-col  space-y-1">
                    <div className="flex bg-[#F0F0F0]  ">
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setPincode(e.target.value);
                        }}
                        min={1}
                        type="number"
                        className="rounded-none bg-[#F0F0F0] border-none h-12 focus-visible:ring-0"
                        placeholder="Enter Pincode"
                      />
                      <Badge
                        onClick={() => (pincode.length > 0 ? refetch() : "")}
                        className={cn(
                          "text-xs m-1 bg-[#F0F0F0] text-primary shadow-none rounded-none hover:bg-primary hover:text-white transition-all duration-700  hover:shadow-none cursor-pointer"
                        )}
                      >
                        Check
                      </Badge>
                    </div>
                    <FormDescription
                      className={cn(
                        data?.code === 200 ? "text-primary" : "text-red-500",
                        "h-4"
                      )}
                    >
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
                        disabled={
                          (productData?.data?.sizes?.find(
                            (siz) =>
                              siz?.quantity > 0 && siz?.size !== "No Size"
                          )?.size?.length ?? 0) > 0
                            ? false
                            : true
                        }
                        className="rounded-none h-full"
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
                        disabled={
                          (productData?.data?.sizes?.find(
                            (siz) =>
                              siz?.quantity > 0 && siz?.size !== "No Size"
                          )?.size?.length ?? 0) > 0
                            ? false
                            : true
                        }
                        className="rounded-none w-full text-center lg:w-14 h-full focus-visible:ring-0"
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setValue("quantitiy", (quantity + 1).toString());
                          setQuantity(quantity + 1);
                        }}
                        disabled={
                          (productData?.data?.sizes?.find(
                            (siz) =>
                              siz?.quantity > 0 && siz?.size !== "No Size"
                          )?.size?.length ?? 0) > 0
                            ? false
                            : true
                        }
                        className="rounded-none h-full"
                      >
                        +
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="lg:max-w-xl w-full">
                  <Button
                    className="flex col-span-3 space-x-2 rounded-none w-full h-12 lg:max-w-xl"
                    type="submit"
                    disabled={
                      (productData?.data?.sizes?.find(
                        (siz) => siz?.quantity > 0 && siz?.size !== "No Size"
                      )?.size?.length ?? 0) > 0
                        ? false
                        : true || isInCart
                    }
                  >
                    <IoCartOutline size={24} />
                    <span className="font-semibold text-lg">
                      {isPending ? "Adding To Cart...." : "Add To Cart"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isInCart ? (
                    <p>Item is already in cart</p>
                  ) : (
                    <p>Add items to cart</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
              <span className="text-lg font-bold text-gray-900">
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
              <span className="text-lg font-bold text-gray-900">
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
                      <a href="/compliance/refund">FAQ’s</a>
                    </li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button
          onClick={() => {
            setInfoSheet(!infoSheet);
            setManufacturingInfo({
              ...manufacturingInfo,
              Measurement:
                form.getValues("size").length > 0
                  ? form.getValues("size")
                  : undefined,
            });
          }}
          className="text-sm mt-4 text-black/40 underline"
        >
          IMPORT, MANUFACTURING & PACKAGING INFO
        </button>
      </Form>
    </div>
  );
}
