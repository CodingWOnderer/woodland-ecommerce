import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/config/request";
import { ParsedProductData } from "@/components/forum/types";

export const fetchServiceability = async (
  activeColor: string
): Promise<ParsedProductData> => {
  const response = await apiRequest.get<ParsedProductData>(
    `/go-products/product/slug/${activeColor}?circle=woodland`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const useProductQuery = (activeColor: string) => {
  return useQuery<ParsedProductData>({
    queryKey: ["product", activeColor],
    queryFn: () => fetchServiceability(activeColor),
  });
};

export default useProductQuery;
