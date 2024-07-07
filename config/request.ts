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
 *
 * blog/api/v1/blogs/allBlogs @description {blogs} for all blog listing
 *
 * blog/api/v1/blogs/${params.blogID} @description for info about individual blog
 *
 *
 * product
 *
 * "https://capcons.com/go-products/category${queryStringified ? `?${queryStringified}` : ""}"
 *
 *
 * product listing
 *
 * "https://capcons.com/go-products/products${baseUrl}${queryStringified ? `?${queryStringified}` : ""}"
 *
 *
 *
 * auth verify
 *
 * "https://capcons.com/go-auth/verifyGuestLogin"
 */
