"use client";
import { ApiResponse } from "@/hooks/collections/types";
import { InfiniteData } from "@tanstack/react-query";
import { createContext } from "react";

export interface InfiniteLoaderProps {
  infiniteLoaderRef: (node: HTMLDivElement) => void;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  infiniteData: InfiniteData<ApiResponse, unknown> | undefined;
}

const InfiniteLoaderContext = createContext<InfiniteLoaderProps | undefined>(
  undefined
);

export default InfiniteLoaderContext;
