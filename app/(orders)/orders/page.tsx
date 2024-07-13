"use client";

import LoaderComponent from "@/components/common/Loader";
import OrderComponent from "@/components/OrderComponent";
import orderQuery from "@/hooks/orders/queries";
import orders from "@/lib/data.json";
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
        <Image src={"/Empty.svg"} height={200} width={200} alt="Woodland" />

        <h2 className=" font-semibold text-gray-800/20">No Orders</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      {orders.data.map((item, index) => {
        return (
          <OrderComponent
            key={index}
            {...item.subOrders[0]}
            paymentType={item.paymentType}
            orderId={item.orderId}
            createdAt={item.createdAt}
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
