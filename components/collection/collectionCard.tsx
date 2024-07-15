import React, { useState, useCallback } from "react";
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "@/components/extension/carousel";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { sendGTMEvent } from "@next/third-parties/google";

interface CarouselProductCard {
  infiniteRef: ((node: HTMLDivElement) => void) | null;
  metadata: {
    id: string;
    category: string[];
    brand: string;
    gender: string;
    variant: string;
    url: string;
    slug: string;
    title: string;
    discount: number;
    actualPrice: number;
    offerPrice: number;
    bestseller: boolean;
  }[];
}

const CarouselOrientation: React.FC<CarouselProductCard> = ({
  metadata,
  infiniteRef,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div
      ref={infiniteRef}
      className=" flex flex-col justify-center  aspect-[3/3] m-2"
    >
      <Carousel>
        <CarouselMainContainer
          onSlideChange={handleSlideChange}
          className="w-full"
        >
          {metadata.map((item) => (
            <SliderMainItem
              key={item.slug}
              onClick={() =>
                sendGTMEvent({
                  event: "select_item",
                  ecommerce: {
                    items: [
                      {
                        item_id: item.id,
                        item_name: item.title,
                        price: item.offerPrice,
                        item_brand: item.brand,
                        item_category: item.brand,
                        item_category2: item.category[2],
                        item_category3: item.category[1],
                        item_variant: item.variant,
                      },
                    ],
                  },
                })
              }
              className="bg-[#F3F3F3] bases-[90%]"
            >
              <Link href={`/product-detail/${encodeURIComponent(item.slug)}`}>
                <div className="relative m-auto w-full aspect-[250/250] bg-[#F3F3F3]">
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

                {item.bestseller === true ? (
                  <div className="flex items-center  m-2 bg-primary px-2 text-center text-xs  font-medium text-white absolute z-10 bottom-0 left-0">
                    <FaStar /> <span className=" ml-2">Bestseller</span>
                  </div>
                ) : (
                  ""
                )}
              </Link>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer className=" h-12">
          {metadata.map((item, index) => (
            <SliderThumbItem
              key={item.slug}
              index={index}
              className="cursor-pointer   basis-2/6 bg-transparent"
            >
              <div className="outline outline-1 w-10 h-10 rounded-none overflow-hidden outline-border size-full flex items-center justify-center  bg-background">
                <img src={item.url} alt={item.title} />
              </div>
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
      <div className=" px-3">
        <a href={metadata[activeIndex].url}>
          <h5 className="tracking-tight line-clamp-1 text-black text-sm md:text-lg sm:text-base font-semibold">
            {metadata[activeIndex].title}
          </h5>
        </a>
        <p className="space-x-1">
          {metadata[activeIndex].actualPrice && (
            <span className="sm:text-sm text-xs text-black line-through">
              ₹ {metadata[activeIndex].actualPrice}
            </span>
          )}
          {metadata[activeIndex].offerPrice && (
            <span className="sm:text-sm text-xs font-bold text-black">
              ₹ {metadata[activeIndex].offerPrice}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default React.memo(CarouselOrientation);
