import { deleteCookieAsync } from "@/lib/cookies/cookies";
import axios, { AxiosInstance } from "axios";

export const apiRequest: AxiosInstance = axios.create({
  baseURL: "https://api-v1.capcons.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await deleteCookieAsync("token");
    }
    return Promise.reject(error);
  }
);
