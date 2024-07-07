"use client";

import dynamic from "next/dynamic";
import CategoryInfo from "@/components/collection/CategoryInfo";
import InfiniteLoaderContext, {
  InfiniteLoaderProps,
} from "@/components/common/InfiniteScroll/InfiniteLoaderContext";
import InfiniteLoadingWrapper from "@/components/common/InfiniteScroll/InfiniteLoadingWrapper";
import React, { useCallback, memo, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const CarouselOrientation = dynamic(
  () => import("@/components/collection/collectionCard"),
  { loading: () => <div>Loading...</div> }
);

const CollectionPage = () => {
  const search = useSearchParams();
  const searchParamsObject: Record<string, string> = {};

  search.forEach((value, key) => {
    if (value !== null) {
      searchParamsObject[key] = value;
    }
  });

  const renderCards = useCallback((data: InfiniteLoaderProps | undefined) => {
    if (data?.isLoading) return <div>Loading...</div>;
    if (data?.error) return <div>Error....</div>;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {data?.infiniteData?.pages.map((page, pageIndex) =>
          page.data.map((pcards, pindex) => {
            const metadata = pcards.productMeta.map((sitem) => ({
              url: sitem.SkuImages[0],
              slug: sitem.slug,
              title: sitem.title,
              discount: sitem.discount,
              actualPrice: sitem.price,
              offerPrice: sitem.offerPrice,
            }));

            return (
              <CarouselOrientation
                key={pageIndex + "-" + pindex}
                infiniteRef={
                  page.data.length === pindex + 1
                    ? data.infiniteLoaderRef
                    : null
                }
                metadata={metadata}
              />
            );
          })
        )}
      </div>
    );
  }, []);

  return (
    <div className="max-w-screen-2xl px-4 m-auto">
      <InfiniteLoadingWrapper
        params={{ circle: "woodland", ...searchParamsObject }}
      >
        <CategoryInfo category="products" />
        <div className="w-full">
          <InfiniteLoaderContext.Consumer>
            {renderCards}
          </InfiniteLoaderContext.Consumer>
        </div>
      </InfiniteLoadingWrapper>
    </div>
  );
};

const WrappedCollectionPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CollectionPage />
  </Suspense>
);

export default memo(WrappedCollectionPage);
