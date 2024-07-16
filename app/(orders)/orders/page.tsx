"use client";

import LoaderComponent from "@/components/common/Loader";
import OrderComponent from "@/components/OrderComponent";
import orderQuery from "@/hooks/orders/queries";
import Image from "next/image";

function OrderPage() {
  const { data, isLoading, isError } = orderQuery.useOrderQuery("woodland");

  if (isLoading) {
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
    <div className="flex flex-col space-y-4 w-full">
      {data?.data.map((item, index) => {
        return (
          <OrderComponent
            key={index}
            {...item.subOrders[0]}
            orderId={item.orderId}
            createdAt={item.createdAt}
            paymentType={item.paymentType}
            orderDetailPage={false}
            status={
              item.subOrders[0].status[item.subOrders[0].status.length - 1]
                .message
            }
          />
        );
      })}
    </div>
  );
}

export default OrderPage;
