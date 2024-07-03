import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://capcons.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

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
