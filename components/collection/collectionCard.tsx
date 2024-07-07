import React, { useState, useCallback } from "react";
import {
  Carousel,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
} from "@/components/extension/carousel";
import dynamic from "next/dynamic";
import Link from "next/link";

const Image = dynamic(() => import("next/image"), { ssr: false });

interface CarouselProductCard {
  infiniteRef: ((node: HTMLDivElement) => void) | null;
  metadata: {
    url: string;
    slug: string;
    title: string;
    discount: number;
    bestseller: boolean;
    actualPrice: number;
    offerPrice: number;
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
        <CarouselNext className="top-1/3 -translate-y-1/3" />
        <CarouselPrevious className="top-1/3 -translate-y-1/3" />
        <CarouselMainContainer
          onSlideChange={handleSlideChange}
          className="w-full"
        >
          {metadata.map((item) => (
            <SliderMainItem
              key={item.slug}
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
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-red-500 px-2 text-center text-xs sm:text-sm font-medium text-white">
                    {`${item.discount}% OFF`}
                  </span>
                )}

                {item.bestseller === true ? (
                  <span className="absolute z-10 bottom-0 left-0 m-2 rounded-full bg-primary px-2 text-center text-xs sm:text-sm  font-medium text-white">
                    Bestseller
                  </span>
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
