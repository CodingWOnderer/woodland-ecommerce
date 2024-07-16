"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const HomeBanner: { img: string; link: string }[] = [
  {
    img: "/landing/hero_banner_2.webp",
    link: "/sale",
  },
  {
    img: "/landing/hero_banner_1.webp",
    link: "/collections/sneakers?gender=MEN",
  },

  {
    img: "/landing/hero_banner_3.webp",
    link: "/collections/round_tees?gender=MEN",
  },
  {
    img: "/landing/hero_banner_4.webp",
    link: "/collections/shirts?gender=MEN",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/may2024/hero_banner_5.webp",
    link: "/collections/brand=askatingmonk",
  },
];

const HeroSection = () => {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,

      stopOnInteraction: false,
      stopOnFocusIn: false,
      stopOnLastSnap: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <Carousel
      //@ts-ignore
      plugins={[plugin.current]}
      className="w-full p-0"
    >
      <CarouselContent className="rounded-none">
        {HomeBanner.map((item, index) => (
          <CarouselItem key={index} className="rounded-none">
            <div>
              <Card className="p-0">
                <CardContent className="flex aspect-[5/2] p-0  items-center justify-center ">
                  <Image
                    src={item.img}
                    height={500}
                    width={2050}
                    className="h-full aspect-auto"
                    alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroSection;
