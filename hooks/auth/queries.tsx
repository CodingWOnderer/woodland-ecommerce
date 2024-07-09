import { User } from "./types";
import { apiRequest } from "@/config/request";
import { getCookieAsync } from "@/lib/cookies/cookies";
import { useQuery } from "@tanstack/react-query";

export const fetchUser = async (
  token: string,
  circle: string = "woodland"
): Promise<User> => {
  const response = await apiRequest.get<User>(`/go-auth/user`, {
    params: { circle },
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const useUserAuthQuery = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () =>
      fetchUser((await getCookieAsync("token")) ?? "", "woodland"),
    enabled: !!(async () => await getCookieAsync("token")),
  });
};

export default useUserAuthQuery;
