import axios, { AxiosInstance } from "axios";

export const apiRequest: AxiosInstance = axios.create({
  baseURL: "https://capcons.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

const baseurl =
  "https://asia-south2-woodland-397213.cloudfunctions.net/retailstore";
/** axios apis
 *
 *" sorting
https://capcons.com/go-products/products?category=boots&circle=woodland&gender=MEN&page=1&sort=discounthigh"

price sorting "https://capcons.com/go-products/products?category=boots&circle=woodland&gender=MEN&maxPrice=1000&minPrice=0&page=1&sort=discounthigh"

filter based on size "
https://capcons.com/go-products/products?category=boots&circle=woodland&gender=MEN&page=1&size=40&sort=discounthigh""

color filters
"https://capcons.com/go-products/products?category=boots&circle=woodland&color=BLUE&gender=MEN&page=1&sort=discounthigh"
 */
