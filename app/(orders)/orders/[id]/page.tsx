"use client";
import OrderComponent from "@/components/OrderComponent";
import LoaderComponent from "@/components/common/Loader";
import OrderQuery from "@/hooks/orders/queries";
import Image from "next/image";
import { SuccessOrder } from "@/hooks/orders/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const donationAmount = 30;
const shippingCharge = 150;

// const subTotal = cartItems.reduce((acc, item) => {
//   if (typeof item.price === "number") {
//     return acc + item.price * item.quantity;
//   }
//   return acc;
// }, 0);

// const totalAmount =
//   subTotal +
//   (includeDonation ? donationAmount : 0) -
//   discountAmount +
//   (subTotal < 1000 ? shippingCharge : 0);

const data: ResponseModal<SuccessOrder> = {
  status: "success",
  code: 200,
  message: "order retrieved successfully",
  data: {
    userId: "O5nxOjLKUTZ12kmO5f54tUdo8dF3",
    email: "dkaljdl@gmail.com",
    phone: "+918349880781",
    razorpayOrderId: "",
    razorpayPaymentId: "",
    amount: 500,
    finalAmount: 500,
    address: {
      firstName: "satyam",
      lastName: "singh",
      email: "dkaljdl@gmail.com",
      address: "X-306,The hyde park,sector-78",
      pincode: "201304",
      city: "Noida",
      state: "Uttar Pradesh",
      landmark: "",
      addressType: "home",
    },
    paymentType: "postpaid",
    promo: "",
    donationAmount: 0,
    deliveryCharge: 150,
    vgmAmount: 0,
    orderId: "OR-3423943",
    createdAt: "2024-07-12T09:35:28Z",
    suborderAllocated: true,
    circle: "woodland",
    subOrders: [
      {
        subOrderId: "SO-3735900",
        productId: "AGSO0324291A",
        slug: "AGSO0324291A-RED_GREY",
        variantId: "AGSO0324291A001",
        discount: 0,
        quantity: 1,
        finalPrice: 350,
        price: 350,
        variantPrice: 0,
        offerPrice: 350,
        gst: 5,
        status: [
          {
            status: "101",
            time: "2024-07-12T09:35:28Z",
            message: "Order Confirmed",
          },
          {
            status: "109",
            time: "2024-07-12T09:45:57Z",
            message: "Cancelled by Customer",
          },
        ],
        invoiceDate: "",
        invoiceNumber: "",
        store: "",
        awbNumber: "",
        refNumber: "",
        deliveryPartner: "",
        refund: null,
        taxAmount: 0,
        imageURL:
          "https://assets.woodlandworldwide.app/compressed/images/AGSO0324291A/RED_GREY/AGSO0324291A_315_0.jpg",
        name: "Red/Grey crew socks for men",
        color: "RED/GREY",
        size: "00",
        categories: ["SOCKS", "ACCESSORIES", "SOCKS"],
        gender: "MEN",
      },
    ],
  },
};

export default function OrderId({ params }: { params: { id: string } }) {
  // const { data, isLoading, isError } = OrderQuery.useSuccessOrderQuery(
  //   "woodland",
  //   params.id
  // );

  // if (isLoading) {
  //   return <LoaderComponent size="infiniteLoader" />;
  // }

  // if (
  //   isError ||
  //   data?.code === 404 ||
  //   data?.message === "No orders found" ||
  //   data?.status === "error"
  // ) {
  //   return (
  //     <div className="w-full h-[400px] flex flex-col justify-center items-center">
  //       <Image src={"/Empty.svg"} height={200} width={200} alt="Woodland" />

  //       <h2 className=" font-semibold text-gray-800/20">No Orders</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white">
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
                  <span className="block">{data?.data.address.address}</span>
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
