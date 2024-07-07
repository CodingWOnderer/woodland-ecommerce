import HeroSection from "@/components/common/HeroSection";
import TopSellerCarousel from "@/components/common/TopSellerCarousel";
import FrontProductCard from "@/components/FrontProductCard";
import ProductCard from "@/components/home/productCard";
import ContentLayout from "@/components/layout/ContentLayout";
import { Button } from "@/components/ui/button";
import {
  categoryCard,
  envCat,
  exploreData,
  genderCat,
  instaCard,
  threeCard,
} from "@/lib/model/data";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <ContentLayout>
      <HeroSection />
      <div className="md:container px-2 py-6 md:py-10 sm:grid-cols-2 grid lg:grid-cols-3 gap-6">
        {categoryCard.map((item, index) => (
          <ProductCard
            key={index}
            src={item.img}
            href={item.link}
            title={item.title}
          />
        ))}
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: 1901 / 605,
        }}
      >
        <Image
          src={
            "https://assets.woodlandworldwide.app/woodland-images/may2024/wdl_shoe_banner.webp"
          }
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          quality={100}
          fill
          style={{ objectFit: "contain" }}
        />
        <div className="absolute z-[2] top-1/3 md:top-1/2 bottom-1/2 right-3 md:right-20">
          <Link href={"/collections/casuals_lace_up?gender=MEN"}>
            <Button className="rounded-none text-xs px-2 h-8 sm:text-base sm:h-12 sm:px-4">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
      <section className=" md:container flex flex-col justify-center items-center space-y-8 py-8 md:py-20">
        <TopSellerCarousel bestSeller={true} />
      </section>

      <div className="grid md:grid-cols-2 gap-2">
        {genderCat.map((val, index) => {
          return (
            <div key={index} className="relative">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: 952 / 605,
                }}
              >
                <Image
                  src={val.img}
                  alt={val.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="absolute z-[2] bottom-8 left-8">
                <div className="sm:text-2xl text-xl text-primary-foreground mb-2 font-semibold">
                  {val.title}
                </div>
                <Link href={val.link}>
                  <Button className="rounded-none text-xs sm:text-base">
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="absolute z-[1] inset-0 bg-gradient-to-t via-transparent from-black/40 to-transparent"></div>
            </div>
          );
        })}
      </div>
      {/**product cards */}

      <div className="mx-auto max-w-screen-xl px-4  pb-4 sm:px-6 sm:py-12 lg:px-8">
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {exploreData.map((item, index) => (
            <FrontProductCard product={item} key={index} />
          ))}
        </ul>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: 1901 / 605,
        }}
      >
        <Image
          src={
            "https://assets.woodlandworldwide.app/woodland-images/may2024/woodsport_banner.webp"
          }
          alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
          quality={100}
          fill
          style={{ objectFit: "contain" }}
        />
        <div className="absolute z-[2] top-1/3 md:top-1/2 bottom-1/2 right-3 md:right-20">
          <Link href={"/collections?brand=woodsports"}>
            <Button className="rounded-none text-xs px-2 h-8 sm:text-base sm:h-12 sm:px-4">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      <section className=" container flex flex-col justify-center items-center space-y-8 py-4 sm:py-20">
        <TopSellerCarousel brand={"woodsports"} />
      </section>
      {/**three card */}
      <div className="grid md:grid-cols-3 ">
        {threeCard.map((val, index) => {
          return (
            <div key={index} className="relative">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: 634 / 605,
                }}
              >
                <Image
                  src={val.img}
                  alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="absolute z-[2] flex justify-center items-center flex-col bottom-8 left-[50%] right-[50%]">
                <div className="sm:text-3xl text-xl text-center whitespace-nowrap text-primary-foreground mb-2 font-semibold">
                  {val.title}
                </div>
                <Link href={val.link}>
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="rounded-none h-8 px-6 sm:h-10 sm:px-8 text-xs sm:text-base bg-transparent text-white border-2 transition-colors font-semibold"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="absolute z-[1] inset-0 bg-gradient-to-t via-transparent from-black/40 to-transparent"></div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto w-full flex flex-col max-w-screen-2xl  pt-8  sm:pt-12 ">
        <div className="my-3 text-center font-normal text-base md:text-xl">
          AS WORN BY WOODLAND FAM
          <br />
          Click to shop & mention us on instagram @woodlandworldwide to be
          featured
        </div>
        <div className="w-full flex gap-x-2">
          {instaCard.map((item, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: 330 / 330,
              }}
            >
              <Image
                src={item.img}
                alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid mt-2 max-w-screen-2xl pb-4 mx-auto md:grid-cols-2 ">
        {envCat.map((val, index) => {
          return (
            <div key={index} className="relative">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: 952 / 605,
                }}
              >
                <Image
                  src={val.img}
                  alt="Woodland Shoes for Men, Woodland shoes for women, Woodland apparel"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="absolute z-[2] bottom-4 left-4 sm:bottom-8 sm:left-8">
                <div className="sm:text-2xl text-xl text-primary-foreground font-semibold">
                  {val.title}
                </div>
                <p className="max-w-sm text-sm sm:text-base  mt-2 mb-1 text-white line-clamp-1 sm:line-clamp-2">
                  {val.des}
                </p>
                <Link href={val.link}>
                  <Button className="rounded-none text-xs sm:text-sm">
                    Read More
                  </Button>
                </Link>
              </div>
              <div className="absolute z-[1] inset-0 bg-gradient-to-t via-transparent from-black/40 to-transparent"></div>
            </div>
          );
        })}
      </div>
    </ContentLayout>
  );
}
