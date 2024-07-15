"use client";
import { useProductCardCollection } from "@/hooks/collections/queries";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InfiniteLoaderContext from "./InfiniteLoaderContext";
import { QueryParams } from "@/hooks/collections/types";
import useWoodlandStoreData from "@/lib/store/store";
import { sendGTMEvent } from "@next/third-parties/google";

type Props = {
  params?: Partial<QueryParams>;
  children: React.ReactNode;
};

type FilterQueryParams = {
  color?: string[];
  size?: string[];
  minPrice?: number;
  maxPrice?: number;
};

const InfiniteLoadingWrapper = ({ params, children }: Props) => {
  const infiniteLoadingObserver = useRef<IntersectionObserver>();

  const { colorFilter, sizeFilter, priceFilter, sortFilter } =
    useWoodlandStoreData();

  const queryParams: FilterQueryParams = {};

  const selectedColors = colorFilter
    .filter((color) => color.selected)
    .map((color) => color.name);
  if (selectedColors.length > 0) {
    queryParams.color = selectedColors;
  }

  const selectedSizes = sizeFilter
    .filter((size) => size.selected)
    .map((size) => size.size);
  if (selectedSizes.length > 0) {
    queryParams.size = selectedSizes;
  }

  const [minPrice, maxPrice] = priceFilter
    .split("&")
    .map((param) => param.split("=")[1]);
  if (minPrice) {
    queryParams.minPrice = parseFloat(minPrice) || undefined;
  }
  if (maxPrice) {
    queryParams.maxPrice = parseFloat(maxPrice) || undefined;
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useProductCardCollection({
      ...params,
      ...queryParams,
      ...(sortFilter.length > 0 && { sort: sortFilter }),
    });

  const infiniteLoaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (infiniteLoadingObserver.current) {
        infiniteLoadingObserver.current.disconnect();
      }

      infiniteLoadingObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) infiniteLoadingObserver.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  return (
    <InfiniteLoaderContext.Provider
      value={{
        infiniteLoaderRef,
        infiniteData: data,
        isLoading,
        error,
        isFetching,
      }}
    >
      {children}
    </InfiniteLoaderContext.Provider>
  );
};

export default InfiniteLoadingWrapper;
