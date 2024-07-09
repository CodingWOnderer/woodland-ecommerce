"use client";
import { useCollectionPageImage } from "@/hooks/collections/queries";
import { QueryParams } from "@/hooks/collections/types";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryInfo = (
  params: Partial<Pick<QueryParams, "category" | "gender" | "circle" | "brand">>
) => {
  const { data, isLoading } = useCollectionPageImage({
    ...params,
    circle: "woodland",
  });

  if (isLoading)
    return (
      <div>
        <div className="relative  aspect-[1685/399]">
        <Skeleton className="h-full w-full" />
        </div>
        <div className=" py-7 lg:py-6">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-6 mt-1" />
      </div>
      </div>
    );

  return (
    <div>
      <div className="relative  aspect-[1685/399]">
        <Image
          src={
            data?.data === undefined
              ? "/default-cat-banner.png"
              : data.data.image!
          }
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          quality={100}
          fill
          style={{ objectFit: "contain" }}
        />{" "}
      </div>
      <div className=" py-7 lg:py-6">
        <h1 className="scroll-m-20 text-primary text-2xl  tracking-tight lg:text-3xl">
          {data?.data?.name}
        </h1>
        <p className="lg:leading-7 leading-6 text-xs lg:text-base ">
          {data?.data?.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryInfo;
