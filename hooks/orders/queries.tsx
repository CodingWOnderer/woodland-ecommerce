import { useQuery } from "@tanstack/react-query";
import { SuccessOrder, UserOrder } from "./types";
import { getCookieAsync } from "@/lib/cookies/cookies";
import { sendGTMEvent } from "@next/third-parties/google";
import axios from "axios";

export const fetchOrdersData = async (
  circle: string,
  authToken: string
): Promise<ResponseModal<UserOrder[]>> => {
  const response = await axios.get<ResponseModal<UserOrder[]>>(
    `https://api-v1.capcons.com/go-orders/getOrdersByPhone?circle=${circle}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const useOrderQuery = (circle: string) => {
  return useQuery<ResponseModal<UserOrder[]>>({
    queryKey: ["ordersdata", circle],
    queryFn: async () =>
      fetchOrdersData(circle, (await getCookieAsync("token")) ?? ""),
  });
};

const fetchSuccessOrdersData = async (
  circle: string,
  authToken: string,
  orderId: string
): Promise<ResponseModal<SuccessOrder>> => {
  const response = await axios.get<ResponseModal<SuccessOrder>>(
    `https://api-v1.capcons.com/go-orders/getSuccessOrder/${orderId}?circle=${circle}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    sendGTMEvent({
      event: "purchase",
      ecommerce: {
        currency: "INR",
        payment_type: response.data.data.paymentType,
        transaction_id: response.data.data.orderId,
        value: response.data.data.finalAmount,
        shipping: response.data.data.deliveryCharge,
        items: response.data.data.subOrders.map((suborder, idx) => ({
          item_id: suborder.variantId,
          item_name: suborder.name,
          item_variant: suborder.color,
          item_category: suborder.gender,
          item_category2: suborder?.categories?.[1] ?? "",
          item_category3: suborder?.categories?.[0] ?? "",
          price: suborder.price,
          offerPrice: suborder.offerPrice,
          quantity: suborder.quantity,
          position: idx + 1,
        })),
      },
    });
  }
  return response.data;
};

const useSuccessOrderQuery = (circle: string, orderId: string) => {
  return useQuery<ResponseModal<SuccessOrder>>({
    queryKey: ["orderSuccessdata", circle],
    queryFn: async () =>
      fetchSuccessOrdersData(
        circle,
        (await getCookieAsync("token")) ?? "",
        orderId
      ),
  });
};

export default {
  useSuccessOrderQuery,
  useOrderQuery,
};
