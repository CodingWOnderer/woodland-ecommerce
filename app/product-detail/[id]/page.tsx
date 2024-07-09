"use client";
import ContentLayout from "@/components/layout/ContentLayout";
import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from "@/components/extension/carousel";
import React, { useEffect } from "react";
import Image from "next/image";
import { AppearanceForm } from "@/components/forum/ProductCartForm";
import useProductQuery from "@/hooks/product";
import TopSellerCarousel from "@/components/common/TopSellerCarousel";
import useWoodlandStoreData from "@/lib/store/store";

const ProductDetail = ({ params: { id } }: { params: { id: string } }) => {
  const { data, isLoading } = useProductQuery(id);
  const {setDivision} = useWoodlandStoreData();

  useEffect(()=>setDivision(data?.data.category[1] as "FOOTWEAR"|"GARMENT"),[data?.data.category[1]])

  if (isLoading) return <div>loading....</div>;

  const currentProduct = data?.data.productMeta.find(
    (item) => item.slug === id
  );

  return (
    <ContentLayout>
      <section className="py-24">
        <div className="mx-auto px-4  md:container">
          <div className="grid grid-cols-1  lg:grid-cols-2">
            <div className="slider-box overflow-hidden w-full h-full max-lg:mx-auto mx-0">
              <Carousel
                orientation="horizontal"
                className="flex flex-col  items-center gap-2"
                carouselOptions={{ loop: true }}
              >
                <div className="relative basis-3/4 ">
                  <CarouselMainContainer>
                    {currentProduct?.urls.map((item, index) => (
                      <SliderMainItem
                        key={index}
                        className=" overflow-hidden  flex items-center  justify-center h-full rounded-md"
                      >
                        <div className="reflative">
                          <Image
                            src={item}
                            alt={"loading.."}
                            height={400}
                            width={500}
                          />
                        </div>
                      </SliderMainItem>
                    ))}
                  </CarouselMainContainer>
                </div>
                <CarouselThumbsContainer className="mt-2  flex gap-x-2">
                  {currentProduct?.urls.map((item, index) => (
                    <SliderThumbItem
                      key={index}
                      index={index}
                      className="rounded-md border  flex justify-center items-center cursor-pointer bg-transparent"
                    >
                      <div className="reflative flex justify-center items-center">
                        <Image
                          src={item}
                          alt={"loading.."}
                          className=" object-contain"
                          height={200}
                          width={80}
                        />
                      </div>
                    </SliderThumbItem>
                  ))}
                </CarouselThumbsContainer>
              </Carousel>
            </div>
            <div className="flex justify-center  items-center">
              <div className="pro-detail w-full lg:max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                {data && data.data && (
                  <AppearanceForm productid={id} productData={data} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**Best Seller */}
      <section className=" md:container flex flex-col justify-center items-center space-y-8 pb-10 md:py-20">
        <h1 className="md:text-3xl text-xl px-4 md:px-9  w-full font-bold tracking-tight text-gray-900">
          Top Sellers recommened for you
        </h1>
        <TopSellerCarousel />
      </section>
    </ContentLayout>
  );
};

export default ProductDetail;
