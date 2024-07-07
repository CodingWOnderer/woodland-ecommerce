import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/config/request";
import { PinCodeResponseSchema } from "./types";

export const fetchServiceability = async (
  pincode: string
): Promise<PinCodeResponseSchema> => {
  const response = await apiRequest.get<PinCodeResponseSchema>(
    `/go-utils/pincode?pincode=${pincode}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const usePincodeQuery = (pincode: string) => {
  return useQuery<PinCodeResponseSchema>({
    queryKey: ["serviceability", pincode],
    queryFn: () => fetchServiceability(pincode),
    enabled: false,
  });
};

export default usePincodeQuery;
