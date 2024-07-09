"use client";
import { useProductCardCollection } from "@/hooks/collections/queries";
import React, { useCallback, useRef } from "react";
import InfiniteLoaderContext from "./InfiniteLoaderContext";
import { QueryParams } from "@/hooks/collections/types";

type Props = {
  params?: Partial<QueryParams>;
  children: React.ReactNode;
};

const InfiniteLoadingWrapper = (props: Props) => {
  const infiniteLoadingObserver = useRef<IntersectionObserver>();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useProductCardCollection(props.params);

  const infiniteLoaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (infiniteLoadingObserver.current)
        infiniteLoadingObserver.current.disconnect();

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
      {props.children}
    </InfiniteLoaderContext.Provider>
  );
};

export default InfiniteLoadingWrapper;
