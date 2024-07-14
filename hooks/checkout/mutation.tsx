import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import {
  PromoRequest,
  PromoResponseData,
  promoResponseDataSchema,
} from "./types";

const applyPromoCodeMutation = async (
  payload: PromoRequest
): Promise<PromoResponseData> => {
  const response = await axios.post(
    "https://capcons.com/go-promos/calculateDiscount",
    payload
  );
  return promoResponseDataSchema.parse(response.data);
};

export const useApplyPromocode = (): UseMutationResult<
  PromoResponseData,
  unknown,
  PromoRequest,
  unknown
> => {
  return useMutation<PromoResponseData, unknown, PromoRequest, unknown>({
    mutationKey: ["promocode"],
    mutationFn: applyPromoCodeMutation,
  });
};
