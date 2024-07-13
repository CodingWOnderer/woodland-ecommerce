import { useQuery } from "@tanstack/react-query";
import { SuccessOrder, UserOrder } from "./types";
import { getCookieAsync } from "@/lib/cookies/cookies";
import axios from "axios";

export const fetchOrdersData = async (
  circle: string,
  authToken: string
): Promise<ResponseModal<UserOrder>> => {
  const response = await axios.get<ResponseModal<UserOrder>>(
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
  return useQuery<ResponseModal<UserOrder>>({
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
