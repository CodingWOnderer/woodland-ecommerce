"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RiLoader4Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ContentLayout from "@/components/layout/ContentLayout";
import { Checkbox } from "@/components/ui/checkbox";
import useWoodlandStoreData from "@/lib/store/store";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApplyPromocode } from "@/hooks/checkout/mutation";
import { useState } from "react";
import usePincodeQuery from "@/hooks/pincode/queries";
import React from "react";
import { cn } from "@/lib/utils";
import { useCreateOrder } from "@/hooks/orders/mutation";
import useRazorpayPayment from "@/hooks/payment/useRazorpayPayment";
import { sendGTMEvent } from "@next/third-parties/google";
import { Mulish } from "next/font/google";
import DonationModal from "@/components/DonationModal";

const mulish = Mulish({ subsets: ["latin"] });

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  pincode: z.string().min(1, { message: "Pincode is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  addressLine: z.string().min(1, { message: "Address line is required." }),
  landmark: z.string().optional(),
  promocode: z.string().optional(),
  donation: z.boolean().optional(),
  paymentType: z.enum(["Prepaid", "PostPaid"]).default("Prepaid").optional(),
});

function ShippingPage() {
  const { items, removeItemFromCart, user, setDonationModel, donationModel } =
    useWoodlandStoreData();
  const {
    mutate: promoMutate,
    data: promoData,
    isPending,
    isError,
  } = useApplyPromocode();

  const {
    initiatePayment,
    loading: PaymentLoading,
    error: PaymentError,
  } = useRazorpayPayment();

  const { mutate: mutateCreateOrder, isPending: isCreatingOrder } =
    useCreateOrder();
  const [applyPromo, setApplyPromo] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      pincode: "",
      city: "",
      state: "",
      addressLine: "",
      landmark: "",
      promocode: "",
      donation: false,
    },
  });

  const {
    refetch,
    data: pincodeData,
    isSuccess: isPincodeSuccess,
  } = usePincodeQuery(
    form.getValues("pincode").length >= 6 ? form.getValues("pincode") : ""
  );

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  React.useEffect(() => {
    if (form.getValues("pincode").length >= 6) {
      refetch().then((data) => {
        form.setValue("city", data.data?.data?.city ?? "");
        form.setValue("state", data.data?.data?.state ?? "");
      });
    }
  }, [form.watch("pincode").length, form, form.watch]);

  const calculateTotal = () => {
    const shipping = subtotal > 1000 ? 0 : 150;
    const donation = form.getValues("donation") ? 30 : 0;
    const discount =
      applyPromo && promoData?.data?.totalDiscount
        ? promoData.data.totalDiscount
        : 0;
    return subtotal + shipping + donation - discount;
  };

  function onOnlinSubmit(fdata: z.infer<typeof formSchema>) {
    mutateCreateOrder(
      {
        paymentType: "prepaid",
        circle: "woodland",
        subOrders: items.map((item) => ({
          variantId: item.id,
          quantity: item.quantity,
        })),
        address: {
          email: fdata.email,
          firstName: fdata.firstName,
          lastName: fdata.lastName,
          address: fdata.addressLine,
          pincode: fdata.pincode,
          city: fdata.city,
          state: fdata.state,
          addressType: "home",
          landmark: fdata.landmark,
        },
        donation: fdata.donation ? 30 : 0,
        promo: fdata.promocode,
      },
      {
        onSuccess: async (data) => {
          await initiatePayment({
            amount: data.data.amount,
            razorpayOrderId: data?.data?.razorpayOrderId ?? "",
            name: `${fdata.firstName} ${fdata.lastName}`,
            email: fdata.email,
            phone: user ?? "",
            address: fdata.addressLine,
          });

          sendGTMEvent({
            event: "add_payment_info",
            ecommerce: {
              currency: "INR",
              payment_type: "prepaid",
              items: items.map((product, idx) => ({
                item_id: product.id,
                item_name: product.name,
                item_variant: product.color,
                price: product.price,
                quantity: product.quantity,
                position: idx + 1,
              })),
              name: `${fdata.firstName} ${fdata.lastName}`,
              pincode: fdata.pincode,
              email: fdata.email,
            },
          });
          sendGTMEvent({
            event: "begin_checkout",
            ecommerce: {
              currency: "INR",
              value: subtotal,
              items: items.map((product, idx) => ({
                item_id: product.id,
                item_name: product.name,
                item_variant: product.color,
                price: product.price,
                quantity: product.quantity,
                position: idx + 1,
              })),
            },
          });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  }

  function onCODSubmit(fdata: z.infer<typeof formSchema>) {
    mutateCreateOrder(
      {
        paymentType: "postpaid",
        circle: "woodland",
        subOrders: items.map((item) => ({
          variantId: item.id,
          quantity: item.quantity,
        })),
        address: {
          email: fdata.email,
          firstName: fdata.firstName,
          lastName: fdata.lastName,
          address: fdata.addressLine,
          pincode: fdata.pincode,
          city: fdata.city,
          state: fdata.state,
          addressType: "home",
          landmark: fdata.landmark,
        },
        donation: fdata.donation ? 30 : 0,
        promo: fdata.promocode,
      },
      {
        onSuccess: (data) => {
          router.push(`/success/${data.data.orderId}`);
          toast.success("Order is Successfully confirmed");
          sendGTMEvent({
            event: "add_payment_info",
            ecommerce: {
              currency: "INR",
              payment_type: "postpaid",
              items: items.map((product, idx) => ({
                item_id: product.id,
                item_name: product.name,
                item_variant: product.color,
                price: product.price,
                quantity: product.quantity,
                position: idx + 1,
              })),
              name: `${fdata.firstName} ${fdata.lastName}`,
              pincode: fdata.pincode,
              email: fdata.email,
            },
          });
          sendGTMEvent({
            event: "begin_checkout",
            ecommerce: {
              currency: "INR",
              value: subtotal,
              items: items.map((product, idx) => ({
                item_id: product.id,
                item_name: product.name,
                item_variant: product.color,
                price: product.price,
                quantity: product.quantity,
                position: idx + 1,
              })),
            },
          });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  }

  return (
    <ContentLayout>
      <div className="px-4">
        <div className=" border-y pt-6 pb-4 max-w-screen-xl mx-auto">
          <h1 className=" font-semibold text-2xl text-black">Checkout</h1>
          <span className=" text-sm mb">You are almost there!</span>
        </div>
        <Form {...form}>
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4   max-w-screen-xl mx-auto">
              <div className=" col-span-2 space-y-6">
                <div className=" border-y pt-6 pb-1">
                  <h3 className=" font-semibold text-lg text-black">
                    New Shipping Address
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid col-span-2 gap-2 grid-cols-1 md:grid-cols-2">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="First Name"
                                className=" rounded-none h-10 bg-[#F0F0F0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Last Name"
                                className=" rounded-none h-10 bg-[#F0F0F0]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              className=" rounded-none h-10 bg-[#F0F0F0]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid col-span-2 gap-2 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="addressLine"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Address Line"
                              className=" rounded-none min-h-24 bg-[#F0F0F0]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid gap-2 grid-cols-2">
                      <div className="grid col-span-2 gap-2 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  className=" rounded-none h-10 bg-[#F0F0F0]"
                                  placeholder="Pincode"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                              {pincodeData && isPincodeSuccess && (
                                <div
                                  className={cn(
                                    pincodeData.code === 200
                                      ? "text-xs font-medium text-green-700"
                                      : "text-xs font-medium text-red-700"
                                  )}
                                >
                                  {pincodeData.code === 200
                                    ? "Pincode Available"
                                    : "Pincode not found"}
                                </div>
                              )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="City"
                                  className=" rounded-none h-10 bg-[#F0F0F0]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className=" col-span-2">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="State"
                                  className=" rounded-none h-10 bg-[#F0F0F0]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" col-span-2 sm:col-span-1">
                    {" "}
                    <FormField
                      control={form.control}
                      name="landmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Landmark (optional)"
                              className=" rounded-none h-10 bg-[#F0F0F0]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="donation"
                  render={({ field }) => (
                    <FormItem className="space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          "text-sm space-y-0 font-normal",
                          mulish.className
                        )}
                      >
                        ₹ 30 will be added to your transaction as a Donation
                      </FormLabel>
                      <div className="flex flex-col md:flex-row items-center mb-1 space-y-1 md:space-x-2">
                        <div
                          className="relative"
                          style={{ aspectRatio: "122 / 31", width: "122px" }}
                        >
                          <img
                            src="/donation.png"
                            alt="image-product"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <p className="text-xs font-normal mx-1">
                          {` Your support can help conserve and protect the snow
                          leopard in the Himalaya's. Donate to the "High on
                          Himalaya's" campaign by adding ₹ 30 (or more) to your
                          bill.`}
                          <span
                            onClick={() => setDonationModel(!donationModel)}
                            className="text-xs font-normal text-[#3B6F44] underline cursor-pointer"
                          >
                            Read more
                          </span>
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
                <div className="border-t">
                  {items.length > 0 && (
                    <ul role="list" className=" divide-y divide-gray-200">
                      {items.map((product) => (
                        <li
                          key={product.id}
                          className={cn(
                            "flex py-6 flex-col md:flex-row  justify-center items-center",
                            mulish.className
                          )}
                        >
                          <div className="md:h-28 md:w-28 p-2 bg-[#F0F0F0] mix-blend-multiply flex-shrink-0 overflow-hidden  border-gray-200">
                            <img
                              alt={product.name}
                              src={product.imageURL}
                              className="h-full mix-blend-multiply w-full object-cover object-center"
                            />
                          </div>
                          <Card className="w-full  mt-10 md:mt-0 rounded-none shadow-none border-none ">
                            <CardHeader className=" px-0 md:px-6 md:pb-4 md:py-6">
                              <CardTitle>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3 className="font-bold">{product.name}</h3>
                                  <span className="ml-4">{`₹ ${product.price}`}</span>
                                </div>
                              </CardTitle>
                              <CardDescription>
                                Color:{" "}
                                <span className="font-semibold text-black">
                                  {product.color}
                                </span>
                                <br />
                                Size:{" "}
                                <span className="font-semibold text-black">
                                  {product.size}
                                </span>
                              </CardDescription>
                            </CardHeader>
                            <CardFooter className="p-0 md:p-6 md:pt-0">
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500 px-3.5 py-2 text-xs font-medium bg-[#F0F0F0]">
                                  Delivery: 3-7 Days
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (items.length > 1) {
                                        removeItemFromCart(product.id);
                                      } else {
                                        removeItemFromCart(product.id);
                                        router.back();
                                      }
                                    }}
                                    className="font-medium text-xs text-primary hover:text-primary/80"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </CardFooter>
                          </Card>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/** Second part */}
              <div className={mulish.className}>
                <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
                  <div className="border-b pb-1">
                    <h3 className=" font-semibold text-lg text-black">
                      Order Summary
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="text-gray-900">₹{subtotal}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="text-gray-900">
                      {calculateTotal() > 1000 ? 0 : 150}
                    </dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Donation</dt>
                    <dd className="text-gray-900">
                      {form.getValues("donation") ? 30 : 0}
                    </dd>
                  </div>

                  {applyPromo && promoData?.data?.totalDiscount ? (
                    <div>
                      <div className="flex justify-between">
                        <dt>
                          Promo Applied {promoData?.data?.promoCode}{" "}
                          <Button
                            className=""
                            size={"sm"}
                            variant={"ghost"}
                            ml-1
                            onClick={() => setApplyPromo(false)}
                          >
                            Remove
                          </Button>
                        </dt>
                        <dd className="text-gray-900">
                          - ₹ {promoData?.data?.totalDiscount}
                        </dd>
                      </div>
                      <p className="text-primary text-xs mt-1">
                        Promo code is only Applicable on Prepaid Order
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                    <dt className="text-base">Total</dt>
                    <dd className="text-gray-900">₹{calculateTotal()}</dd>
                  </div>
                </dl>
                <div className="border-t mt-4 pt-2">
                  <FormField
                    control={form.control}
                    name="promocode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Got a promo code?</FormLabel>
                        <FormControl>
                          <>
                            <div className="flex border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden">
                              <Input
                                placeholder="Enter Promocode"
                                disabled={applyPromo}
                                className=" rounded-none h-10 placeholder:text-xs border-none outline-none bg-[#F0F0F0]"
                                {...field}
                              />
                              <Button
                                variant={"ghost"}
                                type="button"
                                disabled={
                                  applyPromo ||
                                  !(form.getValues("promocode").length > 0)
                                }
                                onClick={() => {
                                  promoMutate(
                                    {
                                      circle: "woodland",
                                      promo: form.getValues("promocode"),
                                      subOrders: items.map((item) => ({
                                        variantId: item.id,
                                        quantity: item.quantity,
                                      })),
                                    },
                                    {
                                      onSuccess: () => {
                                        setApplyPromo(true);
                                      },
                                    }
                                  );
                                }}
                                className="rounded-none hover:text-primary text-primary font-bold h-10 bg-[#F0F0F0]"
                              >
                                {isPending ? (
                                  <RiLoader4Fill className=" animate-spin" />
                                ) : (
                                  "Apply"
                                )}
                              </Button>
                            </div>
                            {isError && (
                              <div
                                className={"text-xs font-medium text-red-700"}
                              >
                                Promo code does not exist
                              </div>
                            )}
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-10 border-t flex flex-col space-y-2 border-gray-200 py-6 text-right">
                  <Button
                    onClick={form.handleSubmit(onOnlinSubmit)}
                    className="rounded-none h-12"
                    type="submit"
                    disabled={
                      isCreatingOrder ||
                      !pincodeData?.data?.isPrepaidServiceable
                    }
                  >
                    {isCreatingOrder ? (
                      <div className="flex items-center space-x-2 justify-center">
                        <RiLoader4Fill className=" animate-spin" />
                        <span>Creating Order</span>
                      </div>
                    ) : (
                      "ONLINE"
                    )}
                  </Button>

                  <Button
                    onClick={form.handleSubmit(onCODSubmit)}
                    className="rounded-none h-12"
                    type="submit"
                    disabled={
                      isCreatingOrder || !pincodeData?.data?.isCODServiceable
                    }
                  >
                    {isCreatingOrder ? (
                      <div className="flex items-center space-x-2 justify-center">
                        <RiLoader4Fill className=" animate-spin" />
                        <span>Creating Order</span>
                      </div>
                    ) : (
                      "CASH ON DELIVERY"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <DonationModal />
    </ContentLayout>
  );
}

export default ShippingPage;
