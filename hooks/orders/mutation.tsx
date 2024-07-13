import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import {
  CancelOrderPayload,
  CancelOrderResponseSchema,
  OmsStatusPushPayload,
} from "./types";

const cancelOrder = async (
  payload: CancelOrderPayload & OmsStatusPushPayload
): Promise<string> => {
  const res = await axios.post(
    "https://capcons.com/go-inventory/statuspush",
    payload as CancelOrderPayload
  );

  const result = CancelOrderResponseSchema.parse(res.data);

  if (result === "Success" || result === "OK") {
    const omsPayload: OmsStatusPushPayload = {
      cancelFormData: payload.cancelFormData,
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
