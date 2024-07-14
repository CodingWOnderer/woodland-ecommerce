"use client";
import ContentLayout from "@/components/layout/ContentLayout";
import React, { useEffect } from "react";
import Image from "next/image";
import { AppearanceForm } from "@/components/forum/ProductCartForm";
import useProductQuery from "@/hooks/product";
import TopSellerCarousel from "@/components/common/TopSellerCarousel";
import useWoodlandStoreData from "@/lib/store/store";
import { AnimatePresence, motion } from "framer-motion";
import ZoomImages from "@/components/common/ZoomImages";

const ProductDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading } = useProductQuery(id);
  const { setDivision, setZoomDialouge } = useWoodlandStoreData();

  useEffect(
    () => setDivision(data?.data.category[1] as "FOOTWEAR" | "GARMENT"),
    [data?.data.category[1]]
  );

  if (isLoading)
    return (
      <div className="border min-h-screen min-w-screen mix-blend-multiply flex justify-center items-center">
        <Image
          src={"/woodland-loader.gif"}
          height={400}
          width={400}
          alt="Woodland"
        />
      </div>
    );

  const currentProduct = data?.data.productMeta.find(
    (item) => item.slug === id
  );

  const handleImageClick = () => setZoomDialouge(window.innerWidth > 640);

  return (
    <AnimatePresence initial={false}>
      <ContentLayout>
        <AnimatePresence mode="wait">
          <div className="mx-auto py-4 px-4 md:max-w-screen-2xl">
            <motion.div
              key={id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: "easeInOut" }}
              className="grid grid-cols-1   lg:grid-cols-5"
            >
              <div className="flex lg:col-span-3 flex-col gap-4 ">
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
                          onClick={handleImageClick}
                          alt="skuImage"
                          className=" sm:cursor-zoom-in"
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
              <div className="flex lg:col-span-2 w-full justify-center ">
                <div className="w-full  lg:max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                  {data && data.data && (
                    <AppearanceForm
                      productid={id}
                      productData={data}
                      manufacturingInfo={{
                        articalCode: data.data.articleCode,
                        productCode: data.data.productId,
                        division: data.data.category[1],
                        PackagingQty: currentProduct?.optionalFields.qtval,
                        color: currentProduct?.color,
                        Mrp: currentProduct?.price,
                        MaterialUsed: currentProduct?.optionalFields.fabric,
                        DesignedFor: data.data.gender,
                        OriginCountry:
                          currentProduct?.optionalFields.originCountry,
                        MarketedBy: data.data.optionalFields.marketedBy,
                      }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
        <ZoomImages urls={currentProduct?.urls} />
        {/**Best Seller */}
        <section className=" px-4  mt-10 lg:mt-4  md:max-w-screen-2xl flex flex-col justify-center items-center space-y-8 pb-10 md:py-20">
          <h1 className="text-2xl lg:text-3xl  w-full font-bold tracking-tight text-primary">
            Top Sellers recommened for you
          </h1>
          <TopSellerCarousel />
        </section>
      </ContentLayout>
    </AnimatePresence>
  );
};

export default ProductDetail;
