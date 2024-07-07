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
    <div ref={infiniteRef} className="max-w-md m-2 border">
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
              className="bg-transparent h-[350px] border-b"
            >
              <Link
                href={`/product-detail/${encodeURIComponent(item.slug)}`}
                className="relative h-full flex justify-center items-center"
              >
                <Image
                  src={item.url}
                  alt={item.title}
                  height={200}
                  width={200}
                  className="object-contain"
                />
                {item.discount > 0 && (
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-red-500 px-2 text-center text-sm font-medium text-white">
                    {`${item.discount}% OFF`}
                  </span>
                )}
              </Link>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer>
          {metadata.map((item, index) => (
            <SliderThumbItem
              key={item.slug}
              index={index}
              className="bg-transparent cursor-pointer"
            >
              <div className="outline outline-1 overflow-hidden outline-border size-full flex items-center justify-center rounded-xl bg-background">
                <img src={item.url} alt={item.title} />
              </div>
            </SliderThumbItem>
          ))}
        </CarouselThumbsContainer>
      </Carousel>
      <div className="mt-4 pb-5 px-3">
        <a href="#">
          <h5 className="tracking-tight text-black text-lg font-semibold">
            {metadata[activeIndex].title}
          </h5>
        </a>
        <p className="space-x-1">
          {metadata[activeIndex].actualPrice && (
            <span className="text-sm text-black line-through">
              ₹ {metadata[activeIndex].actualPrice}
            </span>
          )}
          {metadata[activeIndex].offerPrice && (
            <span className="text-sm font-bold text-black">
              ₹ {metadata[activeIndex].offerPrice}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default React.memo(CarouselOrientation);
