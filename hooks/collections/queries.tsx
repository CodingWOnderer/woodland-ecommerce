import { apiRequest } from "@/config/request";
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
  useQuery,
} from "@tanstack/react-query";
import { ApiResponse, QueryParams, queryParamsSchema } from "./types";

/**
 * @typedef {Object} ApiResponse - Response structure from the API.
 * @property {Array<any>} data - The data returned from the API.
 * @property {unknown} meta - Additional metadata from the API response.
 */

/**
 * @typedef {Object} QueryParams - Query parameters structure.
 * @property {string} param1 - Example parameter 1.
 * @property {string} param2 - Example parameter 2.
 */

/**
 * @typedef {Object} UseInfiniteQueryResult - Result type for useInfiniteQuery hook.
 * @property {InfiniteData<ApiResponse, unknown>} data - The data fetched by the query.
 * @property {boolean} isLoading - Whether the query is currently loading.
 * @property {boolean} isSuccess - Whether the query has successfully fetched data.
 * @property {Error | null} error - Any error that occurred during the query.
 */

const baseUrl = "go-products/products";

/**
 * Collection configuration for product collection.
 * @returns {readonly ["collection-config"]} Collection configuration array.
 */

export const productCollection = {
  collectionConfig: () => ["collection-config"] as const,
  collectionImage: () => ["collection-image"] as const,
};

/**
 * Custom hook to fetch product card collection using infinite query.
 * @param {Partial<QueryParams>} queryParams - Partial query parameters.
 * @returns {UseInfiniteQueryResult<InfiniteData<ApiResponse, unknown>, Error>} Infinite query result.
 */
export const useProductCardCollection = (
  queryParams?: Partial<QueryParams>
): UseInfiniteQueryResult<InfiniteData<ApiResponse, unknown>, Error> => {
  const validatedQueryParams = queryParamsSchema.parse(queryParams) as Record<
    string,
    string
  >;

  Object.keys(validatedQueryParams).forEach(
    (key) =>
      validatedQueryParams[key] === undefined &&validatedQueryParams[key]===""&&validatedQueryParams[key]===null&&
      delete validatedQueryParams[key]
  );

  return useInfiniteQuery<ApiResponse, Error>({
    queryKey: [...productCollection.collectionConfig(), validatedQueryParams],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...validatedQueryParams,
        page: (pageParam as number).toString(),
      });
      const product = await apiRequest.get<ApiResponse>(
        `/${baseUrl}?${params}`
      );
      return product.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.length ? allPages?.length + 1 : undefined;
    },
  });
};

export const useCollectionPageImage = (
  queryParams?: Partial<
    Pick<QueryParams, "category" | "gender" | "circle" | "brand">
  >
) => {
  const validatedQueryParams = queryParamsSchema.parse(queryParams) as Record<
    string,
    string
  >;

  Object.keys(validatedQueryParams).forEach(
    (key) =>
      validatedQueryParams[key] === undefined &&
      delete validatedQueryParams[key]
  );

  return useQuery({
    queryKey: [...productCollection.collectionImage(), validatedQueryParams],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...validatedQueryParams,
      });

      if (
        validatedQueryParams.circle &&
       ( validatedQueryParams.category ||
        validatedQueryParams.gender || validatedQueryParams.brand)
      ) {
        return (
          await apiRequest.get<{
            data: Partial<{
              description: string;
              name: string;
              image: string;
            }>;
          }>(`go-products/category?${params}`)
        ).data;
      } else {
        return {
          isLoading: false,
          error: null,
          data: undefined,
        };
      }
    },
    refetchOnWindowFocus:false,
  });
};
