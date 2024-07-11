"use client";

import dynamic from "next/dynamic";
import CategoryInfo from "@/components/collection/CategoryInfo";
import InfiniteLoaderContext, {
  InfiniteLoaderProps,
} from "@/components/common/InfiniteScroll/InfiniteLoaderContext";
import InfiniteLoadingWrapper from "@/components/common/InfiniteScroll/InfiniteLoadingWrapper";
import React, { useCallback, memo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import FilterHeader from "@/components/common/FilterHeader";
import LoaderComponent from "@/components/common/Loader";

const CarouselOrientation = dynamic(
  () => import("@/components/collection/collectionCard"),
  { loading: () => <div className="h-full w-full"><Skeleton className="h-full w-full"/></div> }
);

const CollectionCategoryPage = (category:{para:string}) => {
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
          page?.data?.map((pcards, pindex) => {
            const metadata = pcards.productMeta.map((sitem) => ({
              url: sitem.SkuImages[0],
              slug: sitem.slug,
              title: sitem.title,
              discount: sitem.discount,
              actualPrice: sitem.price,
              offerPrice: sitem.offerPrice,
              bestseller: pcards.bestSeller,
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
    <div className="max-w-screen-2xl min-h-screen pb-20 px-4 m-auto">
      <InfiniteLoadingWrapper
        params={{ circle: "woodland", ...searchParamsObject,category:category.para }}
      >
        <CategoryInfo  {...searchParamsObject } category={category.para}/>
        <FilterHeader/>
        <div className="w-full min-h-screen">
          <InfiniteLoaderContext.Consumer>
            {renderCards}
          </InfiniteLoaderContext.Consumer>
        </div>
      </InfiniteLoadingWrapper>
    </div>
  );
};

const WrappedCollectionCategoryPage = ({params}:{params:{category:string}}) => (
  <Suspense fallback={<LoaderComponent size="screen"/>}>
    <CollectionCategoryPage para={params.category}/>
  </Suspense>
);

export default memo(WrappedCollectionCategoryPage);
