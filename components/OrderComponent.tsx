import { SubOrder, UserOrder } from "@/hooks/orders/types";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type subOrder = Omit<SubOrder, "status">;

type OrderComponentData = subOrder & {
  paymentType?: string;
  orderId?: string;
  createdAt?: string;
  status: string;
  imageURL?: string;
  orderDetailPage?: boolean;
};
const OrderComponent = (props: OrderComponentData) => {
  return (
    <div className="w-full  max-w-7xl px-4  lg-6 mx-auto">
      <div className="pt-6  max-lg:mx-auto lg:max-w-full">
        <div className="flex flex-col  lg:flex-row lg:items-center justify-between lg:px-6 pb-3 sm:pb-6 border-b border-gray-200">
          <div className="flex w-full flex-col lg:flex-row lg:items-center justify-between lg:justify-normal lg:space-x-8">
            <p className="font-semibold  text-base leading-7 text-black">
              Order Id:{" "}
              <span className="text-primary font-semibold">
                {props.orderId}
              </span>
            </p>
            <p className="font-medium hidden lg:block  whitespace-nowrap  px-3 rounded-full text-base ">
              Status :{" "}
              <span className="text-gray-400 font-medium">{props.status}</span>
            </p>
            <p className="font-semibold  text-base leading-7 text-black mt-1">
              Order Placed :{" "}
              <span className="text-black font-medium">{props.createdAt}</span>
            </p>
          </div>
          {!props.orderDetailPage && (
            <Link
              href={`orders/${props.orderId}`}
              className={cn(
                buttonVariants({ variant: "default" }),
                " mt-4 lg:mt-0 rounded-none"
              )}
            >
              More Details
            </Link>
          )}
        </div>
        <div className="w-full  min-[800px]:px-6">
          <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
            <div className="img-box max-lg:w-full">
              <img
                src={props.url ? props.url : props.imageURL}
                alt="Woodland"
                className="aspect-square w-full lg:max-w-[140px]"
              />
            </div>
            <div className="flex flex-row items-center w-full ">
              <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                <div className="flex items-center">
                  <div className="">
                    <h2 className="font-semibold text-xl leading-8 text-black ">
                      {props.title}
                    </h2>
                    <p className="font-semibold text-sm leading-8 ">
                      Color: <span className=" font-normal">{props.color}</span>
                    </p>
                    <div className="flex items-center ">
                      <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                        Size: <span className="text-black">{props.size}</span>
                      </p>
                      <p className="font-medium text-base leading-7 text-black ">
                        Qty:{" "}
                        <span className="text-black">{props.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                    <div className="flex gap-3 lg:block">
                      <p className="font-medium text-base leading-7 text-black">
                        price
                      </p>
                      <p className="lg:mt-4 font-medium text-sm leading-7 ">
                        ₹ &nbsp;{props.price}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                    <div className="flex gap-3 lg:hidden">
                      <p className="font-medium text-sm leading-7 text-black">
                        Status
                      </p>
                      <p className="  text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 font-semibold">
                        {props.status}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                    <div className="flex gap-3 lg:block">
                      <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                        Payment Method
                      </p>
                      <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 ">
                        {props.paymentType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
