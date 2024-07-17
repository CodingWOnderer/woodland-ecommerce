"use client";
import OrderComponent from "@/components/OrderComponent";
import LoaderComponent from "@/components/common/Loader";
import OrderQuery from "@/hooks/orders/queries";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"] });

export default function OrderId({ params }: { params: { id: string } }) {
  const { data, isPending, isError } = OrderQuery.useSuccessOrderQuery(
    "woodland",
    params.id
  );

  if (isPending) {
    return <LoaderComponent size="infiniteLoader" />;
  }

  if (
    isError ||
    data?.code === 404 ||
    data?.message === "No orders found" ||
    data?.status === "error"
  ) {
    return (
      <div className="w-full h-[400px] flex flex-col justify-center items-center">
        <Image
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          src={"/Empty.svg"}
          height={200}
          width={200}
        />

        <h2 className=" font-semibold text-gray-800/20">No Orders</h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl pl-4 sm:pl-6 lg:pl-10 font-semibold tracking-tight text-gray-900">
          Order Details
        </h1>

        <div
          className={cn(
            "mt-2 pl-4 sm:pl-6 border-b lg:pl-10 border-gray-200 pb-5 text-sm sm:flex sm:justify-between",
            mulish.className
          )}
        >
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
                  <p className="break-words py-1">
                    {data?.data.address.address}
                  </p>
                  <span className="block">
                    {data?.data.address.city}&nbsp;{data?.data.address.state}
                    &nbsp; India
                  </span>
                  <span className=" block">
                    Pincode : &nbsp;{data?.data.address.pincode}
                  </span>
                </dd>
              </div>
            </dl>

            <dl
              className={cn(
                "mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8",
                mulish.className
              )}
            >
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
              Incase of any queries regarding your order, please call 1800 103
              3445 or write to us on
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
  );
}
