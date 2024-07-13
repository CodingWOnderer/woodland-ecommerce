import axios, { AxiosInstance } from "axios";

export const apiRequest: AxiosInstance = axios.create({
  baseURL: "https://capcons.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
