"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const Aboutus = [
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/about/about-slider-1.png",
    head: "ABOUT US",
    des: " Woodland's parent company, Aero Group, has been a well known name in the outdoor shoe industry since the early 50s. Founded in Quebec, Canada, it entered the Indian market in 1992. Before that, Aero Group was majorly exporting its leather shoes to Russia. After the division of Russia into various states known as the USSR, the group decided to launch some of its products in India. Hence, the first hand-stitched leather shoe was launched, which took the entire shoe market by storm. That shoe made the brand 'Woodland'.",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/about/about-slider-2.png",
    head: "ADVENTURE",
    des: " Over the years, the appetite for adventure sports has been on the rise. It is the spirit of adventure that defines Woodland. A spirit that is willing to stretch the levels of human endurance; a spirit that desires to reach the furthest frontiers; a spirit that craves to venture into the unknown.",
  },
  {
    img: "https://assets.woodlandworldwide.app/woodland-images/about/about-slider-3.png",
    head: "OUR PRODUCTS",
    des: "Woodland offers an extensive line of footwear, performance apparel and outdoor gear. Whether it's a lightweight jacket for active pursuits or a summit tested parka for the coldest places on earth, the focus is on creating truly functional solutions for outdoor and adventure enthusiasts.",
  },
];
const AboutSection = () => {
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
      className="w-full p-0 border-none"
    >
      <CarouselContent className="rounded-none border-none">
        {Aboutus.map((item, index) => (
          <CarouselItem key={index} className="border-none">
            <section
              style={{ backgroundImage: `url(${item.img})` }}
              className={cn(
                `overflow-hidden aspect-[5/2] border-none  bg-cover bg-top bg-no-repeat`
              )}
            >
              <div className="bg-black/50 flex flex-col justify-center items-center h-full p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="text-center ltr:sm:text-left rtl:sm:text-right">
                  <h2 className="text-xl text-center font-bold text-white md:text-3xl lg:text-5xl">
                    {item.head}
                  </h2>

                  <p className="hidden max-w-lg text-justify text-white/90 md:mt-6 md:block md:text-sm md:leading-relaxed">
                    {item.des}
                  </p>
                </div>
              </div>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default AboutSection;
