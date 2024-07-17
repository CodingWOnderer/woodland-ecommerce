"use client";

import CategoryInfo from "@/components/collection/CategoryInfo";
import InfiniteLoaderContext, {
  InfiniteLoaderProps,
} from "@/components/common/InfiniteScroll/InfiniteLoaderContext";
import InfiniteLoadingWrapper from "@/components/common/InfiniteScroll/InfiniteLoadingWrapper";
import React, { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import FilterHeader from "@/components/common/FilterHeader";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { sendGTMEvent } from "@next/third-parties/google";

const CarouselOrientation = dynamic(
  () => import("@/components/collection/collectionCard"),
  {
    loading: () => (
      <div className="h-full w-full">
        <Skeleton className="h-full w-full" />
      </div>
    ),
  }
);

const CollectionCategoryPage = (category: { para: string }) => {
  const search = useSearchParams();
  const searchParamsObject: Record<string, string> = {};

  search.forEach((value, key) => {
    if (value !== null) {
      searchParamsObject[key] = value;
    }
  });

  const renderCards = useCallback((data: InfiniteLoaderProps | undefined) => {
    if (data?.isLoading)
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="h-full w-full">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      );

    if (data?.error) return <div>Something went wrong</div>;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {data?.infiniteData?.pages.map((page, pageIndex) => {
          sendGTMEvent({
            event: "view_item_list",
            ecommerce: {
              items: page?.data?.map((product, idx) => {
                return {
                  item_id: product.productId || "",
                  item_name:
                    (product.productMeta[0] && product.productMeta[0].title) ||
                    "",
                  price:
                    product.productMeta[0] && product.productMeta[0].offerPrice,
                  item_brand: product.brand || "",
                  item_category: product.gender || "",
                  item_category2:
                    product.category && product.category.length > 0
                      ? product.category[1]
                      : "",
                  item_category3:
                    product.category && product.category.length > 0
                      ? product.category[0]
                      : "",
                  item_variant:
                    (product.productMeta[0] && product.productMeta[0].color) ||
                    "",
                  position: idx + 1,
                };
              }),
            },
          });

          return page?.data?.map((pcards, pindex) => {
            const metadata = pcards.productMeta.map((sitem) => ({
              id: sitem.skuId,
              category: pcards.category,
              brand: pcards.brand,
              gender: pcards.gender,
              variant: sitem.color,
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
          });
        })}
      </div>
    );
  }, []);

  return (
    <div className="max-w-screen-2xl min-h-screen pb-20 px-4 m-auto">
      <InfiniteLoadingWrapper
        params={{
          circle: "woodland",
          ...searchParamsObject,
          category: category.para.length > 0 ? category.para : undefined,
        }}
      >
        <CategoryInfo {...searchParamsObject} category={category.para} />
        <FilterHeader />
        <div className="w-full min-h-screen">
          <InfiniteLoaderContext.Consumer>
            {renderCards}
          </InfiniteLoaderContext.Consumer>
        </div>
      </InfiniteLoadingWrapper>
    </div>
  );
};

export default CollectionCategoryPage;
