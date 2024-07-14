"use client";
import LoaderComponent from "@/components/common/Loader";
import ContentLayout from "@/components/layout/ContentLayout";
import Image from "next/image";
import OrderComponent from "@/components/OrderComponent";
import { buttonVariants } from "@/components/ui/button";
import orderQuery from "@/hooks/orders/queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const SuccessPage = ({ params }: { params: { successId: string } }) => {
  const { data, isLoading } = orderQuery.useSuccessOrderQuery(
    "woodland",
    params.successId
  );

  if (isLoading) <LoaderComponent size={"screen"} />;

  if (!data?.data) {
    return (
      <ContentLayout>
        <div className=" mx-auto min-h-screen max-w-screen-xl">
          <div className="flex flex-col items-center justify-center">
            <p className="my-2 text-center text-lg text-gray-800">
              No order found, please return to the Home page
            </p>
            <Link
              href="/"
              className="rounded-none border border-primary bg-primary text-white hover:bg-primary hover:border-primary hover:text-white"
            >
              Return to Home page
            </Link>
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className=" mx-auto min-h-screen max-w-screen-xl">
        <div className="bg-white">
          <div className="flex flex-col py-10 items-center justify-center">
            <div className="relative w-30 h-32 w-32 aspect-square mb-4">
              <Image
                alt="Successcart"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                style={{ objectFit: "contain" }}
                quality={100}
                priority
                src="/successcart.png"
              />
            </div>
            <p className="text-xl font-bold text-green-700 text-center mb-1">
              SUCCESS!
            </p>
            <p className="text-2xl font-semibold text-gray-900 text-center">
              Yay! Your order has been successfully placed
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Order Details
            </h1>

            <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
              <div className="flex flex-col">
                <ul>
                  <li className="flex">
                    <dt className="text-gray-700">Order number : &nbsp;</dt>
                    <dd className="font-medium text-gray-900">
                      {data?.data.orderId}
                    </dd>
                  </li>
                  <li className="flex">
                    <dt className="text-gray-700">Contact : &nbsp;</dt>
                    <dd className="font-medium text-gray-900">
                      {data?.data.phone}
                    </dd>
                  </li>
                  <li className="flex">
                    <dt className="text-gray-700">Email Id : &nbsp;</dt>
                    <dd className="font-medium text-gray-900">
                      {data?.data.email}
                    </dd>
                  </li>
                </ul>
              </div>

              <div className="mt-4 sm:mt-0"></div>
            </div>

            {data &&
              data.data.subOrders.map((item, index) => (
                <OrderComponent
                  key={index}
                  {...item}
                  productId={item.productId}
                  refNumber={item.refNumber ?? undefined}
                  awbNumber={item.awbNumber ?? undefined}
                  store={item.store ?? undefined}
                  invoiceNumber={item.invoiceNumber ?? undefined}
                  subOrderId={item.subOrderId ?? undefined}
                  invoiceDate={item.invoiceDate ?? undefined}
                  orderId={data.data.orderId}
                  paymentType={data.data.paymentType}
                  createdAt={data.data.createdAt}
                  orderDetailPage={true}
                  status={
                    data.data.subOrders[0].status[
                      data.data.subOrders[0].status.length - 1
                    ].message
                  }
                />
              ))}

            {/* Billing */}
            <div className="mt-26">
              <h2 className="sr-only">Billing Summary</h2>

              <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
                <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
                  <div>
                    <dt className="font-bold text-lg text-gray-900">
                      Billing address
                    </dt>
                    <dd className="mt-3 font-medium text-gray-800">
                      <span className="block">
                        {data?.data.address.address}
                      </span>
                      <span className="block">
                        {data?.data.address.city}&nbsp;
                        {data?.data.address.state}
                        &nbsp; India
                      </span>
                      <span className=" block">
                        Pincode : &nbsp;{data?.data.address.pincode}
                      </span>
                    </dd>
                  </div>
                </dl>

                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
                  <div className="flex items-center justify-between pb-4">
                    <dt className=" font-bold">Shipping</dt>
                    <dd className="font-medium text-gray-900">
                      ₹ {data?.data.deliveryCharge}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="font-bold">Donation for WWF</dt>
                    <dd className="font-medium text-gray-900">
                      ₹ {data?.data.donationAmount}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <dt className="font-bold block text-base ">
                      Amount to be Paid
                      <br />
                      <span className=" text-gray-400 text-xs font-normal">
                        inclusive of all gst and other taxes
                      </span>
                    </dt>
                    {data && (
                      <dd className="text-primary font-semibold">
                        ₹ {data.data?.finalAmount}
                      </dd>
                    )}
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className=" font-bold">Payment Method : </dt>
                    <dd className="font-bold capitalize text-gray-900">
                      {data && data.data.paymentType}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Incase of any queries regarding your order, please call 1800
                  103 3445 or write to us on
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  care@woodlandworldwide.com
                </p>
              </div>
              <div className="mt-4 lg:ml-4 lg:mt-0 sm:flex-shrink-0">
                <Link
                  href="/"
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Go Back To Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default SuccessPage;
