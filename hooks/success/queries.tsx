import { apiRequest } from "@/config/request";
import { SuccessResponseType } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getCookieAsync } from "@/lib/cookies/cookies";

const getOrderDetails = async ({
  orderId,
}: {
  orderId: string;
}): Promise<ResponseModal<SuccessResponseType>> => {
  const token = getCookieAsync("token");

  const response = await apiRequest.get<ResponseModal<SuccessResponseType>>(
    `/go-orders/getSuccessOrder/${orderId}?circle=woodland`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useSuccessOrder = (orderId: string) => {
  return useQuery<ResponseModal<SuccessResponseType>>({
    queryKey: ["successOrder", orderId],
    queryFn: async () => await getOrderDetails({ orderId: orderId }),
  });
};
