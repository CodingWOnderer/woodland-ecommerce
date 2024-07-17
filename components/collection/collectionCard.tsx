import React, { useState, useCallback } from "react";
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
  CarouselThumbsContainer,
  SliderThumbItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/extension/carousel";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { sendGTMEvent } from "@next/third-parties/google";
import { cn } from "@/lib/utils";
import { Mulish } from "next/font/google";
import { motion } from "framer-motion";

const mulish = Mulish({ subsets: ["latin"] });

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, ease: "easeIn" }}
      ref={infiniteRef}
      className=" flex flex-col justify-center  aspect-[3/3] m-2"
    >
      <Carousel>
        <CarouselPrevious className="-my-6" />
        <CarouselNext className="-my-6" />
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
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
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
                <div className="flex space-x-2 absolute top-0 mt-2 left-0">
                  {item.discount > 0 && (
                    <span className=" bg-[#a31010] px-2 text-center text-xs font-medium text-white">
                      {`${item.discount}%`}
                    </span>
                  )}

                  {item.bestseller === true ? (
                    <div className="flex items-center bg-primary px-2 text-center text-xs  font-medium text-white ">
                      <FaStar /> <span className=" ml-2">Bestseller</span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
        <h5 className="tracking-tight line-clamp-1 text-black text-sm md:text-lg sm:text-base font-semibold">
          {metadata[activeIndex].title}
        </h5>
        <p className={cn("space-x-1", mulish.className)}>
          {metadata[activeIndex].actualPrice &&
            (metadata[activeIndex].offerPrice !==
            metadata[activeIndex].actualPrice ? (
              <>
                <span className="sm:text-sm text-xs text-black line-through">
                  ₹ {metadata[activeIndex].actualPrice}
                </span>
                {metadata[activeIndex].offerPrice && (
                  <span className="sm:text-sm text-xs font-bold text-black">
                    ₹ {metadata[activeIndex].offerPrice}
                  </span>
                )}
              </>
            ) : (
              <span className="sm:text-sm text-xs text-black">
                ₹ {metadata[activeIndex].actualPrice}
              </span>
            ))}
        </p>
      </div>
    </motion.div>
  );
};

export default React.memo(CarouselOrientation);
