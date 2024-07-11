"use client";
import ContentLayout from "@/components/layout/ContentLayout";
import React, { useEffect } from "react";
import Image from "next/image";
import { AppearanceForm } from "@/components/forum/ProductCartForm";
import useProductQuery from "@/hooks/product";
import TopSellerCarousel from "@/components/common/TopSellerCarousel";
import useWoodlandStoreData from "@/lib/store/store";

const ProductDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading } = useProductQuery(id);
  const { setDivision } = useWoodlandStoreData();

  useEffect(
    () => setDivision(data?.data.category[1] as "FOOTWEAR" | "GARMENT"),
    [data?.data.category[1]]
  );

  if (isLoading) return <div>loading....</div>;

  const currentProduct = data?.data.productMeta.find(
    (item) => item.slug === id
  );

  return (
    <ContentLayout>
      <div className="mx-auto px-4  md:max-w-screen-2xl">
        <div className="grid grid-cols-1  lg:grid-cols-2">
          <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-2 gap-4">
              {currentProduct?.urls.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      aspectRatio: 990 / 1000,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      fill
                      src={item}
                      priority
                      alt="skuImage"
                      placeholder="empty"
                      style={{
                        objectFit: "contain",
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="w-full lg:max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
              {data && data.data && (
                <AppearanceForm productid={id} productData={data} />
              )}
            </div>
          </div>
        </div>
      </div>
      {/**Best Seller */}
      <section className=" md:container flex flex-col justify-center items-center space-y-8 pb-10 md:py-20">
        <h1 className=" px-4 md:px-9 text-2xl lg:text-3xl  w-full font-bold tracking-tight text-primary">
          Top Sellers recommened for you
        </h1>
        <TopSellerCarousel />
      </section>
    </ContentLayout>
  );
};

export default ProductDetail;
