"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import useWoodlandStoreData from "@/lib/store/store";
import Link from "next/link";

const CartSheet = () => {
  const { storeSheet, toggleStore, items, removeItemFromCart } =
    useWoodlandStoreData();
  return (
    <Sheet open={storeSheet} onOpenChange={(e) => toggleStore(e)}>
      <SheetContent className="sm:min-w-[500px] min-w-[100vw]">
        <SheetHeader className="space-y-0 space-x-8 flex flex-row">
          <SheetClose>
            <IoMdClose size={24} />
          </SheetClose>
          <div className="flex flex-col">
            <SheetTitle className="text-xl text-start">Your Cart</SheetTitle>
            <SheetDescription className="text-xs">
              Never leave a cart empty
            </SheetDescription>
          </div>
        </SheetHeader>
        <Separator className="mt-6" />
        <ScrollArea className={items.length > 0 ? "h-[70vh]" : "h-[90vh]"}>
          {items.length > 0 ? (
            <ul role="list" className=" divide-y divide-gray-200">
              {items.map((product) => (
                <li
                  key={product.id}
                  className="flex py-6  justify-center items-center"
                >
                  <div className="h-28 w-28 p-2 bg-[#F0F0F0] mix-blend-multiply flex-shrink-0 overflow-hidden  border-gray-200">
                    <img
                      alt={product.name}
                      src={product.imageURL}
                      className="h-full mix-blend-multiply w-full object-cover object-center"
                    />
                  </div>
                  <Card className="w-full rounded-none shadow-none border-none">
                    <CardHeader className=" py-0 pb-4">
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
                    <CardFooter className="pb-0 ">
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 px-3.5 py-2 text-xs font-medium bg-[#F0F0F0]">
                          Qty {product.quantity}
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeItemFromCart(product.id)}
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
          ) : (
            <div className="flex justify-center items-center h-[90vh]">
              <Image
                alt={"empty-cart"}
                width={100}
                height={100}
                quality={100}
                src={"/emptycart.png"}
              />
            </div>
          )}
        </ScrollArea>
        {items.length > 0 ? (
          <SheetFooter className="pb-0">
            <div className="border-t w-full border-gray-200 py-3 ">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>
                  Subtotal &nbsp;&nbsp;&nbsp;<span>{items.length} Item</span>
                </p>
                <p>
                  {`₹ ${items.reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      (currentValue?.price ?? 0) *
                        (currentValue?.quantity ?? 0),
                    0
                  )}`}
                </p>
              </div>
              <div className="mt-2">
                <a
                  href="#"
                  className="flex items-center justify-center  border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary rounded-none"
                >
                  Checkout
                </a>
              </div>
              <div className="flex justify-center items-center">
                {" "}
                <div className="mx-auto my-2 font-semibold text-sm">
                  <span>To know more check out</span>{" "}
                  <Link href={"/compliance/refund"} className="underline">
                    FAQ’s
                  </Link>
                </div>
              </div>
            </div>
          </SheetFooter>
        ) : (
          ""
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
