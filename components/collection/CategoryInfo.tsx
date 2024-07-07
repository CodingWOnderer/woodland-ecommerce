"use client";
import { useCollectionPageImage } from "@/hooks/collections/queries";
import { QueryParams } from "@/hooks/collections/types";
import Image from "next/image";
import React from "react";

const CategoryInfo = ({
  category,
  gender,
  brand,
  circle = "woodland",
}: Partial<Pick<QueryParams, "category" | "gender" | "circle" | "brand">>) => {
  const { data, isLoading } = useCollectionPageImage({
    category,
    gender,
    brand,
    circle,
  });

  if (isLoading) return <div>Loading...</div>;
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
    </div>
  );
};

export default CategoryInfo;
