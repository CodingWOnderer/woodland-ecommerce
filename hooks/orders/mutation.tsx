import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import {
  CancelOrderPayload,
  CancelOrderResponseSchema,
  OmsStatusPushPayload,
  OrderResponse,
  OrderType,
} from "./types";
import { apiRequest } from "@/config/request";
import { getCookieAsync } from "@/lib/cookies/cookies";

const cancelOrder = async (
  payload: CancelOrderPayload & OmsStatusPushPayload
): Promise<string> => {
  const requestData = payload as CancelOrderPayload;
  const token = await getCookieAsync("token");
  const res = await axios.post("https://capcons.com/go-inventory/statuspush", {
    Status: requestData.Status,
    orderId: requestData.orderId,
    subOrderId: requestData.subOrderId,
  });

  const result = CancelOrderResponseSchema.parse(res.data);

  if (result === "Success" || result === "OK") {
    const omsPayload = {
      cancelFormData: {
        reason: payload.cancelFormData.reason,
        title: payload.cancelFormData.title,
        type: "CANCEL",
      },
      circle: "woodland",
      subOrderId: payload.subOrderId,
      status: "109",
    };

    await axios.post(
      "https://capcons.com/go-inventory/statusUpdate",
      omsPayload
    );

    return "Order successfully cancelled";
  } else if (result === "Fail") {
    throw new Error("Error canceling order. Please try again.");
  } else {
    throw new Error("Unexpected response from server. Please try again.");
  }
};

const useCancelOrderMutation = (): UseMutationResult<
  string,
  Error,
  CancelOrderPayload & OmsStatusPushPayload
> => {
  return useMutation<string, Error, CancelOrderPayload & OmsStatusPushPayload>({
    mutationKey: ["cancelOrder"],
    mutationFn: (data) => cancelOrder(data),
  });
};

export default useCancelOrderMutation;

const createOrder = async (data: OrderType): Promise<OrderResponse> => {
  const token = await getCookieAsync("token");
  const response = await apiRequest.post<OrderResponse>(
    "https://capcons.com/go-orders/createOrder",
    JSON.stringify(data as OrderType),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const useCreateOrder = (): UseMutationResult<
  OrderResponse,
  Error,
  OrderType
> => {
  return useMutation<OrderResponse, Error, OrderType>({
    mutationKey: ["createOrder"],
    mutationFn: createOrder,
  });
};
