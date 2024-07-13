import axios from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { GoToCartPayload, GoToCartResponse } from "./types";

const goToCart = async (
  payload: GoToCartPayload
): Promise<ResponseModal<GoToCartResponse[]>> => {
  const response = await axios.post<ResponseModal<GoToCartResponse[]>>(
    "https://capcons.com/go-products/goToCart",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const useGoToCartMutation = (): UseMutationResult<
  ResponseModal<GoToCartResponse[]>,
  unknown,
  GoToCartPayload,
  unknown
> => {
  return useMutation<
    ResponseModal<GoToCartResponse[]>,
    unknown,
    GoToCartPayload,
    unknown
  >({
    mutationKey: ["goToCart"],
    mutationFn: goToCart,
  });
};
