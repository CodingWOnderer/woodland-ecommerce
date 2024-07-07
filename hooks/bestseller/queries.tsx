import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/config/request";
import { ProductSchema } from "./types";
import { QueryParams, queryParamsSchema } from "../collections/types";

export const fetchBestseller = async (
  bestseller: Partial<
    Pick<QueryParams, "category" | "gender" | "circle" | "brand" | "bestSeller">
  >
): Promise<ProductSchema> => {
  const validatedQueryParams = queryParamsSchema.parse(bestseller) as Record<
    string,
    string
  >;
  Object.keys(validatedQueryParams).forEach(
    (key) =>
      validatedQueryParams[key] === undefined &&
      delete validatedQueryParams[key]
  );

  const params = new URLSearchParams({
    ...validatedQueryParams,
  });

  const response = await apiRequest.get<ProductSchema>(
    `/go-products/products?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const useBestsellerQuery = (
  queryParams: Partial<
    Pick<QueryParams, "category" | "gender" | "circle" | "brand" | "bestSeller">
  >
) => {
  return useQuery<ProductSchema>({
    queryKey: ["bestseller", queryParams],
    queryFn: () => fetchBestseller(queryParams),
  });
};

export default useBestsellerQuery;
