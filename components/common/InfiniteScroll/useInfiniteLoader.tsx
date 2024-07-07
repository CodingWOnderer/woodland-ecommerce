import { useContext } from "react";
import InfiniteLoaderContext from "./InfiniteLoaderContext";

export default function useInfiniteLoader() {
  const infiniteProducts = useContext(InfiniteLoaderContext);
  if (!infiniteProducts) throw new Error("No editor backend found");
  return infiniteProducts;
}
