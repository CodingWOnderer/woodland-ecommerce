"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { QueryParams } from "@/hooks/collections/types";
import useBestsellerQuery from "@/hooks/bestseller/queries";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { Mulish } from "next/font/google";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";

const mulish = Mulish({ subsets: ["latin"] });

function TopSellerCarousel(
  params: Partial<
    Pick<QueryParams, "category" | "gender" | "circle" | "brand" | "bestseller">
  >
) {
  const { data, isLoading, isFetching } = useBestsellerQuery({
    ...params,
    circle: "woodland",
  });

  const plugin = React.useRef(
    Autoplay({
      delay: 2000,

      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnLastSnap: false,
      stopOnMouseEnter: false,
    })
  );

  const currentSlider = data?.data.map((item) => ({
    url: item.productMeta[0].urls[0],
    id: item.productMeta[0].slug,
    discount: item.productMeta[0].discount,
    bestSeller: item.bestSeller,
    price: item.productMeta[0].price,
    offerPrice: item.productMeta[0].offerPrice,
    title: item.productMeta[0].title,
  }));

  return (
    <Carousel
      className="w-full px-4 md:px-0 max-w-screen-2xl "
      //@ts-ignore
      plugins={[plugin.current]}
      opts={{ loop: true }}
    >
      <CarouselContent className="-ml-1">
        {currentSlider &&
          currentSlider?.length > 0 &&
          currentSlider?.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 cursor-pointer mx-2  base-1/4 md:basis-1/4  xl:basis-1/5 "
            >
              <div>
                <Link
                  href={`/product-detail/${item.id}`}
                  className=" max-h-fit relative overflow-hidden"
                >
                  <div className="relative m-auto w-full aspect-[3/3] bg-[#F3F3F3]">
                    <Image
                      src={item.url}
                      alt="image-product"
                      priority
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        filter: "contrast(1)",
                      }}
                    />
                  </div>
                  {item.discount > 0 && (
                    <span className="absolute top-0 left-0 m-2 bg-[#a31010] px-2 text-center text-xs font-medium text-white">
                      {`${item.discount}%`}
                    </span>
                  )}

                  {item.bestSeller === true ? (
                    <div className="flex items-center  m-2 bg-primary px-2 text-center text-xs  font-medium text-white absolute z-10 bottom-0 left-0">
                      <FaStar /> <span className=" ml-2">Bestseller</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
                <h2 className="mb-2 text-lg truncate mt-2 font-medium dark:text-white text-gray-900">
                  {item.title}
                </h2>
                <div className={cn("flex items-center", mulish.className)}>
                  <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
                    ₹{item.offerPrice}
                  </p>
                  <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}

export default TopSellerCarousel;
